import { useEffect, useState } from "react";
import "./singleEmployee.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateEmployee } from "../../../redux/apiRequest";

const SingleEmployee = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const singleEmployeeData = useSelector(
    (state) => state.employee.singleEmployee.data
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [employee, setEmployee] = useState({
    id: "",
    name_employee: "",
    phone_employee: "",
    address_employee: "",
    position_employee: "",
    email_employee: "",
    password_employee: "",
    age_employee: "",
    gender_employee: "",
    shop: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (singleEmployeeData && singleEmployeeData.data)  {
      setEmployee({
        id: singleEmployeeData?.data.employee_id || "",
        name_employee: singleEmployeeData?.data.name_employee   || "",
        phone_employee: singleEmployeeData?.data.phone_employee || "",
        address_employee: singleEmployeeData?.data.address_employee || "",
        position_employee: singleEmployeeData?.data.position_employee || "",
        email_employee: singleEmployeeData?.data.email_employee || "",
        password_employee: singleEmployeeData?.data.password_employee || "",
        age_employee: singleEmployeeData?.data.age_employee || "",
        gender_employee: singleEmployeeData?.data.gender_employee || "",
      });
      setIsDataLoaded(true);
    }
  }, [singleEmployeeData]);

 

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
3

  const handleSumbit = (e) => {
    e.preventDefault();
    const { id, ...employeeData } = employee;
    updateEmployee(id, employeeData, user?.token, dispatch, navigate);
  };

  return (
    <>
      {isDataLoaded && (
        <>
          <div className="single-employee-container">
            <div className="single-employee-main">
              <h1>Thông tin nhân viên</h1>
              <h2>{singleEmployeeData?.data.shop_name}</h2>
              <form action="" className="form-single-employee">
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
                        value={employee.name_employee}
                        onChange={(e) => {
                          setEmployee({
                            ...employee,
                            name_employee: e.target.value,
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
                        value={employee.phone_employee}
                        onChange={(e) => {
                          setEmployee({
                            ...employee,
                            phone_employee: e.target.value,
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
                        value={employee.address_employee}
                        onChange={(e) => {
                          setEmployee({
                            ...employee,
                            address_employee: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="position">Chức vụ</label>
                      <input
                        className="input-field"
                        type="text"
                        id="position"
                        name="position"
                        placeholder="Nhập chức vụ"
                        value={employee.position_employee}
                        onChange={(e) => {
                          setEmployee({
                            ...employee,
                            position_employee: e.target.value,
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
                        value={employee.email_employee}
                        onChange={(e) => {
                          setEmployee({
                            ...employee,
                            email_employee: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Mật khẩu</label>
                      <div className="password-container">
                        <input
                          className="input-field"
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          required
                          placeholder="Nhập mật khẩu"
                          value={employee.password_employee}
                          onChange={(e) => {
                            setEmployee({
                              ...employee,
                              password_employee: e.target.value,
                            });
                          }}
                        />
                        <button
                          type="button"
                          className="toggle-password"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? "Ẩn" : "Hiện"}
                        </button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="age">Tuổi</label>
                      <input
                        className="input-field"
                        type="text"
                        id="age"
                        name="age"
                        placeholder="Nhập tuổi"
                        value={employee.age_employee}
                        onChange={(e) => {
                          setEmployee({
                            ...employee,
                            age_employee: e.target.value,
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
                        value={employee.gender_employee}
                        onChange={(e) => {
                          setEmployee({
                            ...employee,
                            gender_employee: e.target.value,
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
                    <Link to="/employee">Quay lại</Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleEmployee;
