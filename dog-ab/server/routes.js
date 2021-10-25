import express from "express";
const app = express.Router();

export default app;

app.get('/', (req,res)=> res.send("hello world"));
//app.post('/',(req,res)=>res.redirect("/game"));
//app.get('/game',(req,res)=>res.send("redirected to new game"));

