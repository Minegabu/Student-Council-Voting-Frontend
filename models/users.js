import { Schema,model,models } from "mongoose";

const usersSchema = new Schema({
    name: String,

    email: {
        type: String,
        
        required: true,

        unique: true,

    },

    division_id: {type: Number, default: 0},

    candidate_vote: {type: Number, default: 0},

});

const users = models.users || model('users',usersSchema)

export default users;
