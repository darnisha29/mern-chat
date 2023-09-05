const express = require("express");
// const dotenv = require("dotenv");
const dotenv =require('dotenv');
const { chats } = require("./data/data");
const userRoutes = require("./routes/userRoutes");
const connectDB = require('./config/db.js');
const {notFound,errorHandler} = require('./middlware/errorMiddleware')

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // To accept json dat
app.get("/", (req,res) => {
    res.send("API is running Successfully");
});

app.use('/api/user',userRoutes)

// app.get("/api/chat", (req,res) => {
//     res.send(chats)
// });
// app.get("/api/chat/:id",(req,res) => {
//     const singlechat = chats.find((c) => c._id === req.params.id)
//     res.send(singlechat);
// });

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(5000,console.log(`server started on port ${PORT}`));

// "test": "echo \"Error: no test specified\" && exit 1"
// "proxy": "http://127.0.0.1:5000",