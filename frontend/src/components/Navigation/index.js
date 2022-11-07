import React, { useEffect } from 'react';
import { useState} from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage'

import './styles.css';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);

  const [clickedLogin, setClickedLogin] = useState(false);
  const [clickedSignUp, setClickedSignUp] = useState(false);

  useEffect(() => {
    setClickedLogin(false);
    setClickedSignUp(false);
  }, [sessionUser]);

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <button className='navigation-buttons' onClick={() => {
          setClickedLogin(clicked => !clicked);
          setClickedSignUp(false);
        }} style={{marginRight: '5vw'}}>
          Log In
        </button>

        <div style={{
            visibility: clickedLogin === true ? 'visible' : 'hidden',

            display: 'flex',
            justifyContent: 'center',

            margin: 'auto',
            flexWrap: 'wrap',
            boxSizing: 'content-box',

            backgroundColor: 'white',
            border: '2px solid black',
            borderRadius: '8px',

            minWidth: '19vw',
            maxWidth: '19vw',
            position: 'fixed',

            top: '15vh',
            zIndex: '200',

            boxShadow: '0px 0px 3px 3px black'
          }}>

          <LoginFormPage />

        </div>

        <button className='navigation-buttons' onClick={() => {
          setClickedSignUp(clicked => !clicked);
          setClickedLogin(false);
        }} style={{marginLeft: '5vw'}}>
          Sign Up
        </button>

        <div style={{
            visibility: clickedSignUp === true ? 'visible' : 'hidden',

            display: 'flex',
            justifyContent: 'center',

            margin: 'auto',
            flexWrap: 'wrap',
            boxSizing: 'content-box',

            backgroundColor: 'white',
            border: '2px solid black',
            borderRadius: '8px',

            minWidth: '23vw',
            maxWidth: '23vw',
            position: 'fixed',

            top: '13vh',
            zIndex: '200',

            boxShadow: '0px 0px 3px 3px black'
          }}>

          <SignupFormPage />

        </div>
      </>
    );
  };

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