import response from "../utils/response.js";
import pool from "../config/db.js";
import errorHandler from "../utils/errorHandler.js";

export const getAllAnimals = errorHandler(async (req, res, next) => {
  let data = await pool.query("SELECT * FROM animals ORDER BY id;");
  response(res, data.rows);
});

export const getAnimalById = errorHandler(async (req, res, next) => {
  let id = req.params.id;
  let data = await pool.query("select * from animals where id = $1;", [id]);
  if (data.rows == "") throw new Error("Not found!");
  response(res, data.rows, 200);
});

export const addAnimals = errorHandler(async (req, res, next) => {
  let { name, color, breed } = req.body;
  if (!name) throw new Error("Please fill name field!");
  if (!color) throw new Error("Please fill color field!");
  if (!breed) throw new Error("Please fill breed field!");
  let data = await pool.query(
    "insert into animals(name, breed, color) values($1, $2, $3) RETURNING *;",
    [name, breed, color]
  );
  response(res, data.rows, 201);
});
export const updateAnimalById = errorHandler(async (req, res, next) => {
  let id = req.params.id;

  if (!id) throw new Error("Id is not provided!");
  let { name, breed, color } = req.body;
  if (!name && !breed && !color) throw new Error("Cannot be changed!");
  let field = [];
  let valueOfFields = [];
  let dollarSignId = 1;

  if (name) {
    field.push(`name=$${dollarSignId++}`);
    valueOfFields.push(name);
  }
  if (breed) {
    field.push(`breed=$${dollarSignId++}`);
    valueOfFields.push(breed);
  }
  if (color) {
    field.push(`color=$${dollarSignId++}`);
    valueOfFields.push(color);
  }
  valueOfFields.push(id);
  let query = `update animals set ${field.join(
    ", "
  )}  where id = $${dollarSignId} returning *;`;
  let data = await pool.query(query, valueOfFields);
  if (!data.rows.length) throw new Error("Not found!");
  response(res, data.rows, 203);
});

export const deleteAnimalById = errorHandler(async (req, res, next) => {
  let id = req.params.id;
  if (!id) throw new Error("Id is not provided!");
  let data = await pool.query("delete from animals where id = $1;", [id]);
  if (data.rowCount === 0) throw new Error("Not found!");
  response(res, "deleted!", 204);
});
