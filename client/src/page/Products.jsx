import { useEffect, useState } from "react";
import DataTable from "../componets/dataTable/DataTable";
import "../styles/products.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../redux/apiRequest";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Hình ảnh",
    width: 100,
    renderCell: (params) => {
      return (
        <img
          className="img-avatar"
          src={params.row.product_image_url || "src/assets/avatar.jpg"}
          alt="avatar.png"
        />
      );
    },
  },
  {
    field: "code",
    headerName: "Code",
    width: 100,
    type: "string",
  },
  {
    field: "product_name",
    headerName: "Tên Sản phẩm",
    width: 200,
    type: "string",
  },
  {
    field: "product_price",
    headerName: "Giá tiền",
    width: 150,
    type: "string",
  },
  {
    field: "product_brand",
    headerName: "Hãng Sản xuất",
    width: 150,
    type: "string",
  },
  {
    field: "product_quantity",
    headerName: "Số lượng",
    width: 100,
    type: "integer",
  },
  {
    field: "category_name",
    headerName: "Danh mục sản phẩm",
    width: 170,
    type: "string",
  },
];

const Products = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [dataProduct, setDataProduct] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isToastShown, setIsToastShown] = useState(false);
  const [isManagerOrReceptionist, setIsManagerOrReceptionist] = useState(false);

  useEffect(() => {
    if (
      user?.role_account === "manager" ||
      user?.role_account === "receptionist"
    ) {
      setIsManagerOrReceptionist(true);
      setIsToastShown(false);
    } else {
      setIsManagerOrReceptionist(false);
      setIsToastShown(true);
    }
  }, [user]);

  useEffect(() => {
    if (isToastShown == true) {
      toast.error("Bạn không thể thực hiện chức năng này");
    }
  }, [isToastShown]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      getAllProduct(user.shop_id, user?.token, dispatch);
    }
  }, []);

  const products = useSelector((state) => state.product.products.data);
  useEffect(() => {
    if (products) {
      setDataProduct(products);
      setIsDataLoaded(true);
    }
  }, [products]);
  return (
    <>
      {isManagerOrReceptionist && (
        <div className="products-container">
          <div className="infor">
            <h1>Danh sách sản phẩm</h1>
            <button className="btn">
              <Link to="/products/add">Thêm sản phẩm mới</Link>
            </button>
          </div>
          {isDataLoaded && (
            <DataTable
              slug={"products"}
              rows={dataProduct}
              columns={columns}
              accessToken={user.token}
              dispatch={dispatch}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Products;
