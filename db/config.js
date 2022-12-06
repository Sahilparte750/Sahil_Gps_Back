const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://sahil2030:Sahil2030@cluster0.kq4r7x9.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('db connected');
  })
  .catch(() => {
    console.log('db not connected');
  });
