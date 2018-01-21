const { Pool } = require('pg')

const pool = new Pool({
    user: 'rodgers',
    host: '127.0.0.1',
    database: 'crypto-dev',
    password: 'thisisme',
    port: 5432,
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}