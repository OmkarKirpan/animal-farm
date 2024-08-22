import { useEffect, useRef, useState } from "react";

function useAnimalSearch() {
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
  return { search, animals, inputRef };
}

export default useAnimalSearch;
