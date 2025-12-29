import React from 'react'

interface MemoVO{
    title:string;
    conts:string;
}


const LifeBoardContainer: React.FC = () => {

    return (
            <table>
                <tbody>
                    <tr>
                        <th>5월 지출 합계</th>
                        <td style={{textAlign:'right'}}> 500,000</td>
                    </tr>
                    <tr>
                        <th>5월 수입 합계</th>
                        <td style={{textAlign:'right'}}> 1,000,000</td>
                    </tr>
                </tbody>
            </table>
   )
}

export default LifeBoardContainer