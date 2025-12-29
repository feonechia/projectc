import { createContext, useReducer} from 'react';
import { UserItem } from "../../components/signup/userData";
import userReducer from './userReducer';
import UserContext from './UserContext';
import UserDispatchContext from './UserDispatchContext';

interface Props {
  children?:React.ReactNode;
}

const UserDispatchContextProvider: React.FC<Props> = ({children}) => {
   const [user, dispatch] = useReducer(userReducer, null);
   // 로그인 되었을 때 UserContext에 전송하여 리플레쉬 되기 전까지 로그인 정보 유지
   const login = (user:UserItem)=>{
      dispatch({type:'login', user});
   }

   // UserContext에서 로그인 정보 삭제
   const logout = ()=>{
      dispatch({type:'logout'});
   }

   return (
      <UserDispatchContext.Provider value={{login, logout}}>
         <UserContext.Provider value={user}>
            {children}
         </UserContext.Provider>
      </UserDispatchContext.Provider>
   )
}

export default UserDispatchContextProvider;