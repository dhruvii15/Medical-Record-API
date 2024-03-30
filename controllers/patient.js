const PATIENT = require('../models/patient')
const APPOINTMENT = require('../models/appointment')
const LAB = require('../models/lab')
const ALLERGY = require('../models/allergy')
const SURGERY = require('../models/surgery')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.secure = async function (req, res, next) {
    try {
      let token = req.headers.authorization
      // console.log(token);
      if (!token) {
        throw new Error('please send Token')
      }
      var decoded = jwt.verify(token, 'KEY');  // invalid signature (for wrong key) , jwt malformed(For wrong token)
    //   console.log(decoded);
      let userCheck = await PATIENT.findById(decoded.id) //if id is wrong throw this msg
      req.userId = decoded.id
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

//PATIENT
exports.DataSignup = async function (req, res, next) {
    try {
        req.body.image = req.file.filename
        if (!req.body.name || !req.body.dateofbirth|| !req.body.gender || !req.body.phoneNo || !req.body.bloodgroup || !req.body.emergencyContact) {
            throw new Error('Enter All Fields')
        } 
        
        req.body.pass = await bcrypt.hash(req.body.pass, 8)
        let dataSignup = await PATIENT.create(req.body)
        var token = jwt.sign({ id: dataSignup._id }, 'KEY')
        res.status(201).json({
            status: "Success!",
            message: "Patient Signup Successfully",
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
 
        let dataFind = await PATIENT.findOne({ email: req.body.email })
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
            message: "Patient Signup Successfully",
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
        let dataFind = await PATIENT.find()
        res.status(201).json({
            status: "Success!",
            message: "PatientInfo Found Successfully",
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
        let dataUpdate = await PATIENT.findByIdAndUpdate(req.params.id , req.body , {new : true})
        res.status(201).json({
            status: "Success!",
            message: "PatientInfo Update Successfully",
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
        let dataDelete = await PATIENT.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "Success!",
            message: "PatientInfo Delete Successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}


//APPOINTMENT

exports.AppointmentCreate = async function (req, res, next) {
    try {
        req.body.patientId = req.userId
        if (!req.body.date || !req.body.time|| !req.body.reason) {
            throw new error('Enter All Fields')
        } 
        
        let dataCreate = await APPOINTMENT.create(req.body)
        res.status(201).json({
            status: "Success!",
            message: "Appointment Create Successfully",
            data: dataCreate
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
        let dataFind = await APPOINTMENT.find({patientId : req.userId}).populate(["doctorId","patientId"])
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

exports.AppointmentUpdate = async function (req, res, next) {
    try {
        let dataUpdate = await APPOINTMENT.findByIdAndUpdate(req.params.id , req.body , {new : true})
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

exports.LabTestCreate = async function (req, res, next) {
    try {
        req.body.attachment = req.files.map((el) => el.filename)
        req.body.patientId = req.userId
        if (!req.body.testType || !req.body.results || !req.body.notes) {
            throw new Error('Enter All Fields')
        } 
        
        let dataCreate= await LAB.create(req.body)
        res.status(201).json({
            status: "Success!",
            message: "LabTestData Create Successfully",
            data: dataCreate
        })
    } catch (error) { 
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.LabTestRead = async function (req, res, next) {
    try {
        let dataFind = await LAB.find({patientId : req.userId}).populate(["doctorId","patientId"])
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
        let dataUpdate = await LAB.findByIdAndUpdate(req.params.id , req.body , {new : true})
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


//ALLERGY

exports.AllergyCreate = async function (req, res, next) {
    try {
        req.body.patientId = req.userId
        if (!req.body.allergen || !req.body.reaction || !req.body.severity | !req.body.notes) {
            throw new error('Enter All Fields')
        } 
        
        let dataCreate = await ALLERGY.create(req.body)
        res.status(201).json({
            status: "Success!",
            message: "AllergyData Create Successfully",
            data: dataCreate
        })
    } catch (error) { 
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.AllergyRead = async function (req, res, next) {
    try {
        let dataFind = await ALLERGY.find({patientId : req.userId}).populate("patientId")
        res.status(201).json({
            status: "Success!",
            message: "AllergyData Found Successfully",
            data: dataFind
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.AllergyUpdate = async function (req, res, next) {
    try {
        let dataUpdate = await ALLERGY.findByIdAndUpdate(req.params.id , req.body , {new : true})
        res.status(201).json({
            status: "Success!",
            message: "AllergyData Update Successfully",
            data: dataUpdate
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

exports.AllergyDelete = async function (req, res, next) {
    try {
        let dataDelete = await ALLERGY.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "Success!",
            message: "AllergyData Delete Successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail!",
            message: error.message
        })
    }
}

//SURGERY


exports.SurgeryRead = async function (req, res, next) {
    try {
        let dataFind = await SURGERY.find({ patientId: req.userId }).populate(["doctorId", "patientId"])
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
