const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./config/db");
const todoRoute = require("./routes/todoRoute");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const app = express();

connectDb();
app.use(cors());
app.use(cookieParser());
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Sever Up and Running!"));

app.use("/api/todo", todoRoute);
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server Up and Running in ${PORT}`));
