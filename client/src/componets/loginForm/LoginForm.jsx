import { useState } from "react";
import "../../styles/LoginForm.css";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmployee, setIsEmployee] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(isEmployee)
  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
      isEmployee: isEmployee,
    };

    LoginUser(user, dispatch, navigate);
  };


  return (
    <div className="login-form">
      <div className="form-content">
        <h1>Đăng Nhập</h1>
        <div className="input-box">
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <RiLockPasswordFill className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" name="isEmployee" onChange={(e) => setIsEmployee(e.target.checked)}/>
            Tôi là nhân viên 
          </label>
          <a href="#">Quên mật khẩu?</a>
        </div>
        <button onClick={handleLogin} id="btn-login">
          Login
        </button>
        <div className="register-link">
          <p>
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
