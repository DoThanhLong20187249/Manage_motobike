import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./orderPrintPage.scss";

const OrderPrintPage = () => {
  const componetRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componetRef.current,
    documentTitle: "Order",
  });
  return (
    <div
      ref={componetRef}
      className="print"
      style={{ width: "100%", height: window.innerHeight }}
    >
      <div className="order-header">
        <h2>LONG MOTOR</h2>
        <p>Địa chỉ: Số 18/50 Tả Thanh Oai, Thanh Trì Hà nội </p>
        <p>Điện thoại: 0988888888 | 095556998</p> 
      </div>

      <button onClick={handlePrint}> print</button>
    </div>
  );
};

export default OrderPrintPage;
