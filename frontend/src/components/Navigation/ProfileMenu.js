import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileMenu = ({ userName, email }) => { 
    const dispatch = useDispatch();
    const history = useHistory();

    const [clicked, setClicked] = useState(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div 
        id='profile-menu-container'
        style={{
            visibility: clicked ? 'hidden' : 'visible',
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: 'white',
            width: '18vw',
            position: 'absolute', 
            zIndex: '300',
            top: '6vh',
            left: '58.5vw',
            border: 'none',
            boxShadow: '0px 1px 10px -5px rgb(65 65 65)',
            borderRadius: '8px'
        }}>
            <ul style={{listStyle: 'none', lineHeight: '30px'}}>
              <li>{userName}</li>
              <li>{email}</li>

              <button 
              className='profile-menu-buttons' 
              style={{marginTop: '2vh'}}
              onClick={e => {
                e.stopPropagation();
                setClicked(true);
                history.push('/create-spot');
              }}>
                Host your Home
              </button>

              <button 
              className='profile-menu-buttons'
              onClick={e => {
                e.stopPropagation();
                setClicked(true);
                history.push('/manage-listings')
              }}>
                Manage your Listings
              </button>

              <button 
              className='profile-menu-buttons'
              onClick={e => {
                e.stopPropagation();
                setClicked(true);
                history.push('/manage-account')
              }}>
                Manage your Account
              </button>

              <li>
                <button id='logout-button' onClick={e => {
                  logout(e);

                  history.push('/');
                }}>Log Out</button>
              </li>
            </ul>
        </div>
    )
};

export default ProfileMenu;