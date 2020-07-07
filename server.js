const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const passport = require('passport')
const http = require('http')
//api routes files
const users = require('./api/routes/users')
const posts = require('./api/routes/posts')

const cors = require('cors')
dotenv.config()

const app = express()

const db = process.env.DB_CONNECT
app.use(passport.initialize())
require('./config/passport')(passport)
mongoose
  .connect(db, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
app.use('/api/users', users)
app.use('/api/posts', posts)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
const server = http.createServer(app)
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
