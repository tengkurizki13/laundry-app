const express = require("express");
const RequestController = require("../controllers/RequestController");
const router = express.Router();

router.get("/api/requests", RequestController.requests);
router.get("/api/requests/:id", RequestController.requestById);
router.post("/api/requests", RequestController.requestAdd);
router.delete("/api/requests/:id", RequestController.requestDelete);
router.put("/api/requests/:id", RequestController.requestUpdate);
router.patch("/api/requests/:id", RequestController.requestStatusUpdate);

module.exports = router;
