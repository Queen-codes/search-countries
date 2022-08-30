import { useState } from 'react'
import Navbar from './components/Navbar'
import ThemeContext from "./components/ThemeContext"
import Countries from './components/Countries';
import Details from "./components/Details"
import {Routes, Route, BrowserRouter} from 'react-router-dom'

function App() {
  const [darktheme, setDarkTheme] = useState(false);
  
  function toggleMode() {
    document.body.style.backgroundColor = darktheme ? "hsl(0, 0%, 98%)" : "hsl(207, 26%, 17%)",
    document.body.style.color = darktheme ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
    setDarkTheme(prevTheme => !prevTheme)
  }

  return (
   
    <ThemeContext.Provider value={darktheme}>
      <BrowserRouter>
        <Navbar toggleMode={toggleMode}/>
         <Routes>
             <Route path='/' element={<Countries/>} />
              <Route path='/:capital' element={<Details/>} />
          </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App
