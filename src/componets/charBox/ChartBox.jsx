import { Link } from "react-router-dom";
import "../../styles/charBox.scss";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";



const ChartBox = (props) => {
  return (
    <div className="chart-box">
      <div className="box-infor">
        <div className="box-infor-title">
          <img src={props.img} alt="logo-box-infor" />
          <span>{props.title}</span>
        </div>
        <h1>{props.number}</h1>
        <Link to="/users" style={{ color: props.color }}>
          View all
        </Link>
      </div>
      <div className="chart-infor">
        <div className="chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={props.dataChart}>
              <Tooltip
                contentStyle={{ backgroundColor: "none", border: "none" }}
                labelStyle={{ display: "none" }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-infor-text">
          <span
            className="percentage"
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span>
          <span className="duration">this month</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
