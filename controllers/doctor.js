const DOCTOR = require('../models/doctor')
const APPOINTMENT = require('../models/appointment')
const LAB = require('../models/lab')
const SURGERY = require('../models/surgery')
const PRESCRIPTION = require('../models/prescription')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.secure = async function (req, res, next) {
    try {
        let token = req.headers.authorization
        console.log(token);
        if (!token) {
            throw new Error('please send Token')
        }
        var decoded = jwt.verify(token, 'KEY');  // invalid signature (for wrong key) , jwt malformed(For wrong token)
        //   console.log(decoded);

        let userCheck = await DOCTOR.findById(decoded.id) //if id is wrong throw this msg
        req.doctorId = decoded.id
        if (!userCheck) {
            throw new Error("user not found")
        }
        next()
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

//DOCTOR
exports.DataSignup = async function (req, res, next) {
    try {
        req.body.image = req.file.filename
        if (!req.body.name || !req.body.email || !req.body.phoneNo || !req.body.address || !req.body.pass || !req.body.licenseNumber) {
            throw new error('Enter All Fields')
        }

        req.body.pass = await bcrypt.hash(req.body.pass, 8)
        let dataSignup = await DOCTOR.create(req.body)
        var token = jwt.sign({ id: dataSignup._id }, 'KEY')
        res.status(201).json({
            status: "Success!",
            message: "DoctorInfo Signup Successfully",
            data: dataSignup,
            token
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.DataLogin = async function (req, res, next) {
    try {
        if (!req.body.email || !req.body.pass) {
            throw new error('Enter All Fields')
        }

        let dataFind = await DOCTOR.findOne({ email: req.body.email })
        if (!dataFind) {
            throw new Error("Username Not Found")
        }
        let passwordverify = await bcrypt.compare(req.body.pass, dataFind.pass)
        if (!passwordverify) {
            throw new Error("password is worng")
        }
        var token = jwt.sign({ id: dataFind._id }, 'KEY')
        res.status(201).json({
            status: "Success!",
            message: "DoctorInfo Signup Successfully",
            data: dataFind,
            token
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.DataRead = async function (req, res, next) {
    try {
        let dataFind = await DOCTOR.find()
        res.status(201).json({
            status: "Success!",
            message: "DoctorInfo Found Successfully",
            data: dataFind
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.DataUpdate = async function (req, res, next) {
    try {
        if (req.file) {
            req.body.image = req.file.filename
        }
        let dataUpdate = await DOCTOR.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({
            status: "Success!",
            message: "DoctorInfo Update Successfully",
            data: dataUpdate
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.DataDelete = async function (req, res, next) {
    try {
        let dataDelete = await DOCTOR.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "Success!",
            message: "DoctorInfo Delete Successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}


//APPOINTMENT

exports.AppointmentUpdate = async function (req, res, next) {
    try {
        let dataUpdate = await APPOINTMENT.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({
            status: "Success!",
            message: "Appointment Update Successfully",
            data: dataUpdate
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}


exports.AppointmentRead = async function (req, res, next) {
    try {
        let dataFind = await APPOINTMENT.find({ doctorId: req.doctorId }).populate(["doctorId", "patientId"])
        res.status(201).json({
            status: "Success!",
            message: "Appointment Found Successfully",
            data: dataFind
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}


exports.AppointmentDelete = async function (req, res, next) {
    try {
        let dataDelete = await APPOINTMENT.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "Success!",
            message: "Appointment Delete Successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}


//LAB-TEST


exports.LabTestRead = async function (req, res, next) {
    try {
        let dataFind = await LAB.find({ doctorId: req.doctorId }).populate(["doctorId", "patientId"])
        res.status(201).json({
            status: "Success!",
            message: "LabTestData Found Successfully",
            data: dataFind
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.LabTestUpdate = async function (req, res, next) {
    try {
        if (req.files) {
            req.body.attachment = req.files.map((el) => el.filename)
        }
        let dataUpdate = await LAB.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({
            status: "Success!",
            message: "LabTestData Update Successfully",
            data: dataUpdate
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.LabTestDelete = async function (req, res, next) {
    try {
        let dataDelete = await LAB.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "Success!",
            message: "LabTestData Delete Successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}


//SURGERIES

exports.SurgeryCreate = async function (req, res, next) {
    try {
        req.body.doctorId = req.doctorId
        if (!req.body.patientId || !req.body.results || !req.body.type | !req.body.place || !req.body.description) {
            throw new error('Enter All Fields')
        }

        let dataCreate = await SURGERY.create(req.body)
        res.status(201).json({
            status: "Success!",
            message: "SurgeryData Create Successfully",
            data: dataCreate
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.SurgeryRead = async function (req, res, next) {
    try {
        let dataFind = await SURGERY.find({ doctorId: req.doctorId }).populate(["doctorId", "patientId"])
        res.status(201).json({
            status: "Success!",
            message: "SurgeryData Found Successfully",
            data: dataFind
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.SurgeryUpdate = async function (req, res, next) {
    try {
            let dataUpdate = await SURGERY.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({
            status: "Success!",
            message: "SurgeryData Update Successfully",
            data: dataUpdate
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.SurgeryDelete = async function (req, res, next) {
    try {
        let dataDelete = await SURGERY.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "Success!",
            message: "SurgeryData Delete Successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}


//PRESCRIPTION

exports.PrescriptionCreate = async function (req, res, next) {
    try {
        req.body.doctorId = req.doctorId
        if (!req.body.patientId || !req.body.instructions || !req.body.Medication | !req.body.Dosage || !req.body.Frequency ||!req.body.Duration) {
            throw new error('Enter All Fields')
        }

        let dataCreate = await PRESCRIPTION.create(req.body)
        res.status(201).json({
            status: "Success!",
            message: "PrescriptionData Create Successfully",
            data: dataCreate
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.PrescriptionRead = async function (req, res, next) {
    try {
        let dataFind = await PRESCRIPTION.find({ doctorId: req.doctorId }).populate(["doctorId", "patientId"])
        res.status(201).json({
            status: "Success!",
            message: "PrescriptionData Found Successfully",
            data: dataFind
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.PrescriptionUpdate = async function (req, res, next) {
    try {
        let dataUpdate = await PRESCRIPTION.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json({
            status: "Success!",
            message: "PrescriptionData Update Successfully",
            data: dataUpdate
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.PrescriptionDelete = async function (req, res, next) {
    try {
        let dataDelete = await PRESCRIPTION.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "Success!",
            message: "PrescriptionData Delete Successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}
