import { Router } from "express";
import { addAnimalTypes } from "../controllers/animal.types.controller.js";

const animalTypesRouter = Router();

animalTypesRouter.route("/").post(addAnimalTypes);

export default animalTypesRouter;
