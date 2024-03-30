var express = require('express');
var router = express.Router();
const Patientcontrollers = require('../controllers/patient')
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

/* GET Patient listing. */
router.post('/signup', upload.single('image'), Patientcontrollers.DataSignup);

router.post('/login', Patientcontrollers.secure, Patientcontrollers.DataLogin);

router.get('/read', Patientcontrollers.DataRead);

router.patch('/update/:id', Patientcontrollers.secure, upload.single('image'), Patientcontrollers.DataUpdate);

router.delete('/delete/:id', Patientcontrollers.secure, Patientcontrollers.DataDelete);


/* GET Appointment listing. */

router.post('/appointment/create', Patientcontrollers.secure, Patientcontrollers.AppointmentCreate);

router.get('/appointment/read', Patientcontrollers.secure, Patientcontrollers.AppointmentRead);

router.patch('/appointment/update/:id', Patientcontrollers.secure, Patientcontrollers.AppointmentUpdate);

router.delete('/appointment/delete/:id', Patientcontrollers.secure, Patientcontrollers.AppointmentDelete);

/* GET LabTest listing. */

router.post('/lab/create', upload.array('attachment', 5), Patientcontrollers.secure, Patientcontrollers.LabTestCreate);

router.get('/lab/read', Patientcontrollers.secure, Patientcontrollers.LabTestRead);

router.patch('/lab/update/:id', upload.array('attachment', 5), Patientcontrollers.secure, Patientcontrollers.LabTestUpdate);

router.delete('/lab/delete/:id', Patientcontrollers.secure, Patientcontrollers.LabTestDelete);

/* GET Allergy Listing. */

router.post('/allergy/create', Patientcontrollers.secure, Patientcontrollers.AllergyCreate);

router.get('/allergy/read', Patientcontrollers.secure, Patientcontrollers.AllergyRead);

router.patch('/allergy/update/:id', Patientcontrollers.secure, Patientcontrollers.AllergyUpdate);

router.delete('/allergy/delete/:id', Patientcontrollers.secure, Patientcontrollers.AllergyDelete);

/* GET Surgery Listing. */
 
router.get('/surgery/read', Patientcontrollers.secure, Patientcontrollers.SurgeryRead);

router.delete('/surgery/delete/:id', Patientcontrollers.secure, Patientcontrollers.SurgeryDelete);

module.exports = router; 