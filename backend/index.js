const express = require(`express`);
const app = express();
const cors = require('cors');
const databaseConfig = require(`./config/dbConfig`);
const CommentModel = require('./models/CommentModel');
const PostModel = require('./models/PostModel');
require(`dotenv`).config({path: __dirname + `/.env`});
const FRONTEND_ADDRESS = `http://localhost:3000`;
const PORT = process.env.PORT || 5000;
const postRoutes = require(`./routes/post`);

app.use(express.json());


app.use(cors({
    origin: FRONTEND_ADDRESS,
    credentials:true
  }));

app.use(`/posts`, postRoutes);



databaseConfig.connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server started listening on port: ${PORT}`);
})