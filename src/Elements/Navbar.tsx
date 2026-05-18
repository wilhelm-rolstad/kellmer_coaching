export default function Navbar() {
  return (
    <section className="fixed top-0 left-0 right-0 z-50 border-b bg-[rgb(19,19,54)] text-yellow-400">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-10 px-10 py-3">
        <a href="#top" className="text-xl font-bold">
          JK Coaching
        </a>

        <div className="mx-auto flex gap-20 text-(--color-text-secondary)">
          <a
            href="#transformasjoner"
            className="cursor-pointer transition duration-300 hover:scale-105 active:scale-95"
          >
            Transformasjoner
          </a>
          <a
            href="#hva-far-du"
            className="cursor-pointer transition duration-300 hover:scale-105 active:scale-95"
          >
            Hva får du
          </a>
          <a
            href="#om-jk-coaching"
            className="cursor-pointer transition duration-300 hover:scale-105 active:scale-95"
          >
            Om JK Coaching
          </a>
        </div>

        <a
          href="#kontakt"
          className="cursor-pointer rounded-lg border-2 border-yellow-400 px-3 py-1 text-yellow-400 transition duration-200 hover:scale-105 active:scale-95"
        >
          Ta Kontakt
        </a>
      </div>
    </section>
  );
}
