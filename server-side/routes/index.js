const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const requestRoutes = require("./requestRoutes");
const userRequestRoutes = require("./userRequestRoutes");
const authentication = require("../middleware/authentication");

router.get("/", (req, res) => {
  res.send("ok");
});

router.use(userRoutes);
router.use(authentication);
router.use(requestRoutes);
router.use(userRequestRoutes);

const errorHandler = (error, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";
  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors.map((e) => {
        return e.message;
      });
      break;
    case "ValidationErrorName":
      status = 400;
      message = error.error.errors.map((e) => {
        return e.message;
      });
      break;
    case "Bad Request":
      status = 400;
      message = "email / password is required";
      break;
    case "authentication":
      status = 401;
      message = "you are not authentication";
      break;
    case "authorized":
      status = 401;
      message = "you are not authorizetion";
      break;
    case "forbidden":
      status = 403;
      message = "forbidden";
      break;
    case "notFound":
      status = 404;
      message = "data is not found";
      break;
    default:
      status = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(status).json({ message });
};
router.use(errorHandler);

module.exports = router;
