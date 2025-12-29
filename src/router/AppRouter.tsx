import React from 'react'
import Home from '../components/home/Home'
import { Route, Routes } from 'react-router-dom'

import Login from '../components/signup/Login'
import Signup from '../components/signup/Signup'
import FinList from '../components/finlist/FinList'
import FinFormExpense from '../components/finform/FinFormExpense'
import FinformIncome from '../components/finform/FinFormIncome'
import MyPage from '../components/mypage/MyPage'
import Setting from '../components/setting/Setting'
import SettingExpense from '../components/setting/SettingExpense'
import SettingIncome from '../components/setting/SettingIncome'
import SettingAssets from '../components/setting/SettingAssets'
import Summary from '../components/summary/Summary'
import ErrorList from 'antd/es/form/ErrorList'
import ErrorDetail from '../components/faq(qna)/ErrorDetail'
import FaqList from '../components/faq(qna)/FaqList'
import InfoDetail from '../components/faq(qna)/InfoDetail'
import InfoList from '../components/faq(qna)/InfoList'
import QnaDetail from '../components/faq(qna)/qna/QnaDetail'
import QnaForm from '../components/faq(qna)/qna/QnaForm'
import QnaList from '../components/faq(qna)/qna/QnaList'
import SaveDetail from '../components/faq(qna)/SaveDetail'
import SaveList from '../components/faq(qna)/SaveList'
import SignupDetail from '../components/faq(qna)/SignupDetail'
import SignupList from '../components/faq(qna)/SignupList'
import Analytics from '../components/analytics/Analytics'
import SettingBudget from '../components/setting/SettingBudget'
import MyAccount from '../components/myaccount/MyAccount'


const AppRouter: React.FC = () => {
    const routeList = [
        { path: '/', element: <Home /> }, // 홈
        { path: '/signup', element: <Signup /> },// 회원가입
        { path: '/login', element: <Login /> },// 로그인
        { path: '/finlist', element: <FinList /> },//내역
        { path: '/finlist/finformincome', element: <FinformIncome /> },//입력
        { path: '/finlist/finformexpense', element: <FinFormExpense /> },//입력
        { path: '/mypage', element: <MyPage /> },//마이페이지
        { path: '/mypage/info', element: <MyAccount /> }, //회원정보 수정정
        { path: '/summary', element: <Summary /> },  //자산산
        { path: '/setting', element: <Setting /> },//설정
        { path: '/setting/expense', element: <SettingExpense /> },
        { path: '/setting/income', element: <SettingIncome /> },
        { path: '/setting/assets', element: <SettingAssets /> },
        { path: '/setting/budget', element: <SettingBudget /> },
        { path: '/analytics', element: <Analytics /> },//통계
        { path: '/faq', element: <FaqList /> },
        { path: '/faq/signup', element: <SignupList /> },
        { path: '/faq/signup/detail/:id', element: <SignupDetail /> },
        { path: '/faq/save/', element: <SaveList /> },
        { path: '/faq/save/detail/:id', element: <SaveDetail /> },
        { path: '/faq/info', element: <InfoList /> },
        { path: '/faq/info/detail/:id', element: <InfoDetail /> },
        { path: '/faq/error', element: <ErrorList /> },
        { path: '/faq/error/:id', element: <ErrorDetail /> },
        { path: '/faq/qna', element: <QnaList /> },
        { path: '/faq/qna/detail/:id', element: <QnaDetail /> },
        { path: '/faq/qna/form', element: <QnaForm /> }
    ]

    return (
        <Routes>
            {
                routeList.map((route, idx) => (
                    <Route key={idx} {...route} />
                ))
            }
        </Routes>
    )
}

export default AppRouter