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
            backgroundColor: 'white',
            width: '16vw',
            position: 'absolute', 
            zIndex: '300',
            top: '6.5vh',
            left: '82vw',
            border: 'none',
            boxShadow: '0px 1px 10px -5px rgb(65 65 65)',
            borderRadius: '8px'
        }}>
            <ul style={{position: 'relative', right: '1.5vw', listStyle: 'none', lineHeight: '30px'}}>
              <li>{userName}</li>
              <li style={{borderBottom: '1px solid rgb(220, 220, 220)'}}>{email}</li>

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

              <div style={{borderTop: '1px solid rgb(220, 220, 220)'}}>
                <button id='logout-button' onClick={e => {
                  logout(e);

                  history.push('/');
                }}>
                  Log Out
                </button>
              </div>
            </ul>
        </div>
    )
};

export default ProfileMenu;