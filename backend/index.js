const express = require(`express`);
const app = express();
const cors = require('cors');
const databaseConfig = require(`./config/dbConfig`);
const CommentModel = require('./models/CommentModel');
const PostModel = require('./models/PostModel');
const UserModel = require('./models/UserModel');
require(`dotenv`).config({path: __dirname + `/.env`});
const FRONTEND_ADDRESS = `http://localhost:3000`;
const PORT = process.env.PORT || 5000;
const postRoutes = require(`./routes/post`);
const authRoutes = require(`./routes/auth`);
const userRoutes = require(`./routes/user`);
const profileRoutes = require('./routes/profile');
const cookieParser = require('cookie-parser');
//middleware pentru rutele care trebuie protejate
const { requireAuth, checkUser } = require('./middleware/auth'); 

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: true,
    credentials:true
  }));

//app.get('*', checkUser);
app.use(`/posts`, postRoutes);
app.use(`/profile`, profileRoutes);
app.use(`/`, authRoutes);
app.use(`/`, userRoutes);
databaseConfig.connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server started listening on port: ${PORT}`);
})
