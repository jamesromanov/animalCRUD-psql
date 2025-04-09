import response from "../utils/response.js";
import pool from "../config/db.js";
import errorHandler from "../utils/errorHandler.js";

export const addAnimalTypes = errorHandler(async (req, res, next) => {
  let { type } = req.body;
  if (!type) throw new Error("Pls enter the type!");
  let data = await pool.query(
    "insert into animal_types(type) values($1) returning *;",
    [type]
  );
  response(res, data.rows, 201);
});
