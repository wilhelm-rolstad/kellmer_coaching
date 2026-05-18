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
  return (
    <section className="flex h-full flex-col gap-2 rounded-xl border border-[var(--color-border-cards)] bg-[var(--color-navy-cards)] p-2">
      <div className="flex items-center justify-center gap-2">
        {bilde1 ? (
          <img
            alt={`${navn} resultat 1`}
            src={bilde1}
            className="h-40 w-full rounded-lg object-cover"
          />
        ) : null}
        {bilde2 ? (
          <img
            alt={`${navn} resultat 2`}
            src={bilde2}
            className="h-40 w-full rounded-lg object-cover"
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
        <div className="ml-auto rounded-2xl bg-(--color-text-yellow) px-3 py-1 text-sm text-black">
          -10.0kg
        </div>
      </section>
    </section>
  );
}
