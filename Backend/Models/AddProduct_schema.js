const mongoose = require("mongoose");

const Addproduct_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
       
      },
      price: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true,
      },
      image:{
        type:String,
        required:true
  
      },
      Add_By:{type:String},
      // _id:{type:String}
      
});

const  AddProduct = mongoose.model("E_com_Products",Addproduct_schema);
module.exports =AddProduct;