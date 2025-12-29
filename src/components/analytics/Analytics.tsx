import * as React from 'react'
import styles from './analytics.module.css';

import { DatePicker } from 'antd';
import AnalyticsLineChart from './AnalyticsLineChart';
import { useEffect, useState } from 'react';
import AnalyticsPieChart from './AnalyticsPieChart';

const incomeData = [
  { name: '1월', goal: 300, cost: 240 },
  { name: '2월', goal: 300, cost: 139 },
  { name: '3월', goal: 300, cost: 180 },
  { name: '4월', goal: 300, cost: 300 },
  { name: '5월', goal: 300, cost: 250 },
  { name: '6월', goal: 300, cost: 320 },
  { name: '7월', goal: 300, cost: 240 },
  { name: '8월', goal: 300, cost: 139 },
  { name: '9월', goal: 300, cost: 180 },
  { name: '10월', goal: 300, cost: 300 },
  { name: '11월', goal: 300, cost: 250 },
  { name: '12월', goal: 300, cost: 320 }
];

const expenseData = [
  { name: '1월', goal: 300, cost: 440 },
  { name: '2월', goal: 300, cost: 139 },
  { name: '3월', goal: 300, cost: 180 },
  { name: '4월', goal: 300, cost: 100 },
  { name: '5월', goal: 300, cost: 250 },
  { name: '6월', goal: 300, cost: 120 },
  { name: '7월', goal: 300, cost: 240 },
  { name: '8월', goal: 300, cost: 339 },
  { name: '9월', goal: 300, cost: 580 },
  { name: '10월', goal: 300, cost: 300 },
  { name: '11월', goal: 300, cost: 350 },
  { name: '12월', goal: 300, cost: 320 }
];

const pieIncomeData = [
  { name: '월급', value: 1500 },
  { name: '보너스', value: 300 },
];

const pieExpenseData = [
  { name: '카페', value: 400 },
  { name: '식사', value: 300 },
  { name: '교통', value: 200 },
  { name: '쇼핑', value: 100 },
  { name: '대출', value: 500 }
];

interface DataType {
  name: string;
  goal: number;
  cost: number;
}

interface PieDataType {
  name: string;
  value: number;
}
const Analytics: React.FC = () => {
  const [goal, setGoal] = useState(0);
  const [color, setColor] = useState('#1F88FF');
  const [label, setLabel] = useState('수입');
  const [data, setData] = useState<DataType[]>([]);
  const [pieData, setPieData] = useState<PieDataType[]>([]);
  const [selectedFruit, setSelectedFruit] = useState(0);

  useEffect(() => {
    setData(incomeData);
    setPieData(pieIncomeData);
    setGoal(79);
  }, []);

  const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value === '수입' ? 0 : 1;
    console.log("onChangeRadio:" + e.target.value)
    if (value === 0) {
      setSelectedFruit(0);
      setData(incomeData);
      setColor("#1F88FF");
      setLabel("수입");
      setPieData(pieIncomeData);
    } else {
      setSelectedFruit(1);
      setData(expenseData);
      setColor("#FF5C55");
      setLabel("지출");
      setPieData(pieExpenseData)
    }
  }

  return (
    <div>
      <h2>통계</h2>
      <div className={styles.container}>
        <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
          <span>전체 예산</span>
          <span>{goal}% 사용</span>
        </div>
        <hr />

        <div>
          <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
            <div >
              <label><input type="radio" name="temp" value="수입" onChange={onChangeRadio} checked={0 === selectedFruit} className={styles.input}/>
                <span className={styles.title}
                  style={{
                    border: 0 === selectedFruit ? '1px solid #1F88FF' : '1px solid lightgray',
                    backgroundColor: 0 === selectedFruit ? ' #1F88FF' : 'lightgray',
                    color: 0 === selectedFruit ? 'white' : 'currentcolor'
                  }}
                >
                  수입
                </span>
              </label>
              <label><input type="radio" name="temp" value="지출" onChange={onChangeRadio} checked={1 === selectedFruit} className={styles.input} />
                <span className={styles.title}
                  style={{
                    border: 1 === selectedFruit ? '1px solid #FF5C55' : '1px solid lightgray',
                    backgroundColor: 1 === selectedFruit ? ' #FF5C55' : 'lightgray',
                    color: 1 === selectedFruit ? 'white' : 'currentcolor'
                  }}
                >
                  지출
                </span>
              </label>
            </div>
            <DatePicker
              picker="month"
              format="YY. MM"
            />
          </div>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
            <AnalyticsPieChart color={color} label={label} data={pieData} />
            <AnalyticsLineChart color={color} label={label} data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
