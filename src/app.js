const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { url, title, techs } = request.body;

  const newRepository = { id: uuid(), url, title, techs, likes: 0 };

  repositories.push(newRepository);

  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const indexRepository = repositories.findIndex((item) => item.id === id);

  if (indexRepository < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const repository = { id, url, title, techs, likes: 0 };

  repositories[indexRepository] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const indexRepository = repositories.findIndex((item) => item.id === id);

  if (indexRepository < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  repositories.splice(indexRepository, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const indexRepository = repositories.findIndex((item) => item.id === id);

  if (indexRepository < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  let newRepository = repositories[indexRepository];
  newRepository.likes = newRepository.likes + 1;
  repositories[indexRepository] = newRepository;

  return response.json({ likes: newRepository.likes });
});

module.exports = app;
