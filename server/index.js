import express from "express";
import cors from "cors";
// initialize the express app
const app = express();
app.use(cors());
app.use(express.json());

// make some animals
import Chance from "chance";

const chance = new Chance();
const searchFrequency = {};

const animals = [...Array(250).keys()].map((id) => {
  return {
    id,
    type: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  };
});

// Endpoint to search for animals
app.get("", (req, res) => {
  // Filter results by query
  const q = req.query.q?.toLowerCase() || "";

  if (q) {
    searchFrequency[q] = (searchFrequency[q] || 0) + 1;
  }

  const results = animals.filter((animal) =>
    animal.type.toLowerCase().includes(q),
  );

  res.send(results);
});

app.get("/stats", (req, res) => {
  const totalAnimals = animals.length;

  const animalsByTypes = animals.reduce((acc, animal) => {
    acc[animal.type] = (acc[animal.type] || 0) + 1;
    return acc;
  }, {});

  const totalAnimalTypes = Object.keys(animalsByTypes).length;

  const averageAge = (
    animals.reduce((acc, animal) => acc + animal.age, 0) / totalAnimals
  ).toFixed(2);

  res.send({
    totalAnimals,
    totalAnimalTypes,
    averageAge,
    searchFrequency,
    animalsByTypes,
  });
});

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`⚡️ Listening on port http://localhost:${PORT}`),
);
