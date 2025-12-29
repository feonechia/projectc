import React, { useEffect, useState } from 'react';
import { FaqVO } from './faqData';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './faq.module.css';
import { Typography, Button, Space } from 'antd';

const { Title, Text } = Typography;

const SignupList: React.FC = () => {
  const [signupList, setSignupList] = useState<FaqVO[]>([]);

  useEffect(() => {
    const detailServer = async () => {
      try {
        const response = await axios.get<FaqVO[]>(`http://192.168.0.14/project/faq/signup`);
        setSignupList(response.data);
      } catch (error) {
        console.error("Error ->", error);
      }
    };
    detailServer();
  }, []);

  return (
    <div>
      <h2>타이틀</h2>
      <div className={style.container}>
        <Title level={3} style={{ marginBottom: 24, textAlign: 'center' }}>
          Signup list
        </Title>

        <div style={{ backgroundColor: 'white', borderRadius: 6, border: '1px solid #d9d9d9', textAlign:'left'}}>
          {signupList.map(item => (
            <Link
              key={item.num}
              to={`/faq/signup/detail/${item.num}`}
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

        <Space style={{ marginTop: 24, justifyContent: 'center', display: 'flex' }}>
          <Link to={'/faq'}>
            <Button type="primary" size="middle">
              홈으로
            </Button>
          </Link>
        </Space>
      </div>
    </div>
  );
};

export default SignupList;
