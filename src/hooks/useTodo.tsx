import React, { useState, useEffect, useRef } from "react";
import * as todoData from "../apis/todos";
import { Todo } from "../types/Todo";

type Filter = 'all' | 'done' | 'undone';

export const useTodo = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    todoData.getAllTodosData().then((todo) => {
      // console.log(...todo);
      setTodoList([...todo].reverse());
    });
  }, []);

  const addTodoItem = (todoContent: string) => {

    const ids: number[] = [];
    Object.keys(todoList).forEach(function(k) {
      ids.push(todoList[Number(k)]['id']);
    });

    const newTodoItem = {
      id:      Math.max(...ids) + 1,
      content: todoContent,
      done:    false
    };

    todoData.addTodoData(newTodoItem).then((addTodo) => {

      setTodoList([addTodo, ...todoList]);
    });
  };

  const updateTodoItem = (id: number, newTodoItem: Todo) => {
    todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {

      const newTodoList = todoList.map((item) => (item.id !== updatedTodo.id ? item : updatedTodo));

      setTodoList(newTodoList);
    });
  }

  const handleDelete = (id: number) => {

    todoData.deleteTodoData(id).then((deletedId) => {
      const newTodoList = todoList.filter((item) => item.id !== deletedId);

      setTodoList(newTodoList);
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

  const handleCheck = (id: number, done: boolean) => {
    const todoItem = todoList.find((item: Todo) => item.id === id);
    const newTodoItem: Todo = { ...todoItem!, done: done };

    updateTodoItem(id, newTodoItem);
  };

  const handleEdit = (id: number, content: string) => {
    const todoItem = todoList.find((item: Todo) => item.id === id);
    const newTodoItem: Todo = { ...todoItem!, content };

    updateTodoItem(id, newTodoItem);
  }

  return {
    handleDelete,
    inputEl,
    handleAdd,
    handleSort,
    filteredTodoList,
    handleCheck,
    handleEdit
  };
};
