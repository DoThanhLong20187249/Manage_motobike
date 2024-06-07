import "./todo.scss";

const Todo = ({ task, deleteTodo,editTodo }) => {
  return (
    <div className="Todo">
      <p>{task.action}</p>
      <div>
        <input
          className="edit-status"
          type="checkbox"
          name="status"
          id="status"
          checked={task.status}
          onChange={(e) => {
            editTodo(task.id, e.target.checked);
          }}
        />
        <img
          className="delete-icon"
          src="../../src/assets/delete.svg"
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  );
};

export default Todo;
