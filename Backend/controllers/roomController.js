const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());


let rooms = [];

app.post('/create/solo', (req, res) => {
  const { meetingId, roomType, workspaceName,code, language, fileName } = req.body;

  if (!meetingId || !roomType || !workspaceName || !code || !language || !fileName) {
    return res.status(400).json({ error: 'All parameters are required.' });
  }

  const newRoom = {
    meetingId,
    roomType:'solo',
    workspaceName,
    code,
    language,
    fileName
  };

  rooms.push(newRoom);

 
  res.status(200).json({ message: 'Solo room created successfully.', room: newRoom });
});

app.get('/rooms', (req, res) => {
  res.status(200).json({ rooms });
});

