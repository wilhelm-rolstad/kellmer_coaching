import Stage from '../assets/stage.jpeg'

export default function OmMeg(){
    return(
        <>
        <section id="om-jk-coaching" className="flex scroll-mt-24 flex-col justify-center gap-10 text-white md:flex-row">
            <section className="w-full p-2 md:w-[50%]">
                <h1 className="text-lg md:text-3xl text-(--color-text-yellow)">Om JK-Coaching</h1>
                <p className="text-xs md:text-lg text-(--color-text-darker-yellow) mt-4">Denne coaching tjenesten er utviklet for deg som ønsker å nå målene dine uansett hva. 
                    <br/> 
                    <br/>
                    Jeg har mer enn 6 års treningserfaring, en Bachelor i psykologi, har coachet i 3+ år, og driver aktivt med bodybulding.
                    <br/>
                    <br/>
                    Gjennom erfaring og teoretisk kunnskap har jeg lært at det viktigste for å maksimere progresjon på fysikken din er: prestasjon på trening.
                    <br/>
                    <br/>
                    Denne coaching-tjenesten legger tung vekt på å forbedre faktorer som øker prestasjon på trening, og hvordan DU med DINE forutsetninger kan få det til.
                    <br/>
                    <br/>
                    Målet med coachingen er ikke bare å hjelpe deg å nå kortsiktige mål, men å gi deg all kunnskapen du trenger for å nå målene dine livet ut, både i trening og livet generelt.
                    
                </p>
            </section>

            <section className="w-full overflow-hidden rounded-2xl border-2 border-(--color-border-cards) md:w-[50%]">
                <img src={Stage}/>
            </section>
        </section>
        </>
    )
} 
