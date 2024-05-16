import { Link } from "react-router-dom";
import DataTable from "../../componets/dataTable/DataTable";
import "./customer.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCustomers } from "../../redux/apiRequest";

// định nghĩa columns cho bảng dữ liệu khách hàng
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "customer_name",
    headerName: "Tên khách hàng",
    width: 150,
    type: "string",
  },
  {
    field: "customer_phone",
    headerName: "Số điện thoại",
    width: 150,
    type: "string",
  },
  {
    field: "customer_address",
    headerName: "Địa chỉ",
    width: 150,
    type: "string",
  },
  {
    field: "customer_email",
    headerName: "Email",
    width: 160,
    type: "string",
  },
  {
    field: "customer_gender",
    headerName: "Giới tính",
    width: 80,
    type: "string",
  },
  {
    field: "customer_age",
    headerName: "Tuổi",
    width: 70,
    type: "string",
  },
];

const Customer = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  // call api to get all customers
  useEffect(() => {
    getAllCustomers(2, user?.token, dispatch);
  }, []);
  const customers = useSelector(
    (state) => state.customer.customers?.allCustomers
  );
  useEffect(() => {
    setData(customers);
  }, [customers]);

  return (
    <div className="customer-container">
      <div className="infor">
        <h1>Danh sách khách hàng</h1>
        <button>
          <Link to="/customer/add">Thêm khách hàng</Link>
        </button>
      </div>

      {data && data.length > 0 && (
        <DataTable
          slug={"customer"}
          columns={columns}
          rows={data}
          accessToken={user?.token}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default Customer;
