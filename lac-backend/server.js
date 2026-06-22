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

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message: 'No token provided'})
    }

    const token = authHeader.split(" ")[1];

    if(!token || token === 'null' || token === 'undefined'){
        return res.status(401).json({message: 'Invalid token format'})
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({message: 'Invalid token'})
    }
}

// register acc
app.post('/registerAcc', async(req, res) => {

    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message: 'Please fill out fields'})
        }
        if(password.length < 6){
            return res.status(400).json({message: 'Password must be atleast 6 characters long'})
        }
        const cleanEmail = email.toLowerCase().trim();

        const emailExist = await pool.query('SELECT id FROM users WHERE email=$1', [ cleanEmail ])
        if(emailExist.rows.length > 0){
            return res.status(400).json({message: 'Email already exist'})
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role', [username, cleanEmail, hashedPass, 'user' ])

        const user = result.rows[0]
        const token = jwt.sign(
            {id: user.id},
            'YOUR_JWT_SECRET',
            {expiresIn: '24h'}
        );

        return res.json({
            token,
            user: {id: user.id, email: user.email}
        })

    } catch (error) {
        res.status(500).send({message: 'Server error', error})
    }
})

// login acc
app.post('/loginAcc', async(req, res) => {

    try {
        const { email, password } = req.body;

        const result = await pool.query('SELECT * FROM users WHERE email=$1', [ email ])
        if(result.rows.length === 0){
            return res.status(400).json({message: 'User not found'})
        }

        const user = result.rows[0]
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'})
        }

        const token = jwt.sign(
            {id: user.id},
            'YOUR_JWT_SECRET',
            {expiresIn: '24h'}
        )
        return res.json({
            token,
            user: {
                id: user.id, 
                username: user.username,
                email: user.email, 
                role: user.role
                }
        })
    } catch (error) {
        console.log('Login Error', error)
        res.status(500).send({message: 'Server error', error})
    }
})

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Jem! Your server is running on port ${PORT}.`)
})