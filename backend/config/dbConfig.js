const mongoose = require(`mongoose`);
mongoose.set('useFindAndModify', false);

const dbConfig = {
    'mongoURI': `mongodb+srv://admin:1234@cluster0.qlgjq.mongodb.net/practicavara?retryWrites=true&w=majority`
};

const connectToDatabase = async() => {
    const connection = await mongoose.connect(dbConfig.mongoURI, {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});
    if (connection){
        console.log(`Connected to the database!`);
    }
    else{
        console.log(`Error: ${connection}`);
    }
}

module.exports={ connectToDatabase };