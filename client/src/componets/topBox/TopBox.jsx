import '../../styles/topBox.scss'
import { topDealUsers } from '../menu/MenuData';

const TopBox = () => {
    return (
        <div className='topBox'>
            <h1>Khách hàng</h1>
            <div className="list">
            {topDealUsers.map((user) => (
                <div className="listItems" key={user.id}>
                  <div className="user">
                    <img src={user.img} alt="" />
                    <div className="userTexts">
                        <span className="username">{user.username}</span>
                        <span className='email'>{user.email}</span>
                    </div>
                  </div>
                  {/* <span className='amount'>{user.amount} VND</span> */}
                </div>
            ))}
            </div>
        </div>
    );
};

export default TopBox;