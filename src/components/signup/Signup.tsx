  import React, { useState } from 'react'
  import style from './signup.module.css';
import { NavLink } from 'react-router-dom';


// 회원가입 회원의 데이터 저장 useState
const Signup: React.FC = () => {
    const [form, setForm] = useState({
        username: '',
        password:'',
        name: '',
        bdate: '',
        gender:'',
        email:'',
        pnum:'',
        goal: [] as string[]
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [idChecked, setIdChecked] = useState(false);

    const validate = () => {
      const newErrors : {[key:string] : string} = {};
      if(!form.username){
        newErrors.username = '사용하실 아이디를 입력해 주세요';
      }
      // if(!idChecked){
      //   newErrors.idCheck = '아이디 중복검사가 필요합니다';
      // }
      if(!form.password || form.password.length < 6){
        newErrors.password = '비밀번호는 6자리 이상이여야 합니다';
      }
      if(!form.name){
        newErrors.name = '성함을 입력해 주세요';
      }
      if(!form.bdate){
        newErrors.bdate = '생년월일을 입력해 주세요';
      }
      if(!form.gender){
        newErrors.gender = '성별을 선택해 주세요';
      }
      if(!form.email){
        newErrors.email = '이메일 주소를 입력해 주세요';
      }
      if(!form.pnum){
        newErrors.pnum = '휴대전화번호를 입력해 주세요';
      }
      if(!form.goal.length) {
        newErrors.goal = '가계부를 사용하려는 이유를 선택해 주세요';
      }
      return newErrors;
    }

    const memberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type == 'checkbox') {
      let checked = (e.target as HTMLInputElement).checked;
      setForm(prev => ({...prev, goal:checked ? [...prev.goal,value]:prev.goal.filter(g => g !== value)}));
      } else {
        setForm(prev => ({...prev,[name]:value}));
      }
    }

    
    // // 아이디 중복 검사
    // const checkUsername = () => {
    //   if(!form.username.trim()){
    //   alert("아이디가 입력되지 않았습니다");
    //   return;
    //   }
    //   if (checkUsername.includes(form.username.trim().toLowerCase())) {
    //     alert("이미 존재하는 아이디 입니다.");
    //     setIdChecked(false);
    //   }else {
    //     alert("사용 가능한 아이디 입니다.");
    //     setIdChecked(true);
    //   }
    // }

    // 회원가입 버튼
    const signupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("회원가입 값이 넘어감!");
    // 유효성 검사
    const myError = validate();
    if(Object.keys(myError).length>0){
      setErrors(myError);
      alert("회원가입 실패!");
    }else{
                                                                                                                    
      alert("회원가입 성공!");
    }   
  }
  


  return (
    <div className={style.signupContainer}>
      
      <h3>회원가입</h3>
      <form className={style.input} onSubmit={signupSubmit}>
 
        <label>아이디</label>
        <div className={style.textbox}>
          <input type="text" name="username" id="username" size={40} onChange={memberChange}/>
          {/* <button type='button' className={style.checkButton} onClick={checkUsername}>중복확인</button> */}
        </div>
        {errors.username && <p className={style.error}>{errors.username}</p>}
        {errors.idCheck && <p className={style.error}>{errors.idCheck}</p>}

        <label>비밀번호</label>
        <div className={style.textbox}>
        <input type="password" name="password" id="password" size={40} onChange={memberChange}/>
        {errors.password && <p className={style.error}>{errors.password}</p>}
        </div>

        <label>당신의 이름은?</label>
        <div className={style.textbox}>
          <input type="text" name="name" id="name" size={40} onChange={memberChange}/>
        </div>
        {errors.name && <p className={style.error}>{errors.name}</p>}

        <label>이메일</label>
        <div className={style.textbox}>
        <input type="text" name="email" id="email" size={40} onChange={memberChange}/>
        </div>
        {errors.email && <p className={style.error}>{errors.email}</p>}
        
         <label>생년월일</label>
        <div className={style.form}>
        <input type="date" name="birth" id="birth" onChange={memberChange}/>
        {errors.birth && <p className={style.error}>{errors.birth}</p>}
        </div>

        <div><span></span></div>

          <label>성별</label>
        <div className={style.gender}>
          <label><input type="radio" name="gender" value="남자" onChange={memberChange}/> 남자</label>
          <label><input type="radio" name="gender" value="여자" onChange={memberChange}/> 여자</label>
        </div>
        {errors.gender && <p className={style.error}>{errors.gender}</p>}

        <div><span></span></div>

        <label>가계부를 사용하려는 이유는?</label>
        <div className={style.goal}>
          <label><input type="checkbox" name="goal" value="수입 & 지출 관리" onChange={memberChange}/>수입 & 지출 관리</label>
          <label><input type="checkbox" name="goal" value="기업 & 기관 자산관리" onChange={memberChange}/>기업 & 기관 자산관리</label>
          <label><input type="checkbox" name="goal" value="저축 & 재테크" onChange={memberChange}/>저축 & 재테크</label>
        </div>
         {errors.goal && <p className={style.error}>{errors.goal}</p>}

         <div><span></span></div>

        <button type='submit' name="sumbit" className={style.submitButton}> 가입하기 </button>

        <NavLink to={'/Login'}><button type='button' name="login" className={style.submitButton}> 로그인하기 </button></NavLink>

      </form>
    </div>
  )
}

export default Signup