const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const Plugin = require("../models/pluginModel");
const catchAsync = require("../utils/catchAsync");

const storage = multer.diskStorage({});
exports.upload = multer({ storage: storage });

exports.uploadFiles = catchAsync(async (req, res, next) => {
  const uploadedImage = await cloudinary.uploader.upload(
    req.files["image"][0].path,
    {
      folder: `metaplugin/Images/image-${req.body.name}`,
      public_id: `${req.body.name}`,
      resource_type: "auto",
      overwrite: true,
      transformation: [{ width: 500, height: 500, crop: "limit", quality: 50 }],
    }
  );

  const uploadedPlugin = await cloudinary.uploader.upload(
    req.files["plugin"][0].path,
    {
      folder: `metaplugin/Plugins/plugin-${req.body.name}`,
      public_id: `${req.body.name}`,
      resource_type: "auto",
      overwrite: true,
    }
  );

  req.image = uploadedImage;
  req.plugin = uploadedPlugin;
  next();
});

exports.createPlugin = catchAsync(async (req, res) => {
  const newPlugin = await Plugin.create({
    name: req.body.name,
    author: req.body.author,
    description: req.body.description,
    details: req.body.details,
    version: req.body.version,
    plugin: req.plugin.secure_url,
    image: req.image.secure_url,
  });

  res.status(201).json({
    status: "success",
    data: {
      newPlugin,
    },
  });
});

exports.getAllPlugins = catchAsync(async (req, res) => {
  const plugins = await Plugin.find().select("-__v -createdAt -updatedAt");

  res.status(200).json({
    status: "success",
    length: plugins.length,
    data: {
      plugins,
    },
  });
});

exports.getPlugin = catchAsync(async (req, res) => {
  const plugin = await Plugin.findById(req.params.id).select(
    "-__v -createdAt -updatedAt"
  );

  res.status(200).json({
    status: "success",
    data: {
      plugin,
    },
  });
});
