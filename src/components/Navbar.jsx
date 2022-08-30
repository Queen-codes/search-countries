import {useContext} from 'react'
import ThemeContext from './ThemeContext';

function Navbar(props) {
    const darktheme = useContext(ThemeContext);
    const toggler = darktheme ? 'bx bxs-moon' : 'bx bx-moon';
    
    const themeStyles = {
        backgroundColor: darktheme ? "hsl(207, 26%, 17%)" :  "hsl(0, 0%, 98%)",
        color: darktheme ? "hsl(0, 0%, 100%)" :  "hsl(200, 15%, 8%)",
        boxShadow: darktheme ? '0 4px 12px rgb(0 0 0 / 10%)' : '0 4px 12px rgb(0 0 0 / 10%)',
    }

  return (
        <nav style={themeStyles}>
            <h1>Where in the world</h1>
            <p onClick={props.toggleMode} className="toggler"><i className={toggler}></i>Dark Mode</p>
        </nav>
  )
}

export default Navbar

