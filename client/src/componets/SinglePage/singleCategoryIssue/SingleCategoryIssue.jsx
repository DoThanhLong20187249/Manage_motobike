import "./singleCategoryIssue.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Loading from "../../Loading/Loading";
import { updateCategoryIssue } from "../../../redux/apiRequest";

const SingleCategoryIssue = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const singleCategoryIssue = useSelector(
    (state) => state.categoryIssue.singleCategoryIssue.data
  );

  useEffect(() => {
    if (singleCategoryIssue) {
      formik.setValues({
        id: singleCategoryIssue.id,
        category_issue_name: singleCategoryIssue.category_issue_name,
        category_issue_level: singleCategoryIssue.category_issue_level,
        category_issue_description:
          singleCategoryIssue.category_issue_description,
        category_issue_solution: singleCategoryIssue.category_issue_solution,
        shop_id: singleCategoryIssue.shop_id,
      });
    }
  }, [singleCategoryIssue]);

  const formik = useFormik({
    initialValues: {
      id: "",
      category_issue_name: "",
      category_issue_level: "",
      category_issue_description: "",
      category_issue_solution: "",
      shop_id: "",
    },
    validationSchema: Yup.object({
      category_issue_name: Yup.string().required(
        "Tên danh mục không được bỏ trống"
      ),
    }),
    onSubmit: (values) => {
      const data = new FormData();
      data.append("category_issue_name", values.category_issue_name);
      data.append("category_issue_level", values.category_issue_level);
      data.append(
        "category_issue_description",
        values.category_issue_description
      );
      data.append("category_issue_solution", values.category_issue_solution);
      data.append("shop_id", values.shop_id);
      setIsLoading(true);
      updateCategoryIssue(
        values.id,
        data,
        user.token,
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
        <div className="single-category-issue-form-container">
          <div className="single-category-issue-form-main">
            <h1>Thông tin danh mục sự cố</h1>
            <form className="single-category-issue-from">
              <div className="single-category-issue-form-body-first">
                <div className="form-group">
                  <label htmlFor="category_issue_name">
                    Tên danh mục sự cố
                  </label>
                  <input
                    className="input-field"
                    type="text"
                    id="category_issue_name"
                    name="category_issue_name"
                    value={formik.values.category_issue_name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.category_issue_name && (
                    <p className="error-msg">
                      Tên danh mục không được bỏ trống
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="category_issue_level">
                    Mức độ nghiêm trọng
                  </label>
                  <select
                    name="category_issue_level"
                    id="category_issue_level"
                    className="input-field"
                    value={formik.values.category_issue_level}
                    onChange={formik.handleChange}
                  >
                    <option value="">Lựa chọn</option>
                    <option value="Nghiêm trọng">Nghiêm trọng</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Nhẹ">Nhẹ</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="category_issue_description">Mô tả</label>
                <textarea
                  className="input-field"
                  name="category_issue_description"
                  id="category_issue_description"
                  rows={5}
                  cols={50}
                  value={formik.values.category_issue_description}
                  onChange={formik.handleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="category_issue_solution">Giải pháp</label>
                <textarea
                  name="category_issue_solution"
                  id="category_issue_solution"
                  rows={5}
                  cols={50}
                  className="input-field"
                  onChange={formik.handleChange}
                  value={formik.values.category_issue_solution}
                ></textarea>
              </div>
              <div className="button-group">
                <button
                  className="btn-submit"
                  type="submit"
                  onClick={(e) => handleSumbit(e)}
                >
                  Cập nhật thông tin
                </button>
                <button className="btn-cancer">
                  <Link to="/categoryIssue">Quay lại</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleCategoryIssue;
