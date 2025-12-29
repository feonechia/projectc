import { createContext} from 'react';
import { UserItem } from "../../components/signup/userData";

export default createContext<UserItem | null>(null);