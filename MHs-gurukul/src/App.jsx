import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import Features from './Pages/Features'
import Footer from './Pages/Footer'
// import YouTubePage from './Videos.jsx'
import VideoCard from './VideoCard.jsx'
// import { LogIn } from 'lucide-react'
// import Login from './Pages/Login.jsx'
import Signup from './Pages/Singup.jsx'
import Notes from './Notes.jsx'
import Video from './Videos.jsx'
import Auth from "./Auth/Auth.jsx"
import  History  from './Admins/History.jsx'
// import NOtesqq from "./NOtesq.jsx"
import QuizMain from "./Quiz/QuizMain.jsx"
import Login from './Auth/Login.jsx'

function App() {
  return (
    <div className='bg-gradient-to-br from-blue-200 to-purple-100'>
      <Navbar/>
      <Auth/>
      <Login/>
      {/* <QuizMain/> */}
      {/* // <QuizMain/> */}
      {/* <History/> */}
      {/* <Login/> */}
      {/* <Signup/> */}
      <HeroSection/>
      {/* <NOtesqq/> */}
      {/* <Notes/> */}
<Features/>
{/* <VideoCard/> */}
<Video/>
<Footer/>
{/* <YouTubePage/> */}
    </div>
  )
}

export default App