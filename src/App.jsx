import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [animals, setAnimals] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const lastQuery = localStorage.getItem("lastQuery");
    search(lastQuery);
    inputRef.current.value = lastQuery;
  }, []);

  const search = async (q) => {
    const response = await fetch(
      "http://localhost:8080/?" + new URLSearchParams({ q }),
    );
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem("lastQuery", q);
  };

  return (
    <>
      <h1>Animal Farm</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="🔍 Search..."
        onChange={(e) => search(e.target.value)}
      />
      <div>
        <ul>
          {animals.map((animal) => (
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
