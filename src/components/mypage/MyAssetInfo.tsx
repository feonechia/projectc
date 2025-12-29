import React from 'react'

const MyAssetInfo: React.FC = () => {

    return (
            <table>
                <tbody>
                    <tr>
                        <th>자산 합계</th>
                        <td style={{textAlign:'right'}}> 3,000,000,000</td>
                    </tr>
                    <tr>
                        <th>부채 합계</th>
                        <td style={{textAlign:'right'}}>1,000,000</td>
                    </tr>
                </tbody>
            </table>
   )
}

export default MyAssetInfo