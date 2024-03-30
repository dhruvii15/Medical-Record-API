const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentData = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'patient'
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'doctor'
    },
    date: String,
    time : String,
    reason: String,
    status: {
        type: String,
        enum: ['Scheduled', 'Canceled', 'Completed','Requested'],
        default: 'Requested',
        required: true
    }
})

module.exports = mongoose.model("appointment", appointmentData)