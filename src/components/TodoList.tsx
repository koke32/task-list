import { RefObject } from "react";
import { Todo } from "../types/Todo";
import { TodoItem } from "./TodoItem";

export const TodoList = ({
  todoList,
  inputEl,
  handleCheck,
  handleEdit,
  handleDelete,
}: {
  todoList: Todo[];
  inputEl: RefObject<HTMLTextAreaElement>;
  handleCheck: (id: number, done: boolean) => void;
  handleEdit: (id: number, content: string) => void;
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
                inputEl={inputEl}
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
