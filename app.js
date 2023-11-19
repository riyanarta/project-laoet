const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./services/db');

app.use(express.json());
// app.use(cors(corsOptions));
// app.use('/books', booksRouter);
// app.get('/check', async (req, res) => {
//     try {
//       const { barcode } = req.body;
//       const result = await db.any('SELECT * FROM biblio WHERE itemcode = $1', [barcode]);
//       // console.log('Books:', books);
//       res.json(result);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Error retrieving books', details: err.message });
//     }
// });

app.get('/check/:itemcode', cors(), async (req, res) => {
  try {
    // const { barcode } = req.body;
    const result = await db.any('SELECT * FROM biblio WHERE itemcode = $1', [req.params.itemcode]);
    // console.log('Books:', books);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving books', details: err.message });
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
app.put('/checks/:itemcode', cors(), async (req, res) => {
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


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
