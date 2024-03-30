const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientData = new Schema({
    name: String,
    dateofbirth : String,
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    pass : {
        type :String,
        required : true
       },
    image : String,
    phoneNo : Number,
    email : {
        type :String,
        unique : true
       },
    address : String,
    emergencyContact  : Number,
    bloodgroup : String
})

module.exports= mongoose.model("patient", patientData)
