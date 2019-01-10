const express = require('express');
const router = express.Router();
const groups = require('../models/group')
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     console.log("hash: ")
//     console.log(hash)
//   });

router.post('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    const reqGroup = {
        name: req.body.name,
        password: req.body.password,
        thingSpeakId: req.body.thingSpeakId,
        members: req.body.members
    };
    console.log(reqGroup);
    let found = false;

    groups.find({name: reqGroup.name}, function(err, result) {
        console.log("res: ")
        console.log(result)
        if(result.length)
        {
            res.status(401).json({
                message: 'Groupname is exist'
            });
        } else {


            var newGroup = new groups (
            {
                thingSpeakId: reqGroup.thingSpeakId,
                name: reqGroup.name,
                password: reqGroup.password,
                members: reqGroup.members
            });
    
            
            console.log(newGroup);
    
    
            newGroup.save(function (err) {
                if (err) return console.error(err);
                else {
                    res.status(201).json({
                        message: 'signed up successfully'
                    }); 
                }
            });
            
        }

    });

    // console.log("found:  ");
    // console.log(found);


    // if(found){
    //     res.status(401).json({
    //         message: 'Groupname is exist'
    //     });
    // } else {
    //     var newGroup = new groups (
    //     {
    //         thingSpeakId: reqGroup.thingSpeakId,
    //         name: reqGroup.name,
    //         password: reqGroup.password,
    //         members: reqGroup.members
    //     });


    //     console.log(newGroup);


    //     newGroup.save(function (err) {
    //         if (err) return console.error(err);
    //         else {
    //             res.status(201).json({
    //                 message: 'signed up successfully'
    //             }); 
    //         }
    //     });
        
    // }
});


module.exports = router;



/*
var user = request.response;


localStorage.setItem('app.user', JSON.stringify(user));


localStorage.removeItem('app.user');



// sokdmoskdmsd.com/panel

// skdmsodkm.com/login

if (!localStorage.getItem('app.user')) {
    // not logged in
    window.location.href = '../login'
}
*/