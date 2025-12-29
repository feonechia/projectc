import { UserItem } from "../../components/signup/userData";

export interface UserReducerActionProps {
    type : string;
    user?: UserItem;
}

export default (state:UserItem|null, action:UserReducerActionProps) =>{
    switch(action.type){
        // action에서 넘어온 요소 추가
        case 'login': 
            return action.user? action.user : null;
        // action에서 넘어온 id에 해당하는 요소 삭제
        case 'logout': return null;
        default : return state;
    } 
}