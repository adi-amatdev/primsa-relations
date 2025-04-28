import { PrismaClient } from "@prisma/client";
import { get } from "http";

const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
    await prisma.user.create({
        data:{
            username:username,
            password: password,
            firstname:firstName,
            lastname:lastName
        }
    })
}

// insertUser("fef","efewf","fewfew","efefg");


async function getUser(username: string) {
    const result = await prisma.user.findFirst({
        where:{
            username:username
        }
    })
    console.log(result);
};
getUser("fef");