const express = require('express');
const router = express.Router();
const groups = require('../models/group')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handleing GET req of the /codes'
    });
});

router.post('/', (req, res, next) => {
    const reqGroup = {
        name: req.body.name,
        password: req.body.password,
    };


    groups.find({name: reqGroup.name}, function(err, result) {
        if(result.length)
        { 
            result[0].comparePassword(reqGroup.password, function(err, isMatch) {
                if (err) throw err;
                if(isMatch) {
                    res.status(201).json({
                        message: 'Logged in',
                        user: result[0].name,
                        id: result[0].thingSpeakId,
                        member: result[0].members
                    });

                } else {
                    res.status(401).json({
                        message: 'Wrong Password!'
                    });
                }
            });

        } else {
            res.status(401).json({
                message: 'Groupname is not available'
            });
        }
    });
});


module.exports = router;