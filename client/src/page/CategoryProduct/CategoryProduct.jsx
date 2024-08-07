import { Link } from "react-router-dom";
import DataTable from "../../componets/dataTable/DataTable";
import "./categoryProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCategoryProduct } from "../../redux/apiRequest";
import { toast } from "react-toastify";

// định nghĩa columns cho bảng bảng danh mục sản phẩm
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "category_image_url",
    headerName: "Hình Ảnh",
    width: 100,
    renderCell: (params) => {
      return (
        <img
          className="img-avatar"
          src={params.row.category_image_url || "src/assets/avatar.jpg"}
          alt="avatar.png"
        />
      );
    },
  },
  {
    field: "category_name",
    headerName: "Tên danh mục",
    width: 150,
    type: "string",
  },
  {
    field: "category_description",
    headerName: "Mô tả ",
    width: 700,
    type: "string",
  },
];

const CategoryProduct = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      user.role_account === "manager" ||
      user.role_account === "receptionist"
    ) {
      getAllCategoryProduct(user?.shop_id, user?.token, dispatch);
      console.log("user", user.role_account);
      setIsAdmin(true);
    } else {
      toast.error("Bạn không có quyền truy cập vào trang này");
      console.log("user", user.role_account);
      setIsAdmin(false);
    }
  }, [user, dispatch]);

  const categoryProduct = useSelector(
    (state) => state.categoryProduct.categoryProducts.data
  );

  useEffect(() => {
    if (categoryProduct) {
      setIsDataLoaded(true);
    }
  }, [categoryProduct]);

  console.log(categoryProduct);

  return (
    <>
      {isAdmin ? (
        <div className="category-product-container">
          <div className="infor">
            <h1>Danh Mục Sản Phẩm</h1>
            <button>
              <Link to="/CategoryProduct/add">Tạo danh mục sản phẩm mới</Link>
            </button>
          </div>
          {isDataLoaded ? (
            <>
              <DataTable
                slug={"CategoryProduct"}
                columns={columns}
                rows={categoryProduct}
                accessToken={user?.token}
                dispatch={dispatch}
              />
            </>
          ) : (
            <>
              {" "}
              <div>
                <h1>Loading...</h1>
              </div>{" "}
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default CategoryProduct;
