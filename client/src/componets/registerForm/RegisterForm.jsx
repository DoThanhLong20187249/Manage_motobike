import { Link } from "react-router-dom";
import "./registerFrom.scss";
import { useState } from "react";

const RegisterForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        const newCustomer = {
            email: email,
            password: password,
            fullName: fullName,
            phoneNumber: phoneNumber,
            address: address
        }
    }


  return (
    <div className="register-form-container">
      <div className="card-register">
        <h1>ĐĂNG KÝ</h1>
        <form action={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="email"
              id="inputCreatePost"
              placeholder="Email"
              className="form-field"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <span className="errorMsg">Email không được để trống</span> */}
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              id="inputCreatePost"
              placeholder="Mật khẩu"
              className="form-field"
            />
            {/* <span className="errorMsg">Mật khẩu không được để trống</span> */}
          </div>
          <div className="form-group">
            <input
              name="confirmPass"
              type="password"
              id="inputCreatePost"
              placeholder="Nhập lại mật khẩu"
              className="form-field"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <span className="errorMsg">Nhập lại chính xác mật khẩu</span> */}
          </div>
          <div className="form-group">
            <input
              name="fullName"
              id="inputCreatePost"
              placeholder="Họ và tên"
              className="form-field"
              onChange={(e) => setFullName(e.target.value)}
            />
            {/* <span className="errorMsg">Họ và tên không được để trống</span> */}
          </div>
          <div className="form-group">
            <input
              name="phoneNumber"
              id="inputCreatePost"
              placeholder="Số điện thoại"
              className="form-field"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {/* <span className="errorMsg">Số điện thoại không được để trống</span> */}
          </div>
          <div className="form-group">
            <input
              name="address"
              id="inputCreatePost"
              placeholder="Địa chỉ"
              className="form-field"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Đăng ký
          </button>
          <div className="register">
            Nếu đã có tài khoản, hãy <Link className="text" to="/login">Đăng nhập</Link> tại đây
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
