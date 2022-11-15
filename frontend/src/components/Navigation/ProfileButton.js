import { useState, useEffect } from "react";

import './styles.css';
import ProfileMenu from "./ProfileMenu";

const ProfileButton = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;

    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div id='profile-button-container' style={{fontWeight: 'bold'}}>
      <button 
      id={'profile-button'}
      onClick={openMenu}
      style={{
        border: '1px solid rgb(220, 220, 220)',
        backgroundColor: 'white',
        minWidth: '5vw',
        minHeight: '5vh',
        borderRadius: '24px',
        position: 'relative',
        top: '3vh',
        right: '1vw',
        zIndex: '600',
        cursor: 'pointer'
      }}>

        <div 
        style={{
          position: 'relative',
          bottom: '0.1px',
          left: '2.4vw',
          paddingTop: '6px',
          border: 'none', 
          borderRadius: '24px', 
          fontFamily: 'Montserrat', 
          fontWeight: 'bold',
          color: 'white', 
          backgroundColor: '#FF385C',
          maxWidth: '2vw',
          minHeight: '3.2vh',
        }}>
          {user.firstName[0].concat(user.lastName[0])}
        </div>
      </button>
      
      {
        showMenu && 
          
        <ProfileMenu showMenu={showMenu} userName={user.username} email={user.email} />
      }

    </div>
  );
};

export default ProfileButton;