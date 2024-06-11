import { useDispatch, useSelector } from "react-redux";
import "./orderForm.scss";
import { useEffect, useState } from "react";
import { addNewOrder, getAllProduct } from "../../../redux/apiRequest";
import Select from "react-select";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";

const stringToInt = (str) => {
  // Loại bỏ dấu chấm phân cách hàng nghìn
  const cleanedStr = str.replace(/\./g, "");
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

const OrderForm = () => {
  // general data
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [productList, setProductList] = useState([]);
  const [total_quantity, setTotalQuantity] = useState(0);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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

  console.log(informationReportData);

  // tạo formik cho sản phẩm
  const handleChangeProduct = (value) => {
    formik.setFieldValue("product_id", value.value);
    const total_quantity = products.find(
      (item) => item.id === value.value
    ).product_quantity;
    setTotalQuantity(total_quantity);
  };

  const formik = useFormik({
    initialValues: {
      product_id: null,
      product_quantity: null,
      product_price: "",
      product_total_quantity: null,
    },
    validationSchema: Yup.object({
      product_id: Yup.number().required("Vui lòng chọn sản phẩm"),
      product_quantity: Yup.number()
        .required("Vui lòng nhập số lượng")
        .min(0, "Số lượng phải lớn hơn 0")
        .max(total_quantity, "Số lượng sản phẩm không đủ"),
    }),
  });
  console.log("total_quantity", formik.values.product_total_quantity);

  console.log("product_quantity", productList.product_total_quantity);

  // xử lí thêm sản phẩm vào table

  const handleAddProduct = () => {
    setProductList((product) => {
      return [
        ...product,
        {
          id: uuidv4(),
          product_id: formik.values.product_id,
          product_quantity: formik.values.product_quantity,
          product_price: products.find(
            (item) => item.id === formik.values.product_id
          ).product_price,
          product_name: products.find(
            (item) => item.id === formik.values.product_id
          ).product_name, // lấy tổng số lượng sản phẩm hiện có
        },
      ];
    });
  };

  const handleChangePrice = (e, id) => {
    setProductList((product) => {
      return product.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            product_price: e.target.value,
          };
        }
        return item;
      });
    });
  };

  const handleChangPriceAction = (e, id) => {
    setInformationReportData((data) => {
      return {
        ...data,
        checkList: data.checkList.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              action_price: e.target.value,
            };
          }
          return item;
        }),
      };
    });
  };
  // gửi xuống thông tin xuống server

  const handleSenData = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length > 0) {
        toast.error("Vui lòng kiểm tra lại thông tin");
        return;
      } else {
        setIsLoading(true);
        const data = {
          product_list: productList,
          action_list: informationReportData.checkList,
          information_reprot_data: informationReportData.checkIssueData,
          shop_id: user.shop_id,
          total_price: intToString(
            productList.reduce((total, item) => {
              return (
                total + stringToInt(item.product_price) * item.product_quantity
              );
            }, 0) +
              informationReportData.checkList.reduce((total, item) => {
                return total + stringToInt(item.action_price);
              }, 0)
          ),
          order_code: uuidv4(),
        };
        addNewOrder(
          data.information_reprot_data.id,  
          data,
          user.token,
          navigate,
          toast,
          setIsLoading
        );
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {informationReportData && (
            <div className="order-form-container">
              <h1>Hóa đơn sửa xe </h1>
              <div className="order-form-container-main">
                <div className="form-group">
                  <label htmlFor="issue">Tên khách hàng</label>
                  <p
                    className="input-field"
                    type="text"
                    id="issue"
                    name="issue"
                  >
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
                  <p
                    className="input-field"
                    type="text"
                    id="status"
                    name="status"
                  >
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
                                  handleChangPriceAction(e, item.id)
                                }
                              />
                            )}
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
                        <tr key={item.id}>
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
                              onChange={(e) => handleChangePrice(e, item.id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="total-price">
                <h3>Tổng tiền sản phẩm : </h3>
                <p>
                  {intToString(
                    productList.reduce((total, item) => {
                      return (
                        total +
                        stringToInt(item.product_price) * item.product_quantity
                      );
                    }, 0)
                  )}{" "}
                  VNĐ
                </p>
                <h3>Tổng tiền công : </h3>
                <p>
                  {intToString(
                    informationReportData.checkList.reduce((total, item) => {
                      return total + stringToInt(item.action_price);
                    }, 0)
                  )}{" "}
                  VNĐ
                </p>
                <h3>Tổng tiền : </h3>
                <p>
                  {intToString(
                    productList.reduce((total, item) => {
                      return (
                        total +
                        stringToInt(item.product_price) * item.product_quantity
                      );
                    }, 0) +
                      informationReportData.checkList.reduce((total, item) => {
                        return total + stringToInt(item.action_price);
                      }, 0)
                  )}{" "}
                  VNĐ
                </p>
              </div>
              <div className="button-group">
                <button
                  className="btn-submit"
                  type="submit"
                  onClick={() => handleSenData()}
                >
                  Tạo mới
                </button>
                <button className="btn-cancer">
                  <Link
                    to={`/checkIssue/${informationReportData.checkIssueData.id}`}
                  >
                    Quay lại
                  </Link>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OrderForm;
