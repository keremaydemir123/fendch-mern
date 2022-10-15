import { forwardRef } from "react";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Button from "../Button";

function Modal({ open, onClose, onSubmit }, ref) {
  const [inputValue, setInputValue] = useState("");
  const [isValidGit, setIsValidGit] = useState(false);
  if (!open) {
    document.body.className = "overflow-visible";
    return null;
  }
  document.body.className = "overflow-hidden";

  const GIT_REGEX = new RegExp(
    "((git|ssh|http(s)?)|(git@[w.]+))(:(//)?)([w.@:/-~]+)(.git)(/)?"
  );

  return (
    <div
      className="overlay absolute w-screen h-screen top-0 left-0 bottom-0 right-0 bg-slate-800 bg-opacity-80 z-10"
      onClick={onClose}
    >
      <div
        className="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-max bg-blue-200 p-8 z-50 rounded-lg min-w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        <AiFillCloseCircle
          onClick={onClose}
          className="absolute right-1 top-1 cursor-pointer text-2xl text-blue-600 hover:text-blue-800 transition-all"
        />

        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <label htmlFor="repo" className="block text-blue-900">
            Add Git Repo:
          </label>
          <input
            type="text"
            id="repo"
            ref={ref}
            className="outline-none rounded-md py-1 px-3 bg-blue-50 w-full"
            onChange={(e) => {
              if (GIT_REGEX.test(e.target.value) && e.target.value !== "") {
                setIsValidGit(true);
              }
              setInputValue(e.target.value);
            }}
          />

          <Button disabled={!isValidGit} type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default forwardRef(Modal);
