import About from './components/About.jsx'
import Hero from './components/Hero.jsx'
import Navbar from './components/Navbar.jsx'
import FloatingImage from './components/Story.jsx'
import Contact from './components/Contact.jsx'
import SpidermanFooter from './components/Spidermanfooter.jsx'
 
const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <FloatingImage />
      <Contact />
      <SpidermanFooter />
    </main>
  )
}
 
export default App