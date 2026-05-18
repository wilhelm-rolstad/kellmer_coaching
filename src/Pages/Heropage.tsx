import PersonligInfoForm from "../Components/PersonligInfoForm"
import bgKell from '../assets/bg_kell.png'
import Kellmer from '../assets/kellmer.png'
import Resultater from "../Components/Resultater"
import StatistikkBanner from "../Components/StatistikkBanner"
import ProduktWidget from "../Components/ProduktWidget"
import Anmeldelser from "../Components/Anmeldelser"
import KontaktSeksjon from "../Components/KontaktSeksjon"
import OmMeg from "../Components/OmMeg"

const Heropage = () => {
  return (

    
    <section id="top" className="flex flex-col gap-20">
        <div className="ml-2">
        <h1 className="text-5xl text-white ">JK Coaching</h1>
        <p className="text-lg text-(--color-text-yellow)"> undertekst </p>
        </div>
        <div className=" flex w-full gap-5">
            <PersonligInfoForm/>
            <section className="w-[80%] rounded-2xl bg-cover bg-center p-5 overflow-hidden"
            style={{ backgroundImage: `url(${bgKell})` }}>
               <img src={Kellmer} alt="Kellmer" className="translate-y-6"/>

            </section>
        </div>

        <StatistikkBanner/>

        <Resultater/>

        <ProduktWidget/>

        <Anmeldelser/>

        <KontaktSeksjon />

        <OmMeg/>
    </section>
  )
}

export default Heropage
