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

interface DataType {
  name: string;
  goal: number;
  cost: number;
}

interface ChartProps {
  color: string;
  label: string;
  data:DataType[];
}

const ChartApp: React.FC<ChartProps> = ({ color,label,data }) => {
  return (

    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="goal" stroke="#F7CFCC" strokeWidth={2} name="목표" /> 
        <Line type="monotone" dataKey="cost" stroke={color} strokeWidth={2} name={label} />
      </LineChart>

    </ResponsiveContainer>
  )
};
export default ChartApp;
