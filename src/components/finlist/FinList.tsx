// FinList.tsx
import 'antd/dist/reset.css';
import React, { useState } from 'react';
import { Table, Input, Button, Modal, Form, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusCircleFilled, PlusOutlined } from '@ant-design/icons';
import styles from './FinList.module.css';
import { useNavigate } from 'react-router-dom';
 
interface Transaction {
    key: number;
    date: string;
    time: string;
    asset: string;
    category: string;
    amount: number;
    memo?: string;
    file?: string;
    contents: string;
    type: '수입' | '지출';
}
 
const initialData: Transaction[] = [
    { key: 1, date: '25. 5. 28 (수)', time: '10:39', asset: '현금', category: '문화생활', amount: 100, contents: 'THO보증금납입', file: 'receipt1.pdf', type: '지출', memo: '마이너스통장임ㅠ' },
    { key: 2, date: '25. 5. 29 (목)', time: '11:02', asset: 'KB', category: '식비', amount: 24400, contents: 'THO보증료납입', file: 'receipt2.pdf', type: '지출', memo: '헤헤 메모장이다다' },
    { key: 3, date: '25. 5. 29 (목)', time: '20:00', asset: 'KB', category: '월급', amount: 3500000, contents: 'THO한국보증료', file: 'receipt3.pdf', type: '수입', memo: '돈이 많이 없네네' },
    { key: 4, date: '25. 5. 29 (목)', time: '04:56', asset: 'KB', category: '식비', amount: 179000, contents: '대출원금', file: 'receipt4.pdf', type: '지출', memo: '다 지출이네 ㅠㅠ' },
    { key: 5, date: '25. 5. 29 (목)', time: '04:49', asset: 'KB', category: '식비', amount: 673292, contents: '대출이자', file: 'receipt5.pdf', type: '지출', memo: '용돈 주세요!' },
    { key: 6, date: '25. 4. 29 (화)', time: '03:49', asset: '하나', category: '근로장려금', amount: 673292, contents: '근로장려금', file: 'receipt6.pdf', type: '수입', memo: '아싸 나라용돈' }
];
 
const FinList: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Transaction[]>(initialData);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Transaction | null>(null);
    const [filteredMonth, setFilteredMonth] = useState<string | null>(null);
    const [form] = Form.useForm();
    const [tableFilters, setTableFilters] = useState<Record<string, any>>({});
    const [datePickerValue, setDatePickerValue] = useState<any>(null);
    const [sortOrder, setSortOrder] = useState<null | 'ascend' | 'descend'>(null);
 
    const filteredData = filteredMonth ? data.filter(item => item.date.startsWith(filteredMonth)) : data;
    const incomeTotal = filteredData.filter(item => item.type === '수입').reduce((acc, cur) => acc + cur.amount, 0);
    const expenseTotal = filteredData.filter(item => item.type === '지출').reduce((acc, cur) => acc + cur.amount, 0);
    const netTotal = incomeTotal - expenseTotal;
 
 
 
    const handleEdit = () => {
        const target = data.find(item => item.key === selectedRowKeys[0]);
        if (target) {
            form.setFieldsValue(target);
            setEditingItem(target);
            setIsModalOpen(true);
        }
    };
 
    const handleSave = (values: any) => {
        if (editingItem) {
            const updated = { ...editingItem, ...values };
            setData(data.map(item => item.key === updated.key ? updated : item));
            setIsModalOpen(false);
            setEditingItem(null);
        }
    };
 
    const handleDelete = () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            setData(data.filter(item => !selectedRowKeys.includes(item.key)));
            setSelectedRowKeys([]);
        }
    };
 
    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
    };
 
    const handleResetFilters = () => {
        setFilteredMonth(null);
        setDatePickerValue(null);
        setTableFilters({});
        setSortOrder(null);
    };
 
    const columns: ColumnsType<Transaction> = [
        {
            title: '날짜', dataIndex: 'date', key: 'date',
            filters: Array.from(new Set(data.map(item => item.date))).map(value => ({ text: value, value })),
            filteredValue: tableFilters.date ?? null,
            onFilter: (value, record) => record.date === value,
        },
        {
            title: '시간', dataIndex: 'time', key: 'time',
            sorter: (a, b) => a.time.localeCompare(b.time),
        },
        {
            title: '자산', dataIndex: 'asset', key: 'asset',
            filters: Array.from(new Set(data.map(item => item.asset))).map(value => ({ text: value, value })),
            filteredValue: tableFilters.asset ?? null,
            onFilter: (value, record) => record.asset === value,
        },
        {
            title: '분류', dataIndex: 'category', key: 'category',
            filters: Array.from(new Set(data.map(item => item.category))).map(value => ({ text: value, value })),
            filteredValue: tableFilters.category ?? null,
            onFilter: (value, record) => record.category === value,
        },
        {
            title: '금액',
            dataIndex: 'amount',
            key: 'amount',
            sorter: (a, b) => a.amount - b.amount,
            sortOrder: sortOrder,
            render: (amount, record) => (
                <span style={{ color: record.type === '지출' ? 'red' : 'green', fontWeight: 600 }}>
                    {amount.toLocaleString()} 원
                </span>
            ),
        },
        {
            title: '-/+', dataIndex: 'type', key: 'type',
            filters: Array.from(new Set(data.map(item => item.type))).map(value => ({ text: value, value })),
            filteredValue: tableFilters.type ?? null,
            onFilter: (value, record) => record.type === value,
        },
        {
            title: '내용', dataIndex: 'contents', key: 'contents',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="검색어 입력"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm?.()}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button onClick={() => { clearFilters?.(); confirm?.(); }} size="small" style={{ width: 90 }}>초기화</Button>
                </div>
            ),
            filteredValue: tableFilters.contents ?? null,
            onFilter: (value, record) => record.contents.toLowerCase().includes((value as string).toLowerCase()),
            render: (text, record) => <a onClick={() => alert(`첨부파일: ${record.file} (가상)`)}>{text}</a>,
        },
        {
            title: '메모', dataIndex: 'memo', key: 'memo',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="검색어 입력"
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm?.()}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button onClick={() => { clearFilters?.(); confirm?.(); }} size="small" style={{ width: 90 }}>초기화</Button>
                </div>
            ),
            filteredValue: tableFilters.memo ?? null,
            onFilter: (value, record) => record.memo?.toLowerCase().includes((value as string).toLowerCase()) ?? false,
        },
        {
            title: '첨부파일', dataIndex: 'file', key: 'file',
            render: text => text || '-',
        },
    ];
 
    return (
        <div>
            {/* <h2>가계부 내역</h2> */}
            <div className={styles.container}>
                <div className={styles.controls}>
                    <DatePicker
                        picker="month"
                        format="YY. M"
                        value={datePickerValue}
                        onChange={(date, dateString) => {
                            setFilteredMonth(typeof dateString === 'string' ? dateString : null);
                            setDatePickerValue(date);
                        }}
                    />
                    <div>
                        <Button type="default" disabled={selectedRowKeys.length !== 1} onClick={handleEdit}>수정</Button>
                        <Button danger disabled={selectedRowKeys.length === 0} onClick={handleDelete}>삭제</Button>
                        <Button onClick={handleResetFilters}>전체 초기화</Button>
                    </div>
                </div>
 
                <div className={styles.summaryHeader}>
                    <span className={styles.total}>전체: {netTotal.toLocaleString()} 원</span>
                    <span className={styles.income}>수입: {incomeTotal.toLocaleString()} 원</span>
                    <span className={styles.expense}>지출: {expenseTotal.toLocaleString()} 원</span>
                </div>
 
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredMonth ? filteredData : data}
                    pagination={false}
                    bordered
                    onChange={(_, filters, sorter: any) => {
                        setTableFilters(filters);
                        setSortOrder(sorter.order || null);
                    }}
                />
 
                {/* < div className={styles.footerButtons} >
                    <Button type="default" disabled={selectedRowKeys.length !== 1} onClick={handleEdit}>수정</Button>
                    <Button danger disabled={selectedRowKeys.length === 0} onClick={handleDelete}>삭제</Button>
                </div> */}
 
                <Modal title="수정" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
                    <Form form={form} onFinish={handleSave} layout="vertical">
                        <Form.Item name="key" hidden><Input /></Form.Item>
                        <Form.Item name="date" label="날짜" rules={[{ required: true }]}><Input /></Form.Item>
                        <Form.Item name="time" label="시간" rules={[{ required: true }]}><Input /></Form.Item>
                        <Form.Item name="asset" label="자산" rules={[{ required: true }]}><Input /></Form.Item>
                        <Form.Item name="category" label="분류" rules={[{ required: true }]}><Input /></Form.Item>
                        <Form.Item name="amount" label="금액" rules={[{ required: true }]}><Input type="number" /></Form.Item>
                        <Form.Item name="contents" label="내용" rules={[{ required: true }]}><Input /></Form.Item>
                        <Form.Item name="file" label="첨부파일명"><Input /></Form.Item>
                        <Form.Item name="type" label="유형" rules={[{ required: true }]}><Input placeholder="수입 또는 지출" /></Form.Item>
                    </Form>
                </Modal>
 
                <div
                    className={styles.floatingButton}
                    onClick={() => navigate('/finlist/finformincome')}
                >
                    <PlusOutlined className={styles.plusIcon} />
                </div>
 
            </div>
        </div >
    );
 
};
 
export default FinList;