const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labtestData = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'patient'
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'doctor'
    }, 
    date: {
        type: Date,
        default: Date.now
    },
    testType: [String],
    attachment : [String],
    results : String,
    notes : String
}) 

module.exports = mongoose.model("Lab_Test", labtestData)