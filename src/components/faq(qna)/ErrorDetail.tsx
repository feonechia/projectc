import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaqVO } from './faqData';
import style from './faq.module.css'; 
import { Link } from 'react-router-dom';

const ErrorDetail: React.FC = () => {
  
    const [list, setList] = useState<FaqVO | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const detailServer = async () => {
            const resp = await axios.get<FaqVO>(`http://192.168.0.14/project/faq/detail?num=${id}`);
            setList(resp.data);
        };
        detailServer();
    }, [id]);

    return (  <div>
      <h2>타이틀</h2>
      <div className={style.container}></div>
        <div className={style.faqdetailcontainer}>
            <h2 className={style.faqdetailtitle}>이용장애 시</h2>
            <div className={style.faqdetailrow}>
                <div className={style.faqdetaillabel}>제목</div>
                <div className={style.faqdetailcontent}>{list?.title}</div>
            </div>
            <div className={style.faqdetailrow}>
                <div className={style.faqdetaillabel}>내용</div>
                <div className={style.faqdetailcontent}>{list?.content}</div>
            </div>
            <Link to={'/faq/error'}><button type='button'style={{backgroundColor:'#1390ff'}}>목록으로</button></Link>
        </div></div>
    );
};
export default ErrorDetail