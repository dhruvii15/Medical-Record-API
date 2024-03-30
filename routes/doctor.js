var express = require('express');
var router = express.Router();
const Doctorcontrollers = require('../controllers/doctor')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

/* GET Doctor listing. */
router.post('/signup', upload.single('image'), Doctorcontrollers.DataSignup);

router.post('/login', Doctorcontrollers.secure, Doctorcontrollers.DataLogin);

router.get('/read', Doctorcontrollers.DataRead);

router.patch('/update/:id', upload.single('image'), Doctorcontrollers.secure, Doctorcontrollers.DataUpdate);

router.delete('/delete/:id', Doctorcontrollers.secure, Doctorcontrollers.DataDelete);

/* GET Appointment listing. */

router.patch('/appointment/update/:id', Doctorcontrollers.secure, Doctorcontrollers.AppointmentUpdate);

router.get('/appointment/read', Doctorcontrollers.secure, Doctorcontrollers.AppointmentRead);

router.delete('/appointment/delete/:id', Doctorcontrollers.secure, Doctorcontrollers.AppointmentDelete);

/* GET LabTest listing. */

router.get('/lab/read', Doctorcontrollers.secure, Doctorcontrollers.LabTestRead);

router.patch('/lab/update/:id', upload.array('attachment', 5), Doctorcontrollers.secure, Doctorcontrollers.LabTestUpdate);

router.delete('/lab/delete/:id', Doctorcontrollers.secure, Doctorcontrollers.LabTestDelete);

/* GET Surgery listing. */

router.post('/surgery/create', Doctorcontrollers.secure, Doctorcontrollers.SurgeryCreate);

router.get('/surgery/read', Doctorcontrollers.secure, Doctorcontrollers.SurgeryRead);

router.patch('/surgery/update/:id', Doctorcontrollers.secure, Doctorcontrollers.SurgeryUpdate);

router.delete('/surgery/delete/:id', Doctorcontrollers.secure, Doctorcontrollers.SurgeryDelete);


/* GET Prescription listing. */

router.post('/prescription/create', Doctorcontrollers.secure, Doctorcontrollers.PrescriptionCreate);

router.get('/prescription/read', Doctorcontrollers.secure, Doctorcontrollers.PrescriptionRead);

router.patch('/prescription/update/:id', Doctorcontrollers.secure, Doctorcontrollers.PrescriptionUpdate);

router.delete('/prescription/delete/:id', Doctorcontrollers.secure, Doctorcontrollers.PrescriptionDelete);


module.exports = router; 
