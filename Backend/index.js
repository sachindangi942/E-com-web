const express = require("express");
const cors = require("cors");
const App = express();
require("dotenv").config();
const registration = require("./routes/routers")
const productsRouters = require("./routes/Product_router");
const {db_connection} = require("./databases/mongoose")
const paymentRouter = require("./routes/Payment_router")

const port = process.env.PORT || 7001 || 7002 || 7003
App.use(express.json());
// App.use(cors());
App.use(cors({
    origin:"https://e-com-web-opal.vercel.app",
    methods: ['GET', 'POST'],
}))


App.use("/user",registration);
App.use("/products",productsRouters)
App.use("/api",paymentRouter)
db_connection();
App.listen(port,()=>{console.log(`server is running on port ${port}`)})


