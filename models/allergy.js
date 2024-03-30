const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const allergyData = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'patient'
    },
    allergen: String,
    reaction: String,
    severity : String,
    notes : String,
    date : {
        type : Date,
        default : Date.now
    }
    
})

module.exports = mongoose.model("allergy", allergyData)