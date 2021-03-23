import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [allPeople, setAllPeople] = useState([]);

  const getAllPeople = async () => {
    const response = await axios
      .get("/all")
      .catch((err) => console.log("Error", err));
    if (response && response.data) setAllPeople(response.data);
  };

  useEffect(() => {
    getAllPeople();
    console.log(allPeople);
  }, []);

  return (
    <div className="App">
      {allPeople.map((item) => (
        <option key={item.PersonID} value={item.PersonID}>
          {item.FirstName}
        </option>
      ))}
    </div>
  );
}

export default App;
