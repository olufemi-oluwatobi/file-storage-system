require("dotenv").config();
import http from "http";
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
import routes from "../src/api/routes/index";
import cors from "cors";
const bucketDir = path.join(__dirname, "../buckets");
// set up the Express App
const app = express();

app.set("json spaces", 4);
app.use(express.static(bucketDir))
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "OPTIONS", "POST", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use((err, req, res, next) => {
    if (!err) return next();
    return res.status(404).json({
        success: false,
        message: err.toString()
    });
});
const PORT = process.env.PORT || 8080;

routes(app);

const server = http.createServer(app);

// serve up the public folder so we can request static
// assets from the client
app.use(express.static(`${bucketDir}/public`));
// start the express server

server.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
