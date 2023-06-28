const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
const upload = multer({ dest: 'uploads/' });

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // Access the file metadata through req.file

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const { originalname, mimetype, size } = req.file;

  // Create a response object containing the file metadata
  const metadata = {
    name: originalname,
    type: mimetype,
    size: size
  };

  // Send the metadata as the response
  res.json(metadata);
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
