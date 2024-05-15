import { useEffect, useState } from "react";
import DataTable from "../componets/dataTable/DataTable";

import AddForm from "../componets/addForm/AddForm";

import "../styles/users.scss";
import { useDispatch, useSelector } from "react-redux";

import { getAllEmployee } from "../redux/apiRequest";
import { Link } from "react-router-dom";
import { sortingStateInitializer } from "@mui/x-data-grid/internals";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  // {
  //   field: "",
  //   headerName: "Avatar",
  //   width: 100,
  //   renderCell: (params) => {
  //     return (
  //       <img
  //         className="img-avatar"
  //         src={params.row.img || "src/assets/avatar.jpg"}
  //         alt="avatar.png"
  //       />
  //     );
  //   },
  // },
  {
    field: "name_employee",
    headerName: "Tên người dùng",
    width: 150,
    type: "string",
  },
  {
    field: "phone_employee",
    headerName: "Số điện thoại",
    width: 150,
    type: "string",
  },
  {
    field: "address_employee",
    headerName: "Địa chỉ",
    width: 150,
    type: "string",
  },
  {
    field: "position_employee",
    headerName: "Chức vụ",
    width: 150,
    type: "string",
  },
  {
    field: "shop_name",
    headerName: "Xưởng",
    width: 200,
    type: "string",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();

  console.log(user?.id)
  useEffect(() => {
    getAllEmployee(user?.id, user?.token, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dataEmployee = useSelector(
    (state) => state.employee.employees.allEmployees
  );
  const data = dataEmployee?.data.map((item) => {
    return { ...item, shop_name: user?.shop_name };
  });

  return (
    <div className="users-container">
      <div className="infor">
        <h1>Danh sách Nhân viên</h1>
        {user?.role_account === "manager" && (
          <>
            {" "}
            <button>
              <Link to={"/employee/add"}>Thêm mới nhân viên</Link>
            </button>
          </>
        )}
      </div>
      {data && (
        <DataTable
          slug={"employee"}
          columns={columns}
          rows={data}
          accessToken={user?.token}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default Users;
