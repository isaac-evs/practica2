import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import LisToDoLists from "./ListToDoLists";
import ToDoLists from "./ToDoLists";

function App() {
  const [listSummaries, setListSummaries] = useState(null);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    reloadData().catch(console.error);
  }, []);

  async function reloadData() {
    const response = await axios.get("/api/lists");
    const data = await response.data;
    setListSummaries(response.data);
  }

  function handleNewToDoList(newName) {
    const updateData = async () => {
      const newListData = {
        name: newName,
      };

      await axios.post("/api/lists", newListData);
      reloadData().catch(console.error);
    };
    updateData();
  }

  function handleDeleteToDoList(id) {
    const updateData = async () => {
      await axios.delete(`/api/lists/${id}`);
      reloadData().catch(console.error);
    };
    updateData();
  }

  function handleSelectList(id) {
    console.log("Selecting item", id);
    setSelectedItem(id);
  }

  function backToList() {
    setSelectedList(null);
    reloadData().catch(console.error);
  }

  if (setSelectedItem === null) {
    return (
      <div className="App">
        <ListToDoLists
          listSummaries={listSummaries}
          handleSelectList={handleSelectList}
          handleNewToDoList={handleNewToDoList}
          handleDeleteToDoList={handleDeleteToDoList}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <ToDoLists listId={selectedItem} handleBackButton={backToList} />
      </div>
    );
  }
}

export default App;