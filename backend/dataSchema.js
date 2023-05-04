const mongoose = require("mongoose");
const ReactFormDataSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    CATEGORY: { type: String },   
    PRODUCT_NAME: { type: String },
    PRODUCT_RELEASE_DATE: { type: Number },
    PRICE: { type: String },
    RATING: { type: Number },
    PRODUCT_DESC: { type: String },
    IMG_LINK: { type: String }

  },
  { collection: "Products" }
);
const Product = mongoose.model("Product", ReactFormDataSchema);
module.exports = Product;
