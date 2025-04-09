import response from "./response";

const err = (err, req, res, next) => {
  response(res, "Middleware error:" + err.message, 501);
};
