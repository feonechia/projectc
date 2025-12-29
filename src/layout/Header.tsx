import React, { useContext } from 'react'
import styles from './Layout.module.css';
import { NavLink } from 'react-router-dom';
import UserContext from '../contexts/user/UserContext';

const Header: React.FC = () => {
    const user = useContext(UserContext);
    return (
        <header className={styles.header}>
            <img src='/images/logo.png' style={{width:'30px'}} />
            <span className={styles.title}>Walley</span>
            {
                true ?
                    <span className={styles.profile}><NavLink to="/mypage">
                        <img src='/images/user.png' style={{width:'30px'}} />
                    </NavLink></span> : <></>
            }


        </header>
    )
}

export default Header