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
    <div id='navigation'>
        <NavLink to="/" id='home-navlink' className='navlinks'>airbnb</NavLink>
        {isLoaded && <div style={{
          display: 'flex', 
          justifyContent: 'space-evenly', 
          position: 'relative', 
          bottom: '1.5vh',
          marginRight: '20vw',
          marginLeft: '20vw'}}>{sessionLinks}</div>}
    </div>
  );
};

export default Navigation;