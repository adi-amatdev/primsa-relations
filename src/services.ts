import { PrismaClient } from "@prisma/client"
import { UserIntfc, TodoIntfc } from "./interface";

const prisma = new PrismaClient();

export async function insertUser(user: UserIntfc) {
    const resp = await prisma.user.create({
        data:{
            username : user.username,
            password: user.password,
            firstname:user.firstname,
            lastname:user.lastname
        }
    });
    return resp;
}

export async function getUser(username: string){
    const result = await prisma.user.findFirst({
        where:{
            username:username
        }
    })
    return result;
};

export async function getTodos(id:number) {
    const result = await prisma.todos.findMany({
        where:{
            user_id:id
        },
        select:{
            title: true,
            description: true,
            done: true,                                                                                                      
            user: {
                select:{
                    username:true,
                    password: false,
                    id: false,
                    firstname: true,
                    lastname: true
                }
            }
        }
    })
    return result;
}

export async function insertTodo(todo:TodoIntfc) {
    const result = await prisma.todos.create({
        data:{
            user_id:todo.userid,
            title: todo.title,
            description: todo.descrption,
            done: todo.done
        }
    });
    return result ;
}