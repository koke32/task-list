import { Todo } from "../types/Todo";
import { TodoItem } from "./TodoItem";

// TodoItemをループして表示
// todoListが0件の場合、タイトルとTODOリストを表示しない
export const TodoList = ({
  todoList,
  handleCheck,
  handleEdit,
  handleDelete,
}: {
  todoList: Todo[];
  handleCheck: (id: number, done: boolean) => void;
  handleEdit: (id: number, content: string) => void;
  handleDelete: (id: number) => void;
}) => {

  return (
    <div>
      {todoList.length && (
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              <TodoItem
                todo={todo}
                key={todo.id}
                handleCheck={handleCheck}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
