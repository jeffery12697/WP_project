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
        service: process.env.EMAIL_SERVICE,
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

router.get('/search', async (req, res) => {
    const search_name = req.query.course_name
    const courses = await Course.find({course_name: {$regex: search_name}})
    for (let i=0; i<courses.length; i++) {
        courses[i] = {course_name: courses[i].course_name, course_id: courses[i].course_id}
    }
    res.json(courses)
})

router.get('/search/course', async (req, res) => {
    const course_id = req.query.course_id
    const teacher = req.query.teacher
    const tags = req.query.tags
    const username = req.query.username
    const problems = await Problem.find({course_id: course_id, teacher: {$regex: teacher}, tags: {$all: tags}})
    for (let i=0; i<problems.length; i++) {
        problems[i] = {problem_id: problems[i].problem_id,
            title: problems[i].title,
            teacher: problems[i].teacher,
            likes_num: problems[i].likes.length,
            tags: problems[i].tags,
            publisher: problems[i].publisher,
            able_to_like: !(problems[i].likes.includes(username))
        }
    }
    res.json(problems)
})

router.get('/problem', async (req, res) => {
    const problem_id = req.query.problem_id
    const username = req.query.username
    const problem = await Problem.findOne({problem_id: problem_id})
    const answers = await Answer.find({problem_id: problem_id})
    for (let i=0; i<answers.length; i++) {
        answers[i] = {answer_id: answers[i].answer_id,
            content: answers[i].content,
            publisher: answers[i].publisher,
            likes_num: answers[i].likes.length,
            able_to_like: !(answers[i].likes.includes(username))
        }
    }
    res.json({
        title: problem.title,
        description: problem.description,
        teacher: problem.teacher,
        publisher: problem.publisher,
        tags: problem.tags,
        likes_num: problem.likes.length,
        able_to_like: !(problem.likes.includes(username)),
        answers: answers
    })
})

router.post('/like/problem', async(req, res) => {
    const problem_id = req.query.problem_id
    const username = req.query.username
    try {
        const problem = await Problem.findOne({ problem_id: problem_id })
        if (problem.likes.includes(username)) {
            problem.likes = problem.likes.filter((user) => {
                return user !== username
            })
            res.json({msg: 'unliked'})
        } else {
            problem.likes.push(username)
            res.json({msg: 'liked'})
        }
        const likes = problem.likes
        await Problem.updateOne({ problem_id: problem_id }, { $set: { likes: likes }})
    } catch (e) { throw new Error("Problem liking error")}
})

router.post('/like/answer', async(req, res) => {
    const answer_id = req.query.answer_id
    const username = req.query.username
    try {
        const answer = await Answer.findOne({ answer_id: answer_id })
        if (answer.likes.includes(username)) {
            answer.likes = answer.likes.filter((user) => {
                return user !== username
            })
            res.json({msg: 'unliked'})
        } else {
            answer.likes.push(username)
            res.json({msg: 'liked'})
        }
        const likes = answer.likes
        await Answer.updateOne({ answer_id: answer_id }, { $set: { likes: likes }})
    } catch (e) { throw new Error("Answer liking error")}
})

export default router