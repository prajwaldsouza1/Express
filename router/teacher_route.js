const express = require('express');
const router = express.Router();

const { Register, Login } = require('../controller/teacher_controller')



// api REGISTER -------------------------------------------------------------------
router.post('/reg', Register)



// api LOGIN --------------------------------------------------------------
router.post('/log', Login)


module.exports = router
