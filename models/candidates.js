import { Schema,model,models } from "mongoose";

const candidatesSchema = new Schema({
    name: String,

    description: String,

    division_id: {type: Number, default: 0},


});

const candidates = models.candidates || model('candidates',candidatesSchema)

export default candidates;
