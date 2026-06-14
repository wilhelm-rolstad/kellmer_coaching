import { useEffect, useRef } from "react";
import AnmeldelseWidget from "./ResultaterWidget";
import Ravn from "../assets/Ravn.jpeg";
import Stefan from "../assets/Stefan.jpeg";
import Magnus from "../assets/Magnus.jpeg";
import Vetle from "../assets/Vetle.jpeg";
import Tollef from "../assets/Tollef.jpeg";

const anmeldelser = [
  {
    navn: "Ravn",
    beskrivelse: "Vektnedgang 3 måneder",
    bilde1: Ravn,
  },
  {
    navn: "Stefan",
    beskrivelse: "Bedre struktur i hverdagen",
    bilde1: Stefan,
  },
  {
    navn: "Tollef",
    beskrivelse: "Sterkere og lettere kropp",
    bilde1: Tollef,
  },
  {
    navn: "Magnus",
    beskrivelse: "Ned 8 kg på 10 uker",
    bilde1: Magnus,
  },
  {
    navn: "Vetle",
    beskrivelse: "Bygget gode vaner",
    bilde1: Vetle,
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
    let currentScrollPosition = 0;
    let isAutoScrolling = false;
    const pauseAfterInteractionMs = 1200;
    const speed = 0.08;

    const getSegmentWidth = () => track.scrollWidth / 3;
    const setInitialScroll = () => {
      const segmentWidth = getSegmentWidth();

      if (segmentWidth > 0) {
        currentScrollPosition = segmentWidth;
        container.scrollLeft = currentScrollPosition;
      }
    };

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

    const syncAfterLayout = () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setInitialScroll();
        });
      });
    };

    syncAfterLayout();

    const tick = (time: number) => {
      if (!previousTime) {
        previousTime = time;
      }

      const delta = time - previousTime;
      previousTime = time;

      const timeSinceInteraction = time - lastInteractionRef.current;
      const segmentWidth = getSegmentWidth();

      if (segmentWidth > 0 && timeSinceInteraction > pauseAfterInteractionMs) {
        currentScrollPosition += delta * speed;
        isAutoScrolling = true;
        container.scrollLeft = currentScrollPosition;
        normalizeScroll();
        currentScrollPosition = container.scrollLeft;
        isAutoScrolling = false;
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    const handleInteraction = () => {
      lastInteractionRef.current = performance.now();
      currentScrollPosition = container.scrollLeft;
    };

    const handleScroll = () => {
      if (!isAutoScrolling) {
        currentScrollPosition = container.scrollLeft;
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      syncAfterLayout();
    });

    resizeObserver.observe(container);
    resizeObserver.observe(track);
    Array.from(track.querySelectorAll("img")).forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", syncAfterLayout, { once: true });
      }
    });
    container.addEventListener("touchstart", handleInteraction, { passive: true });
    container.addEventListener("pointerdown", handleInteraction);
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      container.removeEventListener("touchstart", handleInteraction);
      container.removeEventListener("pointerdown", handleInteraction);
      container.removeEventListener("scroll", handleScroll);
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
        className="anmeldelser-scroll mt-6 overflow-x-auto px-4 pb-4"
      >
        <div ref={trackRef} className="anmeldelser-track flex w-max gap-4 pr-4">
          {loopedAnmeldelser.map((anmeldelse, index) => (
            <div
              key={`${anmeldelse.navn}-${index}`}
              className="w-[56vw] shrink-0 sm:w-[16rem] lg:w-[20rem]"
            >
              <AnmeldelseWidget {...anmeldelse} />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
