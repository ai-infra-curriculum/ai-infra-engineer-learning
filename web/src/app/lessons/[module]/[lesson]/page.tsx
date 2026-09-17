import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson } from "@/lib/lessons";
import ThemeToggle from "@/components/theme-toggle";

type LessonPageProps = {
  params: Promise<{ module: string; lesson: string }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { module, lesson: slug } = await params;
  const lesson = await getLesson(module, slug);

  if (!lesson) notFound();

  return (
    <main className="lesson-shell">
      <header className="lesson-topbar">
        <Link className="brand" href="/">AI<span>/</span>INFRA <small>FIELD GUIDE</small></Link>
        <div className="lesson-actions"><ThemeToggle /><Link className="back-link" href="/#curriculum">← Curriculum map</Link></div>
      </header>
      <div className="lesson-layout">
        <aside className="lesson-aside">
          <p className="eyebrow">Now learning</p>
          <p className="lesson-module">{module.replace("mod-", "Module ").replace(/-/g, " ")}</p>
          <div className="lesson-progress"><span style={{ width: "10%" }} /></div>
          <small>Lesson 01 of this module</small>
          <Link className="aside-home" href="/">Back to overview <span>↗</span></Link>
        </aside>
        <article className="lesson-article">
          <div className="lesson-meta"><span>{lesson.duration}</span><span>Reading guide</span></div>
          <h1>{lesson.title}</h1>
          <div className="markdown" dangerouslySetInnerHTML={{ __html: lesson.html }} />
          {lesson.resources.length > 0 && <section className="resource-panel"><p className="eyebrow">Practice this module</p><div className="resource-grid">{lesson.resources.map((resource) => <Link className={`resource-link ${resource.kind}`} href={resource.href} key={`${resource.kind}-${resource.slug}`}><span>{resource.kind.slice(0, -1)}</span><strong>{resource.title}</strong><b>↗</b></Link>)}</div></section>}
          <nav className="lesson-nav">
            {lesson.previous ? <Link href={`/lessons/${lesson.previous.module}/${lesson.previous.slug}`}>← {lesson.previous.title}</Link> : <span />}
            {lesson.next ? <Link className="next-lesson" href={`/lessons/${lesson.next.module}/${lesson.next.slug}`}>Next lesson <span>→</span></Link> : <Link className="next-lesson" href="/#curriculum">Back to curriculum <span>→</span></Link>}
          </nav>
        </article>
      </div>
    </main>
  );
}
