import express from "express";
import animalRouters from "../routes/animal.route.js";
import animalTypesRouter from "../routes/animal.types.route.js";

const app = express();
app.use(express.json());
app.use("/api/v1/animals", animalRouters);
app.use("/api/v1/animal/types", animalTypesRouter);
export default app;
