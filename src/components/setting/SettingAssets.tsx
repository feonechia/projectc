import React, { useEffect, useState } from 'react';
import style from './Settings.module.css';
import { Button, Input, List, Space } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const localData = 'newCategory'

const AssetCategories = ['현금', '삼성카드', '신한계좌'];

const SettingAssets: React.FC=()=>{
  const [asset, setAsset] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  useEffect(()=>{
  const storedExpenses = localStorage.getItem(localData); 
  if(storedExpenses){
    setAsset(JSON.parse(storedExpenses));
  }else {
    setAsset(AssetCategories);
  }
  },[]);
  const handleAdd = () => {
    if(!inputValue.trim){
      alert('빈칸 잘못 입력했습니다.');
      // return;
    }else if (asset.includes(inputValue.trim())){
      alert('이미 존재하는 값입니다.');
      // return;
    }else{
      setAsset([...asset, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDelete = (type:string)=>{
    setAsset(asset.filter((e)=> e!==type));
  };
  const handleUpdate = () => {
    localStorage.setItem(localData, JSON.stringify(asset));
    alert('자산 리스트가가 업데이트 됐습니다.')
  };
  return(
    <div>
      <h2></h2>
    <div className={style.container}>
      <h3>자산 관리</h3>
      <div className={style.form}>
      <List bordered dataSource={asset} renderItem={(assetCat)=>(
        <List.Item actions={[<Button danger shape='circle' icon={<DeleteOutlined style={{marginRight:'10px'}}/>} onClick={()=>handleDelete(assetCat)}/>
        ]}
        >
          {assetCat}
        </List.Item>
      )}
      />
      <Space style={{marginTop: '16px', marginLeft:'50%'}}>
        <Input placeholder='자산 종류' value={inputValue} onChange={(e)=> setInputValue(e.target.value)} onPressEnter={handleAdd}/>
      <Button type='primary' icon={<PlusOutlined style={{marginRight:'10px'}}/>} onClick={handleAdd}>추가</Button>
      </Space>
      <Button type='primary' style={{marginTop: '24px', width:'100%'}} onClick={handleUpdate}>Update</Button>
</div>
    </div>
    </div>
  );
};
export default SettingAssets