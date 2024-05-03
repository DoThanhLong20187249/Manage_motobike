const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'motocycle',
    password: '426153',
    port: 5432,
})



exports.pool = pool;