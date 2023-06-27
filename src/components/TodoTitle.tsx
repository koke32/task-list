import React, { memo } from "react";

export const TodoTitle = memo((
  {
    title,
    as
  }: {
    title: string;
    as: string
  }) => {

  let res = <p>{title}</p>;

  if (as === 'h1') {
    res = <h1>{title}</h1>;
  }

  return res;
});
