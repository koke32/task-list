import { RefObject } from "react";

export const TodoAdd = (
  {
    buttonText,
    inputEl,
    handleAdd
  }: {
    buttonText: string;
    inputEl:    RefObject<HTMLTextAreaElement>;
    handleAdd:  () => void;
  }) => {

  return (
    <>
      <textarea ref={inputEl} />
      <button onClick={handleAdd}>
        {buttonText}
      </button>
    </>
  );
};
