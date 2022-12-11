const express = require('express');
const router = express.Router();

const { Session } = require('../models/Session');
const { User } = require('../models/User')

const { createErrorObject } = require('../middleware/authenticate');

/**
 * @description GET /api/session/:course_id
 */
 router.get('/', async (req, res) => {
    try {

        if(!req.query.course) {
            return res.status(404).json({ status: false , message: "Request Invalid!"});
        }

        const data = await Session.find({ course_id: req.query.course })

        return res.status(200).send(data);
    }
    catch ( error ) {
        console.log(error)
        throw error ;
    }

});


/**
 * @description POST /api/session/
 */
router.post('/', async (req, res) => {
    try {
        let errors = [];
        if (!(req.body.title && req.body.description && req.body.start && req.body.end)) {
            errors.push({ param: 'no_content', msg: 'Invalid body' });
            return res.json({ errors: createErrorObject(errors) });
        }
    
        const newSession = await new Session({
            description: req.body.description,
            title: req.body.title,
            course_id: req.body.courseId,
            start: req.body.start,
            end: req.body.end,
            paricipants: []
        }).save();

        return res.status(200).send({ status: true , id: newSession._id});
    }
    catch ( error ) {
        console.log(error)
        throw error ;
    }

});

module.exports = router;
