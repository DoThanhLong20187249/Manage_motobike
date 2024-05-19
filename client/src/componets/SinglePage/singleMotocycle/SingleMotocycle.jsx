import { useEffect, useState } from "react";
import "./singleMotocycle.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import { updateCustomer, updateMotocycle } from "../../../redux/apiRequest";


const SingleMotocycle = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [newData, setNewData] = useState({});
  const dataInStore = useSelector(
    (state) => state.motocycle.singleMotocycle?.data
  );
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (dataInStore) {
      setNewData(dataInStore);
      setIsDataLoaded(true);
    }
  }, [dataInStore]);

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newData);
    updateMotocycle(newData.id, newData, user?.token, dispatch, navigate);
  };

  return (
    <>
      {isDataLoaded ? (
        <>
          <div className="customer-registration-main">
            <h1>Thông tin chi tiết</h1>
            <form
              onSubmit={handleSubmit}
              className="form-customer-registration"
            >
              <div className="form-body">
                <div className="form-left">
                  <div className="form-group">
                    <label htmlFor="customer_name">Tên khách hàng</label>
                    <input
                      className="input-field"
                      type="text"
                      id="customer_name"
                      name="customer_name"
                      placeholder="Nhập tên khách hàng"
                      onChange={(e) => handleChange(e)}
                      value={newData.customer_name}
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
                      onChange={(e) => handleChange(e)}
                      value={newData.customer_address}
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
                      onChange={(e) => handleChange(e)}
                      value={newData.customer_phone}
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
                      onChange={(e) => handleChange(e)}
                      value={newData.customer_email}
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
                      onChange={(e) => handleChange(e)}
                      value={newData.customer_age}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="customer_gender">Giới tính</label>
                    <select
                      className="input-field"
                      id="customer_gender"
                      name="customer_gender"
                      onChange={(e) => handleChange(e)}
                      value={newData.customer_gender}
                    >
                      <option value="">lựa chọn</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>
                <div className="form-right">
                  <div className="form-group">
                    <label htmlFor="motocycle_name">Tên xe máy</label>
                    <input
                      className="input-field"
                      type="text"
                      id="motocycle_name"
                      name="motocycle_name"
                      placeholder="Nhập tên xe máy"
                      onChange={(e) => handleChange(e)}
                      value={newData.motocycle_name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="motocycle_color">Màu xe</label>
                    <input
                      className="input-field"
                      type="text"
                      id="motocycle_color"
                      name="motocycle_color"
                      placeholder="Nhập màu xe"
                      onChange={(e) => handleChange(e)}
                      value={newData.motocycle_color}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="motocycle_brand">Hãng xe</label>
                    <input
                      className="input-field"
                      type="text"
                      id="motocycle_brand"
                      name="motocycle_brand"
                      placeholder="Nhập hãng xe"
                      onChange={(e) => handleChange(e)}
                      value={newData.motocycle_brand}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="motocycle_number">Biển số xe</label>
                    <input
                      className="input-field"
                      type="text"
                      id="motocycle_number"
                      name="motocycle_number"
                      placeholder="Nhập biển số xe"
                      onChange={(e) => handleChange(e)}
                      value={newData.motocycle_number}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="motocycle_year">Năm sản xuất</label>
                    <input
                      className="input-field"
                      type="text"
                      id="motocycle_year"
                      name="motocycle_year"
                      placeholder="Nhập năm sản xuất"
                      onChange={(e) => handleChange(e)}
                      value={newData.motocycle_year}
                    />
                  </div>
                </div>
              </div>
              <div className="button-group">
                <button className="btn-submit" type="submit">
                  Cập nhật thông tin
                </button>
                <button className="btn-cancer">
                  <Link to="/motocycle">Quay lại</Link>
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          {" "}
          <Loading />{" "}
        </>
      )}
    </>
  );
};

export default SingleMotocycle;
