const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String }, // Optional image
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }

}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
