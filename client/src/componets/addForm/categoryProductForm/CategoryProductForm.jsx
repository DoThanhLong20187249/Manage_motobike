import { Link, useNavigate } from "react-router-dom";
import "./categoryProductForm.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addNewCategoryProduct } from "../../../redux/apiRequest";
import Loading from "../../Loading/Loading";
import { toast } from "react-toastify";

const CategoryProductForm = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dataCatagory, setDataCategory] = useState({});
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    data.append("image", selectedImage);
    data.append("category_name", dataCatagory.category_name);
    data.append("category_description", dataCatagory.category_description);
    data.append("fileName", fileName);
    data.append("shop_id", user?.shop_id);
    setIsLoading(true);
    addNewCategoryProduct(
      data,
      user?.token,
      dispatch,
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
        <div className="-category-product-container">
          <div className="-category-product-body">
            <div className="-category-product-header">
              <h1>Đăng kí danh mục sản phẩm</h1>
            </div>
            <div className="-category-product-content">
              <div className="-category-product-image">
                <h2>{user.shop_name}</h2>
                {selectedImage ? (
                  <img src={selectedImage} alt="Selected" />
                ) : (
                  <img src="../src/assets/avatar.jpg" alt="Default" />
                )}

                <input type="file" name="image" onChange={handleImageChange} />
              </div>
              <form className="-category-product-infor">
                <div className="form-group">
                  <label htmlFor="category_name">Tên danh mục</label>
                  <input
                    className="input-field"
                    type="text"
                    id="category_name"
                    name="category_name"
                    placeholder="Tên danh mục"
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
                    Tạo mới
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
  );
};

export default CategoryProductForm;
