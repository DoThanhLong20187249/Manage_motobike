import TopBox from '../componets/topBox/TopBox';
import '../styles/home.scss'
import ChartBox from '../componets/charBox/ChartBox';
import {chartBoxUser , chartBoxRevenue, chartBoxConversion, chartBoxProduct 
,barChartBoxRevenue, barChartBoxVisit} from '../componets/menu/MenuData'
import BarChatBox from '../componets/barChatBox/BarChatBox';
import PieChartBox from '../componets/pieChartBox/PieChartBox';
import BigChartBox from '../componets/bigChartBox.jsx/BigChartBox';
const Home = () => {
    return (
        <div className="home">
            <div className='box box1'>
                <TopBox />
            </div>
            <div className='box box2'><ChartBox {...chartBoxUser}/></div>
            <div className='box box3'><ChartBox {...chartBoxConversion}/></div>
            <div className='box box4'><PieChartBox/></div>
            <div className='box box5'><ChartBox {...chartBoxRevenue}/></div>
            <div className='box box6'><ChartBox {...chartBoxProduct}/></div>
            <div className='box box7'><BigChartBox/></div>
            <div className='box box8'><BarChatBox {...barChartBoxRevenue}/></div>
            <div className='box box9'><BarChatBox {...barChartBoxVisit}/></div>
        </div>
    );
};

export default Home;