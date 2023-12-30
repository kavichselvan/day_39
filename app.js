const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

app.get('/createFile', (req, res) => {
  const timestamp = new Date().toISOString();
  const filename = `${timestamp.replace(/[:.]/g, '-')}.txt`;
  const folderPath = path.join(__dirname, 'files');

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const filePath = path.join(folderPath, filename);
  fs.writeFileSync(filePath, timestamp);

  res.send(`File '${filename}' created successfully.`);
});


app.get('/getAllFiles', (req, res) => {
  const folderPath = path.join(__dirname, 'files');

  try {
    const files = fs.readdirSync(folderPath);
    res.send(files);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
