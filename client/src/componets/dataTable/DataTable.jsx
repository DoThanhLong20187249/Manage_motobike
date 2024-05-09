import "../../styles/dataTable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const DataTable = (props) => {
  const actionColum = 
    {
      field: "edit",
      headerName: "Edit",
      width: 150, 
      renderCell: (params) => {
        return (
          <div className="action-container">
            <Link to={`/${props.slug}/${params.row.id}`}>
              <img src="src/assets/view.svg" alt="svg-icon" />
            </Link>
            <div className="delete" onClick={ () => handleDelete(params.row.id)}>
              <img src="src/assets/delete.svg" alt="delete-icon" />
            </div>
          </div>
        );
      },
    };


  function handleDelete(id) {
    console.log(id + "has been deleted");
  }

  return (
    <div className="data-table-container">
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          className="data-table"
          rows={props.rows}   
          columns={[...props.columns, actionColum]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
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
    </div>
  );
};

export default DataTable;
