import { useEffect, useRef } from "react";
import AnmeldelseWidget from "./AnmeldelseCard"

const anmeldelser = [
    {
        navn: "Ravn",
        beskrivelse: `Jørgen er en kar som ikke bare sier hva du skal gjøre 
        men lærer deg hvordan fordi han genuint bryr seg. 
        Han stiller krav men er også første til å erkjenne hardt arbeid, 
        og resultatene han og sine kunder får snakker for seg selv. 
        Er veldig fornøyd med Jørgen som coach og hadde valgt han 
        igjen uansett hva jeg skulle ønsket å gjøre `,
        stjerner: 5,
    },
    {
        navn: "Sindre",
        beskrivelse: `Hatt Jørgen som coach i cirka 6 måneder nå og kunne 
        ikke vært mer fornøyd. Hadde en veldig god start og lærte mye nytt 
        angående kosthold og trening selv om jeg har trent i nærmere 2 år. 
        Har slitt mye med sykdom en god periode nå, men Jørgen har hjulpet
        mye med å tilpasse både trening og matplanen for å få best mulig 
        resultat selv om jeg har mye plager. Vil anbefale på det sterkeste 
        om du vil ta treningen din til neste nivå!`,
        stjerner: 5,
    },
    {
        navn: "Tollef",
        beskrivelse: `Jeg har trent regelmessig i 3-4 år, og egentlig bare gått på trening som en rutine.
        Tatt de samme vektene og øvelsene hver gang uten noe spesiell fremgang. Jørgen hjalp meg å få inn struktur og plan for framgang. 
        Jeg er spesielt fornøyd med den gode oppfølgingen, der han virkelig pusher meg framover og får fram resultater. 
        Appen fungerer også veldig fint på trening, der man lett kan se hvor mye man tok i hver øvelse forrige økt.
        Det gjør det lettere å måle fremgang.
        Anbefaler coachingen på det sterkeste!`,
        stjerner: 5,
    },
    {
        navn: "Tobias",
        beskrivelse: `Jeg brukte mye tid på å finne riktig coach, 
        og valget av Jørgen Kellmer har vært noe av det beste jeg har gjort. 
        Fra første stund merket jeg hvor kunnskapsrik, seriøs og engasjert han er. 
        Han følger opp på en utrolig god måte og får deg til å føle at han faktisk 
        bryr seg om utviklingen din, ikke bare resultatene på papiret. 
        Det som gjør Jørgen unik er hvor flink han er til å forklare ting enkelt og forståelig, 
        samtidig som alt han gjør er gjennomtenkt og basert på erfaring og kunnskap. 
        Jeg føler ikke bare at jeg blir bedre fysisk, men at jeg også lærer utrolig mye underveis. 
        Han vet når han skal pushe deg, når han skal motivere deg, og hvordan han skal få frem det 
        beste i deg. 
        For meg er Jørgen uten tvil en av de beste coachene i Norge. Jeg angrer ikke et sekund på valget mitt, 
        og jeg gleder meg til å fortsette utviklingen sammen med ham. Hvis du vil ha en coach som virkelig bryr 
        seg og vet hva han driver med, så kan jeg ikke anbefale Jørgen nok.`,
        stjerner: 5,
    },
    {
        navn: "Magnus",
        beskrivelse: `Strukturert og dedikert coach, som ønsker å se kunden vinne. Faglig dyktig både innen trening og prestasjon, og psykologi. 
        Dette er verdt hver eneste krone. 
        Grundig feedback, gode forklaringer og lærerikt. Helhetlig en veldig dyktig coach`,
        stjerner: 5,
    },
]

const loopedAnmeldelser = [...anmeldelser, ...anmeldelser, ...anmeldelser];

export default function Anmeldelser(){
    const scrollRef = useRef<HTMLElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const lastInteractionRef = useRef(0);

    useEffect(() => {
        const container = scrollRef.current;
        const track = trackRef.current;

        if (!container || !track) {
            return;
        }

        let frameId = 0;
        let previousTime = 0;
        let currentScrollPosition = 0;
        let isAutoScrolling = false;
        const pauseAfterInteractionMs = 1200;
        const speed = 0.08;

        const getSegmentWidth = () => track.scrollWidth / 3;
        const setInitialScroll = () => {
            const segmentWidth = getSegmentWidth();

            if (segmentWidth > 0) {
                currentScrollPosition = segmentWidth;
                container.scrollLeft = currentScrollPosition;
            }
        };

        const normalizeScroll = () => {
            const segmentWidth = getSegmentWidth();

            if (segmentWidth <= 0) {
                return;
            }

            if (container.scrollLeft < segmentWidth * 0.5) {
                container.scrollLeft += segmentWidth;
            } else if (container.scrollLeft > segmentWidth * 1.5) {
                container.scrollLeft -= segmentWidth;
            }
        };

        const syncAfterLayout = () => {
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    setInitialScroll();
                });
            });
        };

        syncAfterLayout();

        const tick = (time: number) => {
            if (!previousTime) {
                previousTime = time;
            }

            const delta = time - previousTime;
            previousTime = time;

            const timeSinceInteraction = time - lastInteractionRef.current;
            const segmentWidth = getSegmentWidth();

            if (segmentWidth > 0 && timeSinceInteraction > pauseAfterInteractionMs) {
                currentScrollPosition += delta * speed;
                isAutoScrolling = true;
                container.scrollLeft = currentScrollPosition;
                normalizeScroll();
                currentScrollPosition = container.scrollLeft;
                isAutoScrolling = false;
            }

            frameId = window.requestAnimationFrame(tick);
        };

        frameId = window.requestAnimationFrame(tick);

        const handleInteraction = () => {
            lastInteractionRef.current = performance.now();
            currentScrollPosition = container.scrollLeft;
        };

        const handleScroll = () => {
            if (!isAutoScrolling) {
                currentScrollPosition = container.scrollLeft;
            }
        };

        const resizeObserver = new ResizeObserver(() => {
            syncAfterLayout();
        });

        resizeObserver.observe(container);
        resizeObserver.observe(track);
        Array.from(track.querySelectorAll("img")).forEach((image) => {
            if (!image.complete) {
                image.addEventListener("load", syncAfterLayout, { once: true });
            }
        });
        container.addEventListener("touchstart", handleInteraction, { passive: true });
        container.addEventListener("pointerdown", handleInteraction);
        container.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.cancelAnimationFrame(frameId);
            resizeObserver.disconnect();
            container.removeEventListener("touchstart", handleInteraction);
            container.removeEventListener("pointerdown", handleInteraction);
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return(
        <>
            <section className="flex w-full flex-col items-center justify-center text-white">
                <h3 className="text-lg text-(--color-text-yellow)">ANMELDELSER</h3>
                <h1 className="text-2xl">Hva sier klientene mine?</h1>

                <section ref={scrollRef} className="anmeldelser-scroll mt-5 w-full overflow-x-auto px-4 pb-4">
                    <div ref={trackRef} className="anmeldelser-track flex w-max gap-4 pr-4">
                        {loopedAnmeldelser.map((anmeldelse, index) => (
                            <div
                                key={`${anmeldelse.navn}-${index}`}
                                className="w-[56vw] shrink-0 sm:w-[16rem] lg:w-[20rem]"
                            >
                                <AnmeldelseWidget
                                    navn={anmeldelse.navn}
                                    beskrivelse={anmeldelse.beskrivelse}
                                    stjerner={anmeldelse.stjerner}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </section>
        </>
    )
}
