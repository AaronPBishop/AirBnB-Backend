import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './styles.css';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.fetchUser({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div>

        {
          errors.length > 0 && 

          <ul style={{
          fontWeight: 'Bold',
          textAlign: 'left', 
          position: 'relative', 
          listStyle: 'none',
          marginBottom: '15vh',
          width: 'inherit'}}>

            {errors.map((error, idx) => <li key={idx} style={{position: 'absolute'}}>{error}</li>)}

          </ul>
        }

      <form onSubmit={handleSubmit}>

        <label className='login-inputs'>
          <input
            type="text"
            className="login-form-inputs"
            value={credential}
            placeholder='Username or Email'
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>

        <label className='login-inputs'>
          <input
            type="password"
            className="login-form-inputs"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
  
      </form>

      <div style={{display: 'flex', justifyContent: 'center', marginTop: '4vh', marginBottom: '3vh'}}>
        <button type="submit" onClick={handleSubmit} className="signup-action-buttons">Log In</button>
      </div>
    </div>
  );
};

export default LoginFormPage;