import { useDispatch, useSelector } from "react-redux";
import "./orderForm.scss";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../../redux/apiRequest";
import Select from "react-select";
import { useFormik } from "formik";
const OrderForm = () => {
  // general data
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllProduct(user.shop_id, user.token, dispatch);
  }, []);
  const products = useSelector((state) => state.product.products.data);
  useEffect(() => {
    if (products) {
      setOptions(
        products.map((item) => {
          return { value: item.id, label: item.product_name };
        })
      );
    }
  }, [products]);
  // lấy thông tin biên bản sự cố từ redux-stor
  const [informationReportData, setInformationReportData] = useState(null);
  const informationReport = useSelector(
    (state) => state.informationReportDetals.data
  );
  useEffect(() => {
    setInformationReportData(informationReport);
  }, [informationReport]);

  const handlechange = (e, id) => {
    console.log(e.target.value);
    console.log(id);
  };
  // tạo formik cho sản phẩm
  const handleChangeProduct = (value) => {
    formik.setFieldValue("product_id", value.value);
  };
  const formik = useFormik({
    initialValues: {
      product_id: null,
      product_quantity: null,
      product_price: "",
    },
  });

  // xử lí thêm sản phẩm vào table
  const [productList, setProductList] = useState([]);
  const handleAddProduct = () => {
    setProductList((product) => {
      return [
        ...product,
        {
          product_id: formik.values.product_id,
          product_quantity: formik.values.product_quantity,
          product_price:
            products.find((item) => item.id === formik.values.product_id)
              .product_price,
          product_name: products.find(
            (item) => item.id === formik.values.product_id
          ).product_name,
        },
      ];
    });
  };
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
            <div className="form-group">
              <label htmlFor="status">Trạng thái </label>
              <p className="input-field" type="text" id="status" name="status">
                {informationReportData.checkIssueData.status === true
                  ? "Xác nhận"
                  : "Chưa xác nhận"}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="cateogry_issue_name">Sự cố </label>
              <p
                className="input-field"
                type="text"
                id="cateogry_issue_name"
                name="cateogry_issue_name"
              >
                {informationReportData.checkIssueData.cateogry_issue_name}
              </p>
            </div>
          </div>
          <div className="order-action-container" style={{ marginTop: 20 }}>
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
              <tbody className="table-group-divider">
                {informationReportData.checkList.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.action}</td>
                      <td>
                        {item.status === true ? "Đã kiểm tra" : "Chưa kiểm tra"}
                      </td>
                      <td>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Nhập tiền công"
                          onClick={(e) => handlechange(e, item.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="product-list-container">
            <h2>Sản phẩm kèm theo </h2>
            <div className="product-input-form">
              <div className="form-group">
                <label htmlFor="product_id">Nhập tên sản phẩm</label>
                <Select
                  id="product_id"
                  name="product_id"
                  placeholder="Nhập tên sản phẩm"
                  options={options}
                  classNamePrefix="react-select"
                  onChange={handleChangeProduct}
                />
              </div>
              <div className="form-group-input">
                <label htmlFor="product_quantity">Nhập số lượng</label>
                <input
                  type="number"
                  name="product_quantity"
                  id="product_quantity"
                  className="input-field"
                  defaultValue={0}
                  onChange={formik.handleChange}
                />
              </div>
              <button className="btn-submit" onClick={handleAddProduct}>
                Thêm sản phẩm
              </button>
            </div>
            <table className="table-product">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Giá tiền một sản phẩm</th>
                </tr>
              </thead>
              <tbody className="table-product-group-divider">
                {productList.map((item, index) => {
                  return (
                    <tr key={item.product_id}>
                      <td>{index + 1}</td>
                      <td style={{ width: 400 }}>{item.product_name}</td>
                      <td style={{ marginLeft: 50 }}>
                        {item.product_quantity}
                      </td>
                      <td>
                        <input
                          type="text"
                          className="input-field"
                          defaultValue={item.product_price}
                          placeholder="Nhập giá tiền"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderForm;
