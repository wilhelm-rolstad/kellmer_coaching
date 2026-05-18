import { useEffect, useState } from "react";

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
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
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
  }, [duration, value]);

  return (
    <h2 className="text-4xl">
      {displayValue}
      {suffix}
    </h2>
  );
}

export default function StatistikkBanner() {
  const divStyle = "px-4 flex flex-col items-center justify-center";

  return (
    <section className="relative left-1/2 mt-10 flex w-screen -translate-x-1/2 items-center justify-evenly gap-5 bg-(--color-navy-cards) py-5 text-white border-y border-(--color-border-cards)">
      {stats.map((stat) => (
        <div key={`${stat.label}-${stat.value}`} className={divStyle}>
          <CountUpValue value={stat.value} suffix={stat.suffix} />
          <p className="text-(--color-text-secondary)">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
