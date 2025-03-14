import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className='toggle-button' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '<' : '>'}
      </button>
      <nav className='nav-links'>
        <Link to='/'>Home</Link>
        <Link to='/accounts'>Accounts</Link>
        <Link to='/maps'>Maps</Link>
        <div className='bottom-link'>
          <Link to='/settings'>Settings</Link>
        </div>
      </nav>
    </div>
  );
}
