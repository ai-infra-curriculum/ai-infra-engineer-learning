# Exercise 09: Container Runtime Debugging

**Duration:** 2.5 hours
**Difficulty:** Intermediate
**Prerequisites:** Exercise 01 (Dockerfiles); curl/grep/strace familiarity

## Objective

Diagnose three deliberately-broken running containers using only container-native debugging tools (`docker logs`, `docker exec`, `nsenter`, ephemeral debug containers). By the end you'll have a reliable methodology for "the container is up but something is wrong" — the most common production case.

## Why this matters

The skill gap between engineers who can fix a crashloop in 10 minutes and those who page senior staff is mostly methodology. This exercise gives you the methodology in a contained way before you need it at 3 AM.

## Requirements

You'll be given (and you can write your own) three broken containers. For each, identify the root cause and fix it.

### Bug 1: Application appears to start but receives no traffic
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY app.py .
RUN pip install fastapi uvicorn
CMD ["uvicorn", "app:app", "--host", "127.0.0.1", "--port", "8000"]
```

### Bug 2: Container starts then OOM-killed after ~10 seconds
A PyTorch container that loads a 13B model into a 2GB memory limit.

### Bug 3: Container runs but predictions are wildly inconsistent
A container that runs as root, mounts a host volume read-write, and another container on the same host periodically truncates the model file.

## Step-by-step debugging methodology

### Step 1 — Container is alive but unresponsive
```bash
docker ps                                    # is it Running?
docker logs --tail 50 <id>                   # what did it say?
docker logs --since 5m <id>                  # recent events
docker exec -it <id> sh                      # poke around
docker stats <id> --no-stream                # CPU/mem usage
```

For bug 1, the application is listening on 127.0.0.1, so the port-mapping forwards to nothing. Fix: `--host 0.0.0.0`.

### Step 2 — Container restarts repeatedly
```bash
docker inspect <id> --format '{{.State.ExitCode}} {{.State.Error}}'
docker inspect <id> --format '{{.State.OOMKilled}}'
dmesg | grep -i 'killed process'             # host-level OOM event
docker logs --previous <id>                  # logs from the prior failed instance
```

For bug 2, OOMKilled=true means the container was killed by cgroup limits. Fix: raise memory limit or use a quantized model.

### Step 3 — Behavior inconsistent over time
This is the hardest. Symptoms:
- Predictions correct, then wrong, then correct again
- Logs show successful loads but stale outputs
- `docker exec` shows expected file contents intermittently

Methodology:
1. **Compare file hashes between calls**:
   ```bash
   docker exec <id> sha256sum /models/current.bin
   sleep 30
   docker exec <id> sha256sum /models/current.bin
   ```
2. **Watch the file**:
   ```bash
   docker exec <id> ls -la /models/current.bin
   docker exec <id> stat /models/current.bin    # see mtime
   ```
3. **Identify who else can write** — check volume mounts (`docker inspect`), look for other containers with the same mount.

For bug 3, the host mount is shared with another container that's modifying the file. Fix: mount read-only, or use a CopyInto pattern at startup.

### Step 4 — When `docker exec` isn't possible
A `distroless`-based image has no shell. Use:
```bash
kubectl debug -it <pod> --image=busybox --target=<container>
# Or with raw docker:
docker run -it --pid container:<id> --net container:<id> --rm busybox sh
```

### Step 5 — When the container won't stop crashing fast enough to exec
```bash
docker run --rm -it --entrypoint sh <image>     # override the bad CMD
```

### Step 6 — Last resort: strace inside the container
```bash
docker exec -it <id> sh
apt-get install -y strace                       # if missing
strace -p $(pidof python) -f -e trace=network 2>&1 | head -50
```

## Deliverables

1. Written diagnosis for each of the 3 bugs (root cause, evidence, fix).
2. A `DEBUGGING_CHEATSHEET.md` you'd put next to your terminal.
3. A "next bug to add" suggestion — describe a 4th deliberate bug that would exercise a different skill.

## Validation

- [ ] You fixed all 3 bugs without consulting the answer key.
- [ ] Diagnosis includes the specific command and its output that pointed to the root cause (not just the fix).
- [ ] Cheatsheet covers the 5-step methodology above plus your own additions.

## Stretch goals

- Add a `containers-down.sh` chaos script that randomly applies one of N bugs on schedule. Time how long it takes you to detect + diagnose + fix.
- Practice with **ephemeral debug containers** in Kubernetes (`kubectl debug`).
- Set up **continuous container security scanning** with falco; reproduce one of its alerts.

## Common pitfalls

- **Trusting `docker logs` exclusively** — Applications that log to a file inside the container won't appear in `docker logs`. Read the application's log config.
- **Skipping `docker inspect`** — Most "weird" container problems show up in inspect output (volume mounts, env vars, restart policies, exit codes).
- **Restarting before reading logs** — `--previous` is your friend; without it, restart wipes the evidence.
- **Confusing OOMKilled with normal exit** — OOMKilled has its own field in inspect; don't rely on guess-from-exit-code.
- **Running strace in production without thought** — strace can pause a running process for a long time. Practice on staging.
