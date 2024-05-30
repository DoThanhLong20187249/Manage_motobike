import { useState } from "react";
import "../../styles/addForm.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../../redux/apiRequest";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading"

const AddForm = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      email: "",
      gender: "",
      age: "",
      password: "",
      re_password: "",
      position_employee: "",
      role_account: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Tên không được để trống"),
      phone: Yup.string().required("Số điện thoại không được để trống"),
      address: Yup.string().required("Địa chỉ không được để trống"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
      gender: Yup.string().required("Giới tính không được để trống"),
      age: Yup.string().required("Tuổi không được để trống"),
      password: Yup.string().required("Mật khẩu không được để trống"),
      re_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
        .required("Nhập lại mật khẩu không được để trống"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      if (values.position_employee === "receptionist") {
        const employee = new FormData();
        employee.append("name", values.name);
        employee.append("phone", values.phone);
        employee.append("address", values.address);
        employee.append("email", values.email);
        employee.append("gender", values.gender);
        employee.append("age", values.age);
        employee.append("password", values.password);
        employee.append("position_employee", "Lễ tân");
        employee.append("role_account", "receptionist");
        employee.append("shop_id", user.shop_id);
        for (var pair of employee.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        addEmployee(
          employee,
          user?.token,
          dispatch,
          navigate,
          toast,
          setIsLoading
        );
      } else if (values.position_employee === "staff") {
        const employee = new FormData();
        employee.append("name", values.name);
        employee.append("phone", values.phone);
        employee.append("address", values.address);
        employee.append("email", values.email);
        employee.append("gender", values.gender);
        employee.append("age", values.age);
        employee.append("password", values.password);
        employee.append("position_employee", "Thợ sửa chữa");
        employee.append("role_account", "staff");
        employee.append("shop_id", user.shop_id);

        for (var t of employee.entries()) {
          console.log(t[0] + ": " + t[1]);
        }
        addEmployee(
          employee,
          user?.token,
          dispatch,
          navigate,
          toast,
          setIsLoading
        );
      }
    },
  });

  console.log(formik.values);
  const handleSubmit = (e) => {
    e.preventDefault();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        toast.error("Vui lòng kiểm tra lại thông tin");
        return;
      } else {
        formik.handleSubmit();
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="form-container">
          <h1 className="form-title">Đăng ký nhân viên</h1>
          <form className="form">
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
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name && (
                    <p className="error-msg">{formik.errors.name}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="name">Tuổi</label>
                  <input
                    className="input-field"
                    type="text"
                    id="age"
                    placeholder="Nhập tuổi nhân viên"
                    name="age"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.age && (
                    <p className="error-msg">{formik.errors.age}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    className="input-field"
                    type="text"
                    id="phone"
                    placeholder="Nhập số điện thoại"
                    name="phone"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phone && (
                    <p className="error-msg">{formik.errors.phone}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="address">Địa chỉ</label>
                  <input
                    className="input-field"
                    type="text"
                    id="address"
                    placeholder="Nhập địa chỉ"
                    name="address"
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shop">Vị trí</label>
                  <select
                    id="position_employee"
                    name="position_employee"
                    className="input-field"
                    onChange={formik.handleChange}
                  >
                    <option value="">lựa chọn</option>
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
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && (
                    <p className="error-msg">{formik.errors.email}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mật khẩu</label>
                  <input
                    className="input-field"
                    type="password"
                    id="password"
                    placeholder="Nhập mật khẩu"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password && (
                    <p className="error-msg">{formik.errors.password}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="re_password">Nhập lại mật khẩu</label>
                  <input
                    className="input-field"
                    type="password"
                    id="re_password"
                    name="re_password"
                    placeholder="Nhập lại mật khẩu"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.re_password && (
                    <p className="error-msg">{formik.errors.re_password}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="shop">Giới Tính</label>
                  <select
                    id="gender"
                    name="gender"
                    className="input-field"
                    onChange={formik.handleChange}
                  >
                    <option value="">lựa chọn</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>
            </div>
            <button onClick={(e) => handleSubmit(e)} type="submit">
              Đăng kí
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default AddForm;
