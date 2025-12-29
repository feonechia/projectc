import React, { useContext } from 'react'
import style from './mypage.module.css';

import LifeBoardContainer from './LifeBoardContainer';
import MyAssetInfo from './MyAssetInfo';
import MyPageChart from './chart/MyPageChart';
import { NavLink,useNavigate } from 'react-router-dom';
import { Button } from 'antd';


const MyPage: React.FC = () => {
    const navigate = useNavigate();

    const accountInfo = () => {

        // 회원의 정보는 놔둔 채 로그아웃 후 home으로 경로를 이동하기 위한 함수
        // memberinfo
        // navigate('/');
        navigate('/mypage/info');
    }

    return (
        <div >
            <h2>My Page</h2>
            <div className={style.container}>
            <form className={style.form}>
                <div className={style.myProfilediv}>
                    <div className={style.infoBg}>
                        <div className={style.infoInnerBg}>
                          <img src="/images/user.png" className={style.img} />
                          <p className={style.pStyle} id='userid'>
                              <strong>joshua</strong>님, 반갑습니다. <br/>행복한 하루 보내세요~<br/>    
                              <Button type="default" onClick={accountInfo}>내 정보 확인{'>'}</Button>
                          </p>
                        </div>
                        <div className={style.infoInnerBg}>
                          <p className={style.pStyle} id='userid'>
                              <br />
                              접속시간 : 2025-05-30 10:30
                          </p>
                        </div>


                    </div>
                    
                    <div className={style.innerBg}>
                        <NavLink to={"/finlist"} style={{ textDecoration: "none"}}>
                          <div className={style.card}>
                              <p style={{display:'inline-block'}}><strong>나의 생활 정보 </strong> {'>'}</p>
                              <LifeBoardContainer/>
                          </div>
                        </NavLink>
                        <NavLink to={"/summary"} style={{ textDecoration: "none"}}>
                          <div className={style.card}>
                              <p style={{display:'inline-block'}}><strong>나의 자산 정보 </strong> {'>'}</p>
                              <MyAssetInfo/>
                          </div>
                        </NavLink>
                    </div>
                    <NavLink to={"/analytics"}  style={{ textDecoration: "none"}}>
                    <div className={style.chartBg} style={{textAlign:'center'}}>
                        <div className={style.inerChart}>
                         <MyPageChart/>
                         </div>
                         <div className={style.inerChart} style={{textAlign:'left'}}>
                            <p className={style.pStyle} >
                            <strong>지출 통계 정보</strong> {'>'}
                            <br/>
                                식대 : 500,000 원
                            </p>
                         </div>
                    </div>
                    </NavLink>
                    <NavLink to={"/faq"}  style={{ textDecoration: "none"}}>
                      <div className={style.boardBg} >
                          <p className={style.pStyle}>
                              <strong>커뮤니티 정보</strong> {'>'}
                              <br/>
                              가계부를 왜 써야 하나요?
                          </p>
                      </div>
                    </NavLink>
                    <NavLink to={"/setting"}  style={{ textDecoration: "none"}}>
                      <div className={style.boardBg}>
                          <p className={style.pStyle}>
                              <strong>설정 정보</strong> {'>'}
                          </p>
                      </div>
                    </NavLink>
                </div>
            </form>
            </div>
        </div>
    )
}

export default MyPage