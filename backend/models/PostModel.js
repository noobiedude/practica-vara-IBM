const mongoose = require(`mongoose`);

const PostSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true
    },
    type:{
        type: String,
        enum: ['offer', 'request'],
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    workHours:{
        type: String,
        required: true,
        enum: ["full-time", "part-time"]
    },
    location: {
        type: String,
        required: true
    },
    programmingLanguage: {
        type: String,
        required: true
    }
}, { timestamps: true});

const PostModel =  mongoose.model(`Post`, PostSchema, 'Post');

module.exports = PostModel;


