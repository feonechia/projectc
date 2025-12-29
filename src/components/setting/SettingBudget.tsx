import React, { useState } from 'react'
import style from './Settings.module.css';
import { Button, InputNumber, Select, Space } from 'antd';

const SettingBudget: React.FC = () => {
const { Option } = Select;

const selectCurrency = (
  <Select defaultValue="KRW" style={{ width: 60 }}>
    <Option value="KRW">₩</Option>
    <Option value="USD">$</Option>
  </Select>
);
  const handleUpdate = () => {
    
    alert('자산 리스트가가 업데이트 됐습니다.')
  };
  const [budget, setBudget] = useState(0);
  // const handleChange = () =>(e:React.ChangeEvent<HTMLInputElement>) {
  //   setBudget(e.target.value)
  // }

  return (
    <div>
      <h2></h2>
    <div className={style.container}>
      <h3>매월 예산 금액 설정</h3>
      <div className={style.form}>
        <Space direction="vertical">
    <InputNumber addonAfter={selectCurrency} defaultValue={0} />
  </Space>
      
      <Button type='primary' style={{marginTop: '24px', width:'55%'}} onClick={handleUpdate}>설정하기</Button>
</div>
    </div>
    </div>
  )
}

export default SettingBudget