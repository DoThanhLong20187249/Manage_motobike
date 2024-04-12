import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';
import '../../styles/barChartBox.scss';


const BarChatBox = (props) => {
  return (
    <div className="bar-chart">
      <span className='bar-chart-title'>{props.title}</span>
      <div className="chart">
        <ResponsiveContainer width="100%" height={150}>
          <BarChart width={150} height={40} data={props.chartData}>
            <Bar dataKey={props.dataKey} fill={props.color} />
            <Tooltip
            contentStyle={{background:"#2a3447",borderRadius:"5px"}}
            labelStyle={{display:"none"}}
            cursor={{fill:"none"}}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChatBox;
