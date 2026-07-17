import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const combatRef = useRef(null);
  const locomotionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    gsap.fromTo(
      combatRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: combatRef.current,
          start: "top bottom-=100",
        },
      }
    );

    gsap.fromTo(
      locomotionRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: locomotionRef.current,
          start: "top bottom-=100",
        },
      }
    );
  }, []);

  return (
    <section id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">

          {/* Combat Framework */}
          <div ref={combatRef} className="first-project-wrapper">
            <div className="image-wrapper overflow-hidden rounded-2xl">
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/jVdFgeazs7E"
                title="Unreal Engine Combat Framework"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="text-content">
              <h2>Unreal Engine 5 Combat Framework</h2>

              <p className="text-white-50 md:text-xl">
                A production-oriented combat framework developed using Unreal
                Engine 5 with a hybrid C++ and Blueprint architecture. Features
                include the Gameplay Ability System (GAS), advanced enemy AI,
                combo attacks, hit reactions, weapon system, inventory
                integration, boss mechanics, animation notifies, gameplay tags,
                and a scalable architecture for RPG and action games.
              </p>

              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href="https://drive.google.com/drive/folders/1beLWylImVWHIqslvRkqGdWeR3txzQj2H?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold"
                >
                  Live Demo
                </a>

                <a
                  href="https://youtu.be/jVdFgeazs7E"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors text-white font-semibold"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Advanced Locomotion */}
          <div ref={locomotionRef} className="first-project-wrapper mt-20">
            <div className="image-wrapper overflow-hidden rounded-2xl">
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/-5hWA1WshgI"
                title="Advanced Locomotion System"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="text-content">
              <h2>
                Advanced Locomotion System
                <span className="ml-3 text-sm text-yellow-400">
                  • Work in Progress
                </span>
              </h2>

<p className="text-white-50 md:text-xl">
  A cinematic third-person traversal system built in Unreal Engine 5 using
  Blueprints and industry-standard animation plugins. Inspired by the movement
  mechanics of modern AAA action-adventure games, the project features fluid
  climbing, mantling, ledge traversal, obstacle vaulting, advanced animation
  layering, inverse kinematics (IK), and responsive character movement,
  delivering a seamless and immersive exploration experience.
</p>

              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href="https://youtu.be/-5hWA1WshgI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors text-white font-semibold"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AppShowcase;