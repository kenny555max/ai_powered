import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    is_avatar: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    email_verified: {
        type: Boolean,
        required: true
    },
    google_profile_id: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;