# Exercise 10: SBOM and Container Supply Chain

**Duration:** 3 hours
**Difficulty:** Intermediate
**Prerequisites:** Exercises 01-08; cosign installed

## Objective

For your iris-api image, produce a Software Bill of Materials (SBOM), sign the image with cosign, attach an SLSA provenance attestation, and gate Kubernetes deployments on a Kyverno policy that requires signed + scanned images. By the end you'll have implemented the SLSA Level 2 signing workflow end-to-end.

## Why this matters

Supply-chain attacks (SolarWinds, codecov, npm typosquatting) are now the dominant breach vector for engineering organizations. Cloud-native teams need a verifiable chain: this image came from this commit, built by this pipeline, with these dependencies, and a deployment cluster that refuses anything else. SLSA is the framework that codifies this.

## Requirements

1. **Generate an SBOM** in CycloneDX format using `syft`.
2. **Scan the SBOM** with `grype` for vulnerabilities.
3. **Sign the image** with `cosign` using **keyless** (Sigstore) signatures.
4. **Attach the SBOM as an attestation** to the signed image.
5. **Attach SLSA provenance** documenting how the image was built.
6. **Deploy a Kyverno policy** that:
   - Requires image signatures from an allowed identity
   - Requires the SBOM attestation
   - Fails the deploy if the SBOM contains a HIGH/CRITICAL CVE in a runtime path

## Step-by-step

### Step 1 — Install tooling (15 min)
```bash
brew install syft grype cosign
cosign version
```

### Step 2 — Generate SBOM (15 min)
```bash
syft ghcr.io/me/iris-api:0.2 -o cyclonedx-json > sbom.cdx.json
syft ghcr.io/me/iris-api:0.2 -o spdx-json     > sbom.spdx.json
jq '.components | length' sbom.cdx.json     # count
```

### Step 3 — Scan SBOM (15 min)
```bash
grype sbom:sbom.cdx.json --fail-on high
```
Note: grype will probably fail at first — that's the lesson. Fix one or two HIGH CVEs in the Dockerfile (often by switching base image or pinning a newer version).

### Step 4 — Keyless sign (30 min)
```bash
COSIGN_EXPERIMENTAL=1 cosign sign ghcr.io/me/iris-api:0.2
```
Follow the OIDC flow (browser opens, sign in with GitHub). The signature is stored in the registry alongside the image.

Verify:
```bash
cosign verify ghcr.io/me/iris-api:0.2 \
  --certificate-identity-regexp '.*me@example.com' \
  --certificate-oidc-issuer https://github.com/login/oauth
```

### Step 5 — Attach SBOM attestation (30 min)
```bash
COSIGN_EXPERIMENTAL=1 cosign attest \
  --predicate sbom.cdx.json \
  --type cyclonedx \
  ghcr.io/me/iris-api:0.2

# Verify the attestation
cosign verify-attestation \
  --type cyclonedx \
  --certificate-identity-regexp '.*me@example.com' \
  --certificate-oidc-issuer https://github.com/login/oauth \
  ghcr.io/me/iris-api:0.2
```

### Step 6 — SLSA provenance from CI (45 min)
GitHub Actions emits SLSA provenance via the `slsa-github-generator`:
```yaml
jobs:
  build:
    permissions:
      contents: read
      packages: write
      id-token: write
    uses: slsa-framework/slsa-github-generator/.github/workflows/generator_container_slsa3.yml@v2.0.0
    with:
      image: ghcr.io/${{ github.repository }}/iris-api
      digest: ${{ needs.docker.outputs.digest }}
      registry-username: ${{ github.actor }}
    secrets:
      registry-password: ${{ secrets.GITHUB_TOKEN }}
```
After CI runs:
```bash
cosign verify-attestation --type slsaprovenance ghcr.io/me/iris-api:0.2
```

### Step 7 — Kyverno policy in cluster (45 min)
Install Kyverno: `helm install kyverno kyverno/kyverno -n kyverno --create-namespace`.

Policy:
```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata: { name: verify-signed-and-scanned }
spec:
  validationFailureAction: Enforce
  rules:
    - name: require-signed
      match:
        any: [{ resources: { kinds: [Pod] } }]
      verifyImages:
        - imageReferences: ["ghcr.io/me/iris-api:*"]
          attestors:
            - entries:
                - keyless:
                    subject: "me@example.com"
                    issuer: "https://github.com/login/oauth"
    - name: require-sbom
      match:
        any: [{ resources: { kinds: [Pod] } }]
      verifyImages:
        - imageReferences: ["ghcr.io/me/iris-api:*"]
          attestations:
            - type: cyclonedx
              attestors:
                - entries:
                    - keyless: { subject: "me@example.com", issuer: "https://github.com/login/oauth" }
```

Deploy unsigned image → Kyverno blocks with a clear error. Deploy signed → passes.

## Deliverables

1. SBOM file in repo (`sbom.cdx.json`).
2. Signed image in registry with attestations.
3. Working Kyverno policy in cluster, demonstrated to block unsigned and allow signed.
4. CI workflow producing signed + provenance-attested images automatically.
5. A `SUPPLY_CHAIN.md` describing your team's policy and exception process.

## Validation

- [ ] `syft` and `grype` produce clean outputs.
- [ ] `cosign verify` succeeds for your image with your identity.
- [ ] Deploying an unsigned image is blocked by Kyverno with a policy-violation message.
- [ ] Deploying a signed image passes.
- [ ] CI produces all artifacts on every push.

## Stretch goals

- Add **rebuild-on-CVE** automation: a daily job that scans your signed images and opens a PR with a base image bump when CVEs cross the threshold.
- Implement a **Sigstore Rekor** lookup script: given an image SHA, retrieve the full audit trail of who signed it.
- Add **transparency log monitoring**: alert on signatures issued for your repos by identities other than your CI service account.

## Common pitfalls

- **Cosign without OIDC** — Keyless mode requires CI to have id-token permission; locally it requires a browser. Verify your CI has `id-token: write` in permissions.
- **Signing with key vs keyless** — Key-based signing requires you to manage and rotate keys. Keyless is simpler but creates a dependency on Sigstore's Rekor.
- **SBOM contains build-time-only deps** — Use `syft` against the runtime image, not the builder stage. Otherwise you'll report vulns in build tools you don't ship.
- **Kyverno failure-action: Audit vs Enforce** — Audit only logs; Enforce blocks. Always start with Audit in a new cluster, switch to Enforce after a quiet week.
