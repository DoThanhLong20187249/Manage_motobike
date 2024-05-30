import { useEffect, useState } from "react";
import "./productForm.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  getAllCategoryProduct,
} from "../../../redux/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";

const ProductForm = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [listDataCategory, setListDataCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const listCategoruProduct = useSelector(
    (state) => state.categoryProduct.categoryProducts.data
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategoryProduct(user.shop_id, user.token, dispatch);
  }, []);

  useEffect(() => {
    setListDataCategory(listCategoruProduct);
  }, [listCategoruProduct]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      var base64data = reader.result;
      setSelectedImage(base64data);
    };
  };

  const formik = useFormik({
    initialValues: {
      product_name: "",
      product_code: "",
      product_price: "",
      product_quantity: "",
      product_brand: "",
      category_product_id: "",
    },
    validationSchema: Yup.object({
      product_name: Yup.string()
        .required("Không được để trống")
        .trim(),
      product_code: Yup.string()
        .required("Không được để trống")
        .max(6, "mã sản phẩm không được vượt quá 6 kí tự")
        .matches(
          /^[a-zA-Z0-9 ]*$/,
          "Mã sản phẩm không được chứa ký tự đặc biệt"
        )
        .trim(),
      product_price: Yup.string()
        .required("Không được để trống"),
      product_quantity: Yup.string()
        .required("Không được để trống")
        .matches(/^[0-9]+$/, "Hãy nhập số lượng sản phẩm"),
      product_brand: Yup.string()
        .required("Không được để trống")
        .matches(
          /^[a-zA-Z0-9 ]*$/,
          "Hãng sản xuất không được chứa ký tự đặc biệt"
        ),
    }),
    onSubmit: (values) => {
      const data = new FormData();
      if (!selectedImage) {
        toast.error("Hãy chọn ảnh sản phẩm");
        return;
      }
      data.append("image", selectedImage);
      data.append("fileName", fileName);
      data.append("product_name", values.product_name);
      data.append("product_code", values.product_code);
      data.append("product_price", values.product_price);
      data.append("product_quantity", parseInt(values.product_quantity));
      data.append("product_brand", values.product_brand);
      data.append("category_product_id", values.category_product_id);
      data.append("shop_id", user.shop_id);
      setIsLoading(true);
      addNewProduct(data, user.token, dispatch, navigate, toast, setIsLoading);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger validation khi submit
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length) {
        // Hiện thông báo toastify nếu có lỗi validation
        toast.error("Vui lòng kiểm tra lại thông tin sản phẩm");
      } else {
        formik.handleSubmit();
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="product-form-container">
          <div className="product-form-main">
            <div className="product-form-header">
              <h1>Tạo Sản phẩm mới</h1>
              {selectedImage ? (
                <img src={selectedImage} alt="Selected" />
              ) : (
                <img src="../src/assets/avatar.jpg" alt="Default" />
              )}
              <div>
                <input type="file" name="image" onChange={handleImageChange} />
              </div>
            </div>
            <form className="product-form-body">
              <div className="product-form-body-group-1">
                <div className="form-group">
                  <label htmlFor="productName">Tên sản phẩm</label>
                  <input
                    className="input-field"
                    type="text"
                    name="product_name"
                    id="product_name"
                    placeholder="Nhập tên sản phẩm"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.product_name && (
                    <p className="error-msg">{formik.errors.product_name}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="productCode">Mã sản phẩm</label>
                  <input
                    className="input-field"
                    type="text"
                    name="product_code"
                    id="product_code"
                    placeholder="Nhập mã sản phẩm"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.product_code && (
                    <p className="error-msg">{formik.errors.product_code}</p>
                  )}
                </div>
              </div>
              <div className="product-form-body-group-2">
                <div className="form-group">
                  <label htmlFor="product_price">Giá tiền</label>
                  <input
                    className="input-field"
                    type="text"
                    name="product_price"
                    id="product_price"
                    placeholder="Nhập giá tiền"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.product_price && (
                    <p className="error-msg">{formik.errors.product_price}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="product_quantity">Số lượng</label>
                  <input
                    className="input-field"
                    type="text"
                    name="product_quantity"
                    id="product_quantity"
                    placeholder="Nhập số lượng"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.product_quantity && (
                    <p className="error-msg">
                      {formik.errors.product_quantity}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="product_brand">Hãng sản xuất</label>
                  <input
                    className="input-field"
                    type="text"
                    name="product_brand"
                    id="product_brand"
                    placeholder="Nhập hãng sản xuất"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.product_brand && (
                    <p className="error-msg">{formik.errors.product_brand}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="category_product_id">Danh Mục sản phẩm</label>
                  <select
                    className="input-field"
                    name="category_product_id"
                    id="category_product_id"
                    onChange={formik.handleChange}
                  >
                    {listDataCategory.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.category_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="button-group">
                <button
                  className="btn-submit"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Tạo mới
                </button>
                <button className="btn-cancer">
                  <Link to="/products">Hủy bỏ</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductForm;
