import TopBox from '../componets/topBox/TopBox';
import '../styles/home.scss'
import ChartBox from '../componets/charBox/ChartBox';
import {chartBoxUser , chartBoxRevenue, chartBoxConversion, chartBoxProduct } from '../componets/menu/MenuData'
const Home = () => {
    return (
        <div className="home">
            <div className='box box1'>
                <TopBox />
            </div>
            <div className='box box2'><ChartBox {...chartBoxUser}/></div>
            <div className='box box3'><ChartBox {...chartBoxConversion}/></div>
            <div className='box box4'></div>
            <div className='box box5'><ChartBox {...chartBoxRevenue}/></div>
            <div className='box box6'><ChartBox {...chartBoxProduct}/></div>
            <div className='box box7'>Box7</div>
            <div className='box box8'>Box8</div>
            <div className='box box9'>Box9</div>
        </div>
    );
};

export default Home;