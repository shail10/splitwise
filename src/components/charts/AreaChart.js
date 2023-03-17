import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AreaChartContainer = ({ data }) => {
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data} margin={{ top: 50 }} stackOffset="wiggle">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="xLabel"
          label={{
            value: 'Category',
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
        <Area type="monotone" dataKey="amount" stroke="#5bc4a5" fill="#e5fbf5" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartContainer;
