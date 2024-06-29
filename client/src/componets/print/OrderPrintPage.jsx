import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import "./printOrder.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderPrintPage = () => {
  const newData = useSelector((state) => state.order.singleOrder.data);
  const [newOrder, setNewOrder] = useState(null);
  const [actionList, setActionList] = useState(null);
  const [newOrderDetail, setNewOrderDetail] = useState(null);

  useEffect(() => {
    if (newData) {
      setNewOrder(newData.newOrder);
      setActionList(newData.action_list);
      setNewOrderDetail(newData.newOrderDetail);
    }
  }, [newData]);

  const componetRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componetRef.current,
    documentTitle: "Order",
  });

  return (
    <>
      <div
        ref={componetRef}
        className="print"
        style={{ width: "100%", height: "fit-content" }}
      >
        <div className="order-header">
          <h2>LONG MOTOR</h2>
          <p>
            {" "}
            <span style={{ fontWeight: "bold" }}>Địa chỉ:</span> Số 18/50 Tả
            Thanh Oai, Thanh Trì Hà nội{" "}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Điện thoại: </span>0988888888 |
            095556998
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Website: </span>{" "}
            http://longmotor.com.vn
          </p>
          <h1 style={{ fontWeight: "bold", marginTop: 30 }}>
            <span style={{ fontWeight: "bold", marginTop: 20 }}>
              HÓA ĐƠN SỬA CHỮA
            </span>
          </h1>
        </div>
        <div className="information-header">
          <h3>Mã hóa đơn: </h3>
          {newData && <p>{newData.newOrder.order_code}</p>}
          <h3>Phương thức thanh toán: </h3>
          {newData && <p>{newData.newOrder.payment_method}</p>}
          <h3>Ngày sửa chữa: </h3>
          {newData && <p>{newData.newOrder.createdAt}</p>}
        </div>
        <div className="information-body">
          <h2 style={{ marginTop: 20 }}>Thông tin khách hàng </h2>
          <div className="information-body-main">
            <div className="text-group">
              <h3>Tên khách hàng: </h3>
              {newOrder && <p>{newOrder.customer_name}</p>}
            </div>
            <div className="text-group">
              <h3>Địa chỉ:</h3>
              {newOrder && <p>{newOrder.customer_address}</p>}
            </div>
            <div className="text-group">
              <h3>Số điện thoại:</h3>
              {newOrder && <p>{newOrder.customer_phone}</p>}
            </div>
            <div className="text-group">
              <h3>Xe máy:</h3>
              {newOrder && <p>{newOrder.motocycle_name}</p>}
            </div>
            <div className="text-group">
              <h3>Biển số:</h3>
              {newOrder && <p>{newOrder.motocycle_number}</p>}
            </div>
            <div className="text-group">
              <h3>Xe máy:</h3>
              {newOrder && <p>{newOrder.motocycle_name}</p>}
            </div>
            <div className="text-group">
              <h3>Thợ sửa chữa:</h3>
              {newOrder && <p>{newOrder.employee_name}</p>}
            </div>
            <div className="text-group">
              <h3>Sự cố:</h3>
              {newOrder && <p>{newOrder.category_issue_name}</p>}
            </div>
          </div>
          <div
            className="information-action-container"
            style={{ marginTop: 20 }}
          >
            <h3>Công sửa chữa bảo dưỡng</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Nội dung công việc</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Tiền công</th>
                </tr>
              </thead>
              {actionList && (
                <tbody className="table-group-divider">
                  {actionList.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.action}</td>
                        <td>
                          {item.status === true
                            ? "Đã kiểm tra"
                            : "Chưa kiểm tra"}
                        </td>
                        <td>
                          {item.status === true && <p>{item.action_price}</p>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
          <div className="product-list-container">
            <h2>Sản phẩm kèm theo </h2>
            <table className="table-product">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Giá tiền một sản phẩm</th>
                </tr>
              </thead>
              {newOrderDetail && (
                <tbody className="table-product-group-divider">
                  {newOrderDetail.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td style={{ width: 400 }}>{item.product_name}</td>
                        <td style={{ marginLeft: 50 }}>
                          <p>{item.quantiy}</p>
                        </td>
                        <td>
                          <p>{item.price}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
        </div>
        <div style={{ marginTop: 20 }} className="information-footer">
          <h3>Tổng tiền: </h3>
          {newOrder && <p> {newOrder.order_total_price} VNĐ</p>}
        </div>
      </div>
      <div className="button-group">
        <button
          className="btn-submit"
          type="submit"
          onClick={handlePrint}
        >
          In hóa đơn
        </button>
        <button className="btn-cancer">
          <Link to="/order">Quay lại</Link>
        </button>
      </div>
    </>
  );
};

export default OrderPrintPage;
