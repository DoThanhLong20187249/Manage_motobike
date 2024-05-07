import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.jpg";
import "../../styles/navbar.scss";
import { IoIosSearch, IoIosNotificationsOutline,IoIosSettings  } from "react-icons/io";
import { useState } from "react";

const NavBar = () => {
  const [name, setName] = useState()

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
            <span>{name}</span>
        </div>
        <IoIosSettings className="icon" /> 
      </div>
    </div>
  );
};

export default NavBar;
