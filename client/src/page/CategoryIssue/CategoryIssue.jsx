import { Link, Outlet } from "react-router-dom";
import "./categoryIssue.scss";
import DataTable from "../../componets/dataTable/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCategoryIssue } from "../../redux/apiRequest";

// định nghĩa columns cho bảng dữ liệu danh mục sự cố
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "category_issue_name",
    headerName: "Tên danh mục",
    width: 200,
    type: "string",
  },
  {
    field: "category_issue_description",
    headerName: "Mô tả sự cố",
    width: 250,
    type: "string",
  },
  {
    field: "category_issue_solution",
    headerName: "Giải pháp",
    width: 200,
    type: "string",
  },
  {
    field: "category_issue_level",
    headerName: "Mức độ",
    width: 150,
    type: "string",
  },
];
const CategoryIssue = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCategoryIssue(user.shop_id, user.token, dispatch);
  }, []);

  const dataCategoryIssues = useSelector(
    (state) => state.categoryIssue.categoryIssues.data
  );

  useEffect(() => {
    if (dataCategoryIssues) {
      setIsDataLoaded(true);
    }
  }, [dataCategoryIssues]);

  return (
    <div className="customer-container">
      <div className="infor">
        <h1>Danh mục sự cố</h1>
        <button>
          <Link to="/categoryIssue/add">Tạo mới danh mục sự cố</Link> 
        </button>
      </div>

      {isDataLoaded && (
        <DataTable
          slug={"categoryIssue"}
          columns={columns}
          rows={dataCategoryIssues}
          accessToken={user?.token}
          dispatch={dispatch}
        />
      )}
      <Outlet />
    </div>
  );
};

export default CategoryIssue;
