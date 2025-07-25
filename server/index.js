require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const connection = require("./db");

connection();

app.use(express.json());

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://remarks-app.vercel.app"
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // res.setHeader(
  //   "Access-Control-Allow-Origin",
  //   "https://remarks-app.vercel.app"
  // );
  
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

const port = process.env.PORT;

// Routes
app.use('/auth', authRoutes);
app.use('/post', postRoutes);

app.listen(port, () => console.log("Server running on port " + port));