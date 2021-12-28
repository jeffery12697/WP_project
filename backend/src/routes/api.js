import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from "dotenv-defaults"
import bcrypt from "bcrypt"
import User from '../models/User'
import Vcode from '../models/Vcode'
import { v4 as uuidv4 } from 'uuid'
import Course from '../models/Course'
import Problem from '../models/Problem'
import Answer from '../models/Answer'

dotenv.config();

// generate vcode
function makevcode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const router = express.Router()

router.post('/user/set_verify_code', async (req, res) => {
    const email = req.query.mail
    const vcode = makevcode(6)
    
    if (await Vcode.findOne({ email: email })) {
        try {
            await Vcode.updateOne({ email: email }, { $set: { vcode: vcode }})
        } catch(e) { throw new Error("Verification code update error")}
    } else {
        try {
            const newVcode = new Vcode({ email, vcode })
            await newVcode.save()
        } catch (e) { throw new Error("Verification code creation error")}
    }

    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
    })
      
    var mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'KaoGuTi Website verification code',
        text: 'Your verification code is: ' + vcode
    }
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    })

    res.json({msg: 'Verificaiton code sent to ' + email})
})

router.post('/user/register', async (req, res) => {
    const email = req.query.mail
    const vcode = req.query.vcode
    const username = req.query.username
    const password = await bcrypt.hash(req.query.password,10)
    if (!vcode) {
        res.status(400).send({ msg: "Didn't click verify button!" })
        return
    }
    if (await Vcode.findOne({ email: email, vcode: vcode })) {
        await Vcode.deleteOne({email: email, vcode: vcode})
    } else {
        res.status(400).send({ msg: 'Wrong verify code!'})
        return
    }
    if (await User.findOne({ username: username })) {
        res.status(400).send({ msg: 'username exist!' })
        return
    }
    if (await User.findOne({ email: email })) {
        res.status(400).send({ msg: 'email exist!' })
        return
    }
    try {
        const newUser = new User({ username, email, password })
        await newUser.save()
        res.json({msg: 'User created'})
    } catch (e) { throw new Error("User creation error")}
})

router.post('/user/login', async (req, res) => {
    const username = req.query.username
    const password = req.query.password
    const user = await User.findOne({ username: username })
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            res.json({ msg: 'Success!' })
            return
        }
        res.status(400).send({ msg: 'Incorrect password' })
        return
    }
    res.status(400).send({ msg: "Username doesn't exist" })
})

router.post('/create/course', async (req, res) => {
    const course_name = req.query.course_name
    const course_id = uuidv4()
    try {
        const newCourse = new Course({ course_name, course_id })
        await newCourse.save()
        res.json({msg: 'Course created'})
    } catch (e) { throw new Error("Course creation error")}
})

router.post('/create/problem', async (req, res) => {
    const course_id = req.query.course_id
    const problem_id = uuidv4()
    const title = req.query.title
    const description = req.query.description
    const tags = req.query.tags
    const teacher = req.query.teacher
    const publisher = req.query.publisher
    const likes = []
    const content = req.query.answer
    try {
        const newProblem = new Problem({ course_id, problem_id, title, description, tags, teacher, publisher, likes })
        await newProblem.save()
        if (content) {
            const answer_id = uuidv4()
            const newAnswer = new Answer({ problem_id, answer_id, content, publisher, likes})
            await newAnswer.save()
        }
        res.json({msg: 'Problem created'})
    } catch (e) { throw new Error("Problem creation error")}
})

router.post('/create/answer', async (req, res) => {
    const problem_id = req.query.problem_id
    const answer_id = uuidv4()
    const content = req.query.content
    const publisher = req.query.publisher
    const likes = []
    try {
        const newAnswer = new Answer({ problem_id, answer_id, content, publisher, likes})
        await newAnswer.save()
        res.json({msg: 'Answer created'})
    } catch (e) { throw new Error("Answer creation error")}
})

export default router