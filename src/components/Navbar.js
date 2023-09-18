import React from 'react'
import "./navstyles.css"


const Navbar = () => {
  return (
    <div  className='navbar'>
    <a className='logo' href='/'>Taza Khabar</a>
    <ul className='navbar-ul'>
        <li className='nav-item'><a href="#Business">Business</a></li>
        <li className='nav-item'><a href="#Entertainment">Entertainment</a></li>
        <li className='nav-item'><a href="#Health">Health</a></li>
        <li className='nav-item'><a href="#Technology">Technology</a></li>
        <li className='nav-item'><a href="#Sports">Sports</a></li>
        
    </ul>

      
    </div>
  )
}

export default Navbar
