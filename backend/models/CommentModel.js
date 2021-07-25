const mongoose = require(`mongoose`);

const CommentSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true
    },
    postId:{
        type: String,
        required: true 
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true});

const CommentModel = mongoose.model('Commment', CommentSchema, 'comments');

module.exports = CommentModel;
