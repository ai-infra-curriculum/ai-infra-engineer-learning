import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const lessonsRoot = path.join(process.cwd(), "..", "lessons");

export type Lesson = {
  module: string;
  slug: string;
  title: string;
  duration: string;
  html: string;
  previous?: LessonLink;
  next?: LessonLink;
  resources: ModuleResource[];
};

export type ModuleResource = {
  kind: "exercises" | "labs" | "quizzes";
  slug: string;
  title: string;
  href: string;
};

export type CurriculumModule = {
  id: string;
  title: string;
  description: string;
  lessons: number;
  firstLesson?: string;
  tone: "coral" | "blue" | "gold" | "mint";
};

type LessonLink = Pick<Lesson, "module" | "slug" | "title">;

function isSafeSegment(value: string) {
  return /^[a-z0-9-]+$/.test(value);
}

async function getLessonLinks(module: string) {
  if (!isSafeSegment(module)) return [];
  const modulePath = path.join(lessonsRoot, module);
  const files = await fs.readdir(modulePath);
  const markdownFiles = files.filter((file) => /^\d+-[a-z0-9-]+\.md$/.test(file)).sort();

  return Promise.all(markdownFiles.map(async (file) => {
    const slug = file.replace(/\.md$/, "");
    const source = await fs.readFile(path.join(modulePath, file), "utf8");
    const heading = source.match(/^#\s+(.+)$/m)?.[1] ?? slug;
    return { module, slug, title: heading.replace(/^Lesson\s+\d+:\s*/i, "") };
  }));
}

async function getMarkdownFiles(directory: string, prefix = ""): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) return getMarkdownFiles(path.join(directory, entry.name), relative);
    return entry.name.endsWith(".md") ? [relative] : [];
  }));
  return files.flat().sort();
}

async function getModuleResources(module: string): Promise<ModuleResource[]> {
  const modulePath = path.join(lessonsRoot, module);
  const resources: ModuleResource[] = [];

  for (const kind of ["exercises", "labs", "quizzes"] as const) {
    try {
      const files = await getMarkdownFiles(path.join(modulePath, kind));
      for (const file of files) {
        if (path.basename(file).toLowerCase() === "readme.md") continue;
        const relativeSlug = file.replace(/\.md$/, "").split(path.sep).join("/");
        const source = await fs.readFile(path.join(modulePath, kind, file), "utf8");
        const heading = source.match(/^#\s+(.+)$/m)?.[1] ?? relativeSlug;
        resources.push({
          kind,
          slug: relativeSlug,
          title: heading.replace(/^#+\s*/, ""),
          href: `/resources/${module}/${kind}/${relativeSlug}`,
        });
      }
    } catch {
      // Resource directories are optional for each module.
    }
  }

  return resources;
}

function rewriteInternalLinks(markdownHtml: string, module: string) {
  return markdownHtml.replace(/href="(?:\.\/)?([^"#?]+\.md)(?:#([^"?]+))?"/g, (_match, target: string, anchor?: string) => {
    const normalized = target.replace(/^\.\.\//, "");
    const parts = normalized.split("/");
    const filename = parts.pop() ?? "";
    const slug = filename.replace(/\.md$/, "");
    const kind = parts[0];
    const href = kind === "exercises" || kind === "labs" || kind === "quizzes"
      ? `/resources/${module}/${kind}/${[...parts.slice(1), slug].join("/")}`
      : `/lessons/${module}/${slug}`;
    return `href="${href}${anchor ? `#${anchor}` : ""}"`;
  });
}

export async function getCurriculum(): Promise<CurriculumModule[]> {
  const entries = await fs.readdir(lessonsRoot, { withFileTypes: true });
  const moduleEntries = entries
    .filter((entry) => entry.isDirectory() && /^mod-\d+-[a-z0-9-]+$/.test(entry.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  return Promise.all(moduleEntries.map(async (entry, index) => {
    const modulePath = path.join(lessonsRoot, entry.name);
    const links = await getLessonLinks(entry.name);
    let description = "Build practical skills for production ML systems.";

    try {
      const readme = await fs.readFile(path.join(modulePath, "README.md"), "utf8");
      const paragraph = readme.split("\n").map((line) => line.trim()).find((line) => line && !line.startsWith("#") && !line.startsWith("[") && !line.startsWith("-"));
      if (paragraph) description = paragraph.replace(/[*_]/g, "").slice(0, 105);
    } catch {
      // A module README is optional; the module still appears from its lessons.
    }

    const fallbackTitle = entry.name.replace(/^mod-\d+-/, "").replace(/-/g, " ");
    return {
      id: entry.name,
      title: links.length > 0 ? entry.name.replace(/^mod-\d+-/, "").replace(/-/g, " ") : fallbackTitle,
      description,
      lessons: links.length,
      firstLesson: links[0]?.slug,
      tone: (["coral", "blue", "gold", "mint"] as const)[index % 4],
    };
  }));
}

export async function getLesson(module: string, slug: string): Promise<Lesson | null> {
  if (!isSafeSegment(module) || !isSafeSegment(slug)) return null;

  try {
    const source = await fs.readFile(path.join(lessonsRoot, module, `${slug}.md`), "utf8");
    const parsed = matter(source);
    const links = await getLessonLinks(module);
    const currentIndex = links.findIndex((link) => link.slug === slug);
    const content = parsed.content.replace(/^#\s+.+(?:\r?\n|$)/, "");
    const rendered = await remark().use(html).process(content);
    const resources = await getModuleResources(module);

    return {
      module,
      slug,
      title: links[currentIndex]?.title ?? slug,
      duration: source.match(/\*\*Duration:\*\*\s*(.+)/)?.[1] ?? "Self-paced",
      html: rewriteInternalLinks(rendered.toString().replace(/<h1>/g, "<h2>").replace(/<\/h1>/g, "</h2>"), module),
      resources,
      previous: currentIndex > 0 ? links[currentIndex - 1] : undefined,
      next: currentIndex >= 0 && currentIndex < links.length - 1 ? links[currentIndex + 1] : undefined,
    };
  } catch {
    return null;
  }
}
