import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Smart Search Filters",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    imageCount: 2,
  },
  {
    id: 2,
    title: "Agentic Search",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    imageCount: 1,
  },
  {
    id: 3,
    title: "Agent Conversation Analysis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    imageCount: 2,
  },
  {
    id: 4,
    title: "Track Deduplication",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    imageCount: 3,
  },
  {
    id: 5,
    title: "Razr Cover Screen",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    imageCount: 2,
  },
  {
    id: 6,
    title: "MyToast",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    imageCount: 1,
  },
];

type View = "projects" | "about";

export default function Home() {
  const [view, setView] = useState<View>("projects");

  const navItemClass = (active: boolean) =>
    active
      ? "font-semibold text-xl text-gray-900 dark:text-white text-right transition-colors duration-150"
      : "font-semibold text-xl text-gray-300 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white text-right transition-colors duration-150";

  return (
    <div className="bg-white dark:bg-transparent min-h-screen">
      {/* Intro section — bio left, nav right */}
      <section className="max-w-5xl mx-auto px-8 py-24">
        <div className="flex items-start justify-between gap-16">
          <p className="text-lg leading-relaxed text-gray-900 dark:text-white max-w-[500px]">
            I'm Steven, a product designer with 7 years of experience designing
            desktop and mobile apps. Currently, I'm helping to design the{" "}
            Spotify mobile app. Previously, I worked at{" "}
            <a href="https://pos.toasttab.com/?srsltid=AfmBOopu4InSUsLf1tRH0ZVGSpGD7Tb3BAysJlnO2_3v4gq98dTEPtJz" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff4c01] transition-colors duration-150">Toast</a>.
          </p>

          <nav className="flex flex-col gap-1 shrink-0 text-right">
            <button onClick={() => setView("projects")} className={navItemClass(view === "projects")}>
              Projects
            </button>
            <button onClick={() => setView("about")} className={navItemClass(view === "about")}>
              About
            </button>
            <a href="https://soundcloud.com/sbruno636" target="_blank" rel="noopener noreferrer" className={navItemClass(false)}>
              Music
            </a>
          </nav>
        </div>
      </section>

      {/* Content area — swaps between projects and about */}
      {view === "projects" ? (
        projects.map((project) => (
          <section key={project.id} className="border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-5xl mx-auto px-8 py-20">
              <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
                {/* Left: title + description — sticky on desktop */}
                <div className="shrink-0 md:w-1/3 md:sticky md:top-16">
                  <h2 className="font-bold text-sm mb-3">{project.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Right: stacked image placeholders */}
                <div className="flex-1 flex flex-col gap-6">
                  {Array.from({ length: project.imageCount }).map((_, i) => (
                    <div
                      key={i}
                      className={`bg-gray-100 dark:bg-gray-800 rounded-2xl w-full ${
                        project.imageCount > 1 ? "aspect-square" : "aspect-[16/10]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))
      ) : (
        <section className="border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-5xl mx-auto px-8 py-20">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-[500px]">
              Coming soon.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
