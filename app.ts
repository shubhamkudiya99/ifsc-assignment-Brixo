import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.ts";
import db from "./config/db.js";
import config from "./config/index.ts";

const app = express();
const port = config.port;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
