import { createContext } from "react";
import { UserItem } from "../../components/signup/userData";

interface UserDispatchContextProps {
    login:(user:UserItem)=>any;
    logout:()=>any;
}

const login = ()=>null;
const logout = ()=>null;

export default createContext<UserDispatchContextProps>({login, logout});