import '../../styles/LoginForm.css'
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";


const LoginForm = () => {
  return (
    <div className="login-form">
      <div className="form-content">
        <h1>Đăng Nhập</h1>
        <div className="input-box">
          <input type="text" placeholder='Email'required />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder='Mật khẩu'required />
          <RiLockPasswordFill className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox"  />
            Ghi nhớ
          </label>
          <a href="#">Quên mật khẩu?</a>
        </div>
        <button id='btn-login'>Login</button>
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
