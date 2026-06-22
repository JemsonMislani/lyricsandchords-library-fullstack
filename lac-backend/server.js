const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express()

app.use(cors())
app.use(express.json())

const pool = new Pool({
    user: 'postgres',
    password: 'Im_Jem23*',
    host: 'localhost',
    database: 'lyricsandchords_library_fullstack',
    port: 5432
})

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Jem! Your server is running on port ${PORT}.`)
})