import * as React from 'react'
import styles from './summary.module.css';
import { NavLink } from 'react-router-dom';
import ChartApp from './ChartApp'
import ReturnPieChart from './ReturnPieChart';
import SpendPieChart from './SpendPieChart';
 
const Summary: React.FC = () => {
   // true, false에 따라서 드랍다운 여부를 결정하기 위한 상태값
    const [isOpen,setIsOpen] = React.useState(false);
    const [isOpen2,setIsOpen2] = React.useState(false);
    const [isOpen3,setIsOpen3] = React.useState(false);
    const [isOpen4,setIsOpen4] = React.useState(false);
    // dom 요소에 접근할 useRef
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    // toggleDropdown이 클릭이 될 때 useState 값에 대한 toggle처리를 한다
    const allDropdown = () => {setIsOpen((prev) => !prev)}
    const toggleDropdown = () => {setIsOpen2((prev) => !prev)}
    const toggleDropdown2 = () => {setIsOpen3((prev) => !prev)}
    const toggleDropdown3 = () => {setIsOpen4((prev) => !prev)}
   
   
  return (
   <div>
    <h2>자산</h2>
    <div className={styles.container}>
   
    <div className={styles.column2}>
      <h2 style={{borderBottom:'solid #000',height:'30px',marginTop:'5px'}}>전체</h2>
      <div className={styles.all}>
        <tr>
        <th>수익</th>
        <td>10,000,000 원</td>
        </tr>
        <tr>
        <th>지출</th>
        <td>5,000,000 원</td>
        </tr>
        <tr>
        <th>총합</th>
        <td>5,000,000 원</td>
        </tr>
        </div>
        <div>
        <ChartApp />
        </div>
        <div>
          <h2 style={{backgroundColor:'skyblue',color:'blue',borderRadius:'6px'}}>수익</h2>
        </div>
      <div className={styles.all}>
        <ReturnPieChart />
      </div>
      <div>
          <h2 style={{backgroundColor:'pink',color:'orangered',borderRadius:'6px'}}>지출</h2>
        </div>
      <div className={styles.all}>
        {/* <th>지출</th> */}
        <SpendPieChart />
      </div>
    </div>
    <div ref={dropdownRef} className={styles.column1}>
     <tr onClick={allDropdown}>
      <th>전체<span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span></th>
      <th>25,000,000 원</th>
      {isOpen && (
      <div className={styles.a}>
      <td>
      <p>수익</p>
      <p>2,500,000 원</p>
      </td>
      <td>
      <p>지출</p>
      <p>2,300,000 원</p>
      </td>
      </div>
        )}
     </tr>
     <tr onClick={toggleDropdown}>
      <th>현금<span className={styles.arrow}>{isOpen2 ? '▲' : '▼'}</span></th>
      <th>5,000,000</th>
      {isOpen2 && (
      <div className={styles.a}>
      <td>
      <p>수익</p>
      <p>5,000,000 원</p>
      </td>
      <td>
      <p>지출</p>
      <p>1,000,000 원</p>
      </td>
      </div>
      )}
     </tr>
     <tr onClick={toggleDropdown2}>
      <th>카드<span className={styles.arrow}>{isOpen3 ? '▲' : '▼'}</span></th>
      <th>12,000,000</th>
      {isOpen3 && (
      <div className={styles.a}>
      <td>
      <p>하나은행</p>
      <p>2,500,000 원</p>
      </td>
      <td>
      <p>국민은행</p>
      <p>9,500,000 원</p>
      </td>
      <td>
      <p>우리은행</p>
      <p>9,500,000 원</p>
      </td>
      <td>
      <p>신한은행</p>
      <p>9,500,000 원</p>
      </td>
      </div>
      )}
     </tr>
     <tr onClick={toggleDropdown3}>
      <th>은행<span className={styles.arrow}>{isOpen4 ? '▲' : '▼'}</span></th>
      <th>5,000,000</th>
      {isOpen4 && (
        <div className={styles.a}>
      <td>
      <p>하나은행</p>
      <p>2,500,000 원</p>
      </td>
      <td>
      <p>국민은행</p>
      <p>2,300,000 원</p>
      </td>
      </div>
      )}
     </tr>
    </div>
   </div>
   </div>
  )
}
export default Summary
 