const express = require('express')
const cors = require('cors')
const connectDatabase = require('./config/database')
const CharacterGeneration = require('./config/random')
const dotenv = require('dotenv')
const PORT = 5000 || process.env.PORT



dotenv.config({ path: '.env'})

const app = express()

connectDatabase()
CharacterGeneration()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', (require('./routes/upload')))

app.listen(PORT, ()=>{
    console.log(`Server running on http//localhost:${PORT}`)
})