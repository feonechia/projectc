import React, { useEffect, useState } from 'react';
import { FaqVO } from './faqData';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import style from './faq.module.css';
import { Typography, Button, Space } from 'antd';

const { Title, Text } = Typography;

const SignupDetail: React.FC = () => {
  const [list, setList] = useState<FaqVO | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const detailServer = async () => {
      try {
        const resp = await axios.get<FaqVO>(`http://192.168.0.14/project/faq/detail?num=${id}`);
        setList(resp.data);
      } catch (error) {
        console.error('Error fetching detail:', error);
      }
    };
    detailServer();
  }, [id]);

  return (
    <div>
      <h2>
        타이틀
      </h2>

      <div className={style.container}>
        <div className={style.faqdetailcontainer}>
          <Title level={3} className={style.faqdetailtitle}>
            FAQ 상세보기
          </Title>

          <div className={style.faqdetailrow}>
            <div className={style.faqdetaillabel}>제목</div>
            <div className={style.faqdetailcontent}>
              <Text>{list?.title}</Text>
            </div>
          </div>

          <div className={style.faqdetailrow}>
            <div className={style.faqdetaillabel}>내용</div>
            <div className={style.faqdetailcontent}>
              <Text style={{ whiteSpace: 'pre-wrap' }}>{list?.content}</Text>
            </div>
          </div>

          <Space style={{ marginTop: 30, justifyContent: 'center', display: 'flex' }}>
            <Link to="/faq/signup">
              <button type="button"style={{backgroundColor:'#1390ff'}}>목록으로</button>
            </Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default SignupDetail;
