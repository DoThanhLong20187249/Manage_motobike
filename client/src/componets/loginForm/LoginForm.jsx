import { useState } from "react";
import "../../styles/LoginForm.css";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";


const LoginForm = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isEmployee, setIsEmployee] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
      password: Yup.string().required("Mật khẩu không được để trống"),
    }),
  });

  const handleLogin = (e) => {
    e.preventDefault();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        return;
      } else {
        const user = {
          email: formik.values.email,
          password: formik.values.password,
          isEmployee: isEmployee,
        };
        LoginUser(user, dispatch, navigate);
      }
    });
  };

  console.log(formik.values);

  return (
    <div className="login-form">
      <div className="form-content">
        <h1>Đăng Nhập</h1>
        <div className="input-box">
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            required
            onChange={formik.handleChange}
          />
          <FaUser className="icon" />
          {formik.errors.email ? (
            <span className="error">{formik.errors.email}</span>
          ) : null}
        </div>
        <div className="input-box">
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Mật khẩu"
            required
            onChange={formik.handleChange}
          />
          <RiLockPasswordFill className="icon" />
          {formik.errors.password ? (
            <span className="error">{formik.errors.password}</span>
          ) : null}
        </div>
        <div className="remember-forgot">
          <label>
            <input
              type="checkbox"
              name="isEmployee"
              onChange={(e) => setIsEmployee(e.target.checked)}
            />
            Tôi là nhân viên
          </label>
          <a href="#">Quên mật khẩu?</a>
        </div>
        <button
          onClick={(e) => {
            handleLogin(e);
          }}
          id="btn-login"
        >
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
