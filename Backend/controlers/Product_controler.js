
const { getToken_data } = require("../Middleware/authMiddleware")
const Card_schema = require("../Models/AddToCard_schema");
const AddProduct = require("../Models/AddProduct_schema");

exports.AddProduct_controler = async (req, res) => {
    try {
        let data = req.body
        const { _id: Add_By } = getToken_data({ headers: req.headers });
        data["Add_By"] = Add_By
        const Data = new AddProduct(data)
        const result = await Data.save();
        res.send(result)
    } catch (err) {
        res.status(401).send(err)
    }
};

exports.GetProduct_controler = async (req, res) => {
    try {
        const Db_data = await AddProduct.find();
        if (!Db_data) return res.status(401).send("products not found");
        res.send(Db_data);
    } catch (err) {
        res.status(401).send(err)
    }
};

exports.AddToCard_controler = async (req, res) => {
    try {
        let data = req.body
        const { _id: Add_By } = getToken_data({ headers: req.headers });
        data["Add_By"] = Add_By
        const Data = new Card_schema(data)
        const result = await Data.save();
        res.send(result)
    } catch (err) {
        res.status(401).send(err)
    }
};

exports.GetCart_controler = async (req, res) => {
    try {
        const { _id: Add_By } = getToken_data({ headers: req.headers });
        const getData = await Card_schema.find({Add_By});
        if(!getData) return res.status(401).send("NO products in cart");
        res.send(getData)
    } catch (err) {
        res.status(401).send(err)
    }
};

exports.RemoveCart_controler = async (req, res) => {
    try {
        const _id = req.body
        const { _id: Add_By } = getToken_data({ headers: req.headers });
        const deleteData = await Card_schema.deleteOne({ Add_By }, { _id })
        if (deleteData?.acknowledged == true && deleteData?.deletedCount > 0) return res.send("remove Product successfully")
        res.status(401).send("false")
    } catch (err) {
        res.status(401).send(err)
    }
};

exports.UpdateProductQuantity = async (req, res) => {
    const { _id, quantity } = req.body
    try {
        const product = await Card_schema.findById(_id,);
        if (!product) return res.status(401).send("Product not found");
        product.quantity += quantity
        const updatedQuantity = await product.save();
        res.send(updatedQuantity);
    } catch (error) {
        res.status(401).send(error);
    }
}