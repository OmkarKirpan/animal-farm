import useAnimalSearch from "./lib/Hooks/useAnimalSearch";
import Animal from "./lib/Components/Animal";
import "./App.css";

function App() {
  const { search, animals, inputRef } = useAnimalSearch();

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
