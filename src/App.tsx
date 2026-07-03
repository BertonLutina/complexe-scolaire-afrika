import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Programs from './components/sections/Programs'
import Stats from './components/sections/Stats'
import SchoolCalendar from './components/sections/SchoolCalendar'
import Fees from './components/sections/Fees'
import Uniform from './components/sections/Uniform'
import Gallery from './components/sections/Gallery'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-afrika-cream">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Programs />
        <SchoolCalendar />
        <Fees />
        <Uniform />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
