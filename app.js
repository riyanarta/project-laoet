const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./services/db');

const allowedOrigins = ['http://localhost', 'http://127.0.0.1:5500', 'http://riyanarta.000webhostapp.com', 'https://project-laut.vercel.app'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.get('/check/:itemcode', async (req, res) => {
  try {
    const itemcode = req.params.itemcode;
    
    // Query the MySQL database
    db.query('SELECT * FROM biblio WHERE itemcode = ?', [itemcode], (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Error retrieving data', details: error.message });
      } else {
        res.json(results);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.get('/checks/:title', cors(), async (req, res) => {
  try {
    // const { barcode } = req.body;
    const {title} = req.params;
    const result = await db.any('SELECT * FROM biblio WHERE title = $1', [title.split('-').join(' ')]);
    // console.log('Books:', books);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving books', details: err.message });
  }
});
app.put('/edit/:itemcode', cors(), async (req, res) => {
  try {
    // const { barcode } = req.body;
    const {title} = req.params;
    const result = await db.any('SELECT * FROM biblio WHERE title = $1', [title.split('-').join(' ')]);
    // console.log('Books:', books);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving books', details: err.message });
  }
})

app.use('/hello', (req, res) => {
    res.json({ message: 'Hello World!' });
})

app.put('/edit/status/:id', async (req, res) => {
  const {status, nama} = req.body.item;
  const updateQuery = 'UPDATE test SET status = ?, nama = ? WHERE id = ?';
  const updateParams = [{status, nama}, req.params.id];
  db.query(updateQuery, updateParams, (error, result) => {
    if(error) {
      console.log(error);
      res.status(500).json({Error : "Internal Server Error"});
    } else {
      console.log("Data Successfully Up to date");
      res.json({message : "Data Successfully Up to date"});
    }
  })
})


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
