import {Request, Response} from "express";

import { prisma } from "../../config/prisma";
import { handleErrors } from "../helpers/handleErrors";

export default({
    create: async(request: Request, response: Response) => {
        try{
        const {nome, descricao, duracao} = request.body;

        if(!nome || !descricao || !duracao){
            return response.status(400).json("Dados incompletos");
        }

        const curso = await prisma.cursos.create({
            data: {
                nome,
                descricao,
                duracao,
            }
        });
        return response.status(201).json(curso);//201= quando cria e dá certo e 200= sucesso já 400= erro
    }//cria dados de um aluno, post

    catch(e){
        return handleErrors(e, response);
    }
    },
    list: async(request: Request, response: Response) => {
        try{
            const cursos = await prisma.cursos.findMany();
            return response.status(200).json(cursos);
        }catch (e){
            return handleErrors(e, response);
        }
    },//pega os dados de todos os aluno
    getById: async(request: Request, response: Response) => {
        try{
            const{ id } = request.params;

            const curso = await prisma.cursos.findUnique({
                where: {
                    id: Number(id) // ou +id
                }
            });

            if(!curso){
                return response.status(404).json("Cursos não encontrado");
            }

            return response.status(200).json(curso);
        }catch(e){
            return handleErrors(e, response);
        }
    },//pega os dados de um aluno só atraves do id
    update: async(request: Request, response: Response) => {
        try{
            const { id } = request.params;
            const {nome, descricao, duracao} = request.body;

            const curso = await prisma.cursos.update({
                where: {
                    id: Number(id)
                },
                data: {
                    nome,
                    descricao,
                    duracao,
                },
            });
            return response.status(200).json(curso);
        }catch(e){
            return handleErrors(e, response);
        }
    },//atualiza
    delete: async(request: Request, response: Response) => {
        try{
            const { id } = request.params;

            const curso = await prisma.cursos.delete({
                where: {
                    id: Number(id),
                }
            })
            return response.status(200).json(curso);
        }catch(e){
            return handleErrors(e, response);
        }
    },//deleta
});
