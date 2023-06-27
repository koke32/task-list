import { Todo } from "../types/Todo";

export const TodoItem = ({
  todo,
  inputEl,
  handleCheck,
  handleEdit,
  handleDelete
}: {
  todo: Todo;
  inputEl: any;
  handleCheck: any;
  handleEdit: any;
  handleDelete: any;
}) => {

  // hooks/useTodo
  const checkTodo = () => handleCheck(todo.id, !todo.done);
  const editTodo = (e: React.ChangeEvent<any>) => handleEdit(todo.id, e.target.value);
  const deleteTodo = () => handleDelete(todo.id);

  return (
    <>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={checkTodo}
      />
      <textarea
        ref={inputEl}
        disabled={todo.done}
        value={todo.content}
        onChange={editTodo}
      />
      <button onClick={deleteTodo}>
        削除
      </button>
    </>
  );
};
