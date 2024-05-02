
import '../../styles/addForm.scss';

const AddForm = ({ slug, columns, setOpen }) => {
  return (
    <div className="form-container">
      <div className="form-context">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Add new {slug}</h1>
        <form action="">
          {columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => {
              return (
                <div className="item" key={column.id}>
                  <label>{column.headerName}</label>
                  <input
                    type={column.type}
                    name={column.field}
                    placeholder={column.headerName}
                  />
                </div>
              );
            })}
            <button id="btn-send">Send</button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
