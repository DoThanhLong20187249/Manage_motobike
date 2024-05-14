import { useState } from "react";
import "../../styles/addForm.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../../redux/apiRequest";

const AddForm = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const [rePassword, setRePassword] = useState("");
  const [position_employee, setPosition_employee] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (position_employee === "receptionist") {
      const newEmployee = {
        name: name,
        phone: phone,
        address: address,
        email: email,
        gender: gender,
        age: age,
        password: password,
        position_employee: "Lễ tân",
        role_account: "receptionist",
        shop_id: user.info.id,
      };
      console.log(newEmployee);
      addEmployee(newEmployee, user?.token, dispatch, navigate);
    } else if (position_employee === "staff") {
      const newEmployee = {
        name: name,
        phone: phone,
        address: address,
        email: email,
        gender: gender,
        age: age,
        password: password,
        position_employee: "Thợ sửa chữa",
        role_account: "staff",
        shop_id: user.info.id,
      };
      console.log(newEmployee);
      addEmployee(newEmployee, user?.token, dispatch, navigate);
    }
  }

    return (
      <div className="form-container">
        <h1 className="form-title">Đăng ký nhân viên</h1>
        <form  className="form">
          <div className="form-main">
            <div className="form-left">
              <div className="form-group">
                <label htmlFor="name">Tên nhân viên</label>
                <input
                  className="input-field"
                  type="text"
                  id="name"
                  placeholder="Nhập tên nhân viên"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Tuổi</label>
                <input
                  className="input-field"
                  type="text"
                  id="age"
                  placeholder="Nhập tuổi nhân viên"
                  name="age"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  className="input-field"
                  type="text"
                  id="phone"
                  placeholder="Nhập số điện thoại"
                  name="phone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Địa chỉ</label>
                <input
                  className="input-field"
                  type="text"
                  id="address"
                  placeholder="Nhập địa chỉ"
                  name="address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="shop">Vị trí</label>
                <select
                  id=""
                  className="input-field"
                  
                  onChange={(e) => setPosition_employee(e.target.value)}
                >
                  <option value="receptionist">Lễ tân</option>
                  <option value="staff">Thợ sợ chữa</option>
                </select>
              </div>
            </div>
            <div className="form-right">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="input-field"
                  type="text"
                  id="email"
                  placeholder="Nhập email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <input
                  className="input-field"
                  type="password"
                  id="password"
                  placeholder="Nhập mật khẩu"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="re-password">Nhập lại mật khẩu</label>
                <input
                  className="input-field"
                  type="password"
                  id="re-password"
                  placeholder="Nhập lại mật khẩu"
                  onChange={(e) => {
                    setRePassword(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="shop">Giới Tính</label>
                <select
                  id=""
                  className="input-field"
              
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
            </div>
          </div>
          <button onClick={(e) => handleSubmit(e)}>Đăng kí</button>
        </form>
      </div>
    );
  };
export default AddForm;
