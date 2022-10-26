import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './styles.css';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" className='navlinks'>Log In</NavLink>
        <NavLink to="/signup" className='navlinks'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul id='navigation'>
      <li>
        <NavLink to="/" id='home-navlink' className='navlinks'>airbnb</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
};

export default Navigation;