import { Todo } from "../types/Todo";

export const TodoItem = ({
  todo,
  handleDone,
  handleEdit,
  handleDelete
}: {
  todo:         Todo;
  handleDone:   any;
  handleEdit:   any;
  handleDelete: any;
}) => {

  // hooks/useTodo
  const doneTodo = () => handleDone(todo.id, !todo.done);
  const editTodo = (e: React.ChangeEvent<any>) => handleEdit(todo.id, e.target.value);
  const deleteTodo = () => handleDelete(todo.id);

  return (
    <>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={doneTodo}
      />
      <input
        type="text"
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
