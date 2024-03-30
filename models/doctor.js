const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorsData = new Schema({
    name: {
        type : String,
        required : true
    },
    specialty: String,
    email: {
        type : String,
        unique : true
    },
    phoneNo: {
        type : String,
        required : true
    },
    experiance: String,
    address: {
        type : String,
        required : true
    },
    image: String,
    pass: {
        type : String,
        required : true
    },
    licenseNumber: {
        type : String,
        required : true
    },
    issuingAuthority: String,
    expirationDate: String,
}) 

module.exports = mongoose.model("doctor", doctorsData)
