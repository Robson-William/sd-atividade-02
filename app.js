import express from "express";
import nunjucks from "nunjucks";
import fs  from "fs";

const app = express();

app.use(express.static('public'));
app.set('view engine', 'njk');
app.use(express.urlencoded({ extended: false}));

nunjucks.configure('src/views', {
    autoescape: true,
    express: app
});

app.get("/", (req, res) => {
    res.render("landingpage.njk");
})

app.get("/home", (req, res) => {

    const telaConfigData = fs.readFileSync("./telaConfig.json", "utf8");

    const telaConfig = JSON.parse(telaConfigData);

    res.render("search.njk", {telaConfig});
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
