export default function ProduktWidget(){
    return(<>
        <section id="hva-far-du" className="w-full scroll-mt-24 py-20 text-white md:px-0">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 rounded-xl bg-[var(--color-navy-cards)] p-5 md:p-8">
            <div className="w-full flex flex-col gap-2">
                <h3 className="text-lg text-[var(--color-text-yellow)]">HVA FÅR DU?</h3>
                <h1 className="text-2xl mb-5">Ett komplett system - ikke bare program</h1>
                <section className="flex flex-col gap-6 md:flex-row">
                    <div className="flex w-full flex-col gap-4 md:w-[50%]">
                        <p>Tett oppfølging og 24/7 tilgjengelig på chat</p>
                        <p>Ukentlig check-ins med grundig og målrettet feedback</p>
                        <p>Skreddersydd treningsprogram og matplan</p>
                        <p>Teknikk-feedback på video for all øvelser</p>
                        <p>All info samlet i én app - enkel å følge</p>

                        <div className="flex gap-2 items-center">
                            <button className="cursor-pointer rounded-2xl border bg-[var(--color-text-yellow)] px-4 py-1 text-black transition duration-300 hover:scale-105 active:scale-95"> <a
          href="#kontakt">
          Ta Kontakt
        </a></button> 
                            <p className="text-sm text-[var(--color-text-secondary)]">- Uforpliktende</p>
                        </div>
                    </div>

                    <div className="h-60 w-full rounded-xl border border-black bg-black p-5 md:w-[50%]">
                        Media
                    </div>
                </section>

            </div>
           
        </div>
        </section>
    </>)
}
