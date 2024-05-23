import "../../styles/dataTable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import Box from "@mui/material/Box";
import { Link } from "react-router-dom";


import { deleteCustomer, deleteEmployee, deleteMotocycle, getCategoryProductById, getCustomerById, getEmployeeById, getMotocycleById } from "../../redux/apiRequest";



const DataTable = (props) => {
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
      getEmployeeById(id, props.accessToken, props.dispatch);
    }else if(props.slug === "customer") {
      getCustomerById(id, props.accessToken, props.dispatch);
    }else if(props.slug === "motocycle") {
      getMotocycleById(id, props.accessToken, props.dispatch);
    }else if(props.slug === "CategoryProduct") {
      getCategoryProductById(id, props.accessToken, props.dispatch)
    }
  }

  function handleDelete(id) {
    if (props.slug === "employee") {
      deleteEmployee(id, props.accessToken, props.dispatch);
      
    }else if(props.slug === "customer") {
      deleteCustomer(id, props.accessToken, props.dispatch);
    }else if(props.slug === "motocycle") {
      deleteMotocycle(id, props.accessToken, props.dispatch);
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
