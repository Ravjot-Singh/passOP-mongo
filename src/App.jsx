import './App.css'
import Navbar from "./components/navbar"
import Manager from './components/Manager'
import Footer from './components/footer'

function App() {
  


  return (
    <>

      <div className='w-full absolute top-0 z-[-2] overflow-x-hidden overflow-y-auto  bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
        <Navbar />
        <Manager />
        <Footer />
      </div>
       
    </>
  )
}

export default App
