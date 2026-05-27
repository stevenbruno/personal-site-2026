import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Spotify Smart Search Filters",
    description:
      "In this code-first design project, I used Claude Code to define a new advanced filtering tool for Spotify Search. This is actively being tested.",
    imageCount: 2,
  },
  {
    id: 2,
    title: "Spotify Agentic Search",
    description:
      "I co-lead the design of the future of agentic search within Spotify. This is a confidential project.",
    imageCount: 1,
  },
  {
    id: 3,
    title: "Spotify Agent Conversation Analysis",
    description:
      "I led the design of an internal tool that allows Spotify teammates to better understand why and how external users converse with the new Spotify conversational DJ. This is a confidential project.",
    imageCount: 2,
  },
  {
    id: 4,
    title: "Spotify Track Deduplication",
    description:
      "I led the design and user research of a new feature on the Spotify mobile app that aims to declutter search results by deduplicating similar recordings of a single song. This project is actively being tested.",
    imageCount: 3,
  },
  {
    id: 5,
    title: "Spotify x Motorola Razr Cover Screen",
    description:
      "In 2024, Motorola planned to launch a larger Motorola Razr device. Spotify and Motorola partnered to deliver a new Spotify experience for the cover screen (the screen you see while the phone is folded closed). In this project, I led the design of the new UI that brought new Spotify features to the cover screen like DJ mode and an updated queue.",
    imageCount: 2,
  },
  {
    id: 6,
    title: "Toast MyToast Mobile App",
    description:
      "I was the lead designer for the first version of Toast's first mobile app for iOS and Android called MyToast. The app enabled restaurant employees to get access to their paychecks earlier than normal. With help from the design system team and other visual designers, I designed almost the entire app - onboarding flows, withdrawal flows, paycheck visualizations, settings, legal disclaimers, and even app store marketing assets. Today, the app has 4.7 stars on the Apple App Store.",
    imageCount: 1,
  },
];

type View = "projects" | "about";

export default function Home() {
  const [view, setView] = useState<View>("projects");

  const navItemClass = (active: boolean) =>
    active
      ? "font-semibold text-xl text-[#E8735A] dark:text-[#E8729A] text-right transition-colors duration-150"
      : "font-semibold text-xl text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white text-right transition-colors duration-150";

  const tabItemClass = (active: boolean) =>
    active
      ? "font-semibold text-sm text-[#E8735A] dark:text-[#E8729A] pb-3 border-b-2 border-[#E8735A] dark:border-[#E8729A] transition-colors duration-150"
      : "font-semibold text-sm text-gray-400 dark:text-gray-500 pb-3 border-b-2 border-transparent hover:text-gray-900 dark:hover:text-white transition-colors duration-150";

  return (
    <div className="bg-white dark:bg-transparent min-h-screen">

      {/* Mobile tab bar — visible on small screens only */}
      <nav className="md:hidden flex px-6 pt-6">
        <div className="flex gap-6">
          <button onClick={() => setView("projects")} className={tabItemClass(view === "projects")}>
            Projects
          </button>
          <button onClick={() => setView("about")} className={tabItemClass(view === "about")}>
            About
          </button>
          <a href="https://soundcloud.com/sbruno636" target="_blank" rel="noopener noreferrer" className={tabItemClass(false)}>
            Music
          </a>
        </div>
      </nav>

      {/* Intro section — bio left, nav right */}
      <section className="max-w-5xl mx-auto px-8 py-24">
        <div className="flex items-start gap-16">
          {view !== "about" && (
            <p className="text-lg leading-relaxed text-gray-900 dark:text-white max-w-[500px] mr-auto">
              I'm Steven, a product designer with {new Date().getFullYear() - 2019} years of experience designing
              desktop and mobile apps. Currently, I'm helping to design the{" "}
              Spotify mobile app. Previously, I worked at{" "}
              <a href="https://pos.toasttab.com/?srsltid=AfmBOopu4InSUsLf1tRH0ZVGSpGD7Tb3BAysJlnO2_3v4gq98dTEPtJz" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff4c01] transition-colors duration-150">Toast</a>.
            </p>
          )}

          {/* Desktop vertical nav — hidden on mobile */}
          <nav className="hidden md:flex flex-col gap-1 shrink-0 text-right ml-auto">
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
          <div className="max-w-5xl mx-auto px-8 py-20 flex justify-center">
            <div className="flex flex-col gap-5 text-gray-600 dark:text-gray-400 leading-relaxed max-w-[500px]">
              <p>
                My name is Steven Bruno. I'm a digital product designer that grew up in Los Angeles, studied in Chicago, and am now living in Brooklyn.
              </p>
              <p>
                I originally studied Civil Engineering as I planned to pursue a career in Architecture. Along the way, I discovered my passion for digital product design, and I've pursued this design career ever since.
              </p>
              <p>
                Currently, I work with an incredibly talented team to help design and build the Spotify mobile app. I also am a lead course author and instructor for internal Spotify trainings like 'Advanced Prototyping in Figma' and 'Prototyping with Claude Code'. Previously, I worked at a restaurant technology company called Toast. You might see some of their hardware inside your favorite restaurants.
              </p>
              <p>
                Outside of work, I love to make music and spend as much time outside as possible.
              </p>
              <a
                href="https://www.linkedin.com/in/stevenjbruno/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:opacity-70 transition-opacity duration-150 text-sm font-medium"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
