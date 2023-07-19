const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const bodyParser = require('body-parser');
const User = require('./models/usersModel');
const authRoutes = require("./routes/authRoutes");



app.use(bodyParser.json());


app.use('/api/user', authRoutes);

User.sync({force: false})
    .catch(err => console.log(err))

app.listen(port, ()=> {
    console.log('Server is running at port ', port);
})