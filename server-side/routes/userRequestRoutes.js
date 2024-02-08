const express = require("express");
const RequestController = require("../controllers/RequestController");
const router = express.Router();

router.get("/api/user-requests", RequestController.userRequests);

module.exports = router;
