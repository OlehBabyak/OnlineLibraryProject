const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const path = require('path');
const cors = require('cors');
const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb+srv://oleh:testpassword@cluster0.w7x6n.mongodb.net/OnlineLibrary?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));
app.use('/api/favorite', require('./routes/favorite'));
app.use('/api/addAuthor', require('./routes/addAuthor'));
app.use('/api/addBook', require('./routes/addBook'));
app.use('/api/authors', require('./routes/authors'));
app.use('/api/books', require('./routes/books'));

app.use('/client/public/uploads', express.static('client/public/uploads'));

const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://shrouded-journey-38552.heroku.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static(path.join(__dirname, "client/build")));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});