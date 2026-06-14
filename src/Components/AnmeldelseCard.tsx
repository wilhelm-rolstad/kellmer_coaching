import { Star } from 'lucide-react'

type AnmeldelseProps = {
    navn: string;
    beskrivelse: string;
    stjerner: number;
}



export default function AnmeldelseCard({navn, beskrivelse, stjerner}:AnmeldelseProps){
    return(<>
    <section className="flex h-[15rem] w-full flex-col rounded-xl bg-(--color-navy-cards) p-4 sm:h-[16rem]">
        <h2 className="text-xl text-white">{navn}</h2>
        <div className="mt-2 min-h-0 flex-1 overflow-y-auto pr-2 text-sm text-(--color-text-secondary)">
            <p>{beskrivelse}</p>
        </div>

        <div className="mt-3 flex">
            {Array.from({length: stjerner }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-(--color-text-yellow) stroke-0"/>
            ))}
        </div>
    </section>
    </>)
}
