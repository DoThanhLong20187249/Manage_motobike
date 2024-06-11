import { Link, useNavigate } from "react-router-dom";
import "./singleOrderPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  getAllCategoryIssue,
  getAllProduct,
  updateOrderById,
} from "../../../redux/apiRequest";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";

const stringToInt = (str) => {
  // Loại bỏ dấu chấm phân cách hàng nghìn
  console.log(str);
  const cleanedStr = str.includes(".") ? str.replace(/\./g, "") : str;
  // Chuyển chuỗi đã được làm sạch thành số nguyên
  const number = parseInt(cleanedStr, 10);
  return isNaN(number) ? 0 : number;
};

const intToString = (num) => {
  // Chuyển số nguyên thành chuỗi
  const str = num.toString();
  // Sử dụng RegExp để thêm dấu chấm phân cách hàng nghìn
  const formattedStr = str.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formattedStr;
};

const SingleOrderPage = () => {
  //general data
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [actionList, setActionList] = useState([]);
  const [newOrderDetail, setNewOrderDetail] = useState([]);
  const [total_quantity, setTotalQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

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

  useEffect(() => {
    getAllCategoryIssue(user.shop_id, user.token, dispatch);
  }, []);
  const dataCategoryIssues = useSelector(
    (state) => state.categoryIssue.categoryIssues.data // lấy thông tin danh mục sự cố từ redux-store
  );

  const singleOrder = useSelector((state) => state.order.singleOrder.data);

  useEffect(() => {
    if (singleOrder) {
      setActionList(singleOrder.action_list);
      const arrayOrderDetail = singleOrder.newOrderDetail;
      const dataOrderDetail = arrayOrderDetail.map((item) => {
        return {
          id: uuidv4(),
          product_id: item.product_id,
          product_name: item.product_name,
          quantiy: item.quantiy,
          price: item.price,
        };
      });
      setNewOrderDetail(dataOrderDetail);
      formik.setValues({
        id: singleOrder.newOrder.id,
        check_issue_id: singleOrder.newOrder.check_issue_id,
        motocycle_id: singleOrder.newOrder.motocycle_id,
        employee_id: singleOrder.newOrder.employee_id,
        customer_id: singleOrder.newOrder.customer_id,
        customer_name: singleOrder.newOrder.customer_name,
        customer_address: singleOrder.newOrder.customer_address,
        customer_phone: singleOrder.newOrder.customer_phone,
        motocycle_name: singleOrder.newOrder.motocycle_name,
        motocycle_number: singleOrder.newOrder.motocycle_number,
        employee_name: singleOrder.newOrder.employee_name,
        status: singleOrder.newOrder.status,
        category_issue_id: singleOrder.newOrder.category_issue_id,
        order_code: singleOrder.newOrder.order_code,
        order_total_price: singleOrder.newOrder.order_total_price,
        payment_method: singleOrder.newOrder.payment_method,
        createAt: singleOrder.newOrder.createdAt,
      }); // set giá trị cho formik
    }
  }, [singleOrder]);

  const formik = useFormik({
    initialValues: {
      id: null,
      motocycle_id: null,
      employee_id: null,
      customer_id: null,
      customer_name: "",
      customer_address: "",
      customer_phone: "",
      motocycle_name: "",
      motocycle_number: "",
      employee_name: "",
      status: "",
      category_issue_id: "",
      product_id: null,
      product_quantity: null,
    },
    validationSchema: Yup.object({
      customer_name: Yup.string().required(
        "Tên khách hàng không được bỏ trống"
      ),
      customer_address: Yup.string().required(
        "Địa chỉ khách hàng không được bỏ trống"
      ),
      customer_phone: Yup.string().required(
        "Số điện thoại không được bỏ trống"
      ),
      employee_name: Yup.string().required(
        "Tên thợ sửa chữa không được bỏ trống"
      ),
      motocycle_name: Yup.string().required("Tên xe máy không được bỏ trống"),
      motocycle_number: Yup.string().required("Biển số xe không được bỏ trống"),
      status: Yup.string()
        .oneOf(["true", "false"])
        .required("Trạng thái không được bỏ trống"),
      product_quantity: Yup.number()
        .min(0, "Số lượng phải lớn hơn 0")
        .max(total_quantity, "Số lượng sản phẩm không đủ"),
    }),
  });

  // xử lí handle

  const handleChangeProduct = (value) => {
    formik.setFieldValue("product_id", value.value);
    const total_quantity = products.find(
      (item) => item.id === value.value
    ).product_quantity;
    setTotalQuantity(total_quantity);
  };

  const handleChangePriceAction = (e, id) => {
    setActionList((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return { ...item, action_price: e.target.value };
        }
        return item;
      })
    );
  };

  const handleChangeQuantity = (e, id) => {
    setNewOrderDetail((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return { ...item, quantiy: e.target.value };
        }
        return item;
      })
    );
  };

  const handleChangePrice = (e, id) => {
    setNewOrderDetail((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return { ...item, price: e.target.value };
        }
        return item;
      })
    );
  };
  const handleAddProduct = () => {
    const product = products.find(
      (item) => item.id === formik.values.product_id
    );
    const newProduct = {
      id: uuidv4(),
      product_id: formik.values.product_id,
      product_name: product.product_name,
      quantiy: formik.values.product_quantity,
      price: product.product_price,
    };
    setNewOrderDetail([...newOrderDetail, newProduct]);
    console.log(newOrderDetail);
  };

  const handleDeleteProduct = (id) => {
    setNewOrderDetail(newOrderDetail.filter((item) => item.id !== id));
  };

  // Hàm tính tổng tiền sản phẩm
  const totalProductPrice = newOrderDetail.reduce((total, item) => {
    return total + stringToInt(item.price) * item.quantiy;
  }, 0);

  // Hàm tính tổng tiền công
  const totalActionPrice = actionList.reduce((total, item) => {
    return total + stringToInt(item.action_price);
  }, 0);

  // Hàm tính tổng tiền hóa đơn
  const totalOrderPrice = totalProductPrice + totalActionPrice;

  const handleSubmitData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      information: {
        ...formik.values,
      },
      product_list: newOrderDetail,
      action_list: actionList,
      order_total_price: intToString(totalOrderPrice),
    };
    updateOrderById(
      data.information.id,
      data,
      user.token,
      navigate,
      toast,
      setIsLoading
    );
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="order-container-header">
            <h1>Thông tin hóa đơn</h1>
          </div>
          <div
            style={{ marginTop: 20 }}
            className="order-container-body-header"
          >
            <h3>Mã hóa đơn:</h3>
            <span>{formik.values.order_code}</span>

            <h3>Phương thức thanh toán :</h3>
            <span>{formik.values.payment_method}</span>

            <h3>Ngày: </h3>
            <span>{formik.values.createAt}</span>
          </div>
          <div className="order-container-body">
            <form className="order-container-body-main">
              <div className="form-group">
                <label htmlFor="customer_name">Tên khách hàng</label>
                <input
                  className="input-field"
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  onChange={formik.handleChange}
                  value={formik.values.customer_name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="customer_address">Địa chỉ </label>
                <input
                  className="input-field"
                  type="text"
                  id="customer_address"
                  name="customer_address"
                  onChange={formik.handleChange}
                  value={formik.values.customer_address}
                />
              </div>
              <div className="form-group">
                <label htmlFor="customer_phone">Số Điện Thoại </label>
                <input
                  className="input-field"
                  type="text"
                  id="customer_phone"
                  name="customer_phone"
                  onChange={formik.handleChange}
                  value={formik.values.customer_phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="motocycle_name">Xe máy</label>
                <input
                  className="input-field"
                  type="text"
                  id="motocycle_name"
                  name="motocycle_name"
                  onChange={formik.handleChange}
                  value={formik.values.motocycle_name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="motocycle_number">Biển số xe</label>
                <input
                  className="input-field"
                  type="text"
                  id="motocycle_number"
                  name="motocycle_number"
                  onChange={formik.handleChange}
                  value={formik.values.motocycle_number}
                />
              </div>
              <div className="form-group">
                <label htmlFor="employee_name">Thợ sửa chữa </label>
                <input
                  className="input-field"
                  type="text"
                  id="employee_name"
                  name="employee_name"
                  onChange={formik.handleChange}
                  value={formik.values.employee_name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cost">Trạng thái</label>
                <select
                  name="status"
                  id="status"
                  className="input-field"
                  onChange={formik.handleChange}
                  value={formik.values.status}
                >
                  <option value="">Chọn trạng thái</option>
                  <option value={true}>Xác nhận</option>
                  <option value={false}>Chưa xác nhận</option>
                </select>
                {formik.errors.status && (
                  <p className="error-msg">{formik.errors.status}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="time">Danh mục sự cố</label>
                <select
                  name="category_issue_id"
                  id="category_issue_id"
                  className="input-field"
                  onChange={formik.handleChange}
                  value={formik.values.category_issue_id}
                >
                  <option value="">Chọn danh mục sự cố</option>
                  {dataCategoryIssues.map((categoryIssue) => {
                    return (
                      <option key={categoryIssue.id} value={categoryIssue.id}>
                        {categoryIssue.category_issue_name}
                      </option>
                    );
                  })}
                </select>
                {formik.errors.category_issue_id && (
                  <p className="error-msg">{formik.errors.category_issue_id}</p>
                )}
              </div>
            </form>
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
                            {item.status === true && (
                              <input
                                type="text"
                                className="input-field"
                                placeholder="Nhập tiền công"
                                defaultValue={item.action_price}
                                onChange={(e) =>
                                  handleChangePriceAction(e, item.id)
                                }
                              />
                            )}
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
                  {formik.errors.product_id && (
                    <p className="error-msg">{formik.errors.product_id}</p>
                  )}
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
                  {formik.errors.product_quantity && (
                    <p className="error-msg">
                      {formik.errors.product_quantity}
                    </p>
                  )}
                </div>
                <button className="btn-submit" onClick={handleAddProduct}>
                  Thêm sản phẩm{" "}
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
                {newOrderDetail && (
                  <tbody className="table-product-group-divider">
                    {newOrderDetail.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td style={{ width: 400 }}>{item.product_name}</td>
                          <td style={{ marginLeft: 50 }}>
                            <input
                              type="number"
                              className="input-field"
                              defaultValue={item.quantiy}
                              placeholder="Nhập số lượng"
                              onChange={(e) => handleChangeQuantity(e, item.id)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="input-field"
                              defaultValue={item.price}
                              placeholder="Nhập giá tiền"
                              onChange={(e) => handleChangePrice(e, item.id)}
                            />
                          </td>
                          <td>
                            <img
                              src="/src/assets/delete.svg"
                              alt="delete-icon"
                              onClick={() => handleDeleteProduct(item.id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
            <div className="total-price">
              <h3>Tổng tiền sản phẩm : </h3>
              <p>{intToString(totalProductPrice)} VNĐ</p>
              <h3>Tổng tiền công : </h3>
              <p>{intToString(totalActionPrice)} VNĐ</p>
              <h3>Tổng tiền hóa đơn : </h3>
              <p>{intToString(totalOrderPrice)} VNĐ</p>
            </div>

            <div className="button-group">
              <button
                className="btn-submit"
                type="submit"
                onClick={(e) => handleSubmitData(e)}
              >
                Cập nhật thông tin
              </button>
              <button className="btn-cancer">
                <Link to="/order">Quay lại</Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleOrderPage;
