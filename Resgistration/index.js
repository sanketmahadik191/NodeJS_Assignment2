const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const mongoose = require("mongoose");

app.use(express.json());

// Routes
app.use(authRoutes);

mongoose
// .connect("mongodb+srv://sanketm457:A24BoRgX2tyAHyOz@jobapp.ezdevqu.mongodb.net/")
.connect("mongodb://localhost:27017/Neww")
.then(()=>console.log("Connection done"))
.catch((err)=>console.log("Error in connection"+err))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});