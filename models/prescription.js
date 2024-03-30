const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionData = new Schema({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'doctor'
    },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'patient'
    },
    instructions : String,
    Medication : String,
    Dosage : String,
    Frequency : String,
    Duration : String,
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("prescription", prescriptionData)