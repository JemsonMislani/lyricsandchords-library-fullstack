const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'Im_Jem23*',
    host: 'localhost',
    database: 'lyricsandchords_library_fullstack',
    port: 5432
})

async function projectAdmin() {
    try {
        const username = 'jem';
        const email = 'jemsonmislani@gmail.com';
        const password = 'jemson';

        const cleanEmail = email.toLowerCase().trim()
        const hashedPw = await bcrypt.hash(password, 10)

        await pool.query('INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)', [
            username, cleanEmail, hashedPw, 'admin'
        ])

        console.log('Admin created successfully!')

    } catch (error) {
        console.log('Create admin error', error)
    } finally {
        pool.end();
    }
}
projectAdmin();