const express =require("express");
const app=express()
app.use(express.json())
const todos=[];
app.get("/todos",(req,res)=>{
    return res.send(
        todos
    )
})

app.post("/todo",(req,res)=>{
    try{
    const {todo}=req.body;
    const {task}=todo;
    // console.log(task)

    let max=0;
    todos.forEach(todo=>{
        max=Math.max(max,todo.id)
    })

     let data={
        id:max+1,
        task,
        createdAt:new Date()
     }
     todos.push(data)
    return res.send("todo has been added")
    }catch(ex){
        console.error(ex);
        return res.status(500).send("Internal Server Error");
    }
})

app.put("/todo/id",(req,res)=>{
    // console.log(req.body)
   let temp=null
   let changeTodo=todos.find((e,index)=>{
    if(e.id==req.params.id){
        temp=index
        return e.id==req.params.id
    }
   })
   changeTodo={...changeTodo,...req.body}
   todos[temp]=changeTodo
   res.send(`put:${json.stringify(todos)}`)
})



// app.delete('/todo/:id',(req,res)=>{
//     let  id= req.params.id;
//     // console.log(id)
//     // id=parseInt(id)
//     let index=-1;
    
//     todos.find((todo,i)=>{
//         console.log(todo.id, id)
//         if(todo.id==id){

//             console.log("id found")
//             index=i;
//             return true
            
//         }
//         return false
//     })
//    if(index==-1)
//    {

//     return res.status(404).send("the todo not exist")
//    }
// todos.splice(index,1)
//     return res.send("deleted! refetch todo")
   
// })

 app.delete("/todo/:id",(req,res)=>{
    todos=todos.filter(e=>e.id!=req.params.id)
    res.send("delete request")
})



 const PORT = 3020;
 app.listen(3020,()=>{
    console.log(`server started at http://localhost:${PORT}`)
 })