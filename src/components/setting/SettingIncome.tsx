import React, { useEffect, useState } from 'react';
import style from './Settings.module.css';
import { Button, Input, List, Space } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const localData = 'newIncomeCategory'

const IncomeCategories = ['월급', '투자', '용돈' , '코인', '주식', '알바'];

const SettingIncome: React.FC=()=>{
  const [income, setIncome] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  useEffect(()=>{
  const storedExpenses = localStorage.getItem(localData); 
  if(storedExpenses){
    setIncome(JSON.parse(storedExpenses));
  }else {
    setIncome(IncomeCategories);
  }
  },[]);
  const handleAdd = () => {
    if(!inputValue.trim){
      alert('빈칸 잘못 입력했습니다.');
      // return;
    }else if (income.includes(inputValue.trim())){
      alert('이미 존재하는 값입니다.');
      // return;
    }else{
      setIncome([...income, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDelete = (type:string)=>{
    setIncome(income.filter((e)=> e!==type));
  };
  const handleUpdate = () => {
    localStorage.setItem(localData, JSON.stringify(income));
    alert('수입입 분류 업데이트 됐습니다.')
  };
  return(
        <div>
      <h2></h2>
    <div className={style.container}>
    <div className={style.form}>
      <h3>수입 분류</h3>
      <List bordered dataSource={income} renderItem={(incomeCat)=>(
        <List.Item actions={[<Button danger shape='circle' icon={<DeleteOutlined style={{marginRight:'10px'}}/>} onClick={()=>handleDelete(incomeCat)}/>
        ]}
        >
          {incomeCat}
        </List.Item>
      )}
      />
      <Space style={{marginTop: '16px', marginLeft:'50%'}}>
        <Input placeholder='수입분야' value={inputValue} onChange={(e)=> setInputValue(e.target.value)} onPressEnter={handleAdd}/>
      <Button type='primary' icon={<PlusOutlined/>} onClick={handleAdd}>추가</Button>
      </Space>
      <Button type='primary' style={{marginTop: '24px', width:'100%'}} onClick={handleUpdate}>Update</Button>
</div>
</div>
    </div>
  );
};
export default SettingIncome