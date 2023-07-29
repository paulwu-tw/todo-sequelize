const express = require('express')
const exphbs = require('express-handlebars')
const usePassport = require('./config/passport')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: 'hbs'
}))
app.set('view engine', 'hbs')
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(flash())
usePassport(app)

// add middleware for authenticate
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.successMsg = req.flash('successMsg')
    res.locals.warningMsg = req.flash('warningMsg')
    next()
})

app.use(routes)

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})