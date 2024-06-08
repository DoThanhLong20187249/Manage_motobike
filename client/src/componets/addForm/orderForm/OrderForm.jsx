import { useSelector } from "react-redux";
import "./orderForm.scss";
import { useEffect, useState } from "react";

const OrderForm = () => {
  const [informationReportData, setInformationReportData] = useState(null);
  const informationReport = useSelector(
    (state) => state.informationReportDetals.data
  );
  useEffect(() => {
    setInformationReportData(informationReport);
  }, [informationReport]);
  return (
    <>
      {informationReportData && (
        <div className="order-form-container">
          <h1>Hóa đơn sửa xe </h1>
          <div className="order-form-container-main">
            <div className="form-group">
              <label htmlFor="issue">Tên khách hàng</label>
              <p className="input-field" type="text" id="issue" name="issue">
                {informationReportData.checkIssueData.customer_name}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="motocycle_name">Xe máy</label>
              <p
                className="input-field"
                type="text"
                id="motocycle_name"
                name="motocycle_name"
              >
                {informationReportData.checkIssueData.motocycle_name}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="motocycle_number">Biển số xe</label>
              <p
                className="input-field"
                type="text"
                id="motocycle_number"
                name="motocycle_number"
              >
                {informationReportData.checkIssueData.motocycle_number}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="employee_name">Thợ sửa chữa </label>
              <p
                className="input-field"
                type="text"
                id="employee_name"
                name="employee_name"
              >
                {informationReportData.checkIssueData.employee_name}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderForm;
