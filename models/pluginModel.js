const mongoose = require("mongoose");

const pluginSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plugin must have a name."],
      unique: true,
    },
    author: {
      type: String,
      required: [true, "Plugin must have an author."],
    },
    description: {
      type: String,
      required: [true, "Plugin must have a description."],
    },
    details: {
      type: String,
      required: [true, "Plugin must contain details."],
    },
    version: {
      type: String,
      required: [true, "Plugin must contain a version number."],
    },
    installation: {
      type: Number,
    },
    reviews: {
      type: String,
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    plugin: {
      type: String,
      required: [true, "Plugin must have a url."],
    },
    image: {
      type: String,
      required: [true, "Plugin must have an image."],
    },
  },
  {
    toObject: { virtuals: true },
  }
);

const Plugin = mongoose.model("Plugin", pluginSchema);

module.exports = Plugin;
