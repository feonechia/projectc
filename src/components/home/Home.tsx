import { NavLink, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styles from './home.module.css';
import { useContext } from "react";
import UserContext from "../../contexts/user/UserContext";
const Home: React.FC = () => {
  const user = useContext(UserContext);
  return (
    <div className={styles.container}>
      <NavLink to={"/signup"}  >
        <span>회원가입</span>
      </NavLink>
      <NavLink to={"/login"}  >
        <span>로그인</span>
      </NavLink>
    </div>
  )
}

export default Home