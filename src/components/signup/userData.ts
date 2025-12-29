// 회원 정보를 하나의 userData의 리스트로 저장하기 위한 데이터 인터페이스 선언
// 하나의 데이터로 저장하여 모든 페이지에서 회원 정보를 사용할 수 있게 제작
export interface UserItem {
    userid: string,
    password: string,
    passwordcheck: string,
    name: string,
    email: string,
    gender: string,
    birth: string,
    nickname: string,
    nation: string,
    phone: string,
    address: string
}

export const userList: UserItem[] = JSON.parse(localStorage.getItem('userList') || '[]');