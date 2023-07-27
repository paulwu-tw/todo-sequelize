import dotenv from 'dotenv'
import express from 'express'
import exphbs from 'express-handlebars'
import session from 'express-session'
import methodOverride from 'method-override'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: 'hbs'
}))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
    res.send('HI')
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})