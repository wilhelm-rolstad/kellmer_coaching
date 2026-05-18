export default function ProduktWidget(){
    return(<>
        <section id="hva-far-du" className="relative left-1/2 w-screen -translate-x-1/2 scroll-mt-24 bg-[var(--color-navy-cards)] p-5 py-20 text-white">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-4">
            <div className="w-full flex flex-col gap-2">
                <h3 className="text-lg text-[var(--color-text-yellow)]">HVA FÅR DU?</h3>
                <h1 className="text-2xl mb-5">Ett komplett system - ikke bare program</h1>
                <section className="flex">
                    <div className="flex flex-col gap-4 w-[50%]">
                        <p>Tett oppfølging og 24/7 tilgjengelig på chat</p>
                        <p>Ukentlig check-ins med grundig og målrettet feedback</p>
                        <p>Skreddersydd treningsprogram og matplan</p>
                        <p>Teknikk-feedback på video for all øvelser</p>
                        <p>All info samlet i én app - enkel å følge</p>

                        <div className="flex gap-2 items-center">
                            <button className="cursor-pointer rounded-2xl border bg-[var(--color-text-yellow)] px-4 py-1 text-black transition duration-300 hover:scale-105 active:scale-95">Ta kontakt</button> 
                            <p className="text-sm text-[var(--color-text-secondary)]">- Uforpliktende</p>
                        </div>
                    </div>

                    <div className="border border-black p-5 bg-black h-60 rounded-xl w-[50%]">
                        Media
                    </div>
                </section>

            </div>
           
        </div>
        </section>
    </>)
}
