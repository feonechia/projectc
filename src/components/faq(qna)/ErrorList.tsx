import React, { useEffect, useState } from 'react';
import { FaqVO } from './faqData';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './faq.module.css';
import { List, Typography, Button, Space } from 'antd';

const { Title, Text } = Typography;

const ErrorList: React.FC = () => {
  const [errorList, setErrorList] = useState<FaqVO[]>([]);

  useEffect(() => {
    const detailServer = async () => {
      try {
        const response = await axios.get<FaqVO[]>(`http://192.168.0.14/project/faq/error`);
        setErrorList(response.data);
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
          <Title level={3} className={style.savelisttitle} style={{ marginBottom: 24 }}>
            Error list
          </Title>

          <List
            bordered
            dataSource={errorList}
            renderItem={item => (
              <List.Item>
                <Link to={`/faq/error/detail/${item.num}`} style={{ width: '100%', textDecoration: 'none' }}>
                  <Text>
                    <Text strong style={{ marginRight: 8 }}>
                      Q.
                    </Text>
                    {item.title}
                  </Text>
                </Link>
              </List.Item>
            )}
            style={{ backgroundColor: 'white', borderRadius: 6 }}
          />

          <Space style={{ marginTop: 24, justifyContent: 'center', display: 'flex' }}>
            <Link to={'/faq'}>
              <Button type="primary" size="middle">
                홈으로
              </Button>
            </Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default ErrorList;
