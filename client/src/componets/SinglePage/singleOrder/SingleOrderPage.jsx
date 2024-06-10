import { Link, useNavigate } from "react-router-dom";
import "./singleOrderPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { getAllCategoryIssue } from "../../../redux/apiRequest";

import * as Yup from "yup";

const SingleOrderPage = () => {
  //general data
  const user = useSelector((state) => state.auth.login?.currentUser);
  // const [dataInfor, setDataInfor] = useState({});
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategoryIssue(user.shop_id, user.token, dispatch);
  }, []);
  const dataCategoryIssues = useSelector(
    (state) => state.categoryIssue.categoryIssues.data // lấy thông tin danh mục sự cố từ redux-store
  );

  const formik = useFormik({
    initialValues: {
      id: "",
      motocycle_id: "",
      employee_id: "",
      customer_id: "",
      customer_name: "",
      motocycle_name: "",
      motocycle_number: "",
      employee_name: "",
      status: "",
      category_issue_id: "",
    },
    validationSchema: Yup.object({
      customer_name: Yup.string().required(
        "Tên khách hàng không được bỏ trống"
      ),
      motocycle_name: Yup.string().required("Tên xe máy không được bỏ trống"),
      motocycle_number: Yup.string().required("Biển số xe không được bỏ trống"),
      status: Yup.string()
        .oneOf(["true", "false"])
        .required("Trạng thái không được bỏ trống"),
      category_issue_id: Yup.number()
        .oneOf(dataCategoryIssues.map((categoryIssue) => categoryIssue.id))
        .required("Danh mục sự cố không được bỏ trống")
        .typeError("Danh mục sự cố không được bỏ trống")
    }),
  });


  return (
    <>
      <div>
        <div className="check-issue-form-container-information-header">
          <h1>Thông tin biên bản sự cố</h1>
        </div>
        <div className="check-issue-form-container-information-body">
          <form className="check-issue-form-container-information-body-main">
            <div className="form-group">
              <label htmlFor="customer_name">Tên khách hàng</label>
              <input
                className="input-field"
                type="text"
                id="customer_name"
                name="customer_name"
                onChange={formik.handleChange}
                value={formik.values.customer_name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="motocycle_name">Xe máy</label>
              <input
                className="input-field"
                type="text"
                id="motocycle_name"
                name="motocycle_name"
                onChange={formik.handleChange}
                value={formik.values.motocycle_name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="motocycle_number">Biển số xe</label>
              <input
                className="input-field"
                type="text"
                id="motocycle_number"
                name="motocycle_number"
                onChange={formik.handleChange}
                value={formik.values.motocycle_number}
              />
            </div>
            <div className="form-group">
              <label htmlFor="employee_name">Thợ sửa chữa </label>
              <input
                className="input-field"
                type="text"
                id="employee_name"
                name="employee_name"
                onChange={formik.handleChange}
                value={formik.values.employee_name}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cost">Trạng thái</label>
              <select
                name="status"
                id="status"
                className="input-field"
                onChange={formik.handleChange}
                value={formik.values.status}
              >
                <option value="">Chọn trạng thái</option>
                <option value={true}>Xác nhận</option>
                <option value={false}>Chưa xác nhận</option>
              </select>
              {formik.errors.status && (
                <p className="error-msg">{formik.errors.status}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="time">Danh mục sự cố</label>
              <select
                name="category_issue_id"
                id="category_issue_id"
                className="input-field"
                onChange={formik.handleChange}
                value={formik.values.category_issue_id}
              >
                <option value="">Chọn danh mục sự cố</option>
                {dataCategoryIssues.map((categoryIssue) => {
                  return (
                    <option key={categoryIssue.id} value={categoryIssue.id}>
                      {categoryIssue.category_issue_name}
                    </option>
                  );
                })}
              </select>
              {formik.errors.category_issue_id && (
                <p className="error-msg">{formik.errors.category_issue_id}</p>
              )}
            </div>
          </form>
          <div className="button-group">
            <button className="btn-submit" type="submit">
              Cập nhật thông tin
            </button>
            <button className="btn-cancer">
              <Link to="/checkIssue">Quay lại</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleOrderPage;
