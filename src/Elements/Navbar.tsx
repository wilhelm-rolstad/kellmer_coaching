import { useState } from "react";

const navLinks = [
  { href: "#transformasjoner", label: "Transformasjoner" },
  { href: "#hva-far-du", label: "Hva får du" },
  { href: "#om-jk-coaching", label: "Om JK Coaching" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <section className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-[rgb(19,19,54)] text-xs text-yellow-400">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-5 py-3 md:grid md:grid-cols-[auto_1fr_auto] md:px-10">
        <a href="#top" className="text-xl font-bold" onClick={closeMenu}>
          JK Coaching
        </a>

        <div className="hidden justify-center md:flex">
          <div className="flex items-center gap-10 text-(--color-text-secondary) lg:gap-20">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="cursor-pointer transition duration-300 hover:scale-105 active:scale-95"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <a
          href="#kontakt"
          className="hidden cursor-pointer rounded-lg border-2 border-yellow-400 px-3 py-1 text-yellow-400 transition duration-200 hover:scale-105 active:scale-95 md:block"
        >
          Ta Kontakt
        </a>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-md border border-yellow-400 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">Open menu</span>
          <div className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-yellow-400" />
            <span className="block h-0.5 w-5 bg-yellow-400" />
            <span className="block h-0.5 w-5 bg-yellow-400" />
          </div>
        </button>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-white/10 bg-[rgb(19,19,54)] px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-(--color-text-secondary)">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="cursor-pointer transition duration-300 hover:text-yellow-400"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}

            <a
              href="#kontakt"
              className="w-fit rounded-lg border-2 border-yellow-400 px-3 py-2 text-yellow-400 transition duration-200 hover:scale-105 active:scale-95"
              onClick={closeMenu}
            >
              Ta Kontakt
            </a>
          </div>
        </div>
      ) : null}
    </section>
  );
}
