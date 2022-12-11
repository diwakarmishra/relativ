/** Dotenv Environment Variables */
if (process.env.HEROKU_DEPLOYMENT !== 'true') {
    // Skip loading the .env file if deploying with heroku
    require('dotenv').config();
}

/** Connect to MongoDB */
require('./db/mongoose');

/** Built In Node Dependencies */
const path = require('path');
const fs = require('fs');

/** Logging Dependencies */
const morgan = require('morgan');
const winston = require('winston');
const { logger } = require('./config/logModule');

/** Passport Configuration */
const passport = require('passport');
require('./config/passport')(passport);

/** Express */
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

/** Socket IO */
const app = express();
const server = require('http').Server(app);

/** Routes */
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');
const sessionRoutes = require('./routes/session')
const eventRoutes = require('./routes/event');
const middleware = require('./middleware/verfiyToken')


app.use(
    morgan('combined', {
        stream: fs.createWriteStream('logs/access.log', { flags: 'a' })
    })
);
app.use(express.static(path.join(__dirname,"../client/build")));

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(expressValidator());
app.use(cors());


/** Routes Definitions */
app.use('/api/auth', authRoutes);
/** Middleware */
app.all('*', middleware.verifyJWT)

app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/event', eventRoutes);

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    );
}

/** Serve static assets if production */
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../client', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
    });
}

if (process.env.NODE_ENV !== 'test') {
    server.listen(process.env.PORT || 5000, () => {
        logger.info(`[LOG=SERVER] Server started on port ${process.env.PORT}`);
    });
}

module.exports = { app };
