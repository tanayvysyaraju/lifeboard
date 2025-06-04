import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import WelcomePage from "./pages/WelcomePage.jsx"
import CalendarPage from "./pages/CalendarPage.jsx"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/CalendarPage" element={<CalendarPage />} />
      </Routes>
    </div>
  )
}

export default App
