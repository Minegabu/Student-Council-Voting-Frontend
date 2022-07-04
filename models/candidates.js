import { Schema,model,models } from "mongoose";

const candidatesSchema = new Schema({
    name: String,

    description: String,

    division: Number,


});

const candidates = models.divison || model('candidates',candidatesSchema)

export default candidates;
