const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const path = require('path')
const cors = require('cors')
const multer = require('multer')
const { log } = require('console')
const { stringify } = require('querystring')
const app = express()
const PORT = 8000

let cartsData

app.use(express.json())
app.use(cors())

//db connection
mongoose.connect('mongodb+srv://anshichaurasia04:Nitya24@cluster0.bsajnnj.mongodb.net/Ecommerce')

app.get('/', (req, res) => {
    res.send(`server is runnong on port ${PORT}`);
})

//image storage 
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

//creating upload endpoint for images

app.use("/images", express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:8000/images/${req.file.filename}`
    })
})

//db model
const Product = mongoose.model("product", {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true
    }
})

//adding product to database
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;

    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    console.log(product)
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name
    })
})

//middleware to find the user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "please authenticate using valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom')
            req.user = data.user
            next()
        } catch (error) {
            res.status(401).send({ error: "please authenticate using valid token" })
        }
    }
}

//add to cart
app.post('/addtocart', fetchUser, async (req, res) => {
    const { item } = req.body;
    console.log(item)
    try {
        let user = await Users.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user.cartdata.push(item);
        await user.save();
        res.status(200).send({ success: true, message: 'Product added to cart', cart: user.cartdata });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

//remove to cart 
app.post('/removefromcart', fetchUser, async (req, res) => {
    const { item } = req.body;
    try {
        let user = await Users.findOneAndUpdate(
            { _id: req.user.id },
            { $pull: { cartdata: item } },
            { new: true }
        );

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).send({ success: true, message: 'Item removed from cart', cart: user.cartdata });
    } catch (error) {
        console.error("Error while removing item:", error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

//get  add to cart
app.post('/getcart', fetchUser, async (req, res) => {
    console.log('get cart')
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartdata)
})





// app.post('/addtocart', fetchUser, async (req,res)=>{
//     let userData = await Users.findOne({_id:req.user.id});
//     userData.cartdata[req.body.item] += 1
//     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartdata})
//     res.send("added")
// })



//get all product
app.get('/getallproduct', async (req, res) => {
    let products = await Product.find({});
    console.log("all product fetched");
    res.send(products)
})

//schema for user model
const Users = mongoose.model('Users', {
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    cartdata: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
})

//Signup 
app.post("/signup", async (req, res) => {
    let check = await Users.findOne({ email: req.body.email })
    if (check) {
        return res.status(400).json({ success: 'fail', error: 'user already exist with same email id' })
    }
    let cart = []

    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartdata: cart
    })
    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
})

//login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email })
    if (user) {
        const passCompare = req.body.password === user.password
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, error: "wrong password" })
        }
    }
    else {
        res.json({ success: false, error: 'wrong email ' })
    }
})

//order
const Order = mongoose.model('Order', {
    userId: { type: String, required: true },
    email: { type: String, required: true, default: 'order placed' },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    phoneNo: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    zipcode: { type: Number, required: true, default: false },
    date: { type: Date, default: Date.now },
})

//add product to order
app.post('/addtoorder', fetchUser, async (req, res) => {
    const allDetails = req.body.allDetails;
    const orderDetails = req.body.orderDetails;
    const buyNow = req.body.buyNow;
    try {
        let user = await Users.findOne({ _id: req.user.id });
        // console.log(user.email, user)
        if (user.email !== orderDetails.email) {
            return res.status(404).send({ message: 'given email-id is not matched with the login email-id' });
        }
        const order = new Order({
            userId: user.name,
            email: user.email,
            items: allDetails,
            amount: buyNow,
            phoneNo: orderDetails.phoneNo,
            address: orderDetails.address,
            state: orderDetails.state,
            city: orderDetails.city,
            zipcode: orderDetails.zipcode,
            street: orderDetails.street
        });
        await order.save();
        res.status(200).send({ success: true, message: 'order successfully'});
        
        await Users.updateOne(
            { _id: user._id },         // Find the user by their ID
            { $set: { cartdata: [] } }  // Set cartdata to an empty array
          );
      

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

//get order product
app.get('/getorderproduct', async (req, res) => {
    let products = await Order.find({});
    console.log("all product fetched");
    res.send(products)
})

//remove product from order
app.post('/removeorderproduct', async (req, res) => {
    
    await Order.findOneAndDelete({ id: req.body._id });
    console.log("order removed");
    res.json({
        success: true,
        name: req.body.name
    })
})


//remove product
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("product removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

app.listen(PORT)
