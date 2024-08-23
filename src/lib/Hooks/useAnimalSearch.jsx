import { useEffect, useRef, useState } from "react";
import animalsData from "../animals.json";

function useAnimalSearch() {
  const [animals, setAnimals] = useState(animalsData);
  const inputRef = useRef(null);

  useEffect(() => {
    const lastQuery = localStorage.getItem("lastQuery");
    search(lastQuery);
    inputRef.current.value = lastQuery;
  }, []);

  const search = async (q) => {
    // const response = await fetch(
    //   "http://localhost:8080/?" + new URLSearchParams({ q }),
    // );
    // const data = await response.json();
    // setAnimals(data);
    const data = animalsData.filter((animal) =>
      animal.type.toLowerCase().includes(q.toLowerCase()),
    );
    setAnimals(data);

    localStorage.setItem("lastQuery", q);
  };
  return { search, animals, inputRef };
}

export default useAnimalSearch;
