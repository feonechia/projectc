import React, { useContext } from 'react'
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import styles from './Layout.module.css';
import UserContext from '../contexts/user/UserContext';
import { NavLink } from 'react-router-dom';
interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
     const user = useContext(UserContext);
    return (
        <div>
            <Header />
            <div className={styles.page}>
                      <div className={styles.utils}>
      {/* 사용자 정보가 있을 경우 마이페이지 출력 아니면 로그인, 회원가입 출력 */}
      {true ?
     <Sidebar />
        :
        <>

        </>}
      </div>

                
                <main>{children}</main>
            </div>
        </div>
    )
}

export default Layout