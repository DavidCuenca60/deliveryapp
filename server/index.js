import express from "express";

const app = express();

app.use(express.json());
app.get('/', (request, response)=>{
    response.send({message: 'Hello world'});
});

app.post('/', (request, response)=>{
    console.log(request.body);
    response.end();
});

app.listen(8080);