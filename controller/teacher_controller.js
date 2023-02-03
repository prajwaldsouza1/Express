
const express = require('express');
const router = express.Router();
const Teacher = require('../model/teacher')

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const JWT_SECRET = "hello";  // to create token in browser


const Register = async (req, res) => {

    try {
        let teacher = await Teacher.findOne({ email: req.body.email });
        if (teacher) {
            const success = false;
            return res.status(400).json({ success, errors: "email already exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //create a new teacher
        teacher = new Teacher({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const savedTeacher = await teacher.save()


        //   let teacher = await Teacher.create({
        //       name: req.body.name,
        //       email: req.body.email,
        //       password: secPass,
        //     })


        const data = {
            teacher: {
                id: teacher.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        const success = true;
        res.json({ success, authtoken })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(" internal some Error occured");
    }

}



const Login = async (req, res) => {

    const { email, password } = req.body;
    try {
        let teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(400).json({ error: "incorrect" })
        }
        const passwordCompare = await bcrypt.compare(password, teacher.password);
        if (!passwordCompare) {
            const success = false;
            return res.status(400).json({ success, error: "incorrect" });
        }
        const data = {
            teacher: {
                id: teacher.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        const success = true;
        res.json({ success, authtoken })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send(" internal some Error occured");
    }

}


module.exports = { Register, Login }

