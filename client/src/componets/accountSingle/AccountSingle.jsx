import { useSelector } from "react-redux";
import "./accountSingle.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountSingle = ({ setOpenEdit }) => {
  const singleAcountInfo = useSelector(
    (state) => state.account.account.singleAccount
  );
  const navigate = useNavigate();

  const [name, setName] = useState(singleAcountInfo.data.name);
  const [email, setEmail] = useState(singleAcountInfo.data.email);
  const [phone, setPhone] = useState(singleAcountInfo.data.phone);
  const [address, setAddress] = useState(singleAcountInfo.data.address);
  const [role, setRole] = useState(singleAcountInfo.data.role);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (role === "employee") {
      console.log("employee");
      navigate("/account");
      setOpenEdit(false);
    } else if (role === "admin") {
      console.log("admin");
      navigate("/account");
      setOpenEdit(false);
    } else if (role === "customer") {
      console.log("customer");
      navigate("/account");
      setOpenEdit(false);
    }
  };

  return (
    <>
      {singleAcountInfo && (
        <div className="account-single-container">
          <div className="account-single-context">
            <span className="close" onClick={() => setOpenEdit(false)}>
              X
            </span>
            <div className="account-single-header">
              <h1>Thông tin tài khoản </h1>
            </div>
            <form className="account-single-content" onSubmit={handleOnSubmit}>
              <div className="account-single-content-item">
                <label htmlFor="name">Tên</label>
                <input
                  className="form-field"
                  type="text"
                  id="name"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="account-single-content-item">
                <label htmlFor="email">Email</label>
                <input
                  className="form-field"
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="account-single-content-item">
                <label htmlFor="phone">Điện Thoại</label>
                <input
                  className="form-field"
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="account-single-content-item">
                <label htmlFor="address">Địa chỉ</label>
                <input
                  className="form-field"
                  type="text"
                  id="address"
                  name="adress"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="account-single-content-item">
                <label htmlFor="role">Quyền hạn</label>
                <select
                  className="form-field"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="guest">Guest</option>
                </select>
              </div>
              <button className="btn">Thay đổi</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountSingle;
