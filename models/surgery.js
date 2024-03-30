const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surgeryData = new Schema({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'doctor'
    },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'patient'
    },
    results: {
        type: String,
        required: true
    },
    type: String,
    place: String,
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("surgery", surgeryData)