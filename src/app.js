const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {

  const repository = {
    id: uuid(),
    title: "Umbriel",
    url: "https://github.com/Rocketseat/umbriel",
    techs: ["Node", "Express", "TypeScript"],
    likes: 0
  }
  repositories.push(repository)

  return response.json(repository)

});

app.put("/repositories/:id", (request, response) => {

  const {id} = request.params
  const repoIndex = repositories.findIndex(repo => repo.id == id)
  const repo = repositories.find(repo => repo.id == id)

  if(!repo || repoIndex < 0)
    return response.status(400).json({error:"Repo does not exist!"})
  
  if(!id || !isUuid(id))
    return response.status(400).json({error:"Invalid repo ID"})  

  const { title, url, techs } = request.body
  
  repo.title = title  
  repo.url = url  
  repo.techs = techs  

  repositories[repoIndex] = repo

  return response.json(repo)

});

app.delete("/repositories/:id", (request, response) => {
  
  const {id} = request.params

  if(!id || !isUuid(id))
    return response.status(400).json({error:"Repo does not exist!"})

  repositories.splice(id)

  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  
  const {id} = request.params
  const repoIndex = repositories.findIndex(repo => repo.id == id)
  const repo = repositories.find(repo => repo.id == id)

  if(!repo || repoIndex < 0)
    return response.status(400).json({error:"Repo not found!"})

  if(!id || !isUuid(id))
    return response.status(400).json({error:"Invalid repo ID"})

  repo.likes += 1

  repositories[repoIndex] = repo

  return response.json(repo)

});

module.exports = app;
