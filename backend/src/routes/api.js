import express from 'express'
//import ScoreCard from '../models/ScoreCard.js'

const router = express.Router()

/*router.delete('/clear-db', async (_, res) => {
    try {
        await ScoreCard.deleteMany({})
        res.json({message: 'Database cleared'})
    } catch (e) { throw new Error("Database deletion failed")}
})

router.post('/create-card', async (req, res) => {
    const name = req.body.name
    const subject = req.body.subject
    const score = req.body.score
    const existing = await ScoreCard.findOne({ name: name, subject: subject })
    if (existing) {
        try {
            await ScoreCard.updateOne({ name: name, subject: subject }, { $set: { score: score }})
            res.json({message: 'Updating ('+name+', '+subject+', '+score+')', card: true})
        } catch (e) { throw new Error("ScoreCard update error")}
    } else {
        try {
            const newScoreCard = new ScoreCard({ name, subject, score })
            res.json({message: 'Adding ('+name+', '+subject+', '+score+')', card: newScoreCard.save()})
        } catch (e) { throw new Error("ScoreCard creation error")}
    }
})

router.get('/query-cards', async (req, res) => {
    const queryType = req.query.type
    const queryString = req.query.queryString
    let messages = null
    if (queryType === "name") {
        messages = await ScoreCard.find({ name: queryString })
    } else {
        messages = await ScoreCard.find({ subject: queryString })
    }
    const message = queryType + ' (' + queryString + ') not found!'
    if (messages.length === 0) {
        messages = null;
    } else {
        for (let i=0; i<messages.length; i++) {
            let text = '(' + messages[i].name + ', ' + messages[i].subject + ', ' + messages[i].score + ')'
            messages[i] = text
        }
    }
    res.json({messages: messages, message: message})
})*/

export default router