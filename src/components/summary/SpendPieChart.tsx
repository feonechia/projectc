import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { name: '카페', value: 400 },
  { name: '식사', value: 300 },
  { name: '교통', value: 200 },
  { name: '쇼핑', value: 100 },
  { name: '대출', value: 500}
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','red'];

const total = data.reduce((sum, item) => sum + item.value, 0);

export default function SpendPieChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%" cy="50%"
          innerRadius={60}
          outerRadius={100}
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <text
          x="50%" y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={18}
          fontWeight="bold"
        >
          지출총합: {total}
        </text>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}