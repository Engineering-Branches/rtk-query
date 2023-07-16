import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { toDoApi, ToDoProps } from "./app/store";
import { useCallback, Fragment, useRef } from "react";

function ToDoApp() {
  const { data: todos } = toDoApi.useGetAllToDosQuery();
  const [updateToDo] = toDoApi.useUpdateToDoMutation();
  const [deleteToDo] = toDoApi.useDeleteToDoMutation();
  const [addToDo] = toDoApi.useAddToDoMutation();
  const onToggle = useCallback(
    (todo: ToDoProps) => {
      void updateToDo({ ...todo, done: !todo.done });
    },
    [updateToDo]
  );
  const onDelete = useCallback(
    (todo: ToDoProps) => {
      void deleteToDo(todo.id);
    },
    [deleteToDo]
  );
  const textRef = useRef<HTMLInputElement>(null);
  const onAdd = useCallback(() => {
    void addToDo(textRef.current?.value ?? "");
    textRef.current!.value = "";
  }, [addToDo]);

  return (
    <div className="App">
      {todos?.map((todo: ToDoProps) => (
        <Fragment key={todo.id}>
          <div>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => onToggle(todo)}
            />
            <span>{todo.text}</span>
            <button onClick={() => onDelete(todo)}>
              Delete
            </button>
          </div>
        </Fragment>
      ))}
      <div className="add">
        <input type="text" ref={textRef} />
        <button onClick={() => onAdd()}>Add</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <ApiProvider api={toDoApi}>
      <ToDoApp />
    </ApiProvider>
  );
}

export default App;
