type AnmeldelseProps = {
  navn: string;
  beskrivelse: string;
  bilde1?: string;
  bilde2?: string;
}

export default function AnmeldelseWidget({
  navn,
  beskrivelse,
  bilde1,
  bilde2,
}: AnmeldelseProps) {
  const singleImageClassName = "aspect-[1/1] w-full rounded-lg object-cover";
  const splitImageClassName = "aspect-[5/6] w-full rounded-lg object-cover";

  return (
    <section className="flex h-full flex-col gap-2 rounded-xl border border-[var(--color-border-cards)] bg-[var(--color-navy-cards)] p-2">
      <div className="flex items-center justify-center gap-2">
        {bilde1 ? (
          <img
            alt={`${navn} resultat 1`}
            src={bilde1}
            className={bilde2 ? splitImageClassName : singleImageClassName}
          />
        ) : null}
        {bilde2 ? (
          <img
            alt={`${navn} resultat 2`}
            src={bilde2}
            className={splitImageClassName}
          />
        ) : null}
      </div>
      <section className="flex items-center gap-3">
        <div>                               
          <h2 className="text-lg">{navn}</h2>
          <p className="text-sm text-(--color-text-secondary)">
            {beskrivelse}
          </p>
        </div>
      </section>
    </section>
  );
}
