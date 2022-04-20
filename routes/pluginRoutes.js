const express = require("express");
const pluginController = require("../controllers/pluginController");

const router = express.Router();

router
  .route("/")
  .post(
    pluginController.upload.fields([
      { name: "image", maxCount: 1 },
      { name: "plugin", maxCount: 1 },
    ]),
    pluginController.uploadFiles,
    pluginController.createPlugin
  )
  .get(pluginController.getAllPlugins);

router.route("/:id").get(pluginController.getPlugin);

module.exports = router;
