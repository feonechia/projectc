import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface Expense {
  name: string;
  amount: string;
  category: string;
  asset: string;
  date: string;
  image: string | null;

}

const FinFormExpense: React.FC = () => {
  const [expense, setExpense] = useState<Expense>({
    name: '',
    amount: '',
    category: '',
    asset: '',
    date: '',
    image: null,

  });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const navigate = useNavigate(); // 추가: 라우팅 기능
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'image' && files) {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          setExpense((prev) => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setExpense((prev) => ({ ...prev, [name]: value }));
    }
  };
  const resetForm = () => {
    setExpense({
      name: '',
      amount: '',
      category: '',
      asset: '',
      date: '',
      image: null,

    });
    setPreview(null);
    setIsEditing(false);
    setEditIndex(null);

  };

  const handleAddOrEdit = () => {

    const { name, amount, category, asset, date } = expense;
    if (!name || !amount || !category || !asset || !date) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (isEditing && editIndex !== null) {
      const updated = [...expenses];
      updated[editIndex] = { ...expense };
      setExpenses(updated);
    } else {
      setExpenses([...expenses, { ...expense }]);
    }
    resetForm();
  };

  const handleEdit = (index: number) => {
    const exp = expenses[index];
    setExpense(exp);
    setPreview(exp.image);
    setIsEditing(true);
    setEditIndex(index);

  };
const handleDelete = (index: number) => {
  const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");
  if (!shouldDelete) return;
  const updated = expenses.filter((_, i) => i !== index);
  setExpenses(updated);
  resetForm();
};
const handleSend = () => {
  if (expenses.length === 0) {
    alert("보낼 지출 내역이 없습니다.");
    return;
  }
  console.log("전송된 지출 내역:", expenses);
  alert("지출 내역이 전송되었습니다!");
  
};

  return (

    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <button onClick={() => navigate('/finlist/finformIncome')} style={{ padding: '10px 20px', fontSize: 16, background: '#1953d6', borderRadius: '10px', color:'white'}}><b>수입 입력</b></button>
        <button onClick={() => navigate('/finlist/finformExpense')} style={{ padding: '10px 20px', fontSize: 16, background:'#1953d6', borderRadius: '10px' ,color:'white'}}><b>지출 입력</b></button>
      </div>

      <h2>Walley의 지출 관리</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      
        <input type="text" name="name" placeholder="내용"  value={expense.name} onChange={handleChange}/>
        <select name="category" value={expense.category} onChange={handleChange}>
          <option value="">분류 선택</option>
          <option value="식비">🍝식비</option>
          <option value="교통비">🚐교통비</option>
          <option value="쇼핑">🛍️쇼핑</option>
          <option value="적금">🗃️적금</option>
          <option value="문화생활">🍿문화생활</option>
          <option value="그외">▪️그외</option>
        </select>

        <select name="asset" value={expense.asset} onChange={handleChange}>
          <option value="">자산 선택</option>
          <option value="하나은행">하나은행</option>
          <option value="국민은행">국민은행</option>
          <option value="농협은행">농협은행</option>
          <option value="신한은행">신한은행</option>
          <option value="우리은행">우리은행</option>
        </select>

        <input type="number" name="amount" placeholder="금액" value={expense.amount} onChange={handleChange}/>
        <input type="date" name="date" value={expense.date} onChange={handleChange} />

        <input type="file" name="image" accept="image/*" onChange={handleChange} />

        {preview && (
      <img src={preview} alt="Preview" style={{ width: 150, height: 150, objectFit: 'cover' }} />)}

        <button onClick={handleAddOrEdit} style={{ background:'#92b2dc', color:'white' }}> 
            {isEditing ? '수정 완료' : '지출 추가'}
        </button>
      </div>
  <hr />
      <h3>💰지출 목록</h3>
     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>내용</th>
            <th>금액</th>
            <th>분류</th>
            <th>자산</th>
            <th>날짜</th>
            <th>이미지</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>₩{Number(item.amount).toLocaleString()}</td>
              <td>{item.category}</td>
              <td>{item.asset}</td>
              <td>{item.date}</td>
              <td>{item.image && <img src={item.image} alt="img" width="50" height="50" />}</td>
              <td><button onClick={() => handleEdit(i)}>🖊</button></td>
              <td><button onClick={() => handleDelete(i)}>🗑</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSend} style={{ padding: '10px 20px', fontSize: 16, background:'#1953d6', borderRadius: '10px',color:'white' }}><b>전송</b></button>
    </div>
    
  );

};



export default FinFormExpense;