import KontaktForm from "./KontaktForm";

const stepNumberClassName =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--color-text-yellow)] bg-[var(--color-navy-cards)] text-2xl leading-none text-[var(--color-text-yellow)]";

export default function KontaktSeksjon() {
  return (
    <div id="kontakt" className="mx-auto flex scroll-mt-24 gap-10 text-white">
      <section className="flex w-[50%] flex-col gap-10">
        <h1 className="text-2xl text-white">Tre steg til suksess</h1>

        <div className="flex items-center gap-4">
          <div className={stepNumberClassName}>01</div>
          <div>
            <h3>Fyll ut søknaden</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Send søknad om du øsnker coaching er har spørsmål rundt
              prosessen.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={stepNumberClassName}>02</div>
          <div>
            <h3>Du blir kontaktet</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Jeg kontakter deg på Whatsapp innen 24 timer.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={stepNumberClassName}>03</div>
          <div>
            <h3>Veien fremover</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Vi har en samtale om hvordan vi går frem for å nå målene dine.
            </p>
          </div>
        </div>
      </section>

      <div className="w-[50%]">
        <KontaktForm />
      </div>
    </div>
  );
}
