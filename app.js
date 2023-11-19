import express from "express";
import nunjucks from "nunjucks";
import fs  from "fs";

const app = express();

app.use(express.static('views'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get("/home", (req, res) => {

    const telaConfigData = fs.readFileSync("./telaConfig.json", "utf8");

     const telaConfig = JSON.parse(telaConfigData);

    nunjucks.render('index.njk', {telaConfig }, (err, html) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send(html);
        }
    });
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
