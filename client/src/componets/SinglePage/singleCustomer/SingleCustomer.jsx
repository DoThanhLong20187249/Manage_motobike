import { Link, useNavigate } from "react-router-dom";
import "./singleCustomer.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../../redux/apiRequest";
import Loading from "../../Loading/Loading";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
const SingleCustomer = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [isDataloaded, setIsDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const singleCustomerData = useSelector(
    (state) => state.customer.singleCustomer.data
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (singleCustomerData) {
      formik.setValues({
        customer_id: singleCustomerData.customer_id,
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

  const formik = useFormik({
    initialValues: {
      customer_id: "",
      customer_name: "",
      customer_phone: "",
      customer_address: "",
      customer_email: "",
      customer_gender: "",
      customer_age: "",
    },
    validationSchema: Yup.object({
      customer_email: Yup.string()
        .required("Email không được để trống")
        .email("Email không hợp lệ"),
      customer_phone: Yup.string()
        .required("Số điện thoại không được để trống")
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Số điện thoại không hợp lệ"),
      customer_age: Yup.number().typeError("Tuổi phải là số").max(100, "Tuổi không hợp lệ").min(18, "Tuổi không hợp lệ"),
    }),

    onSubmit: (values) => {
      const customer = new FormData();
      customer.append("customer_id", values.customer_id);
      customer.append("customer_name", values.customer_name);
      customer.append("customer_phone", values.customer_phone);
      customer.append("customer_address", values.customer_address);
      customer.append("customer_email", values.customer_email);
      customer.append("customer_gender", values.customer_gender);
      customer.append("customer_age", values.customer_age);
      setIsLoading(true);
      updateCustomer(
        values.customer_id,
        customer,
        user?.token,
        dispatch,
        navigate,
        toast,
        setIsLoading
      );
    },
  });

  const handleSumbit = (e) => {
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
        <>
          {isDataloaded ? (
            <>
              <div className="single-customer-container">
                <div className="single-customer-main">
                  <h1>Thông tin Khách Hàng</h1>
                  <h2>{user?.shop_name}</h2>
                  <form className="form-single-customer">
                    <div className="form-body">
                      <div className="form-left">
                        <div className="form-group">
                          <label htmlFor="customer_name">Họ và tên</label>
                          <input
                            className="input-field"
                            type="text"
                            id="customer_name"
                            name="customer_name"
                            placeholder="Nhập tên nhân viên"
                            value={formik.values.customer_name}
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
                            value={formik.values.customer_phone}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.customer_phone && <p className="error-msg"> {formik.errors.customer_phone}</p>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="customer_address">Địa chỉ</label>
                          <input
                            className="input-field"
                            type="text"
                            id="customer_address"
                            name="customer_address"
                            placeholder="Nhập địa chỉ"
                            value={formik.values.customer_address}
                            onChange={formik.handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-right">
                        <div className="form-group">
                          <label htmlFor="customer_email">Email</label>
                          <input
                            className="input-field"
                            type="text"
                            id="customer_email"
                            name="customer_email"
                            placeholder="Nhập email"
                            value={formik.values.customer_email}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.customer_email && <p className="error-msg"> {formik.errors.customer_email}</p>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="customer_age">Tuổi</label>
                          <input
                            className="input-field"
                            type="text"
                            id="customer_age"
                            name="customer_age"
                            placeholder="Nhập tuổi"
                            value={formik.values.customer_age}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.customer_age && <p className="error-msg"> {formik.errors.customer_age}</p>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="customer_gender">Giới tính</label>
                          <select
                            className="input-field"
                            id="customer_gender"
                            name="customer_gender"
                            value={formik.values.customer_gender}
                            onChange={formik.handleChange}
                          >
                            <option value="">lựa chọn</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="other">Khác</option>
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
      )}
    </>
  );
};

export default SingleCustomer;
