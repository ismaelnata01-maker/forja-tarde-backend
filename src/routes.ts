import { Router } from "express";

import alunoController from "./controllers/alunos";
import cursoController from "./controllers/cursos";

const routes = Router();

routes.get("/", (request, response) => response.status(200).json("Servidor rodando"),);

//rotas dos alunos
routes.post("/alunos", alunoController.create);
routes.get("/alunos", alunoController.list);
routes.get("/alunos/:id", alunoController.getById);//os : significa que é uma variável
routes.put("/alunos/:id", alunoController.update);
routes.delete("/alunos/:id", alunoController.delete);


//rotas dos cursos
routes.post("/cursos", cursoController.create);
routes.get("/cursos", cursoController.list);
routes.get("/cursos/:id", cursoController.getById);//os : significa que é uma variável
routes.put("/cursos/:id", cursoController.update);
routes.delete("/cursos/:id", cursoController.delete);

export default routes;
