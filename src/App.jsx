
import { Features } from 'tailwindcss'
import About from './components/About.jsx'
import Hero from './components/Hero.jsx'
import Navbar from './components/Navbar.jsx'
import FloatingImage from './components/Story.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import SpidermanBanner from './components/AnimatedSpiderman.jsx'
const App = () => {

  return (
  <main className =" relative min-h-screen w-screen overflow-x-hidden">
   <Navbar/>
   <Hero/>
   <About/>
   <FloatingImage/>
   <Contact/>
   <SpidermanBanner/>
   <Footer/>


 
  </main>
  )
}

export default App