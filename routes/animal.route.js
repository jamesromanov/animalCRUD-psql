import { Router } from "express";
import {
  getAllAnimals,
  addAnimals,
  getAnimalById,
  updateAnimalById,
  deleteAnimalById,
} from "../controllers/animal.controller.js";

const animalRouter = Router();

animalRouter.route("/").get(getAllAnimals).post(addAnimals);
animalRouter
  .route("/:id")
  .get(getAnimalById)
  .put(updateAnimalById)
  .delete(deleteAnimalById);

export default animalRouter;
