import React from 'react';
import style from './faq.module.css';
import { Link } from 'react-router-dom';
import { Typography, Space } from 'antd';

const { Text } = Typography;

const faqItems = [
  { path: '/faq/signup', img: '/images/signup.png', text: '가입' },
  { path: '/faq/info', img: '/images/info.png', text: '이용 안내' },
  { path: '/faq/error', img: '/images/error.png', text: '이용 장애' },
  { path: '/faq/save', img: '/images/save.png', text: '소비관리' },
  { path: '/faq/qna', img: '/images/questionmark.png', text: '기타(Q&A)' },
];

const FaqList: React.FC = () => {
  return (
    <div>
      <h2>FAQ</h2>
      <div className={style.container} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        {faqItems.map(({ path, img, text }) => (
          <Link to={path} style={{ textDecoration: 'none' }}>
            <div className={style.listItem}>
              <img src={img} alt={text} />
              <Text strong>{text}</Text>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FaqList;
