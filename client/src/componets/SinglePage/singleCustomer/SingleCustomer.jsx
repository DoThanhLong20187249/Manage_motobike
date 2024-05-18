import { Link, useNavigate } from "react-router-dom";
import "./singleCustomer.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../../redux/apiRequest";
import Loading from "../../Loading/Loading";

const SingleCustomer = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [customer, setCustomer] = useState({
    customer_id: "",
    customer_name: "",
    customer_phone: "",
    customer_address: "",
    customer_email: "",
    customer_gender: "",
    customer_age: "",
  });
  const [isDataloaded, setIsDataLoaded] = useState(false);
  const singleCustomerData = useSelector(
    (state) => state.customer.singleCustomer.data
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(customer);

  useEffect(() => {
    if (singleCustomerData) {
      setCustomer({
        customer_id: singleCustomerData.id,
        customer_name: singleCustomerData.customer_name,
        customer_phone: singleCustomerData.customer_phone,
        customer_address: singleCustomerData.customer_address,
        customer_email: singleCustomerData.customer_email,
        customer_gender: singleCustomerData.customer_gender,
        customer_age: singleCustomerData.customer_age,
      });
      setIsDataLoaded(true);
    }
  }, [singleCustomerData]);

  const handleSumbit = (e) => {
    e.preventDefault();

    updateCustomer(
      customer.customer_id,
      customer,
      user?.token,
      dispatch,
      navigate
    );

    console.log("submit");
  };
  return (
    <>
      {isDataloaded ? (
        <>
          <div className="single-customer-container">
            <div className="single-customer-main">
              <h1>Thông tin Khách Hàng</h1>
              <h2>{user?.shop_name}</h2>
              <form action="" className="form-single-customer">
                <div className="form-body">
                  <div className="form-left">
                    <div className="form-group">
                      <label htmlFor="name">Họ và tên</label>
                      <input
                        className="input-field"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nhập tên nhân viên"
                        value={customer.customer_name}
                        onChange={(e) => {
                          setCustomer({
                            ...customer,
                            customer_name: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Số điện thoại</label>
                      <input
                        className="input-field"
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Nhập số điện thoại"
                        value={customer.customer_phone}
                        onChange={(e) => {
                          setCustomer({
                            ...customer,
                            customer_phone: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Địa chỉ</label>
                      <input
                        className="input-field"
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Nhập địa chỉ"
                        value={customer.customer_address}
                        onChange={(e) => {
                          setCustomer({
                            ...customer,
                            customer_address: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-right">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        className="input-field"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Nhập email"
                        value={customer.customer_email}
                        onChange={(e) => {
                          setCustomer({
                            ...customer,
                            customer_email: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="age">Tuổi</label>
                      <input
                        className="input-field"
                        type="text"
                        id="age"
                        name="age"
                        placeholder="Nhập tuổi"
                        value={customer.customer_age}
                        onChange={(e) => {
                          setCustomer({
                            ...customer,
                            customer_age: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Giới tính</label>
                      <input
                        className="input-field"
                        type="text"
                        id="gender"
                        name="gender"
                        placeholder="Nhập giới tính"
                        value={customer.customer_gender}
                        onChange={(e) => {
                          setCustomer({
                            ...customer,
                            customer_gender: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="button-group">
                  <button
                    onClick={(e) => handleSumbit(e)}
                    className="btn-submit"
                    type="submit"
                  >
                    Cập nhật thông tin
                  </button>
                  <button className="btn-cancer">
                    <Link to="/customer">Quay lại</Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default SingleCustomer;
