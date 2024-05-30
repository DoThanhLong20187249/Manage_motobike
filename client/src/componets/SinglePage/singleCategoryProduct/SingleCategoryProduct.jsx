import { Link, useNavigate } from "react-router-dom";
import "./singleCategoryProduct.scss";
import { useEffect, useState } from "react";
import { updateCategoryProduct } from "../../../redux/apiRequest";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";

const SingleCategoryProduct = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dataCatagory, setDataCategory] = useState({});
  const [fileName, setFileName] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const singleCategoryProduct = useSelector(
    (state) => state.categoryProduct.singleCategoryProduct.data
  );

  useEffect(() => {
    if (singleCategoryProduct) {
      setDataCategory({ ...singleCategoryProduct, shop_id: user?.shop_id });
      setIsDataLoaded(true);
    }
  }, [singleCategoryProduct]);

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
  const handleSumbit = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (selectedImage) {
      data.append("image", selectedImage);
      data.append("fileName", fileName);
    }
    data.append("category_name", dataCatagory.category_name);
    data.append("category_description", dataCatagory.category_description);
    data.append("shop_id", dataCatagory.shop_id);
    setIsLoading(true);
    updateCategoryProduct(
      dataCatagory.id,
      user?.token,
      data,
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
        <>
          {isDataLoaded && (
            <div className="single-category-product-container">
              <div className="single-category-product-body">
                <div className="single-category-product-header">
                  <h1>Chi tiết danh mục sản phẩm</h1>
                </div>
                <div className="single-category-product-content">
                  <div className="single-category-product-image">
                    <h2>Tên Xưởng</h2>
                    {selectedImage ? (
                      <img src={selectedImage} alt="Selected" />
                    ) : (
                      <img
                        src={dataCatagory.category_image_url}
                        alt="Default"
                      />
                    )}
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                    />
                  </div>
                  <form className="single-category-product-infor">
                    <div className="form-group">
                      <label htmlFor="category_name">Tên danh mục</label>
                      <input
                        className="input-field"
                        type="text"
                        id="category_name"
                        name="category_name"
                        placeholder="Tên danh mục"
                        value={
                          dataCatagory.category_name
                            ? dataCatagory.category_name
                            : ""
                        }
                        onChange={(e) =>
                          setDataCategory({
                            ...dataCatagory,
                            category_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="category_description">Mô tả</label>
                      <textarea
                        className="input-field"
                        id="category_description"
                        name="category_description"
                        placeholder="Nhập mô tả"
                        rows={6}
                        cols={50}
                        value={
                          dataCatagory.category_description
                            ? dataCatagory.category_description
                            : ""
                        }
                        onChange={(e) =>
                          setDataCategory({
                            ...dataCatagory,
                            category_description: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div className="button-group">
                      <button
                        onClick={(e) => handleSumbit(e)}
                        className="btn-submit"
                        type="submit"
                      >
                        Cập nhật thông tin
                      </button>
                      <button className="btn-cancer">
                        <Link to="/CategoryProduct">Quay lại</Link>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SingleCategoryProduct;
