import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const ProfileMenu = ({ showMenu, userName, email }) => { 
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div 
        id='profile-menu-container'
        style={{
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

              <button className='profile-menu-buttons' style={{marginTop: '2vh'}}>
                <NavLink to='/create-spot' className='navlinks'>Host your Home</NavLink>
              </button>

              <button className='profile-menu-buttons'>
                <NavLink to='/manage-listings' className='navlinks'>Manage your Listings</NavLink>
              </button>

              <button className='profile-menu-buttons'>
                <NavLink to='/manage-account' className='navlinks'>Manage your Account</NavLink>
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