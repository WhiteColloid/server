const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false })); // application/x-www-form-urlencoded
app.use(express.json()); // application/json

app.use("/api/register", require("./routes/register"));

app.use((err, req, res, next) => {
    res.send(err);
});

app.listen(8888, () => console.log("Server running on http://localhost:8888"));
