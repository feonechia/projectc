import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { QnaVO } from './qnaData';
import style from './qna.module.css'
import { Typography, Input, Button, Select, Pagination, Space, Table as AntTable } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const QnaList: React.FC = () => {
  const [upBoardList, setUpBoardList] = useState<QnaVO[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [searchType, setSearchType] = useState('1');
  const [searchValue, setSearchValue] = useState('');

  const fetchUpboardList = async (page: number) => {
    try {
      const response = await axios.get('http://192.168.0.14/project/qna/uplist', {
        params: {
          cPage: page,
          searchType,
          searchValue,
        },
      });
      if (response) {
        setUpBoardList(response.data.data);
        setTotalItems(response.data.totalItems);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setStartPage(response.data.startPage);
        setEndPage(response.data.endPage);
      }
    } catch (error) {
      console.error('데이터 가져오기 실패', error);
    }
  };

  useEffect(() => {
    fetchUpboardList(currentPage);
  }, [currentPage]);

  const handleSearch = () => {
    fetchUpboardList(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2>FAQ</h2>
      <div className={style.container}>
        <Space style={{ marginBottom: 16 }}>
          <Select value={searchType} onChange={setSearchType} style={{ width: 120 }}>
            <Option value="1">작성자</Option>
            <Option value="2">제목</Option>
            <Option value="3">내용</Option>
          </Select>
          <Input
            placeholder="검색어 입력"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 200 }}
          />
          <Button type="primary" onClick={handleSearch}>
            검색
          </Button>
          <Link to="/faq/qna/form">
            <Button>글쓰기</Button>
          </Link>
        </Space>

        <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#fafafa' }}>
              <tr>
                <th style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>번호</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>제목</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>조회수</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>작성일</th>
              </tr>
            </thead>
            <tbody>
              {upBoardList.map((item) => (
                <tr key={item.num} style={{ textAlign: 'center' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>{item.num}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0', textAlign: 'left'}}>
                    <Link to={`/faq/qna/detail/${item.num}`} style={{color:'black'}}>{item.title}</Link>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>{item.hit}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>{item.qdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={10}
            showSizeChanger={false}
            onChange={handlePageChange}
          />
        </div>
      </div></div>
  );
};

export default QnaList;
