import axios from "axios";
import { Todo } from "../types/Todo";

const todoDataUrl = "http://localhost:3100/todos";

// 取得
export const getAllTodosData = async () => {
  const response = await axios.get(todoDataUrl);

  return response.data;
};

// 追加
export const addTodoData = async (todo: Todo) => {
  const response = await axios.post(todoDataUrl, todo);

  return response.data;
};

// 削除
export const deleteTodoData = async (id: number) => {
  await axios.delete(`${todoDataUrl}/${id}`);

  return id;
};

// 更新
export const updateTodoData = async (id: number, todo: Todo) => {
  const response = await axios.put(`${todoDataUrl}/${id}`, todo);

  return response.data;
};
