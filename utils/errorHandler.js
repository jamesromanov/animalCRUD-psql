import response from "./response.js";

const errorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) =>
      response(
        res,
        "Error handler:" + err.message,
        err.message === "Not found!" ? 404 : 500
      )
    );
  };
};

export default errorHandler;
