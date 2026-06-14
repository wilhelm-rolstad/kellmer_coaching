import { useState } from 'react'

const PersonligInfoForm = () => {
    const [step, setStep] = useState(1)
    const [selectedGoal, setSelectedGoal] = useState('')
    const [selectedAgeGroup, setSelectedAgeGroup] = useState('')
    const [statusMessage, setStatusMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const inputStyle="border-2 border-(--color-border-cards) py-2 px-3 rounded-lg w-full focus:outline-none focus:bg-white transition duration-300"

    const [navn, setNavn] = useState("")
    const [epostAdresse, setEpostAdresse] = useState("")
    const [telefonNummer, setTelefonNummer] = useState("")


    const goalOptions = [
        'Muskelvekst',
        'Fettnedgang',
        'Konkurrere i fitness',
        'Annet',
    ]

    const ageGroups = ['18-20', '20-25', '25-30', '30+']

    const handleGoalSelect = (goal: string) => {
        setSelectedGoal(goal)
        setTimeout(() => setStep(2), 250)
    }

    const handleAgeSelect = (age: string) => {
        setSelectedAgeGroup(age)
        setTimeout(() => setStep(3), 250)
    }

    const progressWidth = step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'

    async function checkForm(){
        setStatusMessage("")
        setIsSubmitting(true)

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: navn,
              email: epostAdresse,
              phoneNumber: telefonNummer,
              selectedGoal,
              selectedAgeGroup,
              source: "personlig-info-form",
            }),
          })

          const result = await response.json()

          if (!response.ok) {
            setStatusMessage(result.error ?? "Kunne ikke sende skjemaet.")
            return
          }

          setStatusMessage("Skjema sendt. Du vil bli kontaktet snart.")
          setNavn("")
          setEpostAdresse("")
          setTelefonNummer("")
          setSelectedGoal("")
          setSelectedAgeGroup("")
          setStep(1)
        } catch {
          setStatusMessage("Kunne ikke kontakte serveren.")
        } finally {
          setIsSubmitting(false)
        }
    }

  return (
    <section className=" flex flex-col gap-2 rounded-xl border-2 border-(--color-border-cards) bg-(--color-navy-cards) p-5 text-(--color-text-yellow) w-full">
      <h1 className="text-2xl">Optimal prestasjon</h1>
      <div className="relative w-full overflow-hidden">
        <span className="block h-2 w-full rounded bg-(--color-border-cards)" />
        <span
          className={`absolute left-0 top-0 block h-2 rounded bg-(--color-text-yellow) transition-all duration-300 ${progressWidth}`}
        />
      </div>

      <div className="relative min-h-60 overflow-hidden ">
        <div
          className={`absolute inset-0 flex flex-col gap-2 transition-all duration-300 ${
            step === 1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          {goalOptions.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => handleGoalSelect(goal)}
              className={`rounded-lg border px-4 py-3 text-left transition ${
                selectedGoal === goal
                  ? 'border-(--color-border-cards) bg-(--color-text-yellow) text-black'
                  : 'border-(--color-border-cards) bg-[rgb(22,23,50)] text-yellow-500'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>

        <div
          className={`absolute inset-0 flex flex-col gap-2 transition-all duration-300 ${
            step === 2
              ? 'translate-x-0 opacity-100'
              : step < 2
                ? 'translate-x-full opacity-0'
                : '-translate-x-full opacity-0'
          }`}
        >
          {ageGroups.map((age) => (
            <button
              key={age}
              type="button"
              onClick={() => handleAgeSelect(age)}
              className={`rounded-lg border px-4 py-3 text-left transition ${
                selectedAgeGroup === age
                 ? 'border-(--color-border-cards) bg-(--color-text-yellow) text-black'
                  : 'border-(--color-border-cards) bg-[rgb(22,23,50)] text-yellow-500'
              }`}
            >
              {age}
            </button>
          ))}
        </div>2

        <div
          className={`absolute inset-0 transition-all duration-300 ${
            step === 3 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          <section className="flex flex-col gap-4 rounded-lg px-4 py-3">
            <input className={inputStyle} value={navn} placeholder="Navn" onChange={(e) => setNavn(e.target.value)}/>
            <input className={inputStyle}  value={epostAdresse} placeholder="Epost adresse" type="email" onChange={(e) => setEpostAdresse(e.target.value)}/>
            <input className={inputStyle}  value={telefonNummer} placeholder="Telefon nummer" onChange={(e) => setTelefonNummer(e.target.value)}/>
            <button onClick={() => checkForm()} disabled={isSubmitting} className="cursor-pointer border-0 py-2 px-3 rounded-2xl bg-yellow-400 text-black w-full mx-auto hover:scale-105 active:scale-95 transition duration-300 disabled:cursor-not-allowed disabled:opacity-70 sm:w-[50%]">
              {isSubmitting ? "Sender..." : "Start nå"}
            </button>
            {statusMessage ? <p className="text-center text-sm text-(--color-text-yellow)">{statusMessage}</p> : null}
          </section>
        </div>
      </div>
      {step > 1 && (
        <button
            type="button"
            onClick={() => setStep((prev) => prev - 1)}
            className="cursor-pointer rounded-lg border px-4 py-2 text-sm w-full sm:w-[30%]">
            Tilbake
        </button>
        )}
    </section>
  )
}

export default PersonligInfoForm
