// 3rd party modules
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

// Custom modules
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

//=====================================
// Create my express app instance
const app = express();

//======================================
// Connect to database

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://elbotanist:ZKdkNZtC3Xwq7Y75@cluster0.lmdeo.mongodb.net/training1?retryWrites=true&w=majority"
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})// this returns a promise
    .then(() => app.listen(PORT) && console.log(`Server is running on port ${PORT}`))
    .catch(err => err.message);
//=======================================

if(!config.get('jwtPrivateKey')) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined");
    process.exit(1);
}

//=======================================
// My middlewares

// (1)
app.use(express.json());



//========================================
// My routes

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);