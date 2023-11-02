const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const methodOverride = require('method-override')
const morgan = require('morgan')
const GlobelError = require('./middleware/globelErrorHandler')
const routers = require('./router')
const cookieSession = require('cookie-session')
const flash = require('connect-flash')
require('dotenv').config()
require('./config/dbConfig')
const cookieParser = require('cookie-parser')

const app = express()
//-momery unleaked---------
app.set('trust proxy', 1);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(helmet())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(cookieSession({
    secret: "node express secret",
    resave: true,
    saveUninitialized: true,
}))
app.use(flash())
app.use(methodOverride("_method"))
app.set("view engine", 'ejs')
app.set('port', process.env.PORT || 3000)
// Application Routing
app.use(routers)
// Globel Error Handler
app.use(GlobelError)
app.listen(app.get('port'), _ => console.log(`http://localhost:${app.get('port')}`))