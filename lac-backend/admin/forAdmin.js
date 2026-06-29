const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
})

async function projectAdmin() {
    try {
        const username = 'Jem';
        const email = 'admin@gmail.com';
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