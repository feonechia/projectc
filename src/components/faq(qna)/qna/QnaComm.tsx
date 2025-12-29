import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface QnaCommVOProps {
    num?: number;
}
interface QnaCommVO {
    num: number;
    ucode: number;
    uwriter: string;
    ucontent: string;
    reip: string;
    uregdate: string;
}

const QnaComm: React.FC<QnaCommVOProps> = ({ num }) => {
    const [writer, setWriter] = useState("");
    const [content, setContent] = useState("");
    const [comments, setComments] = useState<QnaCommVO[]>([]);

    const getComments = async () => {
        try {
            const url = `http://192.168.0.14/project/qna/qacommList?num=${num}`;
            const response = await axios.get<QnaCommVO[]>(url);
            setComments(response.data);
        } catch (error) {
            console.error('댓글 불러오기 실패:', error);
        }
    };

    const commentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const commentData = {
            ucode: num,
            uwriter: writer,
            ucontent: content
        };

        try {
            await axios.post('http://192.168.0.14/project/qna/qacommAdd', commentData, {
                headers: { 'Content-Type': 'application/json' }
            });
            setWriter("");
            setContent("");
            getComments();
        } catch (error) {
            console.error('댓글 작성 실패:', error);
        }
    };

    useEffect(() => {
        getComments();
    }, [num]);

    return (
        <div className='mt-4'>
            <h4>Comments</h4>
            <form className='mb-3' onSubmit={commentSubmit}>
                <div className='mb-2'>
                    <input type="text" placeholder='작성자' className='form-control' value={writer} onChange={(e) => setWriter(e.target.value)} />
                </div>
                <div className='mb-2'>
                    <textarea className='form-control' placeholder='댓글' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className='text-center'>
                    <button type='submit' className='btn btn-primary'>댓글 작성</button>
                </div>
            </form>
            <ul className="list-group">
                {comments.map(item => (
                    <li className="list-group-item" key={item.num}>
                        <strong>{item.uwriter}</strong>
                        <span className='text-muted'> {item.uregdate}</span>
                        <p>{item.ucontent}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QnaComm;
