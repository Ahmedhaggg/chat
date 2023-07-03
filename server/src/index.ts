import express, { Application } from "express";
import http  from "http";
import { Server } from "socket.io"
const app : Application = express();

// parser 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const server = http.createServer(app)

const io = new Server(server); 

// socket
io.on('connection', (socket) => {
    
});

// passport configuration
import "./config/passport";

// database configuration
import "./config/database";

// modules 
import routes from "./modules/index.module";
routes(app)

export default app;