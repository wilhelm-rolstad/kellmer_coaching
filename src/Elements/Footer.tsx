export default function Footer() {
    const divStyle="cursor-pointer hover:scale-110 active:scale-90 transition duration-300"

  return (
    <footer className="mt-auto flex flex-col gap-2 items-center justify-center py-6 text-center bg- border-t text-yellow-400">
      <div className="mt-4 md:mt-10 flex flex-row items-center justify-center gap-6 md:gap-20 w-full">
        <div className={divStyle}>
          <a href="https://www.instagram.com/jrgen.ulland/"> Instagram</a>
        </div>

        <div className={divStyle}>
          <a href="https://www.tiktok.com/@jorgen.kellmer">  Tiktok</a>
        </div>

        <div className={divStyle}>
          <a href="https://www.youtube.com/@jrgenkellmer1106">Youtube</a>
        </div>
      </div>

      <p className="text-sm text-(--color-text-secondary) mt-4">
  &copy; 2026 Kellmer Coaching. Alle rettigheter forbeholdt
</p>

<hr className="my-4 w-full border-0 border-t border-(--color-border-cards)" />

<p className="text-xs text-(--color-text-secondary)">
  Utviklet av <a href="https://wilhelmrolstad.no">wilhelmrolstad.no</a>
</p>
    </footer>
  )
}
