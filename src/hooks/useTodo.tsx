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

  const addTodoList = (todoContent: string) => {

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

    addTodoList(inputEl.current!.value);

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
    setTodoList((todos) => {
      const newTodoItem = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done };
        }
        return todo;
      });

      return newTodoItem;
    });
  };

  const handleEdit = (id: number, content: string) => {
    setTodoList((todos) => {
      const newTodoItem = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, content };
        }
        return todo;
      });

      return newTodoItem;
    });
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
