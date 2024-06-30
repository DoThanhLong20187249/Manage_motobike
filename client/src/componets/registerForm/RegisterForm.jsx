import { Link, useNavigate } from "react-router-dom";
import "./registerFrom.scss";
// import { useState } from "react";
import { RegisterUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterForm = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [fullName, setFullName] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [address, setAddress] = useState('');
  // const [shopName, setShopName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      shopName: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
      password: Yup.string().required("Mật khẩu không được để trống"),
      fullName: Yup.string().required("Họ và tên không được để trống"),
      phoneNumber: Yup.string()
        .required("Số điện thoại không được để trống")
        .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ"),
      shopName: Yup.string().required("Tên xưởng xe máy không được để trống"),
    }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      shop_owner_name: formik.values.fullName,
      shop_name: formik.values.shopName,
      hotline: formik.values.phoneNumber,
      shop_address: formik.values.address,
      email: formik.values.email,
      password: formik.values.password,
    };

    RegisterUser(newCustomer, dispatch, navigate);
  };


  return (
    <div className="register-form-container">
      <div className="card-register">
        <h1>ĐĂNG KÝ</h1>
        <form>
          <div className="form-group">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="form-field"
              onChange={formik.handleChange}
            />
            {formik.errors.email ? (
              <span className="errorMsg">Email không được để trống</span>
            ) : null}
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Mật khẩu"
              className="form-field"
              onChange={formik.handleChange}
            />
            {formik.errors.password ? (
              <span className="errorMsg">Mật khẩu không được để trống</span>
            ) : null}
          </div>
          <div className="form-group">
            <input
              name="fullName"
              type="text"
              id="fullName"
              placeholder="Họ và tên "
              className="form-field"
              onChange={formik.handleChange}
            />
            {formik.errors.fullName ? (
              <span className="errorMsg">Họ và tên không được để trống</span>
            ) : null}
          </div>
          <div className="form-group">
            <input
              name="shopName"
              id="shopName"
              type="text"
              placeholder="Tên xưởng xe máy của bạn"
              className="form-field"
              onChange={formik.handleChange}
            />
            {formik.errors.shopName ? (
              <span className="errorMsg">Tên xưởng không được để trống</span>
            ) : null}
          </div>

          <div className="form-group">
            <input
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Số điện thoại"
              className="form-field"
              onChange={formik.handleChange}
            />
            {formik.errors.phoneNumber ? (
              <span className="errorMsg">Số điện thoại không hợp lệ</span>
            ) : null}
          </div>
          <div className="form-group">
            <input
              name="address"
              id="address"
              placeholder="Địa chỉ"
              className="form-field"
              onChange={formik.handleChange}
            />
          </div>
          <button onClick={handleSubmit} className="button" type="submit">
            Đăng ký
          </button>
          <div className="register">
            Nếu đã có tài khoản, hãy{" "}
            <Link className="text" to="/login">
              Đăng nhập
            </Link>{" "}
            tại đây
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
