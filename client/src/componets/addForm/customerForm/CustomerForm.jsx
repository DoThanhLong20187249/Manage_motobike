import { useState } from "react";
import "./customerForm.scss";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer } from "../../../redux/apiRequest";
import { useNavigate } from "react-router-dom";

const CustomerForm = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const shop_id = user?.shop_id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        customer_name: '',
        customer_address: '',
        customer_phone: '',
        customer_email: '',
        customer_age: '',
        customer_gender: ''
      });
    
      const handleChange = (e) => {
        setCustomer({
          ...customer,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const newCustomer = {
            shop_id: shop_id,
            ...customer
        }
        addCustomer(newCustomer, user?.token, dispatch, navigate)
        console.log(newCustomer);
      };
    
      return (
        <div className="customer-registration-container">
          <div className="customer-registration-main">
            <h1>Đăng ký khách hàng</h1>
            <form onSubmit={handleSubmit} className="form-customer-registration">
              <div className="form-body">
                <div className="form-group">
                  <label htmlFor="customer_name">Tên khách hàng</label>
                  <input
                    className="input-field"
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    placeholder="Nhập tên khách hàng"
                    value={customer.customer_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="customer_address">Địa chỉ</label>
                  <input
                    className="input-field"
                    type="text"
                    id="customer_address"
                    name="customer_address"
                    placeholder="Nhập địa chỉ"
                    value={customer.customer_address}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="customer_phone">Số điện thoại</label>
                  <input
                    className="input-field"
                    type="text"
                    id="customer_phone"
                    name="customer_phone"
                    placeholder="Nhập số điện thoại"
                    value={customer.customer_phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="customer_email">Email</label>
                  <input
                    className="input-field"
                    type="email"
                    id="customer_email"
                    name="customer_email"
                    placeholder="Nhập email"
                    value={customer.customer_email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="customer_age">Tuổi</label>
                  <input
                    className="input-field"
                    type="text"
                    id="customer_age"
                    name="customer_age"
                    placeholder="Nhập tuổi"
                    value={customer.customer_age}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="customer_gender">Giới tính</label>
                  <select
                    className="input-field"
                    id="customer_gender"
                    name="customer_gender"
                    value={customer.customer_gender}
                    onChange={handleChange}
                  >
                    <option value="">lựa chọn</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>
              <div className="button-group">
                <button className="btn-submit" type="submit">
                  Đăng kí
                </button>
              </div>
            </form>
          </div>
        </div>
      );
};

export default CustomerForm;