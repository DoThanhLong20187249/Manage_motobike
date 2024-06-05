import { useState } from "react";
import "./todoForm.scss";

const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
      // prevent default action
        e.preventDefault();
        if (value) {
          // add todo
          addTodo(value);
          // clear form after submission
          setValue('');
        }
      };
    return (
        <form onSubmit={handleSubmit} className="TodoForm">
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='Công việc kiểm tra' />
        <button type="submit" className='todo-btn'>Thêm công việc</button>
      </form>
    );
};

export default TodoForm;