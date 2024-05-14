import { Link, useNavigate } from "react-router-dom";
import "./registerFrom.scss";
import { useState } from "react";
import { RegisterUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

const RegisterForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [shopName, setShopName] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const handleSubmit = (e) => {
        e.preventDefault();
        const newCustomer = {
          shop_owner_name: fullName,
          shop_name: shopName,
          hotline: phoneNumber,
          shop_address: address,
          email: email,
          password: password
        }
        
        RegisterUser(newCustomer, dispatch, navigate);
    }


  return (
    <div className="register-form-container">
      <div className="card-register">
        <h1>ĐĂNG KÝ</h1>
        <form >
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
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <span className="errorMsg">Mật khẩu không được để trống</span> */}
          </div>
          <div className="form-group">
            <input
              name="confirmPass"
              type="text"
              id="inputCreatePost"
              placeholder="Họ và tên "
              className="form-field"
              onChange={(e) => setFullName(e.target.value)}
            />
            {/* <span className="errorMsg"></span> */}
          </div>
          <div className="form-group">
            <input
              name="fullName"
              id="inputCreatePost"
              placeholder="Tên xưởng xe máy của bạn"
              className="form-field"
              onChange={(e) => setShopName(e.target.value)}
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
          <button onClick={handleSubmit} className="button" type="submit">
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
