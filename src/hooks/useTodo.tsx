import React, { useState, useEffect, useRef } from "react";
import * as todoData from "../apis/todos";
import { Todo } from "../types/Todo";

type Filter = 'all' | 'done' | 'undone';

export const useTodo = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    todoData.getAllTodosData().then((todo) => {

      setTodoList([...todo]);
    });
  }, []);

  // 追加
  const addTodoItem = (todoContent: string) => {

    const ids = todoList.map((item) => item.id);

    const newTodoItem = {
      id:      Math.max(...ids) + 1,
      content: todoContent,
      done:    false
    };

    todoData.addTodoData(newTodoItem).then((addTodo) => {

      setTodoList([addTodo, ...todoList]);
    });
  };

  const inputEl = useRef<HTMLTextAreaElement>(null);

  const handleAdd = () => {
    if (inputEl.current?.value === '') {

      return;
    }

    addTodoItem(inputEl.current!.value);

    inputEl.current!.value = '';
  };

  // 削除
  const handleDelete = (id: number) => {

    todoData.deleteTodoData(id).then((deletedId) => {
      const newTodoList = todoList.filter((item) => item.id !== deletedId);

      setTodoList(newTodoList);
    });
  };

  // 更新
  const updateTodoItem = (id: number, newTodoItem: Todo) => {
    todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {

      const newTodoList = todoList.map((item) => (item.id !== updatedTodo.id ? item : updatedTodo));

      setTodoList(newTodoList);
    });
  }

  const handleDone = (id: number, done: boolean) => {
    const todoItem = todoList.find((item: Todo) => item.id === id);
    const newTodoItem: Todo = { ...todoItem!, done: done };

    updateTodoItem(id, newTodoItem);
  };

  const handleEdit = (id: number, content: string) => {
    const todoItem = todoList.find((item: Todo) => item.id === id);
    const newTodoItem: Todo = { ...todoItem!, content };

    updateTodoItem(id, newTodoItem);
  }

  // 選別
  const handleSort = (filter: Filter) => {
    setFilter(filter);
  }

  const filteredTodoList = todoList.filter((item) => {
    switch (filter) {
      case 'done':
        return item.done;

      case 'undone':
        return !item.done;

      default:
        return item;
    }
  });

  return {
    inputEl,
    handleAdd,
    handleDelete,
    handleDone,
    handleEdit,
    handleSort,
    filteredTodoList,
  };
};
