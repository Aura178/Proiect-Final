const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.get('/homepage', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'proiect final', 'homepage.html'));
}); 

app.get('/assemble-your-wardrobe', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'proiect final', 'assemble-your-wardrobe.html'));
});

app.post('/upload', upload.single('image'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('Nici o imagine nu a fost încărcată.');
  }
  res.send('Imagine încărcată cu succes: ' + file.filename);
});

app.listen(PORT, () => {
  console.log(`Serverul ascultă la adresa http://localhost:${PORT}`);
});




