const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./dataSchema.js")
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/images", express.static("images"));
mongoose.connect("mongodb://127.0.0.1:27017/FinalProject",
    {
        dbName: "reactdata",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
const port = process.env.PORT || 4000;
const host = "localhost";


app.get("/", async (req, resp) => {
    const query = {};
    const allProducts = await Product.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});

app.get("/:id", async (req, resp) => {
    const id = req.params.id;
    const query = { _id: id };
    const oneProduct = await Product.findOne(query);
    console.log(oneProduct);
    resp.send(oneProduct);
});

app.post("/insert", async (req, res) => {
    console.log(req.body);
    const p_id = req.body._id;
    const pcategory = req.body.CATEGORY;
    const pname = req.body.PRODUCT_NAME;
    const pdate = req.body.PRODUCT_RELEASE_DATE;
    const pprice = req.body.PRICE;
    const prating = req.body.RATING;
    const pdescription = req.body.rating.PRODUCT_DESC;
    const pimage = req.body.rating.IMG_LINK;
    const formData = new Product({
        _id: p_id,
        CATEGORY: pcategory,   
        PRODUCT_NAME: pname,
        PRODUCT_RELEASE_DATE: pdate,
        PRICE: pprice,
        RATING: prating,
        PRODUCT_DESC: pdescription,
        IMG_LINK: pimage
    })
    try {
        // await formData.save();
        await Product.create(formData);
        const messageResponse = { message: `Product ${p_id} added correctly` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while adding a new product:" + err);
    }
});


app.delete("/delete", async (req, res) => {
    console.log("Delete :", req.body);
    try {
        const query = { _id: req.body._id };
        await Product.deleteOne(query);
        const messageResponse = {
            message: `Product ${req.body._id} deleted correctly`,
        };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while deleting :" + p_id + " " + err);
    }
});

app.put("/update", async (req, res) => {
    try {
      const updatedProduct = req.body;
      const query = { _id: updatedProduct._id };
      await Product.findOneAndUpdate(query, updatedProduct, { new: true });
      const messageResponse = {
        message: `Product ${updatedProduct._id} updated correctly`,
      };
      res.send(JSON.stringify(messageResponse));
    } catch (err) {
      console.log("Error while updating product: " + err);
    }
  });

app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});