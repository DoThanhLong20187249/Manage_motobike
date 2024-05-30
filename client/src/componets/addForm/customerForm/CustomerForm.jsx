import { useState } from "react";
import "./customerForm.scss";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer } from "../../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
const CustomerForm = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const shop_id = user?.shop_id;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      customer_name: "",
      customer_address: "",
      customer_phone: "",
      customer_email: "",
      customer_age: "",
      motocycle_name: "",
      motocycle_color: "",
      motocycle_brand: "",
      motocycle_number: "",
      motocycle_year: "",
    },
    validationSchema: Yup.object({
      customer_email: Yup.string()
        .required("Không được để trống")
        .email("Email không hợp lệ"),
      customer_phone: Yup.string().required("Không được để trống"),
      motocycle_name: Yup.string().required("Không được để trống"),
      motocycle_color: Yup.string().required("Không được để trống"),
      motocycle_brand: Yup.string().required("Không được để trống"),
      motocycle_number: Yup.string().required("Không được để trống"),
      motocycle_year: Yup.string().required("Không được để trống"),
    }),
    onSubmit: (values) => {
      const newCustomer = new FormData();
      newCustomer.append("customer_name", values.customer_name);
      newCustomer.append("customer_address", values.customer_address);
      newCustomer.append("customer_phone", values.customer_phone);
      newCustomer.append("customer_email", values.customer_email);
      newCustomer.append("customer_age", values.customer_age);
      newCustomer.append("motocycle_name", values.motocycle_name);
      newCustomer.append("motocycle_color", values.motocycle_color);
      newCustomer.append("motocycle_brand", values.motocycle_brand);
      newCustomer.append("motocycle_number", values.motocycle_number);
      newCustomer.append("motocycle_year", values.motocycle_year);
      newCustomer.append("shop_id", shop_id);
      setIsLoading(true);
      addCustomer(
        newCustomer,
        user?.token,
        dispatch,
        navigate,
        toast,
        setIsLoading
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.validateForm().then((error) => {
      if (Object.keys(error).length > 0) {
        toast.error("Vui lòng điền đầy đủ thông tin");
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
        <div className="customer-registration-container">
          <div className="customer-registration-main">
            <h1>Đăng ký khách hàng</h1>
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
                      onChange={formik.handleChange}
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
                      onChange={formik.handleChange}
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
                      onChange={formik.handleChange}
                    />
                    {formik.errors.customer_phone && (
                      <p className="error-msg">
                        {formik.errors.customer_phone}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="customer_email">Email</label>
                    <input
                      className="input-field"
                      type="email"
                      id="customer_email"
                      name="customer_email"
                      placeholder="Nhập email"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.customer_email && (
                      <p className="error-msg">
                        {formik.errors.customer_email}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="customer_age">Tuổi</label>
                    <input
                      className="input-field"
                      type="text"
                      id="customer_age"
                      name="customer_age"
                      placeholder="Nhập tuổi"
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="customer_gender">Giới tính</label>
                    <select
                      className="input-field"
                      id="customer_gender"
                      name="customer_gender"
                      onChange={formik.handleChange}
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
                      onChange={formik.handleChange}
                    />
                    {formik.errors.motocycle_name && (
                      <p className="error-msg">
                        {formik.errors.motocycle_name}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="motocycle_color">Màu xe</label>
                    <input
                      className="input-field"
                      type="text"
                      id="motocycle_color"
                      name="motocycle_color"
                      placeholder="Nhập màu xe"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.motocycle_color && (
                      <p className="error-msg">
                        {formik.errors.motocycle_color}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="motocycle_brand">Hãng xe</label>
                    <input
                      className="input-field"
                      type="text"
                      id="motocycle_brand"
                      name="motocycle_brand"
                      placeholder="Nhập hãng xe"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.motocycle_brand && (
                      <p className="error-msg">
                        {formik.errors.motocycle_brand}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="motocycle_number">Biển số xe</label>
                    <input
                      className="input-field"
                      type="text"
                      id="motocycle_number"
                      name="motocycle_number"
                      placeholder="Nhập biển số xe"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.motocycle_number && (
                      <p className="error-msg">
                        {formik.errors.motocycle_number}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="motocycle_year">Năm sản xuất</label>
                    <input
                      className="input-field"
                      type="text"
                      id="motocycle_year"
                      name="motocycle_year"
                      placeholder="Nhập năm sản xuất"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.motocycle_year && (
                      <p className="error-msg">
                        {formik.errors.motocycle_year}
                      </p>
                    )}
                  </div>
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
      )}
    </>
  );
};

export default CustomerForm;
