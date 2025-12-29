import React, { useEffect, useState } from 'react';
import { FaqVO } from './faqData';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './faq.module.css';
import { Typography, Button } from 'antd';

const { Title, Text } = Typography;

const SaveList: React.FC = () => {
  const [saveList, setSaveList] = useState<FaqVO[]>([]);

  useEffect(() => {
    const detailServer = async () => {
      try {
        const response = await axios.get<FaqVO[]>(`http://192.168.0.14/project/faq/save`);
        setSaveList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error ->", error);
      }
    };
    detailServer();
  }, []);

  return (
    <div>
      <h2>
        타이틀
      </h2>

      <div className={style.container}>
        <div className={style.savelistcontainer}>
          <Title level={3} className={style.savelisttitle}>
            Save list
          </Title>

          {/* 직접 map 사용 */}
          <div style={{ backgroundColor: 'white', borderRadius: 6, border: '1px solid #d9d9d9',textAlign:'left' }}>
            {saveList.map(item => (
              <Link
                key={item.num}
                to={`/faq/save/detail/${item.num}`}
                style={{
                  display: 'block',
                  padding: '12px 20px',
                  borderBottom: '1px solid #f0f0f0',
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
              >
                <Text>
                  <Text strong style={{ color: '#1890ff', marginRight: 8 }}>
                    Q.
                  </Text>
                  {item.title}
                </Text>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Link to={'/faq'}>
              <Button type="primary">홈으로</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveList;
