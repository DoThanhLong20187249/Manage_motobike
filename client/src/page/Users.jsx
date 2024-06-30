import { useEffect, useState } from "react";
import DataTable from "../componets/dataTable/DataTable";

import "../styles/users.scss";
import { useDispatch, useSelector } from "react-redux";

import { getAllEmployee } from "../redux/apiRequest";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [newData, setNewData] = useState([]);
  const [isToastShown, setIsToastShown] = useState(false);
  const dispatch = useDispatch();
  const [isManagerOrReceptionist, setIsManagerOrReceptionist] = useState(false);


  useEffect(() => {
    if (
      user?.role_account === "manager" || 
      user?.role_account === "receptionist"
    ) {
      setIsManagerOrReceptionist(true);
      setIsToastShown(false);
    }else{
      setIsManagerOrReceptionist(false);
      setIsToastShown(true);
    }

  }, [user]);

  useEffect(() => {
    if (isToastShown == true) {
      toast.error("Bạn không thể thực hiện chức năng này");
    }
  }, [isToastShown]);

  useEffect(() => {
    getAllEmployee(user?.shop_id, user?.token, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dataEmployee = useSelector(
    (state) => state.employee.employees.allEmployees
  );
  useEffect(() => {
    setNewData(dataEmployee);
  }, [dataEmployee]);

  return (
    <div className="users-container">
      {isManagerOrReceptionist  && (
        <>
          <div className="infor">
            <h1>Danh sách Nhân viên</h1>
            <>
              {" "}
              <button>
                <Link to={"/employee/add"}>Thêm mới nhân viên</Link>
              </button>
            </>
          </div>
          {newData && (
            <DataTable
              slug={"employee"}
              columns={columns}
              rows={newData}
              accessToken={user?.token}
              dispatch={dispatch}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Users;
