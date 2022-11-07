import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './styles.css';

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors([]);

      return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    };

    return setErrors(['Confirm Password field must be the same as the Password field']);
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

        <label>
          <input
            type="text"
            className="signup-form-inputs"
            value={firstName}
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            type="text"
            className="signup-form-inputs"
            value={lastName}
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            type="text"
            className="signup-form-inputs"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            type="text"
            className="signup-form-inputs"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            type="password"
            className="signup-form-inputs"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            type="password"
            className="signup-form-inputs"
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

      </form>

      <div style={{display: 'flex', justifyContent: 'center', marginTop: '5vh', marginBottom: '2vh'}}>
        <button type="submit" onClick={handleSubmit} className="signup-action-buttons">Sign Up</button>
      </div>

    </div>
  );
};

export default SignupFormPage;