require('dotenv').config();
const express = require('express');

const authRouter = require('./routes/auth/auth')
const profileRouter = require('./routes/profile');
const blogRouter = require('./routes/blog');

const app = express();

app.use(express.json());

app.use(authRouter);
app.use(profileRouter);
app.use(blogRouter);

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`app is listening to ${port}`)
})