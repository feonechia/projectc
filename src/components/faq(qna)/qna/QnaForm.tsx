import React, { useState } from 'react';
import { Form, Input, Button, Typography, Space, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './qna.module.css'
import { QnaVO } from './qnaData';

const { Title } = Typography;

const QnaForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [formData, setFormData] = useState<QnaVO>({
    title: '',
    writer: '',
    contents: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('writer', formData.writer);
    data.append('contents', formData.contents);

    try {
      await axios.post('http://192.168.0.14/project/qna/qnaAdd', data);
      message.success('질문이 등록되었습니다.');
      navigate('/faq/qna');
    } catch (error) {
      console.error('등록 실패:', error);
      message.error('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2>QnA 등록</h2>
      <div className={style.container}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={formData}
        >
          <Form.Item label="제목" name="title" rules={[{ required: true, message: '제목을 입력하세요' }]}>
            <Input name="title" onChange={handleChange} />
          </Form.Item>

          <Form.Item label="작성자" name="writer" rules={[{ required: true, message: '작성자를 입력하세요' }]}>
            <Input name="writer" onChange={handleChange} />
          </Form.Item>

          <Form.Item label="내용" name="contents" rules={[{ required: true, message: '내용을 입력하세요' }]}>
            <Input.TextArea
              name="contents"
              rows={6}
              onChange={handleChange}
              style={{ resize: 'none' }}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                등록하기
              </Button>
              <Link to="/faq/qna">
                <Button>취소</Button>
              </Link>
            </Space>
          </Form.Item>
        </Form>
      </div></div>
  );
};

export default QnaForm;
