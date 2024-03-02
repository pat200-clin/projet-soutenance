import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { AdminRouter } from "./component/Routes/AdminRoutes.js";
import { PlayerRouter } from "./component/Routes/PlayerRoutes.js";
import { PersonnelRouter } from "./component/Routes/PersonnelRoutes.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE",],
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth", AdminRouter);
app.use("/personnel", PersonnelRouter);
app.use("/player", PlayerRouter);
app.use(express.static("Public"));
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(3000, () => {
  console.log("server is running");
});
