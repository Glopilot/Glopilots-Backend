const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleware/errorMiddleware');
const db = require('./Database/db');

const app = express();

//  middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
    credentials: true,
}));

// Routes 
app.use('/api/users', userRoute)

app.get('/', (req, res) => {
    console.log('Home Pages');
})


// Error middleware
app.use(errorHandler);


const PORT = 5000 || process.env.PORT



app.listen(PORT, () => {
    console.log('App is Ruuning ');
    db.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Db connected");
        }
    })
});