const express = require('express');
const router = express.Router();

const { Course } = require('../models/Course');

const { createErrorObject } = require('../middleware/authenticate');


/**
 * @description GET /api/course/
 */
 router.get('/', async ( req, res) => {
    try {
        console.log(req.user, 'req user is here')
        const result = await Course.find({});
        return res.status(200).send(result) ;
    }
    catch ( error ) {
        return res.status(400).send({message: 'something went wrong!' , success: false}) ;
    }
})

/**
 * @description GET /api/course/:course_id
 */
router.get('/:id', async ( req, res) => {
    try {
        if(!req.params.id) {
           return res.status(404).send({ status: false , message: "Invalid Id"})
        }
        const result = await Course.findOne({ _id: req.params.id});
        return res.status(200).send(result) ;
    }
    catch ( error ) {
        return res.status(400).send({message: 'something went wrong!' , success: false}) ;
    }
})

/**
 * @description POST /api/course/
 */
router.post('/', async (req, res) => {
    try {
        let errors = [];
        if (!(req.body.title && req.body.description)) {
            errors.push({ param: 'no_content', msg: 'Title or Description cannot be empty' });
            return res.json({ errors: createErrorObject(errors) });
        }
    
        const newCourse = new Course({
            description: req.body.description,
            title: req.body.title,
            image: req.body.image,
            session: req.body.sessionId
        }).save();
    
        return res.status(200).json(newCourse);
    }
    catch ( error ) {
        console.log(error)
        throw error ;
    }

});

/**
 * @description POST /api/course/update
 */
 router.post('/update', async (req, res) => {
    try {
         
        if(!req.body.id) {
            return res.status(404).send({ status: false , message: "Invalid Id"})
        }

        const updatedData = await Course.updateOne({_id : req.body.id}, { title : req.body.title, description : req.body.description })
    
        return res.status(200).json(updatedData);
    }
    catch ( error ) {
        console.log(error)
        throw error ;
    }

});

module.exports = router;
