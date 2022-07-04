import { Schema,model,models } from "mongoose";

const divisionSchema = new Schema({
    name: String,
    
});

const division = models.divison || model('division',divisionSchema)

export default division;
