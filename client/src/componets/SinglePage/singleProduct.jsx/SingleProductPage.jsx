import { useSelector } from "react-redux";
import "./singleProductPage.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateProductById } from "../../../redux/apiRequest";
import Loading from "../../Loading/Loading";
const SingleProductPage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [listDataCategory, setListDataCategory] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const singleProduct = useSelector(
    (state) => state.product.singleProduct.data
  );

  const listCategoruProduct = useSelector(
    (state) => state.categoryProduct.categoryProducts.data
  );

  const navigate = useNavigate();

  useEffect(() => {
    setListDataCategory(listCategoruProduct);
  }, [listCategoruProduct]);

  useEffect(() => {
    setIsDataLoaded(true);
    formik.setValues({
      product_id: singleProduct.id || "",
      product_name: singleProduct.product_name || "",
      product_code: singleProduct.code || "",
      product_price: singleProduct.product_price || "",
      product_quantity: singleProduct.product_quantity || "",
      product_brand: singleProduct.product_brand || "",
      category_product_id: singleProduct.category_product_id || "",
    });
  }, [singleProduct]);

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
      product_id: "",
      product_name: "",
      product_code: "",
      product_price: "",
      product_quantity: "",
      product_brand: "",
      category_product_id: "",
    },
    validationSchema: Yup.object({
      product_name: Yup.string().required("Không được để trống").trim(),
      product_code: Yup.string()
        .required("Không được để trống")
        .max(6, "mã sản phẩm không được vượt quá 6 kí tự")
        .matches(
          /^[a-zA-Z0-9 ]*$/,
          "Mã sản phẩm không được chứa ký tự đặc biệt"
        )
        .trim(),
      product_price: Yup.string().required("Không được để trống"),
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
      if (selectedImage) {
        data.append("image", selectedImage);
        data.append("fileName", fileName);
      }
      data.append("product_id", values.product_id);
      data.append("product_name", values.product_name);
      data.append("product_code", values.product_code);
      data.append("product_price", values.product_price);
      data.append("product_quantity", parseInt(values.product_quantity));
      data.append("product_brand", values.product_brand);
      data.append("category_product_id", values.category_product_id);
      data.append("shop_id", user.shop_id);

      for (var pair of data.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      setIsLoading(true);
      updateProductById(
        data.get("product_id"),
        data,
        user.token,
        navigate,
        toast,
        setIsLoading
      );
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
        <>
          {isDataLoaded && (
            <div className="single-product-form-container">
              <div className="single-product-form-main">
                <div className="single-product-form-header">
                  <h1>Tạo Sản phẩm mới</h1>
                  {selectedImage ? (
                    <img src={selectedImage} alt="Selected" />
                  ) : (
                    <img src={singleProduct.product_image_url} alt="Default" />
                  )}
                  <div>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <form className="single-product-form-body">
                  <div className="single-product-form-body-group-1">
                    <div className="form-group">
                      <label htmlFor="productName">Tên sản phẩm</label>
                      <input
                        className="input-field"
                        type="text"
                        name="product_name"
                        id="product_name"
                        placeholder="Nhập tên sản phẩm"
                        value={formik.values.product_name}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.product_name && (
                        <p className="error-msg">
                          {formik.errors.product_name}
                        </p>
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
                        value={formik.values.product_code}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.product_code && (
                        <p className="error-msg">
                          {formik.errors.product_code}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="single-product-form-body-group-2">
                    <div className="form-group">
                      <label htmlFor="product_price">Giá tiền</label>
                      <input
                        className="input-field"
                        type="text"
                        name="product_price"
                        id="product_price"
                        placeholder="Nhập giá tiền"
                        value={formik.values.product_price}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.product_price && (
                        <p className="error-msg">
                          {formik.errors.product_price}
                        </p>
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
                        value={formik.values.product_quantity}
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
                        value={formik.values.product_brand}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.product_brand && (
                        <p className="error-msg">
                          {formik.errors.product_brand}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="category_product_id">
                        Danh Mục sản phẩm
                      </label>
                      <select
                        className="input-field"
                        name="category_product_id"
                        id="category_product_id"
                        value={formik.values.category_product_id}
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
                      Cập nhật thông tin
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
      )}
    </>
  );
};

export default SingleProductPage;
