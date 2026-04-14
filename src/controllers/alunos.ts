import {Request, Response} from "express";

import { prisma } from "../../config/prisma";
import { handleErrors } from "../helpers/handleErrors";

export default({
    create: async(request: Request, response: Response) => {
        try{
        const {nome, idade, cpf, genero, email} = request.body;

        if(!nome || !idade || !cpf || !email){
            return response.status(400).json("Dados incompletos");
        }

        const aluno = await prisma.alunos.create({
            data: {
                nome,
                idade,
                cpf,
                email,
                genero
            }
        });
        return response.status(201).json(aluno);//201= quando cria e dá certo e 200= sucesso já 400= erro
    }//cria dados de um aluno, post

    catch(e){
        return handleErrors(e, response);
    }
    },
    list: async(request: Request, response: Response) => {},//pega os dados de todos os aluno
    getById: async(request: Request, response: Response) => {},//pega os dados de um aluno só atraves do id
    update: async(request: Request, response: Response) => {},//atualiza
    delete: async(request: Request, response: Response) => {}//deleta
});
