const express = require('express');
const app = express();
const signupRoute = require('./api/routes/signup');
const loginRoute = require('./api/routes/login');
const dushboardRoute = require('./api/routes/dushboard');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const urldb = 'mongodb://127.0.0.1/my_database';
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
mongoose.connect(urldb,
    (err) => {
        if (err) throw err;
        
    });
mongoose.connect(urldb,{ useNewUrlParser: true } );


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('successfilly connected to db...');
  // we're connected!
});


//
app.use((req,res,next) => {
    req.db = mongoose;
    next();
});
//
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Conterol-Allow-Methods', 'GET, PUT, POST, DELETE');
        return 
        res.status(200).json({});
    }
    return next();
});

app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/dushboard', dushboardRoute);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;