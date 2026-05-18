import { useEffect, useRef } from "react";
import AnmeldelseWidget from "./ResultaterWidget";
import kell from "../assets/bg_kell.png";

const anmeldelser = [
  {
    navn: "Herman K.",
    beskrivelse: "Vektnedgang 3 måneder",
    bilde1: kell,
    bilde2: kell,
  },
  {
    navn: "Henrik",
    beskrivelse: "Bedre struktur i hverdagen",
    bilde1: kell,
    bilde2: kell,
  },
  {
    navn: "Marius",
    beskrivelse: "Sterkere og lettere kropp",
    bilde1: kell,
    bilde2: kell,
  },
  {
    navn: "Sander",
    beskrivelse: "Ned 8 kg på 10 uker",
    bilde1: kell,
    bilde2: kell,
  },
  {
    navn: "Kristian",
    beskrivelse: "Bygget gode vaner",
    bilde1: kell,
    bilde2: kell,
  },
];

const loopedAnmeldelser = [...anmeldelser, ...anmeldelser, ...anmeldelser];

export default function Anmeldelser() {
  const scrollRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lastInteractionRef = useRef(0);

  useEffect(() => {
    const container = scrollRef.current;
    const track = trackRef.current;

    if (!container || !track) {
      return;
    }

    let frameId = 0;
    let previousTime = 0;
    const pauseAfterInteractionMs = 1200;
    const speed = 0.04;

    const getSegmentWidth = () => track.scrollWidth / 3;

    const normalizeScroll = () => {
      const segmentWidth = getSegmentWidth();

      if (segmentWidth <= 0) {
        return;
      }

      if (container.scrollLeft < segmentWidth * 0.5) {
        container.scrollLeft += segmentWidth;
      } else if (container.scrollLeft > segmentWidth * 1.5) {
        container.scrollLeft -= segmentWidth;
      }
    };

    container.scrollLeft = getSegmentWidth();

    const tick = (time: number) => {
      if (!previousTime) {
        previousTime = time;
      }

      const delta = time - previousTime;
      previousTime = time;

      const timeSinceInteraction = time - lastInteractionRef.current;

      if (timeSinceInteraction > pauseAfterInteractionMs) {
        container.scrollLeft += delta * speed;
        normalizeScroll();
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    const handleResize = () => {
      container.scrollLeft = getSegmentWidth();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="transformasjoner" className="mt-10 rounded scroll-mt-24 text-white">
    <div className="px-4">
        <h3 className="text-[var(--color-text-yellow)]">KLIENT TRANSFORMASJONER</h3>
        <h1 className="text-3xl">Resultater fra klienter</h1>
      </div>

      <section
        ref={scrollRef}
        className="anmeldelser-scroll mt-6 overflow-x-auto pb-4"
      >
        <div ref={trackRef} className="anmeldelser-track flex w-max gap-4 pr-4">
          {loopedAnmeldelser.map((anmeldelse, index) => (
            <div
              key={`${anmeldelse.navn}-${index}`}
              className="w-[85vw] shrink-0 sm:w-[calc(50vw-1rem)] lg:w-[calc((100vw-8rem)/3)] lg:max-w-[24rem]"
            >
              <AnmeldelseWidget {...anmeldelse} />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
