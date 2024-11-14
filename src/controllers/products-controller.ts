import { Request, Response } from "express"
import { AppError } from "../utils/app-error"
import {z} from "zod"

class ProductsController {
  /**
   * index - GET para listar vários registros.
   * show - GET para exibir um registro específico.
   * create - POST para criar um novo registro.
   * update - PUT para atualizar um registro.
   * remove - DELETE para excluir um registro.
   */

  index(request: Request, response: Response ){
    const {page, limit} = request.query;
  
    response.send(`página ${page} de ${limit} `);
  }
  
  create(request: Request, response: Response){
    const  bodySchema = z.object({
      name: z
      .string({required_error: "Name is requerid!"})
      .trim()
      .min(6, {message: "Name must be 6 or more characters!"}),
      price: z
      .number({required_error: "Price is requerid!"})
      .positive({message: "Price must be positive!"})
    })

    const {name, price} = bodySchema.parse(request.body);

    /*
    if(!name){
      throw new AppError("Nome do produto é obrigatório!");
    }

    if(name.trim().lenght < 4) {
      throw new AppError("Nome do produto precisa ter pelo menos 4 caracteres!");
    }

    if(!price){
      throw new AppError("O preço do produto é obrigatório!");
    }
    if(price <= 0){
      throw new AppError("O preço do produto não pode ser menor ou igual a zero!");
    }
*/
    //throw new Error("Erro no servidor!");
    //throw new AppError("Erro no servidor!");

    response.status(201).json({name, price, user_id: request.user_id})
  }
}


export { ProductsController }