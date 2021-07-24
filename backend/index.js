const express = require(`express`);
const app = express();
const databaseConfig = require(`./config/dbConfig`);
require(`dotenv`).config({path: __dirname + `/.env`});

const PORT = process.env.PORT || 5000;

databaseConfig.connectToDatabase();

app.get(`/`, (req,res) => {
    res.send(`<div>Hello</div>`);
});

app.listen(PORT, () => {
    console.log(`Server started listening on port: ${PORT}`);
})