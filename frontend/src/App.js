import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ListToDoList from "./ListToDoList";
import ToDoList from "./ToDoList";

function App() {
  const [listSummaries, setListSummaries] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    reloadData().catch(console.error);
  }, []);

  async function reloadData() {
    try {
      const response = await axios.get("/api/lists");
      setListSummaries(response.data);
    } catch (error) {
      console.error("Failed to fetch list summaries:", error);
    }
  }

  function handleNewToDoList(newName) {
    const updateData = async () => {
      const newListData = {
        name: newName,
      };

      await axios.post(`/api/lists`, newListData);
      reloadData().catch(console.error);
    };
    updateData();
  }

  function handleDeleteToDoList(id) {
    const updateData = async () => {
      try {
        await axios.delete(`/api/lists/${id}`);
        await reloadData();
      } catch (error) {
        console.error("Failed to delete to-do list:", error);
      }
    };
    updateData();
  }

  function handleSelectList(id) {
    if (!id) return;
    console.log("Selecting item", id);
    setSelectedItem(id);
  }

  function backToList() {
    setSelectedItem(null);
    reloadData().catch(console.error);
  }

  if (selectedItem === null) {
    return (
      <div className="App">
        <ListToDoList
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
        <ToDoList listId={selectedItem} handleBackButton={backToList} />
      </div>
    );
  }
}

export default App;
