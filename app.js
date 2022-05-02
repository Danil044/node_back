// Server
let express = require('express');
let app = express();

//Cors
let cors = require('cors')
app.use(cors())

// JSON
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


// Disk - file operations
let path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// File Loader
const multer  = require("multer");
app.use(multer({dest:"uploads"}).single("img"))

// Cookie
let cookieParser = require('cookie-parser');
app.use(cookieParser());

// Logger
let logger = require('morgan');
app.use(logger('dev'));


//Auth
let auth = require('./controller/auth')
app.use(auth.middlewareAuth)
app.post('/api/auth', auth.authByLogin)
app.post('/api/tryCreateUser', auth.tryCreateUser)


// Router
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users')
let studentRouter = require('./routes/students')
let portfolioRouter = require("./routes/portfolio")
let media = require('./routes/helpers/MediaConverter')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentRouter);
app.use('/api/portfolios', portfolioRouter);
app.use('/api/helpers/converter', media);



//Database
let mongoose = require('mongoose')
let conectionString = "mongodb+srv://Gatti:howewer_23@cluster0.nf9ja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(
    conectionString,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
        if(err)
        {
            console.log("DB Error")
            console.log(err)
        }
    }
)

module.exports = app;