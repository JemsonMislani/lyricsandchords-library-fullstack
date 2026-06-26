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
        const decoded = jwt.verify(token, 'YOUR_JWT_SECRET');
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

// get the username of the admin
app.get('/getAdminUsername', verifyToken, async(req, res) => {
    
    try {
        const userId = req.user.id;
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [ userId ])
        res.json(result.rows[0])
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

// FOR LIBRARIES 

// create data of song
app.post('/createDataOfSong', verifyToken, async(req, res) => {

    try {
        const adminId = req.user.id;
        const { title, artist, lyrics, song_key } = req.body;
        const result = await pool.query('INSERT INTO libraries (title, artist, lyrics, song_key, created_by) VALUES ($1, $2, $3, $4, $5 ) RETURNING *', [ title, artist, lyrics, song_key, adminId])
        res.json(result.rows[0])
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

// edit, update data of song
app.put('/editDataOfSong/:id', verifyToken, async(req, res) => {

    try {
        const { id } = req.params;
        const { title, artist, song_key } = req.body
        const result = await pool.query('UPDATE libraries SET title = $1, artist = $2, song_key = $3 WHERE id = $4 RETURNING *', [ title, artist, song_key, id])
        if(result.rows.length === 0){
            return res.status(404).json({message: 'Song not found'})
        }
        res.json(result.rows[0])
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');    
    }
})

// edit lyrics 
app.put('/editLyrics/:id', verifyToken, async(req, res) => {

    try {
        const { id } = req.params;
        const { lyrics } = req.body
        const result = await pool.query('UPDATE libraries SET lyrics = $1 WHERE id = $2 RETURNING *', [ lyrics, id])
        res.json(result.rows[0])
    } catch (error) {
                console.log(error);
        res.status(500).send('Server Error');    }
})

// delete data of song
app.delete('/deleteDataOfSong/:id', verifyToken, async(req, res) => {

    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM libraries WHERE id=$1 RETURNING *', [ id ])
        if(result.rows.length === 0){
            return res.status(404).json({message: 'No data found'})
        }
        res.json({message: 'Data deleted', data: result.rows[0]})
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');   
    }
})

// get data of song
app.get('/getDataOfSong', verifyToken, async(req, res) => {

    try {
        const adminId = req.user.id;
        const result = await pool.query('SELECT * FROM libraries ORDER BY id ASC')
        res.json(result.rows)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

// get total count of song
app.get('/totalOfSong', verifyToken, async(req, res) => {

    try {
        const result = await pool.query('SELECT COUNT(*) FROM libraries')
        res.json({total: Number(result.rows[0].count)})
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

// get total count of artist
app.get('/totalOfArtist', verifyToken, async(req, res) => {

    try {
        const result = await pool.query('SELECT COUNT(DISTINCT artist) FROM libraries')
        res.json({total: Number(result.rows[0].count)})
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

// get total of used chords
app.get('/totalOfUsedChords', verifyToken, async(req, res) => {

    try {
        const result = await pool.query('SELECT COUNT(DISTINCT song_key) FROM libraries')
        res.json({total: Number(result.rows[0].count)})    
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

// search title of song
app.get('/searchSongTitle', verifyToken, async(req, res) => {
    
    try {
        const { searchTitle } = req.query;
        const result = await pool.query('SELECT * FROM libraries WHERE title ILIKE $1', [`%${searchTitle}%`])
        res.json(result.rows)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

// search title, artist and key of song
app.get('/searchSongTitleArtistKey', verifyToken, async(req, res) => {

    try {
        const { searchSongLists } = req.query;
        const result = await pool.query('SELECT * FROM libraries WHERE title ILIKE $1 OR artist ILIKE $1 OR song_key ILIKE $1', [
            `%${searchSongLists}%`
        ])
        res.json(result.rows)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

// get artist name who contribute a lot of songs in data
app.get('/artistMostContributedSongs', verifyToken, async(req, res) => {
    try {
        const result = await pool.query('SELECT artist, COUNT(*) AS total_songs FROM libraries GROUP BY artist ORDER BY total_songs DESC LIMIT 3')
        res.json(result.rows)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
})

// FOR USER 

// get the username of user
app.get('/getUsersUsername', verifyToken, async(req, res) => {

    try {
        const userId = req.user.id;
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [ userId ])
        res.json(result.rows[0])
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Server Error'})
    }
})

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Jem! Your server is running on port ${PORT}.`)
})