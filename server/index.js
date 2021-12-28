require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

const authRoutes = require('./routes/Auth.routes');
const usersRoutes = require('./routes/Users.routes');
const movieRoutes = require('./routes/Movie.routes');
const listRoutes = require('./routes/List.routes');

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@netfix.p4ri0.mongodb.net/netfix`,
            {
                useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
            }
        )
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

connectDB();

// middleware
app.use(express.json());
app.use(morgan("common"));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/lists", listRoutes);

const port = 5000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})