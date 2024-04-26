import "dotenv/config.js";
import Express, {json} from "express"
import session from "express-session";
import allRouter from "./router/index.js";
import { connectDataBase } from "./db/config.js";
import dataBaseInIt from "./db/init.js";
import cors from "cors"
import path from 'path'


const __dirname = path.resolve();

const app = Express()
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));
connectDataBase();
console.log(process.env, "DB_HOST");
dataBaseInIt().then(() => console.log("DataBase is synced"));
app.use(cors())
app.use(json());

app.use(allRouter);

app.use(Express.static(path.join(__dirname, '/Client/dist')))
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'Client' , 'dist', 'index.html'))
})


app.listen(3000, () =>console.log("Server Is Running on Port 3000"));