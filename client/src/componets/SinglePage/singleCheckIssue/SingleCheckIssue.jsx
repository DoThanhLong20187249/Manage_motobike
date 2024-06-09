import { useFormik } from "formik";
import "./singleCheckIssue.scss";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  getAllCategoryIssue,
  updateSingleReportById,
} from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "../../TodoList/TodoForm";
import Todo from "../../TodoList/Todo";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { setInformationReportDetals } from "../../../redux/informationReportDetalsSlice";

const SingleCheckIssue = () => {
  //general data
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [todos, setTodos] = useState([]);
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
  // lấy data report từ redux-store
  const dataReport = useSelector((state) => state.report.singleReport.data);
  useEffect(() => {
    if (dataReport) {
      formik.setValues({
        id: dataReport.checkIssueData.id,
        motocycle_id: dataReport.checkIssueData.motocycle_id,
        employee_id: dataReport.checkIssueData.employee_id,
        customer_id: dataReport.checkIssueData.customer_id,
        customer_name: dataReport.checkIssueData.customer_name,
        motocycle_name: dataReport.checkIssueData.motocycle_name,
        motocycle_number: dataReport.checkIssueData.motocycle_number,
        employee_name: dataReport.checkIssueData.employee_name,
        status: dataReport.checkIssueData.status,
        category_issue_id: dataReport.checkIssueData.cateogry_issue_id,
      });
      setTodos(dataReport.checkList);
    }
  }, [dataReport]);
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
    onSubmit: (values) => {
      const data = new FormData();
      data.append("id", values.id);
      data.append("motocycle_id", parseInt(values.motocycle_id));
      data.append("employee_id", parseInt(values.employee_id));
      data.append("customer_id", parseInt(values.customer_id));
      data.append("shop_id", parseInt(user.shop_id));
      data.append("customer_name", values.customer_name);
      data.append("motocycle_name", values.motocycle_name);
      data.append("motocycle_number", values.motocycle_number);
      data.append("employee_name", values.employee_name);
      data.append("status", values.status);
      data.append("category_issue_id", parseInt(values.category_issue_id));
      data.append("todos", JSON.stringify(todos));
      setIsLoading(true);
      updateSingleReportById(
        values.id,
        data,
        user.token,
        navigate,
        toast,
        setIsLoading
      );
    },
  });

  useEffect(() => {
    // lưu data formik và danh sách công việc vào redux-store
    const selectedCategory = dataCategoryIssues.find(
      (category) => category.id === parseInt(formik.values.category_issue_id)
    );
    dispatch(setInformationReportDetals({
      checkIssueData: {
        ...formik.values,
        cateogry_issue_name: selectedCategory? selectedCategory.category_issue_name : "",
      },
      checkList: todos,
    }));
  }, [formik.values, todos, dispatch]);
  // xử lý danh sách công việc
  const addTodo = (todo) => {
    setTodos([...todos, { id: uuidv4(), action: todo, status: false }]);
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const editTodo = (id, status) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status: status } : todo))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        toast.error("Vui lòng kiểm tra lại thông tin");
      } else {
        formik.handleSubmit();
      }
    });
  };
  // truy xuất hóa đơn
  const handleGetOrder = () => {
    navigate(`/order/add/${dataReport.checkIssueData.id}`);
    // dispatch(setInformationReportDetals(dataInfor));
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="">
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
            <div className="todo-wrappeer">
              <h2>Danh sách công việc</h2>
              <TodoForm addTodo={addTodo} />
              {todos.map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    task={todo}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                  />
                );
              })}
            </div>
            <div className="button-group">
              <button
                className="btn-submit"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Cập nhật thông tin
              </button>
              <button className="btn-cancer">
                <Link to="/checkIssue">Quay lại</Link>
              </button>
              <button className="btn-get-order" onClick={handleGetOrder}>
                {" "}
                Truy xuất hóa đơn{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleCheckIssue;
