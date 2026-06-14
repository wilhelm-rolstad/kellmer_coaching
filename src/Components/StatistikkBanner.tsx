import { useEffect, useRef, useState } from "react";

type StatItem = {
  value: number;
  suffix?: string;
  label: string;
};

const stats: StatItem[] = [
  { value: 12, label: "klienter coachet" },
  { value: 100, suffix: "%", label: "Fornøyde klienter" },
  { value: 3, suffix: "+", label: "År erfaring" },
  { value: 40, label: "Annen statistikk" },
];

function CountUpValue({
  value,
  suffix = "",
  duration = 2000,
  shouldAnimate,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  shouldAnimate: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [duration, shouldAnimate, value]);

  return (
    <h2 className="text-4xl">
      {displayValue}
      {suffix}
    </h2>
  );
}

export default function StatistikkBanner() {
  const divStyle = "px-4 flex flex-col items-center justify-center";
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || hasEnteredViewport) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRect.height > 1 && entry.intersectionRect.width > 1) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [hasEnteredViewport]);

  return (
    <section
      ref={sectionRef}
      className="relative left-1/2 mt-10 flex w-screen flex-wrap items-center justify-evenly gap-5 border-y border-(--color-border-cards) bg-(--color-navy-cards) py-5 text-white -translate-x-1/2"
    >
      {stats.map((stat) => (
        <div key={`${stat.label}-${stat.value}`} className={divStyle}>
          <CountUpValue
            value={stat.value}
            suffix={stat.suffix}
            shouldAnimate={hasEnteredViewport}
          />
          <p className="text-(--color-text-secondary)">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
