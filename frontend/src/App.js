import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ListToDoList from "./ListToDoList";
import ToDoList from "./ToDoList";

function App() {
  const [listSummaries, setListSummaries] = useState(null);
  const [selectedList, setSelectedList] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    reloadData().catch(console.error);
  }, []);

  // Function to reload data from the API
  async function reloadData() {
    try {
      const response = await axios.get("/api/lists");
      setListSummaries(response.data);
    } catch (error) {
      console.error("Failed to fetch list summaries:", error);
    }
  }

  // Handle adding a new to-do list
  function handleNewToDoList(newName) {
    const updateData = async () => {
      try {
        const newListData = { name: newName };
        await axios.post("/api/lists", newListData);
        await reloadData();
      } catch (error) {
        console.error("Failed to add new to-do list:", error);
      }
    };
    updateData();
  }

  // Handle deleting a to-do list
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

  // Handle selecting a specific to-do list
  function handleSelectList(id) {
    console.log("Selecting list", id);
    setSelectedList(id);
  }

  // Handle going back to the list view
  function backToList() {
    setSelectedList(null);
    reloadData().catch(console.error);
  }

  // Render the list of to-do lists or a specific to-do list
  if (selectedList === null) {
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
        <ToDoList listId={selectedList} handleBackButton={backToList} />
      </div>
    );
  }
}

export default App;
