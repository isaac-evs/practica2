import "./ListTodoList.css";
import { useRef } from "react";
import { BiSolidTrash } from "react-icons/bi";

function ListToDoLists({
  listSummaries,
  handleSelectList,
  handleNewToDoList,
  handleDeleteToDoList,
}) {
  const labelRef = useRef();

  if (listSummaries === null) {
    return <div className="ListToDoList loading">Loading to-do lists...</div>;
  } else if (listSummaries.length === 0) {
    return (
      <div className="ListToDoLists">
        <div className="box">
          <label>
            New To-Do List:&nbsp;
            <input ref={labelRef} type="text" /> {/* Corrected ref usage */}
          </label>
          <button
            onClick={
              () => handleNewToDoList(labelRef.current.value) // Use ref.current.value
            }
          >
            New
          </button>
        </div>
        <p>There are no to-do lists!</p>
      </div>
    );
  }

  return (
    <div className="ListToDoLists">
      <h1>All To-Do Lists</h1>
      <div className="box">
        <label>
          New To-Do List:&nbsp;
          <input ref={labelRef} type="text" /> {/* Corrected ref usage */}
        </label>
        <button
          onClick={
            () => handleNewToDoList(labelRef.current.value) // Use ref.current.value
          }
        >
          New
        </button>
      </div>
      {listSummaries.map((summary) => (
        <div
          key={summary.id}
          className="summary"
          onClick={() => handleSelectList(summary.id)}
        >
          <span className="name">{summary.name}</span>
          <span className="count">{summary.item_count} items</span>
          <span className="flex"></span>
          <span
            className="trash"
            onClick={(evt) => {
              evt.stopPropagation();
              handleDeleteToDoList(summary.id);
            }}
          >
            <BiSolidTrash />
          </span>
        </div>
      ))}
    </div>
  );
}

export default ListToDoLists;
