import { useEffect, useState } from "react";
import "./singleMotocycle.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import { updateMotocycle } from "../../../redux/apiRequest";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const SingleMotocycle = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const dataInStore = useSelector(
    (state) => state.motocycle.singleMotocycle?.data
  );
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (dataInStore) {
      formik.setValues({
        shop_id: dataInStore.shop_id,
        id: dataInStore.id,
        customer_id: dataInStore.customer_id,
        customer_name: dataInStore.customer_name,
        customer_address: dataInStore.customer_address,
        customer_phone: dataInStore.customer_phone,
        customer_email: dataInStore.customer_email,
        customer_gender: dataInStore.customer_gender,
        customer_age: dataInStore.customer_age,
        motocycle_name: dataInStore.motocycle_name,
        motocycle_color: dataInStore.motocycle_color,
        motocycle_brand: dataInStore.motocycle_brand,
        motocycle_number: dataInStore.motocycle_number,
        motocycle_year: dataInStore.motocycle_year,
      });
      setIsDataLoaded(true);
    }
  }, [dataInStore]);

  const formik = useFormik({
    initialValues: {
      shop_id: " ",
      id: "",
      customer_id: "",
      customer_name: "",
      customer_address: "",
      customer_phone: "",
      customer_email: "",
      customer_gender: "",
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
      const newData = new FormData();
      newData.append("id", values.id);
      newData.append("customer_id", values.customer_id);
      newData.append("customer_name", values.customer_name);
      newData.append("customer_address", values.customer_address);
      newData.append("customer_phone", values.customer_phone);
      newData.append("customer_email", values.customer_email);
      newData.append("customer_gender", values.customer_gender);
      newData.append("customer_age", values.customer_age);
      newData.append("motocycle_name", values.motocycle_name);
      newData.append("motocycle_color", values.motocycle_color);
      newData.append("motocycle_brand", values.motocycle_brand);
      newData.append("motocycle_number", values.motocycle_number);
      newData.append("motocycle_year", values.motocycle_year);
      newData.append("shop_id", values.shop_id);
      setIsLoading(true);
      updateMotocycle(
        values.id,
        newData,
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
                          onChange={formik.handleChange}
                          value={formik.values.customer_name}
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
                          value={formik.values.customer_address}
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
                          value={formik.values.customer_phone}
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
                          value={formik.values.customer_email}
                        />
                        {formik.errors.customer_email && (
                          <p className="error-msg">
                            {" "}
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
                          value={formik.values.customer_age}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="customer_gender">Giới tính</label>
                        <select
                          className="input-field"
                          id="customer_gender"
                          name="customer_gender"
                          onChange={formik.handleChange}
                          value={formik.values.customer_gender}
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
                          value={formik.values.motocycle_name}
                        />
                        {formik.errors.motocycle_name && <p className="error-msg">{formik.errors.motocycle_name}</p>}
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
                          value={formik.values.motocycle_color}
                        />
                        {formik.errors.motocycle_color && <p className="error-msg">{formik.errors.motocycle_color}</p>}
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
                          value={formik.values.motocycle_brand}
                        />
                        {formik.errors.motocycle_brand && <p className="error-msg">{formik.errors.motocycle_brand}</p>}
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
                          value={formik.values.motocycle_number}
                        />
                        {formik.errors.motocycle_number && <p className="error-msg">{formik.errors.motocycle_number}</p>}
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
                          value={formik.values.motocycle_year}
                        />
                        {formik.errors.motocycle_year && <p className="error-msg">{formik.errors.motocycle_year}</p>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="motocycle_year">ID Khách hàng</label>
                        <p className="input-field">
                          {" "}
                          {formik.values.customer_id}
                        </p>
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
      )}
    </>
  );
};

export default SingleMotocycle;
