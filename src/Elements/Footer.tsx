export default function Footer() {
    const divStyle="cursor-pointer hover:scale-110 active:scale-90 transition duration-300"

  return (
    <footer className="mt-auto flex flex-col gap-4 items-center justify-center py-6 text-center bg- border-t text-yellow-400">
      <div className="flex gap-20 mt-10">
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

      <p className="text-sm text-(--color-text-secondary) mt-10">
  &copy; 2026 Kellmer Coaching. Alle rettigheter forbeholdt
</p>

<hr className="my-4 w-full border-0 border-t border-(--color-border-cards)" />

<p className="text-sm text-(--color-text-secondary)">
  Utviklet av <a href="https://wilhelmrolstad.no">wilhelmrolstad.no</a>
</p>
    </footer>
  )
}