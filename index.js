const express = require("express");
// const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
app.use(cookieParser());
const postRoutes = require("./routes/routes");
require("./connection/connection")();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb", extended: true }));
app.use("/user", postRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
