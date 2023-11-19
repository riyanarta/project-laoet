// const pgp = require('pg-promise')();

const mysql = require('mysql');

// const db = mysql.createConnection({
//     connectionLimit: 10,
//     host: '103.163.138.104',
//     user: 'riyanart_root',
//     password: '+qP[[-y9(AL2',
//     database: 'riyanart_project-laut'
// });

const db = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// const connection = 
// {
//     user: "default",
//     host: "ep-sweet-firefly-80847174-pooler.us-east-1.postgres.vercel-storage.com",
//     database: "verceldb",
//     password: "vyJK87SOodpF",
//     ssl: true, // Enable SSL
//     extra: {
//         ssl: {
//             rejectUnauthorized: false, // For testing purposes; you should use a valid CA certificate in a production environment
//         },
//     },
//     // POSTGRES_URL="postgres://default:vyJK87SOodpF@ep-sweet-firefly-80847174-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb"
//     // process.env.POSTGRES_URL;
// };

// const db = pgp(connection);
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('MySQL database connection successful');
    }
});

module.exports = db;