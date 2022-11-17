import React, { useEffect } from 'react';
import { useState} from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage'

import './styles.css';
import SearchBar from './SearchBar';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);

  const [clickedLogin, setClickedLogin] = useState(false);
  const [clickedSignUp, setClickedSignUp] = useState(false);
  const [clickedSearch, setClickedSearch] = useState(false);

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
        <button 
        className='navigation-buttons' 
        onClick={() => {
          setClickedLogin(clicked => !clicked);
          setClickedSignUp(false);
        }}>
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
            border: '1px solid rgb(220, 220, 200)',
            borderRadius: '8px',

            minWidth: '19vw',
            maxWidth: '19vw',
            position: 'fixed',

            top: '15vh',
            zIndex: '200',

            boxShadow: '0px 2px 15px -5px rgb(65 65 65)'
          }}>

          <LoginFormPage />


        </div>

        <button 
        className='navigation-buttons' 
        onClick={() => {
          setClickedSignUp(clicked => !clicked);
          setClickedLogin(false);
        }}>
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
            border: '1px solid rgb(220, 220, 200)',
            borderRadius: '8px',

            minWidth: '23vw',
            maxWidth: '23vw',
            position: 'fixed',

            top: '13vh',
            zIndex: '200',

            boxShadow: '0px 2px 15px -5px rgb(65 65 65)'
          }}>

            <SignupFormPage />

        </div>
      </>
    );
  };

  return (
    <div id='navigation'>
        <div onClick={() => setClickedSearch(false)}>
          <NavLink to="/" id='home-navlink' className='navlinks'>airbnb</NavLink>
        </div>

        { 
          isLoaded && 
          
          <div>
              <div 
              onClick={() => setClickedSearch(false)}
              style={{display: 'flex', justifyContent: 'flex-end'}}>
                {sessionLinks}
              </div>

              <div 
              onClick={() => setClickedSearch(true)}
              style={{
                display: 'flex', justifyContent: 'center', position: 'relative', bottom: '2.4vh'
              }}>
                <SearchBar clicked={clickedSearch} />
              </div>
          </div>
        }
    </div>
  );
};

export default Navigation;