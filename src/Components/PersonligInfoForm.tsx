import { useState } from 'react'

const PersonligInfoForm = () => {
    const [step, setStep] = useState(1)
    const [selectedGoal, setSelectedGoal] = useState('')
    const [selectedAgeGroup, setSelectedAgeGroup] = useState('')
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
        console.log(selectedGoal + " " + selectedAgeGroup)
    }

  return (
    <section className=" flex flex-col gap-2 rounded-xl border-2 border-(--color-border-cards) bg-(--color-navy-cards) p-5 text-(--color-text-yellow) w-full">
      <h1 className="text-2xl">Optimal prestasjon</h1>
        <p className="absolute left-30 top-5">Step</p>
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
        </div>

        <div
          className={`absolute inset-0 transition-all duration-300 ${
            step === 3 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          <section className="flex flex-col gap-4 rounded-lg px-4 py-3">
            <input className={inputStyle} value={navn} placeholder="Navn" onChange={(e) => setNavn(e.target.value)}/>
            <input className={inputStyle}  value={epostAdresse} placeholder="Telefon nummer" onChange={(e) => setEpostAdresse(e.target.value)}/>
            <input className={inputStyle}  value={telefonNummer} placeholder="Epost adresse" onChange={(e) => setTelefonNummer(e.target.value)}/>
            <button onClick={() => checkForm()}className="cursor-pointer border-0 py-2 px-3 rounded-2xl bg-yellow-400 text-black w-[50%] mx-auto hover:scale-105 active:scale-95 transition duration-300">Start nå</button>
          </section>
        </div>
      </div>
      {step > 1 && (
        <button
            type="button"
            onClick={() => setStep((prev) => prev - 1)}
            className="cursor-pointer rounded-lg border px-4 py-2 text-sm w-[30%]">
            Tilbake
        </button>
        )}
    </section>
  )
}

export default PersonligInfoForm
