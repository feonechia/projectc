import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


interface DataType {
    name: string;
    value: number;
}

interface ChartProps {
    color: string;
    label: string;
    data: DataType[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red'];

const AnalyticsPieChart: React.FC<ChartProps> = ({ color, label, data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return (
        <ResponsiveContainer width="60%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%" cy="50%"
                    innerRadius={0}
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
                    fontSize={14}
                >
                    {label}:{total}
                </text>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};
export default AnalyticsPieChart;
