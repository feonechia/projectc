import React, { useEffect, useState } from 'react';
import style from './Settings.module.css';
import { Button, Input, List, Space } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const localData = 'newExpenseCategory'

const ExpenseCategories = ['외식', '대중교통', '커피' , '쇼핑', '공과금', '월세','주유비','옷쇼핑','문화생활'];

const SettingExpense: React.FC=()=>{
  const [expense, setExpense] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  useEffect(()=>{
  const storedExpenses = localStorage.getItem(localData); 
  if(storedExpenses){
    setExpense(JSON.parse(storedExpenses));
  }else {
    setExpense(ExpenseCategories);
  }
  },[]);
  const handleAdd = () => {
    if(!inputValue.trim){
      alert('빈칸 잘못 입력했습니다.');
      // return;
    }else if (expense.includes(inputValue.trim())){
      alert('이미 존재하는 값입니다.');
      // return;
    }else{
      setExpense([...expense, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDelete = (type:string)=>{
    setExpense(expense.filter((e)=> e!==type));
  };
  const handleUpdate = () => {
    localStorage.setItem(localData, JSON.stringify(expense));
    alert('지출 분류 업데이트 됐습니다.')
  };
  return(
        <div>
      <h2></h2>
    <div className={style.container}>
    <div className={style.form}>
      <h3>지출 분류</h3>
      <List bordered dataSource={expense} renderItem={(expenseCat)=>(
        <List.Item actions={[<Button danger shape='circle' icon={<DeleteOutlined style={{marginRight:'10px'}}/>} onClick={()=>handleDelete(expenseCat)}/>
        ]}
        >
          {expenseCat}
        </List.Item>
      )}
      />
      <Space style={{marginTop: '16px', marginLeft:'50%'}}>
        <Input placeholder='지출분야' value={inputValue} onChange={(e)=> setInputValue(e.target.value)} onPressEnter={handleAdd}/>
      <Button type='primary' icon={<PlusOutlined/>} onClick={handleAdd}>추가</Button>
      </Space>
      <Button type='primary' style={{marginTop: '24px', width:'100%'}} onClick={handleUpdate}>Update</Button>

    </div>
    </div>
    </div>
  );
};
export default SettingExpense