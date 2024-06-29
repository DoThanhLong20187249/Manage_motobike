
import avatar from "../../assets/avatar.jpg";
import "../../styles/navbar.scss";
import { IoIosSearch, IoIosNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const nameUser = useSelector((state) => state.auth.login?.currentUser);


  const navagate = useNavigate();

  const handleLogOut = () => {
    navagate("/login");
  };
  return (
    <div className="navbar">
      <div className="logo-content">
        <img className="logo" src="/src/assets/logo_moto.jpg" alt="logo-hust" />
        <span>{nameUser.shop_name}</span>
      </div>
      <div className="icons">
        <IoIosSearch className="icon" />
        <div className="notificantion">
          <IoIosNotificationsOutline className="icon" />
        </div>
        <div className="user">
          <img src={avatar} alt="Avatar-user" />
          <span>
            {nameUser.role_account === "manager"
              ? (nameUser.shop_owner_name || "unknown")
              : (nameUser.name_employee || "unknown")}
          </span>
        </div>
        <span onClick={() => handleLogOut()} className="logout">
          Đăng xuất
        </span>
      </div>
    </div>
  );
};

export default NavBar;
