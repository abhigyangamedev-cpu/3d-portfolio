import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import TitleHeader from "../components/TitleHeader";
import { fpsProject, warriorProject } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    gsap.utils.toArray(".project-highlights").forEach((grid) => {
      gsap.fromTo(
        grid.querySelectorAll(".project-highlight"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: grid, start: "top bottom-=100" },
        }
      );
    });
  }, []);

  return (
    <section id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <TitleHeader title="Featured Projects" sub="🎮 Project Showcase" />

        <div className="mt-16 flex flex-col gap-32">
          {[fpsProject, warriorProject].map((project) => (
            <ProjectShowcase key={project.videoId} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectShowcase = ({ project }) => {
  const { title, videoId, summary, stats, highlights, tags } = project;

  return (
    <div className="flex flex-col gap-12">
      {/* Gameplay video */}
      <div className="card-border rounded-2xl overflow-hidden aspect-video w-full">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* Title, summary and tech tags */}
      <div className="flex flex-col gap-5">
        <h2 className="font-semibold md:text-4xl text-2xl">{title}</h2>
        <p className="text-white-50 md:text-xl max-w-4xl">{summary}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-black-200 text-white-50 rounded-full px-4 py-1 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Key numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ value, label }) => (
          <div key={label} className="card-border rounded-xl p-6">
            <p className="md:text-4xl text-3xl font-bold">{value}</p>
            <p className="text-white-50 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* C++ architecture highlights */}
      <div className="project-highlights grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {highlights.map(({ title, desc }) => (
          <div
            key={title}
            className="project-highlight card-border rounded-xl p-8 flex flex-col gap-3"
          >
            <h3 className="text-white text-xl font-semibold">{title}</h3>
            <p className="text-white-50">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppShowcase;
