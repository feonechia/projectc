import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { QnaVO } from './qnaData';
import QnaComm from './QnaComm';
import style from './qna.module.css'
import {
    Card,
    Descriptions,
    Typography,
    Button,
    Space,
    message,
    Divider,
} from 'antd';

const { Title, Paragraph } = Typography;

const QnaDetail: React.FC = () => {
    const [upboard, setUpboard] = useState<QnaVO | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const resp = await axios.get<QnaVO>(
                    `http://192.168.0.14/project/qna/detail?num=${id}`
                );
                setUpboard(resp.data);
            } catch (error) {
                message.error('게시글을 불러오지 못했습니다.');
            }
        };
        fetchDetail();
    }, [id]);

    const handleDeleteClick = async () => {
        if (!upboard) return;
        try {
            await axios.post(`http://192.168.0.14/project/qna/delete?num=${id}`);
            message.success('삭제되었습니다.');
            navigate('/faq/qna');
        } catch (error) {
            console.error('삭제 오류:', error);
            message.error('삭제에 실패했습니다.');
        }
    };

    return (
        <div>
            <h2>QnA 상세 보기</h2>
            <div className={style.container}>
                <Card>
                    {upboard ? (
                        <>
                            <Descriptions
                                bordered
                                column={1}
                                size="middle"
                                labelStyle={{ width: '120px', fontSize: '13px', fontWeight: 500 }}
                                contentStyle={{ fontSize: '16px', fontWeight: 600 }}
                            >
                                <Descriptions.Item label="번호">{upboard.num}</Descriptions.Item>
                                <Descriptions.Item label="제목">{upboard.title}</Descriptions.Item>
                                <Descriptions.Item label="작성자">{upboard.writer}</Descriptions.Item>
                                <Descriptions.Item label="내용">
                                    <Paragraph style={{ whiteSpace: 'pre-wrap', marginBottom: 0 }}>
                                        {upboard.contents}
                                    </Paragraph>
                                </Descriptions.Item>
                            </Descriptions>

                            <Divider />

                            <Space style={{ marginTop: 16 }}>
                                <Button danger onClick={handleDeleteClick}>
                                    삭제
                                </Button>
                                <Link to="/faq/qna">
                                    <Button type="default"style={{backgroundColor:'#1390ff'}}>목록으로</Button>
                                </Link>
                            </Space>
                        </>
                    ) : (
                        <Paragraph>불러오는 중입니다...</Paragraph>
                    )}
                </Card>

                <Divider />
                {upboard && <QnaComm num={upboard.num} />}
            </div></div>
    );
};

export default QnaDetail;


