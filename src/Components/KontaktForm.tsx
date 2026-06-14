import type { FormEvent } from 'react'
import { useState } from 'react'

const KontaktForm = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [statusMessage, setStatusMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const inputStyle="w-full border-2 bg-(--color-input-yellow) border-(--color-border-yellow) px-3 py-1 rounded-lg focus:outline-none"

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setStatusMessage("")
        setIsSubmitting(true)

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    phoneNumber,
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                setStatusMessage(result.error ?? "Kunne ikke sende skjemaet.")
                return
            }

            setStatusMessage("Skjema sendt. Du vil bli kontaktet snart.")
            setName("")
            setEmail("")
            setPhoneNumber("")
        } catch {
            setStatusMessage("Kunne ikke kontakte serveren.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return(
        <>
        <section className="bg-(--color-text-yellow) border-0 rounded-2xl text-lg text-(--color-navy-cards) p-5 flex flex-col gap-5">
            <div className="flex flex-col items-center md:items-start   ">
                <h1 className="text-2xl font-bold">Kontaktskjema</h1>
                <p className="text-sm">Klar for å starte? Fyll ut skjemaet under.</p>
            </div>
            <form className="flex flex-col items-center justify-center gap-5 w-full" onSubmit={handleSubmit}>
                    <input className={`${inputStyle}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Navn" required></input>
                    <input className={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Din epost adresse" type="email" required></input>
                    <input className={inputStyle} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Ditt mobilnummer" required></input>

                {/* ---------------------------------------*/}
                <button className="cursor-pointer bg-(--color-navy-cards) text-(--color-text-yellow) border px-3 py-1 rounded-3xl w-full hover:scale-105 active:scale-95 transition duration-300 disabled:cursor-not-allowed disabled:opacity-70 sm:w-[40%]" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sender..." : "Start nå"}
                </button>
                {statusMessage ? <p className="text-sm">{statusMessage}</p> : null}
                <p className="text-sm">Søknad er ikke forpliktende. Sender du søknad vil jeg ta kontakt slik at vi kan snakke om mål og forventninger.</p>
            </form>
        </section>
        </>
    )
}
export default KontaktForm;
