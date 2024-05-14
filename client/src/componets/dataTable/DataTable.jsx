import "../../styles/dataTable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import { useState } from "react";
import AccountSingle from "../accountSingle/AccountSingle";


const DataTable = (props) => {
  const [openEdit, setOpenEdit] = useState(false);

  const actionColum = {
    field: "edit",
    headerName: "Edit",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="action-container">
          {/* <Link to={`/${props.slug}/${params.row.id}`}> */}
          <div>
            <img
              onClick={() => handleShowDetail(params.row.id)}
              src="src/assets/view.svg"
              alt="svg-icon"
            />
          </div>
          {/* </Link> */}
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="src/assets/delete.svg" alt="delete-icon" />
          </div>
        </div>
      );
    },
  };

  function handleShowDetail(id) {
    setOpenEdit(true);

    console.log(id + "has been clicked");
  }


  function handleDelete(id) {
    console.log(id + "has been deleted");
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
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
        />
      </Box>
      {/* {singleAcountInfo ? (
        <>{openEdit && <AccountSingle setOpenEdit={setOpenEdit} />}</>
      ) : (
        <>
          <div>loading...</div>
        </>
      )} */}
    </div>
  );
};

export default DataTable;
