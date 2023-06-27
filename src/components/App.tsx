import React from "react";

import { useTodo } from "../hooks/useTodo";
import { TodoAdd } from "./TodoAdd";
import { TodoList } from "./TodoList";
import { TodoTitle } from "./TodoTitle";
import { TodoSelect } from "./TodoSelect";
import "../style.css";

function App() {

  const {
    inputEl,
    handleAdd,
    handleDelete,
    handleDone,
    handleEdit,
    handleSort,
    filteredTodoList,
  } = useTodo();

  return (
    <div>
      <TodoTitle
        title="タスク管理"
        as="h1"
      />

      <TodoAdd
        buttonText="追加"
        inputEl={inputEl}
        handleAdd={handleAdd}
      />

      <TodoSelect
        handleSort={handleSort}
      />

      <TodoList
        todoList={filteredTodoList}
        handleDone={handleDone}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
