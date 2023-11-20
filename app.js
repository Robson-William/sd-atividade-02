import express from "express";
import nunjucks from "nunjucks";
import * as middleware from "./src/middleware/authorization.js";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { config } from "dotenv";
import fs  from "fs";
config();

const app = express();

//app.use(middleware.locals);
app.use(express.static('public'));
app.set('view engine', 'njk');
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 7 * 24 * 60 * 60 * 1000}
}))

nunjucks.configure('src/views', {
    autoescape: true,
    express: app
});

app.get("/", (req, res) => {
    res.render("landingpage.njk");
})

app.get("/search", middleware.authenticate, (req, res) => {

    const telaConfigData = fs.readFileSync("./telaConfig.json", "utf8");

    const telaConfig = JSON.parse(telaConfigData);

    res.render("search.njk", {telaConfig});
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
