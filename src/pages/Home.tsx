import { useState, useEffect } from "react";

type ProjectImage = { src: string; type: "full" | "phone"; small?: boolean; zoom?: boolean; aspect?: string; uncropped?: boolean };

const projects: {
  id: number;
  title: string;
  description: string;
  images: ProjectImage[];
  placeholderCount?: number;
  columns?: number;
  phoneContainerHeight?: string;
  phoneHeight?: string;
  confidential?: boolean;
}[] = [
  {
    id: 1,
    title: "Spotify Smart Search Filters",
    description:
      "As Spotify expanded it's content offerings, we needed a new way to enable users to more efficiently find content that fit whatever niche they might be seeking. In this code-first design project, I used Claude Code to define a new advanced filtering tool for Spotify Search.",
    images: [
      { src: "/images/filters1.png", type: "full", uncropped: true },
      { src: "/images/filters2.png", type: "full", uncropped: true },
    ],
  },
  {
    id: 2,
    title: "Spotify Agentic Search",
    description:
      "I co-lead the design of the future of agentic search within Spotify. This is a confidential project. A case can be made available upon request.",
    images: [{ src: "/images/confidential.png", type: "phone" }],
    phoneContainerHeight: "h-[520px]",
  },
  {
    id: 3,
    title: "Spotify Agent Conversation Analysis",
    description:
      "I led the design of an internal tool that allows Spotify teammates to better understand why and how external users converse with the new Spotify conversational DJ. I built this site with Claude Code using React and Typescript.",
    images: [{ src: "/images/convoanalysis.png", type: "full", uncropped: true }],
  },
  {
    id: 4,
    title: "Spotify Track Deduplication",
    description:
      "I led the design of a feature in the Spotify mobile app that aims to declutter search results by deduplicating similar recordings of a single song. I also led multiple rounds of user research to inform the designs.",
    images: [
      { src: "/images/duplication501.png", type: "phone" },
      { src: "/images/duplication502.png", type: "phone" },
    ],
    columns: 2,
  },
  {
    id: 5,
    title: "Spotify x Motorola Razr Cover Screen",
    description:
      "In 2024, Motorola planned to launch a larger Motorola Razr device. With that release, Spotify and Motorola partnered to deliver a new Spotify experience for the cover screen (the screen you see while the phone is folded closed). In this project, I led the design of the new UI that brought a new layout and new Spotify features to the cover screen like DJ mode and a new queue.",
    images: [{ src: "/images/razr.png", type: "phone" }],
  },
  {
    id: 6,
    title: "MyToast Mobile App",
    description:
      "I was the lead designer for the first version of Toast's first mobile app for iOS and Android called MyToast. The app enabled restaurant employees to get access to their paychecks earlier than normal. With help from the design system team and other visual designers, I designed almost the entire app - onboarding flows, withdrawal flows, paycheck visualizations, settings, legal disclaimers, and even app store marketing assets. Today, the app has 4.7 stars on the Apple App Store.",
    images: [
      { src: "/images/mytoast2.png", type: "phone" },
      { src: "/images/mytoast3.png", type: "phone" },
      { src: "/images/mytoast4.png", type: "phone" },
      { src: "/images/mytoast1.png", type: "phone" },
    ],
    columns: 2,
    phoneHeight: "h-[620px]",
  },
];

type View = "projects" | "about";

export default function Home() {
  const [view, setView] = useState<View>("projects");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxSrc(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("lightbox-open", !!lightboxSrc);
  }, [lightboxSrc]);

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
      <section className="max-w-[1180px] mx-auto px-8 pt-48 pb-24">
        <div className="flex items-start gap-16">
          {view === "projects" && (
            <p className="text-lg leading-relaxed text-gray-900 dark:text-white max-w-[500px] mr-auto">
              I'm Steven, a product designer with {new Date().getFullYear() - 2019} years of experience designing
              desktop and mobile apps. Currently, I'm helping to design the{" "}
              Spotify mobile app. Previously, I worked at{" "}
              <a href="https://pos.toasttab.com/?srsltid=AfmBOopu4InSUsLf1tRH0ZVGSpGD7Tb3BAysJlnO2_3v4gq98dTEPtJz" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff4c01] transition-colors duration-150">Toast</a>.
            </p>
          )}
          {view === "about" && (
            <div className="flex flex-col gap-5 text-gray-600 dark:text-gray-400 leading-relaxed max-w-[500px] mr-auto text-sm">
              <p>My name is Steven Bruno. I'm a digital product designer that grew up in Los Angeles, studied in Chicago, and am now living in Brooklyn.</p>
              <p>I originally studied Civil Engineering as I planned to pursue a career in Architecture. Along the way, I discovered my passion for digital product design, and I've pursued this design career ever since.</p>
              <p>Currently, I work with an incredibly talented team to help design and build the Spotify mobile app. I also am a lead course author and instructor for internal Spotify trainings like 'Advanced Prototyping in Figma' and 'Prototyping with Claude Code'. Previously, I worked at a restaurant technology company called Toast. You might see some of their hardware inside your favorite restaurants.</p>
              <p>Outside of work, I love to make music and spend as much time outside as possible.</p>
              <a href="https://www.linkedin.com/in/stevenjbruno/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:opacity-70 transition-opacity duration-150 font-medium">LinkedIn</a>
            </div>
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
            <div className="max-w-[1180px] mx-auto px-8 py-24">
              <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
                {/* Left: title + description — sticky on desktop */}
                <div className="shrink-0 md:w-1/3 md:sticky md:top-16">
                  <h2 className="font-bold text-sm mb-3">{project.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Right: images or gray placeholders */}
                <div className="flex-1 flex flex-col">
                  {(() => {
                    const items: (ProjectImage | null)[] =
                      project.images.length > 0
                        ? project.images
                        : Array.from({ length: project.placeholderCount ?? 2 }, () => null);

                    if (project.columns === 2) {
                      // Pair up images onto a shared gray background
                      const chunks: (ProjectImage | null)[][] = [];
                      for (let i = 0; i < items.length; i += 2) chunks.push(items.slice(i, i + 2));
                      return chunks.map((chunk, ci) => (
                        <div key={ci} className="rounded-2xl w-full flex flex-row items-center justify-center px-8 gap-6">
                          {chunk.map((img, ii) =>
                            img === null ? (
                              <div key={ii} className="flex-1" />
                            ) : (
                              <div key={ii} className="flex-1 flex items-center justify-center min-w-0 cursor-pointer" onClick={() => setLightboxSrc(img.src)}>
                                <img
                                  src={img.src}
                                  alt=""
                                  className={`${project.phoneHeight ?? "h-[666px]"} max-w-full object-contain${img.small ? " scale-[0.6]" : ""}`}
                                />
                              </div>
                            )
                          )}
                        </div>
                      ));
                    }

                    // Default: one image per row
                    const aspectClass = items.length === 1 ? "aspect-[16/10]" : "aspect-square";
                    return items.map((img, i) =>
                      img === null ? (
                        <div key={i} className={`bg-gray-100 dark:bg-gray-800 rounded-2xl w-full ${aspectClass}`} />
                      ) : img.type === "full" && img.uncropped ? (
                        <img key={i} src={img.src} alt="" className="w-full h-auto rounded-2xl cursor-pointer" style={{ maskImage: "linear-gradient(to bottom, black calc(100% - 8px), transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black calc(100% - 8px), transparent 100%)" }} onClick={() => setLightboxSrc(img.src)} />
                      ) : img.type === "full" ? (
                        <div key={i} className={`rounded-2xl overflow-hidden w-full ${img.aspect ?? aspectClass} cursor-pointer`} onClick={() => setLightboxSrc(img.src)}>
                          <img src={img.src} alt="" className={`w-full h-full object-cover${img.zoom ? " scale-[1.1]" : ""}`} />
                        </div>
                      ) : (
                        <div key={i} className={`rounded-2xl w-full ${project.phoneContainerHeight ?? "h-[666px]"} flex items-center justify-center p-8 cursor-pointer`} onClick={() => setLightboxSrc(img.src)}>
                          <img src={img.src} alt="" className={`${project.phoneHeight ?? "h-[666px]"} max-w-full object-contain${img.small ? " scale-[0.6]" : ""}`} />
                        </div>
                      )
                    );
                  })()}
                </div>
              </div>
            </div>
          </section>
        ))
      ) : null}

      {/* Lightbox overlay */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-8"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors text-3xl leading-none"
            onClick={() => setLightboxSrc(null)}
          >
            ✕
          </button>
          <img
            src={lightboxSrc}
            alt=""
            className="max-w-full max-h-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
