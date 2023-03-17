import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis
          dataKey="xLabel"
          label={{
            value: 'Time',
            dy: 5,
            dx: 100,
          }}
        />
        <YAxis
          label={{
            value: 'Amount Spent',
            position: 'insideLeft',
            angle: -90,
            dy: -1,
          }}
        />
        <Tooltip />
        <Bar dataKey="amount" fill="#e5fbf5" stroke="#5bc4a5" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
