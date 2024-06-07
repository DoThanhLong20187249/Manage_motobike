import { useDispatch, useSelector } from "react-redux";
import "./incidentReport.scss";
import { Link } from "react-router-dom";
import DataTable from "../../componets/dataTable/DataTable";
import { useEffect, useState } from "react";
import { getAllReports } from "../../redux/apiRequest";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "Employee_name",
    headerName: "Thợ sửa chữa",
    width: 150,
    type: "string",
  },
  {
    field: "Motocycle_name",
    headerName: "Xe máy",
    width: 150,
    type: "string",
  },
  {
    field: "Customer_name",
    headerName: "Khách hàng",
    width: 150,
    type: "string",
  },
  {
    field: "Category_issue_name",
    headerName: "Loại sự cố",
    width: 150,
    type: "string",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 100,
    type: "boolean",
  }
  
];

const IncidentReport = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [newData, setNewData] = useState([]);
  const dispatch = useDispatch()

  //Gọi API để lấy dữ liệu từ server
  useEffect(() => {
    getAllReports(user.shop_id,user.token,dispatch)
  },[]) 
  // lấy dữ liệu từ store
  const dataReports = useSelector((state) => state.report.reports.data)

  //Nhận dữ liệu từ store để hiển thị lên giao diện

  useEffect(() => {
    if(dataReports) {
      setNewData(dataReports)
    }
  }, [dataReports]);

  return (
    <div className="users-container">
      <div className="infor">
        <h1>Danh sách biên bản sự cố</h1>
        {user?.role_account === "manager" && (
          <>
            {" "}
            <button>
              <Link to={"/checkIssue/add"}>Tạo mới biên bản sự cố</Link>
            </button>
          </>
        )}
      </div>
      {newData && (
        <DataTable
          slug={"checkIssue"}
          columns={columns}
          rows={newData}
          accessToken={user?.token}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default IncidentReport;
