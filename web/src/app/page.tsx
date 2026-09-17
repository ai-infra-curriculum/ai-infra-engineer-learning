import Link from "next/link";
import { getCurriculum } from "@/lib/lessons";
import ThemeToggle from "@/components/theme-toggle";

export default async function Home() {
  const modules = await getCurriculum();
  const firstLesson = modules.find((module) => module.firstLesson);
  const totalLessons = modules.reduce((total, module) => total + module.lessons, 0);
  const pathModules = modules.slice(0, 4);

  return (
    <main className="shell">
      <nav className="topbar"><Link className="brand" href="/">AI<span>/</span>INFRA <small>FIELD GUIDE</small></Link><div className="toplinks"><a href="#curriculum">Curriculum</a><a href="#projects">Projects</a><ThemeToggle />{firstLesson && <Link className="nav-button" href={`/lessons/${firstLesson.id}/${firstLesson.firstLesson}`}>Start learning <span>↗</span></Link>}</div></nav>
      <section className="hero"><div className="hero-copy"><p className="eyebrow">A practical path into AI infrastructure</p><h1>Make the invisible<br /><em>infrastructure</em> visible.</h1><p className="lede">A guided, hands-on curriculum for building, shipping, and operating machine learning systems in the real world.</p><div className="hero-actions">{firstLesson && <Link className="primary-button" href={`/lessons/${firstLesson.id}/${firstLesson.firstLesson}`}>Begin with lesson 01 <span>→</span></Link>}<a className="text-link" href="#curriculum">Explore the map <span>↓</span></a></div></div><div className="signal-card" aria-label="Learning path overview"><div className="signal-header"><span>YOUR PATH</span><strong>01 — {String(modules.length).padStart(2, "2")}</strong></div><div className="path-line">{pathModules.map((module, index) => <span key={module.id} className="path-contents"><div className={`path-node ${index === 0 ? "active" : ""}`}>{String(index + 1).padStart(2, "0")}</div>{index < pathModules.length - 1 && <div className={`path-rail ${index === 0 ? "active" : ""}`} />}</span>)}</div><div className="signal-labels">{pathModules.map((module) => <span key={module.id}>{module.title}</span>)}</div><p>Start with the systems thinking behind every reliable ML platform.</p><div className="card-footer"><span>0% complete</span><span>{modules.length} modules</span></div></div></section>
      <section className="stats"><div><strong>{modules.length}</strong><span>modules</span></div><div><strong>{totalLessons}</strong><span>lessons</span></div><div><strong>03</strong><span>build projects</span></div><p>Read less. Build more.<br />Learn in the order it matters.</p></section>
      <section className="curriculum-section" id="curriculum"><div className="section-heading"><div><p className="eyebrow">The curriculum</p><h2>A map, not a maze.</h2></div><p>Each module moves from concept to command line to production pattern. Pick up where you are, and always know what comes next.</p></div><div className="module-grid">{modules.map((module, index) => <Link className={`module-card ${module.tone}`} href={module.firstLesson ? `/lessons/${module.id}/${module.firstLesson}` : "#curriculum"} key={module.id}><span className="module-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{module.title}</h3><p>{module.description}</p></div><footer><span>{module.lessons} lessons</span><span>↗</span></footer></Link>)}</div></section>
      <section className="project-strip" id="projects"><div><p className="eyebrow">The proving ground</p><h2>Concepts become<br /><em>systems.</em></h2></div><div className="project-copy"><p>Move from the reading into three guided builds: serve a model, orchestrate a pipeline, and deploy an LLM.</p>{firstLesson && <Link className="text-link" href={`/lessons/${firstLesson.id}/${firstLesson.firstLesson}`}>Open the learning path <span>→</span></Link>}</div></section>
      <footer className="site-footer"><span>AI/INFRA FIELD GUIDE</span><span>Built for curious infrastructure engineers.</span></footer>
    </main>
  );
}
