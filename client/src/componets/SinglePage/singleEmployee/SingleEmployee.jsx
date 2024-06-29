import { useEffect, useState } from "react";
import "./singleEmployee.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateEmployee } from "../../../redux/apiRequest";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../../Loading/Loading";

const SingleEmployee = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const singleEmployeeData = useSelector(
    (state) => state.employee.singleEmployee.data
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (singleEmployeeData && singleEmployeeData.data) {
      formik.setValues({
        id: singleEmployeeData.data.employee_id || "",
        name_employee: singleEmployeeData.data.name_employee || "",
        phone_employee: singleEmployeeData.data.phone_employee || "",
        address_employee: singleEmployeeData.data.address_employee || "",
        position_employee: singleEmployeeData.data.position_employee || "",
        email_employee: singleEmployeeData.data.email_employee || "",
        password_employee: singleEmployeeData.data.password_employee || "",
        age_employee: singleEmployeeData.data.age_employee || "",
        gender_employee: singleEmployeeData?.data.gender_employee || "",
      });
      setIsDataLoaded(true);
    }
  }, [singleEmployeeData]);

  const formik = useFormik({
    initialValues: {
      id: "",
      name_employee: "",
      phone_employee: "",
      address_employee: "",
      position_employee: "",
      email_employee: "",
      password_employee: "",
      age_employee: " ",
      gender_employee: "",
    },
    validationSchema: Yup.object({
      name_employee: Yup.string().required("Không được để trống"),
      phone_employee: Yup.string()
        .required("Không được để trống")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
          "Số điện thoại không hợp lệ"
        ),
      address_employee: Yup.string().required("Không được để trống"),
      position_employee: Yup.string().required("Không được để trống"),
      email_employee: Yup.string()
        .email("Email không hợp lệ")
        .required("Không được để trống"),
      password_employee: Yup.string().required("Không được để trống"),
      age_employee: Yup.number()
        .typeError("Tuổi phải là số")
        .max(100, "Tuổi không hợp lệ")
        .min(18, "Tuổi không hợp lệ"),
    }),
    onSubmit: (values) => {
      const employeeData = new FormData();
      employeeData.append("id", values.id);
      employeeData.append("name_employee", values.name_employee);
      employeeData.append("phone_employee", values.phone_employee);
      employeeData.append("address_employee", values.address_employee);
      if (values.position_employee === "receptionist") {
        employeeData.append("position_employee", "Lễ tân");
        employeeData.append("role_account", "receptionist");
      } else if (values.position_employee === "staff") {
        employeeData.append("position_employee", "Thợ sửa chữa");
        employeeData.append("role_account", "staff");
      }
      employeeData.append("email_employee", values.email_employee);
      employeeData.append("password_employee", values.password_employee);
      employeeData.append("age_employee", values.age_employee);
      employeeData.append("gender_employee", values.gender_employee);
      setIsLoading(true);
      updateEmployee(
        values.id,
        employeeData,
        user?.token,
        dispatch,
        navigate,
        toast,
        setIsLoading
      );
    },
  });

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  

  const handleSumbit = (e) => {
    e.preventDefault();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        toast.error("Vui lòng kiểm tra lại thông tin");
        return;
      } else {
        formik.handleSubmit();
        // console.log(formik.values)
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
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
                          <label htmlFor="name_employee">Họ và tên</label>
                          <input
                            className="input-field"
                            type="text"
                            id="name_employee"
                            name="name_employee"
                            placeholder="Nhập tên nhân viên"
                            value={formik.values.name_employee}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.name_employee && (
                            <p className="error-msg">
                              {formik.errors.name_employee}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone_employee">Số điện thoại</label>
                          <input
                            className="input-field"
                            type="text"
                            id="phone_employee"
                            name="phone_employee"
                            placeholder="Nhập số điện thoại"
                            value={formik.values.phone_employee}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.phone_employee && (
                            <p className="error-msg">
                              {formik.errors.phone_employee}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="addressage_employee">Địa chỉ</label>
                          <input
                            className="input-field"
                            type="text"
                            id="addressage_employee"
                            name="addressage_employee"
                            placeholder="Nhập địa chỉ"
                            value={formik.values.address_employee}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.address_employee && (
                            <p className="error-msg">
                              {formik.errors.address_employee}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="position_employee">Vị trí</label>
                          <select
                            id="position_employee"
                            name="position_employee"
                            className="input-field"
                            onChange={formik.handleChange}
                            value={formik.values.position_employee == "Lễ tân" ? "receptionist" : "staff"}
                          >
                            <option value="">lựa chọn</option>
                            <option value="receptionist">Lễ tân</option>
                            <option value="staff">Thợ sợ chữa</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-right">
                        <div className="form-group">
                          <label htmlFor="email_employee">Email</label>
                          <input
                            className="input-field"
                            type="email"
                            id="email_employee"
                            name="email_employee"
                            placeholder="Nhập email"
                            value={formik.values.email_employee}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.email_employee && (
                            <p className="error-msg">
                              {formik.errors.email_employee}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="password_employee">Mật khẩu</label>
                          <div className="password-container">
                            <input
                              className="input-field"
                              type={showPassword ? "text" : "password"}
                              id="password_employee"
                              name="password_employee"
                              required
                              placeholder="Nhập mật khẩu"
                              value={formik.values.password_employee}
                              onChange={formik.handleChange}
                            />
                            <button
                              type="button"
                              className="toggle-password"
                              onClick={toggleShowPassword}
                            >
                              {showPassword ? "Ẩn" : "Hiện"}
                            </button>
                          </div>
                          {formik.errors.password_employee && (
                            <p className="error-msg">
                              {formik.errors.password_employee}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="age_employee">Tuổi</label>
                          <input
                            className="input-field"
                            type="text"
                            id="age_employee"
                            name="age_employee"
                            placeholder="Nhập tuổi"
                            value={formik.values.age_employee}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.age_employee && (
                            <p className="error-msg">
                              {formik.errors.age_employee}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="shop">Giới Tính</label>
                          <select
                            id="gender_employee"
                            name="gender_employee"
                            className="input-field"
                            onChange={formik.handleChange}
                            value={formik.values.gender_employee}
                          >
                            <option value="">lựa chọn</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                          </select>
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
      )}
    </>
  );
};

export default SingleEmployee;
