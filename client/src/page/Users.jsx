import { useEffect, useState } from "react";
import DataTable from "../componets/dataTable/DataTable";
import { userRows } from "../componets/menu/MenuData";
import AddForm from "../componets/addForm/AddForm";
import '../styles/users.scss'
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../redux/apiRequest";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return (
        <img
          className="img-avatar"
          src={params.row.img || "src/assets/avatar.jpg"}
          alt="avatar.png"
        />
      );
    },
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 100,
    type: "string",
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    type: "string",
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    type: "string",
  },
  {
    field: "phone",
    headerName: "Phone Number",
    width: 150,
    type: "string",
  },
  {
    field: "createdAt",
    headerName: "Create At",
    width: 100,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
    type: "boolean",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUsers(user.accessToken, dispatch)
  },[])
  const dataAccount = useSelector((state) => state.account.allAccounts);
  
  return (
    <div className="users-container">
      <div className="infor">
        <h1>Users</h1>
        <button className="btn" onClick={() =>{setOpen(true)}}>Add New User</button>
      </div>
      <DataTable slug={"users"} columns={columns} rows={userRows} />
      {open && <AddForm slug={'users'} columns={columns} setOpen={setOpen}/>}
    </div>
  );
};

export default Users;
