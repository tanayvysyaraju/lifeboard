import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import WelcomePage from "./pages/WelcomePage.jsx"
import FullScheduler from "./pages/fullscheduler.jsx"
import PersonalScheduler from "./pages/personalscheduler.jsx"
import FlexScheduler from "./pages/flexscheduler.jsx"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/fullscheduler" element={<FullScheduler />} />
        <Route path="/personalscheduler" element={<PersonalScheduler />} />
        <Route path="/flexscheduler" element={<FlexScheduler />} />
      </Routes>
    </div>
  )
}

export default App
