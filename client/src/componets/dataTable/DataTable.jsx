import "../../styles/dataTable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import { useState } from "react";
import { getEmployeeById } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

const DataTable = (props) => {
  const [openEdit, setOpenEdit] = useState(false);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();

  const actionColum = {
    field: "edit",
    headerName: "Edit",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="action-container">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img
              onClick={() => handleShowDetail(params.row.id)}
              src="src/assets/view.svg"
              alt="svg-icon"
            />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="src/assets/delete.svg" alt="delete-icon" />
          </div>
        </div>
      );
    },
  };

  function handleShowDetail(id) {
    if (props.slug === "employee") {
      setOpenEdit(true);
      getEmployeeById(id, user?.token, dispatch);
    }
  }

  function handleDelete(id) {
    if (props.slug === "employee") {
      console.log(id);
    }
  }

  return (
    <div className="data-table-container">
      <Box sx={{ height: "50%", width: "100%" }}>
        <DataGrid
          className="data-table"
          rows={props.rows}
          columns={[...props.columns, actionColum]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 500,
              },
            },
          }}
          sortModel={[{ field: "id", sort: "asc" }]}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
        />
      </Box>
    </div>
  );
};

export default DataTable;
