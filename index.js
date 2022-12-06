const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Data = require('./db/data');
const Jwt = require('jsonwebtoken');
const jwtKey = 'gps';
const app = express();

app.use(express.json());
app.use(cors());

// Register

app.post('/register', async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
    if (err) {
      resp.send('Something went wrong');
    }
    resp.send({ result, auth: token });
  });
});

// Login

app.post('/login', async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select('-password');
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
          resp.send('Something went wrong');
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: 'No User found' });
    }
  } else {
    resp.send({ result: 'No User found' });
  }
});

// Data

app.post('/data', async (req, resp) => {
  let data = new Data(req.body);
  let result = await data.save();
  resp.send(result);
});

app.get('/data', async (req, resp) => {
  const data = await Data.find();
  if (data.length > 0) {
    resp.send(data);
  } else {
    resp.send({ result: 'No Product found' });
  }
});

app.get('/search/:key', async (req, resp) => {
  let result = await Data.find({
    $or: [
      {
        DeviceId: { $regex: req.params.key },
      },
      {
        DeviceType: { $regex: req.params.key },
      },
    ],
  });
  resp.send(result);
});

app.listen(5000);
