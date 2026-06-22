const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Jem! Your server is running on port ${PORT}.`)
})