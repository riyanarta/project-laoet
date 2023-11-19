const pgp = require('pg-promise')();

const connection = 
{
    user: "default",
    host: "ep-sweet-firefly-80847174-pooler.us-east-1.postgres.vercel-storage.com",
    database: "verceldb",
    password: "vyJK87SOodpF",
    ssl: true, // Enable SSL
    extra: {
        ssl: {
            rejectUnauthorized: false, // For testing purposes; you should use a valid CA certificate in a production environment
        },
    },
    // POSTGRES_URL="postgres://default:vyJK87SOodpF@ep-sweet-firefly-80847174-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb"
    // process.env.POSTGRES_URL;
};

const db = pgp(connection);
db.connect()
   .then(obj => {
      obj.done(); // success, release the connection;
      console.log('Database connection successful');
   })
   .catch(error => {
      console.error('Error connecting to the database:', error);
   });


module.exports = db;
