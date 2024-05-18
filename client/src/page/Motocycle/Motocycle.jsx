import { useDispatch, useSelector } from "react-redux";
import "./motocycle.scss";
import DataTable from "../../componets/dataTable/DataTable";
import { useEffect, useState } from "react";
import Loading from "../../componets/Loading/Loading";
import { getAllMotocycles } from "../../redux/apiRequest";

/// define motocycle colum
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "motocycle_name",
    headerName: "Tên xe máy",
    width: 150,
    type: "string",
  },
  {
    field: "motocycle_brand",
    headerName: "Hãng xe",
    width: 150,
    type: "string",
  },
  {
    field: "motocycle_color",
    headerName: "Màu sắc",
    width: 150,
    type: "string",
  },
  {
    field: "motocycle_year",
    headerName: "Năm sản xuất",
    width: 160,
    type: "string",
  },
  {
    field: "motocycle_number",
    headerName: "Biển số xe",
    width: 150,
    type: "string",
  },
  {
    field: "customer_name",
    headerName: "Chủ xe",
    width: 160,
    type: "string",
  },
];
const Motocycle = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    getAllMotocycles(user?.shop_id, user?.token, dispatch);
  }, []);
  const motocycles = useSelector((state) => state.motocycle.motocycles.allMotocycles);

  useEffect(() => {
    if (motocycles) {
      setData(motocycles);
      setIsDataLoaded(true);
    }
  }, [motocycles]);

  return (
    <div className="motocycle-container">
      <div className="infor">
        <h1>Danh sách xe máy</h1>
      </div>

      {isDataLoaded ? (
        <DataTable
          slug={"motocycle"}
          columns={columns}
          rows={data}
          accessToken={user?.token}
          dispatch={dispatch}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Motocycle;
