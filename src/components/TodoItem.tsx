import { Todo } from "../types/Todo";

// 1つのTodo、内容と移動・削除ボタン
export const TodoItem = ({
  todo,
  handleCheck,
  handleEdit,
  handleDelete
}: {
  todo: Todo;
  handleCheck: any;
  handleEdit: any;
  handleDelete: any
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
