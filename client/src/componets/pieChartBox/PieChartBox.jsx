import "../../styles/pieChartBox.scss";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Săm xe", value: 400, color: "#0088FE" },
  { name: "Dầu", value: 300, color: "#00C49F" },
  { name: "Nhớt", value: 300, color: "#FFBB28" },
  { name: "Lốp xe", value: 200, color: "#FF8042" },
];

const PieChartBox = () => {
  return (
    <div className="pie-chart-box">
      <h1 className="pie-chart-title">Top Sản phẩm</h1>
      <div className="chart">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={800}>
            <Pie
              data={data}
              // cx={120}
              // cy={200}
              innerRadius={'70%'}
              outerRadius={'90%'}
              // fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) =>(
            <div className="option" key={item.name}>
              <div className="title">
                <div className="dot" style={{background: item.color}}></div>
                <span>{item.name}</span>
              </div>
              <span>{item.value}</span>
            </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
