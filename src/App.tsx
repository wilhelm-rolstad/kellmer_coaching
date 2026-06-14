import Navbar from './Elements/Navbar'
import Footer from './Elements/Footer'
import Heropage from './Pages/Heropage'


function App() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="mx-auto flex min-h-screen w-full flex-col">
        <Navbar />
        <section className="mt-10 md:mt-20 flex flex-1 justify-center py-10">
          <div className="w-full max-w-7xl px-4 md:px-10">
            <Heropage />
          </div>
        </section>
        <Footer />
      </div>
    </main>
  )
}

export default App
