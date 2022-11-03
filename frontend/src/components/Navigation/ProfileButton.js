import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

import './styles.css';

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div id='profile-button-container'>
      
        <button id={!showMenu ? 'profile-button' : 'hide-profile-button'}
        onClick={openMenu}>
      
        <i className="fas fa-user-circle" />
        {user.username}
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <NavLink to='/create-spot' className='navlinks'>Host your Home</NavLink>
          <br/>
          <NavLink to='/manage-listings' className='navlinks'>Manage your Listings</NavLink>
          <br/>
          <NavLink to='/manage-account' className='navlinks'>Manage your Account</NavLink>
          <li>
            <button id='logout-button' onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileButton;