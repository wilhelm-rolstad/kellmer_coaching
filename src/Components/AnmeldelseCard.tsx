import {Star} from 'lucide-react'

type AnmeldelseProps = {
    navn: string;
    beskrivelse: string;
    stjerner: number;
}



export default function AnmeldelseCard({navn, beskrivelse, stjerner}:AnmeldelseProps){
    return(<>
    <section className="p-5 bg-(--color-navy-cards) rounded-xl w-[30%] ">
        <h2>{navn}</h2>
        <p className="text-(--color-text-secondary)">{beskrivelse}</p>
        

        <div className="flex">
            {Array.from({length: stjerner }).map((_, i) => (
                <Star key={i} className="fill-(--color-text-yellow) stroke-0"/>
            ))}
        </div>
    </section>
    </>)
}