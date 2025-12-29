import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import React from 'react'

const data = [
  { name: '1월', sales: 400, cost: 240 },
  { name: '2월', sales: 300, cost: 139 },
  { name: '3월', sales: 500, cost: 180 },
  { name: '4월', sales: 200, cost: 300 },
  { name: '5월', sales: 350, cost: 250 },
  { name: '6월', sales: 450, cost: 320 }
];

export default function Chart () {
  return (
     <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} name="수입" />
        <Line type="monotone" dataKey="cost" stroke="#82ca9d" strokeWidth={2} name="지출" />
      </LineChart>
    </ResponsiveContainer>
  )
}
