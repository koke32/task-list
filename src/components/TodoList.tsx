import { Todo } from "../types/Todo";
import { TodoItem } from "./TodoItem";

export const TodoList = ({
  todoList,
  handleDone,
  handleEdit,
  handleDelete,
}: {
  todoList:     Todo[];
  handleDone:   (id: number, done: boolean) => void;
  handleEdit:   (id: number, content: string) => void;
  handleDelete: (id: number) => void;
}) => {

  return (
    <div>
      {todoList.length !== 0 && (
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              <TodoItem
                todo={todo}
                key={todo.id}
                handleDone={handleDone}
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
