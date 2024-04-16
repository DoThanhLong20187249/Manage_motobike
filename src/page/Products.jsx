

import { useState } from 'react';
import DataTable from "../componets/dataTable/DataTable";
import AddForm from "../componets/addForm/AddForm";
import { products } from "../componets/menu/MenuData";
import  '../styles/products.scss';


const Products = () => {

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
          field: "img",
          headerName: "Product Image",
          width: 150,
          renderCell: (params) => {
            return (
              <img
                className="img-avatar"
                src={params.row.img || "src/assets/avatar.jpg"}
                alt="avatar.png"
              />
            );
          },
        },
        {
          field: "title",
          headerName: "Title",
          width: 200,
          type: "string",
        },
        {
          field: "price",
          headerName: "Price",
          width: 150,
          type: "string",
        },
        {
          field: "producer",
          headerName: "Producer",
          width: 100,
          type: "string",
        },
        {
          field: "createdAt",
          headerName: "Create At",
          width: 100,
          type: "string",
        },
        {
          field: "inStock",
          headerName: "Verified",
          width: 150,
          type: "boolean",
        },
      ];
    const [open, setOpen] = useState(false);
    return (
      <div className="products-container">
        <div className="infor">
          <h1>Products</h1>
          <button className="btn" onClick={() =>{setOpen(true)}}>Add New Product</button>
        </div>
        <DataTable slug={"products"} columns={columns} rows={products} />
        {open && <AddForm slug={'products'} columns={columns} setOpen={setOpen}/>}
      </div>
    );
};

export default Products;