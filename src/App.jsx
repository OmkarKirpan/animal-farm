import { useState } from "react";
import "./App.css";

function App() {
  const [animals, setAnimals] = useState([]);

  const search = async (q) => {
    const response = await fetch(
      "http://localhost:8080/?" + new URLSearchParams({ q }),
    );
    const data = await response.json();
    setAnimals(data);
  };

  return (
    <>
      <h1>Animal Farm</h1>
      <input
        type="text"
        placeholder="🔍 Search..."
        onChange={(e) => search(e.target.value)}
      />
      <div>
        <ul>
          {animals.map((animal) => (
            // <li key={animal.id}>
            //   <strong>{animal.type}</strong>
            //   {animal.name} {animal.age}
            // </li>;
            <Animal key={animal.id} {...animal} />
          ))}
          {animals.length === 0 && "No animals found."}
        </ul>
      </div>
    </>
  );
}

export default App;

function Animal({ type, name, age }) {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
}
