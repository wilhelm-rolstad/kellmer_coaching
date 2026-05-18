import AnmeldelseWidget from "./AnmeldelseCard"

export default function Anmeldelser(){
    return(
        <>
            <section className="relative left-1/2 w-screen -translate-x-1/2 text-white flex flex-col items-center justify-center">
                <h3 className="text-lg text-(--color-text-yellow)">ANMELDELSER</h3>
                <h1 className="text-2xl">Hva sier klientene mine?</h1>

                <section className="flex gap-5 mt-5 justify-center max-w-7xl">
                    <AnmeldelseWidget
                    navn="Tollef G."
                    beskrivelse="Jeg har trent regelmessig i 3-4 år, og egentlig bare gått på trening som en rutine.
                    Tatt de samme vektene og øvelsene hver gang uten noe spesiell fremgang. Jørgen hjalp meg å få inn struktur og plan for framgang. 
                    Jeg er spesielt fornøyd med den gode oppfølgingen, der han virkelig pusher meg framover og får fram resultater. 
                    Appen fungerer også veldig fint på trening, der man lett kan se hvor mye man tok i hver øvelse forrige økt.
                    Det gjør det lettere å måle fremgang.
                    Anbefaler coachingen på det sterkeste!"
                    stjerner={5}/>

                    <AnmeldelseWidget
                    navn="Tollef G."
                    beskrivelse="Jeg har trent regelmessig i 3-4 år, og egentlig bare gått på trening som en rutine.
                    Tatt de samme vektene og øvelsene hver gang uten noe spesiell fremgang. Jørgen hjalp meg å få inn struktur og plan for framgang. 
                    Jeg er spesielt fornøyd med den gode oppfølgingen, der han virkelig pusher meg framover og får fram resultater. 
                    Appen fungerer også veldig fint på trening, der man lett kan se hvor mye man tok i hver øvelse forrige økt.
                    Det gjør det lettere å måle fremgang.
                    Anbefaler coachingen på det sterkeste!"
                    stjerner={5}/>

                    <AnmeldelseWidget
                    navn="Tollef G."
                    beskrivelse="Jeg har trent regelmessig i 3-4 år, og egentlig bare gått på trening som en rutine.
                    Tatt de samme vektene og øvelsene hver gang uten noe spesiell fremgang. Jørgen hjalp meg å få inn struktur og plan for framgang. 
                    Jeg er spesielt fornøyd med den gode oppfølgingen, der han virkelig pusher meg framover og får fram resultater. 
                    Appen fungerer også veldig fint på trening, der man lett kan se hvor mye man tok i hver øvelse forrige økt.
                    Det gjør det lettere å måle fremgang.
                    Anbefaler coachingen på det sterkeste!"
                    stjerner={5}/>
                </section>
            </section>
        </>
    )
}