import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { getCurriculum } from "@/lib/lessons";
import ThemeToggle from "@/components/theme-toggle";

type ResourcePageProps = {
  params: Promise<{ module: string; kind: string; slug: string[] }>;
};

const resourceKinds = new Set(["exercises", "labs", "quizzes"]);

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { module, kind, slug } = await params;
  if (!resourceKinds.has(kind) || !/^[a-z0-9-]+$/.test(module) || slug.some((part) => !/^[a-z0-9-]+$/.test(part))) notFound();

  const sourcePath = path.join(process.cwd(), "..", "lessons", module, kind, `${slug.join("/")}.md`);
  let source: string;
  try {
    source = await fs.readFile(sourcePath, "utf8");
  } catch {
    notFound();
  }

  const parsed = matter(source);
  const content = parsed.content.replace(/^#\s+.+(?:\r?\n|$)/, "");
  const rendered = await remark().use(html).process(content);
  const renderedHtml = rendered.toString().replace(/<h1>/g, "<h2>").replace(/<\/h1>/g, "</h2>");
  const curriculum = await getCurriculum();
  const moduleInfo = curriculum.find((item) => item.id === module);
  const title = parsed.data.title ?? source.match(/^#\s+(.+)$/m)?.[1] ?? slug.at(-1)?.replace(/-/g, " ") ?? "Resource";

  return (
    <main className="lesson-shell">
      <header className="lesson-topbar"><Link className="brand" href="/">AI<span>/</span>INFRA <small>FIELD GUIDE</small></Link><div className="lesson-actions"><ThemeToggle /><Link className="back-link" href={`/lessons/${module}/${moduleInfo?.firstLesson ?? "01-introduction"}`}>← Back to lessons</Link></div></header>
      <div className="lesson-layout"><aside className="lesson-aside"><p className="eyebrow">{kind.slice(0, -1)}</p><p className="lesson-module">{moduleInfo?.title ?? module.replace(/^mod-\d+-/, "").replace(/-/g, " ")}</p><Link className="aside-home" href="/#curriculum">Curriculum map <span>↗</span></Link></aside><article className="lesson-article"><div className="lesson-meta"><span>{kind}</span><span>Practice guide</span></div><h1>{title}</h1><div className="markdown" dangerouslySetInnerHTML={{ __html: renderedHtml }} /></article></div>
    </main>
  );
}
