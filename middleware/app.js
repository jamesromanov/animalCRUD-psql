import express from "express";
import animalRouters from "../routes/animal.route.js";

const app = express();
app.use(express.json());
app.use("/api/v1/animals", animalRouters);
export default app;
