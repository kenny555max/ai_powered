import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    creator_name: {
        type: String,
        required: true
    },
    creator_id: {
        type: String,
        required: true
    },
    creator_avatar: {
        type: String,
        default: ''
    },
    creator_email: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

const PostModel = mongoose.models.Prompt || mongoose.model('Prompt', PostSchema);

export default PostModel;