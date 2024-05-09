import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.jpg";
import "../../styles/navbar.scss";
import { IoIosSearch, IoIosNotificationsOutline} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const nameUser = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navagate = useNavigate();

  const handleLogOut = () => {

    navagate("/login");
  }
  return (
    <div className="navbar">
      <div className="logo-content">
        <img className="logo" src={logo} alt="logo-hust" />
        <span>HUST-SOICT</span>
      </div>
      <div className="icons">
        <IoIosSearch  className="icon" />
        <div className="notificantion">
          <IoIosNotificationsOutline  className="icon" />
        </div>
        <div className="user">
            <img src={avatar} alt="Avatar-user" />
            <span>{nameUser.info.name}</span>
        </div>
        <span  onClick={() => handleLogOut() } className="logout">Đăng xuất</span>
      </div>
    </div>
  );
};

export default NavBar;
