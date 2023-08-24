import React, {useContext} from 'react'
import "./Header.css";
import {Link} from 'react-router-dom'
import { ThemeContext } from '../../contexts/ThemeContext';

function Header() {

  //create a variable to control darkmode
  //const darkMode = false;

  //create state to control darkmode
  // const [darkMode, setDarkMode] = React.useState(false)

  //change to use global state
  //NOTE {} NOT []
  const {darkMode, setDarkMode} = useContext(ThemeContext)

  return (
    <div className={darkMode?"header-container header-dark":"header-container"}>
        <div>
            <Link to="/" style={{marginRight:"10px"}}>Home</Link>
            <Link to="/about" style={{marginRight:"10px"}}>About</Link>
            <Link to="/episodes">Episodes</Link>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} 
        className={darkMode?"theme-button theme-button-dark":"theme-button"}>
          {
            darkMode?"Light Mode" : "Dark Mode"
          }
        </button>
    </div>
  )
}

export default Header