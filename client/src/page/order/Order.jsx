import { useDispatch, useSelector } from "react-redux";
import "./order.scss";
import DataTable from "../../componets/dataTable/DataTable";
import { getAllOrder } from "../../redux/apiRequest";
import { useEffect, useState } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "customer_name",
    headerName: "Tên khách hàng",
    width: 150,
    type: "string",
  },
  {
    field: "motocycle_name",
    headerName: "Xe máy",
    width: 150,
    type: "string",
  },
  {
    field: "motocycle_number",
    headerName: "Biển số xe",
    width: 150,
    type: "string",
  },
  {
    field: "payment_method",
    headerName: "Phương thức thanh toán",
    align: "center",
    width: 200,
    type: "string",
  },
  {
    field: "order_total_price",
    headerName: "Tổng tiền",
    width: 100,
    type: "string",
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 100,
    type: "string",
  },
];

const Order = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [dataOrder, setDataOrder] = useState(null);
  const dispatch = useDispatch();

  // gọi API lấy toàn bộ hóa đơn
  useEffect(() => {
    getAllOrder(user.shop_id, user.token, dispatch);
  }, []);

  // lấy data từ redux-store
  const listOrder = useSelector((state) => state.order.orders.data);
  useEffect(() => {
    if (listOrder) {
      setDataOrder(listOrder);
    }
  }, [listOrder]);
  console.log(dataOrder);
  return (
    <div className="order-container">
      <div className="infor">
        <h1>Danh sách hóa đơn</h1>
      </div>
      {dataOrder && (
        <DataTable
          slug={"order"}
          columns={columns}
          rows={dataOrder}
          accessToken={user?.token}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default Order;
