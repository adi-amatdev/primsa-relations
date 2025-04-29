import express ,{Request, Response} from 'express' ;
import { todoSchema,createUserSchema } from "./zodSchemas";
import { getTodos, getUser, insertTodo, insertUser } from './services';
import { TodoIntfc, UserIntfc } from './interface';

const app = express();
app.use(express.json());

app.post("/user",async (req:Request,res:Response)=>{
    try {
        const {success, data} = createUserSchema.safeParse(req.body);
    if (!success || !data){
        res.status(403).json({mesg:"Bad req"});
        return;
    }
    const payload: UserIntfc = {
        username: data.username,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname
    }
    const result = await insertUser(payload);
    res.status(200).json({
        result
    })
    return;
    } catch (error) {
        res.status(500).json(error);
        return;
    }

});

app.get("/user/:username",async (req:Request,resp:Response)=>{
    try {
        const username = req.params.username;
        const result = await getUser(username);
        if(!result){
            resp.status(404).json({mesg:"user not found"});
            return;
        }
        resp.status(200).json({
            result
        });
        return;
    } catch (error) {
        resp.status(500).json(error);
        return;
    }
});

app.post("/todo",async (req:Request,resp:Response)=>{
    try {
        const {success, data} = todoSchema.safeParse(req.body);
        if(!success || !data){
            resp.status(403).json({mesg:"Bad req"});
            return;
        }
        const payload:TodoIntfc = {
            userid: data.userId,
            title: data.title,
            descrption: data.description,
            done: data?.done || false
        };
        const result = await insertTodo(payload);
        if(! result){
            resp.status(404).json({message:"Unable to add todo"});
            return;
        }
        resp.status(200).json({result});
        return;

    } catch (error) {
        resp.status(500).json(error);
        return;
    }
});

app.get("/todos/:id",async (req:Request,resp:Response)=>{
    try {
        const id = parseInt(req.params.id );
        const result = await getTodos(id);
        resp.status(200).json({result});
        return;
    } catch (error) {
        resp.status(500).json({message:"Internal server error"})
    }
});

app.listen(3000,()=>{
    console.log("server running");
})




