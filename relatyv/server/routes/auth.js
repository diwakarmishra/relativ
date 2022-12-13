const _ = require('lodash');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const gravatar = require('gravatar');
const sendEmail = require('../services/sendgrid')

/** Middleware */
const {
    createErrorObject,
} = require('../middleware/authenticate');

/**
 * @description  POST /register
 * @param  {} [checkRegistrationFields]
 * @param  {} request
 * @param  {} response
 * @access public
 */
//[checkRegistrationFields]
router.post('/register', (req, res) => {
    let errors = [];
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return response.status(400).send({
                error: 'Email is already taken'
            });
            // if (user.username === req.body.username) {
            //     errors.push({ param: 'username', msg: 'Username is already taken' });
            // }
        } else {
            /** Assign Gravatar */
            const avatar = gravatar.url(req.body.email, {
                s: '220',
                r: 'pg',
                d: 'identicon'
            });

            const newUser = new User({
                admin: false,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                image: avatar
            });

            newUser
                .save()
                .then(async userData => {
                    const user = _.omit(userData.toObject(), ['password']);

                    const newObj = JSON.parse(JSON.stringify(user))
                    delete newObj.password

                    const token = jwt.sign(newObj, process.env.JWT_SECRET, {
                        expiresIn: 18000
                    });

                    const min = 10000;
                    const max = 99999;
                    const otp = Math.floor(Math.random() * (max - min + 1)) + min;

                    const secret = jwt.sign({otp : otp, email:  req.body.email}, process.env.JWT_SECRET, {
                        expiresIn: 18000
                    });

                    await sendEmail( req.body.email, {otp :otp})
                    res.status(200).send({
                        auth: true,
                        token: `Bearer ${token}`,
                        secret: secret,
                        user
                    });
                })
                .catch(err => {
                    res.send({
                        err,
                        error: 'Something went wrong, Please check the fields again'
                    });
                });
        }
    });
});


router.post('/verify/otp', async (req, response) => {
    try {

        const { secret , otp } = req.body;
        if (! (secret && otp) ) {
            return response.status(404).send({
                error: 'Invalid body'
            });
        }

        const encoded = jwt.verify(secret, process.env.JWT_SECRET)

        let user = await User.findOne({ email: encoded.email })

        if(!user) {
            return response.status(400).send({ status: false , message: 'Something Went Wrong!'})
        }
        user = _.omit(user.toObject(), ['password']);
        const newObj = JSON.parse(JSON.stringify(user))

        const token = jwt.sign(newObj, process.env.JWT_SECRET, { expiresIn: 18000 });

        if(otp == encoded.otp) {
            return response.status(200).send({ auth: true, token: `Bearer ${token}`, user })
        }
    
        return response.status(200).send({ status: false , message: 'invalid OTP'})

    }
    catch ( error ) {
        console.log(error , "error is here")
        return response.status(400).send({ status: false , message: error?.data?.message || error})
    }

});
/**
 * @description POST /login
 * @param  {} checkLoginFields
 * @param  {} request
 * @param  {} response
 * @access public
 */
//checkLoginFields
router.post('/login', async (req, response) => {
    try {

        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return response.status(200).send({
                status: false,
                message: 'No User Found'
            });
        }

        if (req.body.password !== null && !(await user.isValidPassword(req.body.password))) {

            return response.status(200).send({
                status: false,
                message: 'Invalid Username or password'
            });
        }
        const newObj = JSON.parse(JSON.stringify(user))
        delete newObj.password

        const token = jwt.sign(newObj, process.env.JWT_SECRET, { expiresIn: 18000 });
    
        return response.status(200).send({ auth: true, token: `Bearer ${token}`, user })

    }
    catch ( error ) {
        console.log(error , "error is here")
        throw error ;
    }

});

/**
 * @description POST /logout
 * @param  {} request
 * @param  {} response
 * @access public
 */
router.get('/logout', async (req, res) => {

    // const user = await User.findOne({ username: req.body.username }).select('-password');

    // if (!user) {
    //     return res.status(404).send({
    //         error: 'No User Found'
    //     });
    // }

    res.status(401).send({ success: true });
});

module.exports = router;
