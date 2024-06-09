import { useEffect, useState } from "react";
import TodoForm from "../../TodoList/TodoForm";
import "./checkIssueForm.scss";
import Todo from "../../TodoList/Todo";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  addNewReport,
  getAllCategoryIssue,
  getAllEmployee,
  getAllMotocycles,
  getInformationByID,
} from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetInformation } from "../../../redux/checkIssueSlice";
import Select from "react-select";

const CheckIssueForm = () => {
  //general
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [optionsMotocycle, setOptionsMotocycle] = useState([]); // danh sách xe máy
  const [optionsEmployee, setOptionsEmployee] = useState([]); // danh sách thợ sửa chữa
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  // gọi api
  useEffect(() => {
    getAllCategoryIssue(user.shop_id, user.token, dispatch); // lấy danh mục sự cố
    getAllMotocycles(user?.shop_id, user?.token, dispatch); // lấy danh sách xe máy
    getAllEmployee(user?.id, user?.token, dispatch); // lấy danh sách thợ sửa chữa
  }, []);
  // lấy data  redux-store
  const dataCategoryIssues = useSelector(
    (state) => state.categoryIssue.categoryIssues.data // danh mục sự cố
  );
  const dataEmployee = useSelector(
    (state) => state.employee.employees.allEmployees // danh sách thợ sửa chữa
  );
  const motocycles = useSelector(
    (state) => state.motocycle.motocycles.allMotocycles
  ); //

  // tạo option cho react-select
  useEffect(() => {
    if (motocycles) {
      setOptionsMotocycle(
        motocycles.map((motocycle) => {
          return {
            value: motocycle.id,
            label: motocycle.motocycle_number,
          };
        })
      );
    }
  }, [motocycles]);
  useEffect(() => {
    if (dataEmployee) {
      setOptionsEmployee(
        dataEmployee.map((employee) => {
          return {
            value: employee.id,
            label: employee.name_employee,
          };
        })
      );
    }
  }, [dataEmployee]);

  const handleChangeMoto = (e) => {
    formikID.setFieldValue("motocycle_id", e.value);
  };
  const handleChangeEmployee = (e) => {
    formikID.setFieldValue("employee_id", e.value);
  };

  // tìm kiếm ID xe máy, ID thợ sửa chữa
  const [isSearch, setIsSearch] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const formikID = useFormik({
    initialValues: {
      motocycle_id: null,
      employee_id: null,
    },
    validationSchema: Yup.object({
      motocycle_id: Yup.number()
        .required("ID xe máy không được bỏ trống")
        .typeError("ID xe máy phải là số"),
      employee_id: Yup.number()
        .required("ID thợ sửa chữa không được bỏ trống")
        .typeError("ID thợ sửa chữa phải là số"),
    }),
    onSubmit: (values) => {
      setData((prevData) => ({
        ...prevData,
        motocycle_id: parseInt(values.motocycle_id),
        employee_id: parseInt(values.employee_id),
      }));
      getInformationByID(
        values.motocycle_id,
        values.employee_id,
        user.token,
        dispatch,
        setIsSearch
      );
    },
  });

  console.log(formikID.values);
  const handleSubmitID = () => {
    setIsSearch(true);
    formikID.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        toast.error("Vui lòng điền đầy đủ thông tin");
        return;
      } else {
        formikID.handleSubmit();
      }
    });
  };
  // lấy thông tin , thợ sửa chữa từ redux-store
  const informationData = useSelector((state) => state.report.information.data);
  useEffect(() => {
    if (informationData) {
      setIsDataLoaded(true);
    }
  }, [informationData]);

  // danh sách công việc
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), action: todo, status: false, action_price: "0" },
    ]);
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const editTodo = (id, status) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status: status } : todo))
    );
  };

  console.log(todos);
  // Tạo mới biên bản sự cố
  const formik = useFormik({
    initialValues: {
      status: "",
      category_issue_id: "",
    },
    validationSchema: Yup.object({
      status: Yup.string()
        .oneOf(["true", "false"])
        .required("Trạng thái không được bỏ trống"),
      category_issue_id: Yup.number()
        .oneOf(dataCategoryIssues.map((categoryIssue) => categoryIssue.id))
        .required("Danh mục sự cố không được bỏ trống"),
    }),
    onSubmit: (values) => {
      const reportData = {
        ...data,
        status: values.status,
        category_issue_id: parseInt(values.category_issue_id),
        shop_id: user.shop_id,
        todos: todos,
      };

      setIsLoading(true);
      addNewReport(reportData, user.token, navigate, toast, setIsLoading);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        toast.error("Vui lòng điền đầy đủ thông tin");
        return;
      } else {
        formik.handleSubmit();
        setTimeout(() => {
          dispatch(resetInformation());
        }, 2000);
      }
    });
  };

  const handleCancer = () => {
    formik.resetForm();
    formikID.resetForm();
    setTodos([]);
    setIsDataLoaded(false);
    setIsSearch(false);
    dispatch(resetInformation());
    navigate("/checkIssue");
  };
  console.log(data);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="check-issue-form-container">
          <h1>Biên bản kiểm tra sự cố</h1>
          <div className="check-issue-form-container-header">
            <div className="form-group">
              <label htmlFor="motocycle_id">Nhập biển số xe</label>
              {/* <input
                className="input-field"
                type="text"
                id="motocycle_id"
                name="motocycle_id"
                onChange={formikID.handleChange}
              /> */}
              <Select
                id="motocycle_id"
                name="motocycle_id"
                onChange={handleChangeMoto}
                placeholder="Nhập biển số xe"
                options={optionsMotocycle}
                classNamePrefix="react-select"
              />
              {formikID.errors.motocycle_id && (
                <p className="error-msg">{formikID.errors.motocycle_id}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="employee_id">Nhập tên thợ sửa chữa</label>
              {/* <input
                className="input-field"
                type="text"
                id="employee_id"
                name="employee_id"
                onChange={formikID.handleChange}
              /> */}
              <Select
                id="employee_id"
                name="employee_id"
                onChange={handleChangeEmployee}
                placeholder="Nhập tên thợ sửa chữa"
                options={optionsEmployee}
                classNamePrefix="react-select"
              />
              {formikID.errors.employee_id && (
                <p className="error-msg">{formikID.errors.employee_id}</p>
              )}
            </div>
            <button className="btn-search" onClick={handleSubmitID}>
              {isSearch ? "...Loading..." : "Tìm kiếm"}
            </button>
          </div>
          {isDataLoaded && (
            <div className="check-issue-form-container-body">
              <form className="check-issue-form-container-body-main">
                <div className="form-group">
                  <label htmlFor="issue">Tên khách hàng</label>
                  <p
                    className="input-field"
                    type="text"
                    id="issue"
                    name="issue"
                  >
                    {informationData.customer_name}
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="motocycle_name">Xe máy</label>
                  <p
                    className="input-field"
                    type="text"
                    id="motocycle_name"
                    name="motocycle_name"
                  >
                    {informationData.motocycle_name}
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="motocycle_number">Biển số xe</label>
                  <p
                    className="input-field"
                    type="text"
                    id="motocycle_number"
                    name="motocycle_number"
                  >
                    {informationData.motocycle_number}
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="employee_name">Thợ sửa chữa </label>
                  <p
                    className="input-field"
                    type="text"
                    id="employee_name"
                    name="employee_name"
                  >
                    {informationData.employee_name}
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="cost">Trạng thái</label>
                  <select
                    name="status"
                    id="status"
                    className="input-field"
                    onChange={formik.handleChange}
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="true">Xác nhận</option>
                    <option value="false">Chưa xác nhận</option>
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
                    <p className="error-msg">
                      {formik.errors.category_issue_id}
                    </p>
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
                  Tạo mới
                </button>
                <button className="btn-cancer" onClick={handleCancer}>
                  Quay lại
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CheckIssueForm;
