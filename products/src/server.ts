import express,{ Application } from "express";
import Server from ".";


const app: Application = express()
const server: Server = new Server(app)
const PORT: number = process.env.PORT ?  parseInt(process.env.PORT, 10) : 8080;


app.listen(PORT, "localhost",() =>{
    console.log(`Products server is running on port ${PORT}`)
}).on("error", (err: any) =>{
    console.log(`Error when starting server ${err}`)
})

