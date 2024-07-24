import Header from './components/home/Header'
import Hero from './components/home/Hero'
import Footer from './components/home/Footer'
import Navbar from './components/home/NavBar'

function Home() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col rounded-2xl">
        <Header />
        <Navbar />
        <Hero />
        <Footer />
      </div>
    </div>
  )
}

export default Home 
