import { useEffect, useState } from "react";
import DataTable from "../componets/dataTable/DataTable";
import { userRows } from "../componets/menu/MenuData";
import AddForm from "../componets/addForm/AddForm";
import "../styles/users.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/apiRequest";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  // {
  //   field: "img",
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
    field: "name",
    headerName: "Tên người dùng",
    width: 200,
    type: "string",
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    type: "string",
  },
  {
    field: "password",
    headerName: "Mật khẩu",
    width: 150,
    type: "string",
  },
  {
    field: "role",
    headerName: "Quyền",
    width: 150,
    type: "string",
  },
  {
    field: "to_char",
    headerName: "Ngày tạo",
    width: 200,
    type: "string",
  },
];

const Users = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUsers(user?.token, dispatch);
  }, []);
  const [open, setOpen] = useState(false);
  // const nagative = useNavigate();



  const dataAccount = useSelector(
    (state) => state.account.accounts.allAccounts
  );

  const newData = dataAccount.data.map((item) => {
    return { ...item ,id: item.user_id};
  });

  // console.log(newData);

  return (
    <div className="users-container">
      <div className="infor">
        <h1>Danh sách tài khoản</h1>
        <button
          className="btn"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add New User
        </button>
      </div>
      <DataTable slug={"users"} columns={columns} rows={newData} />
      {open && <AddForm slug={"users"} columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
