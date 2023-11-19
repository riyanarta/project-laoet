const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./services/db');

app.use(express.json());

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

app.put('/edit/status/:item_code', async (req, res) => {
  const {status} = req.body;
  const updateQuery = 'UPDATE biblio SET ? WHERE item_code = ?';
  const updateParams = [{status}, req.params.item_code]
  db.query(updateQuery, updateParams, (error, result) => {
    if(error) {
      console.log(error);
      res.status(500).json({Error : "Internal Server Error"});
    } else {
      console.log("Data Successfully Up to date");
      res.status(200).json({message : "Data Successfully Up to date"});
    }
  })
})


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
