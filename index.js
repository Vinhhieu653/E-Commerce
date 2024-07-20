const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { type } = require('os');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

//Connection with MongoDB

mongoose.connect
    ("mongodb://localhost:27017/ecommerce");

//API Creation

app.get("/", (req, res) => {
    res.send('Express App is Running');
});


//img storage engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

//Create upload endpoint for img
app.use('/images', express.static('upload/images'));

app.use("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
});

//schema for creating products

const Product = mongoose.model("Product", {
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
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    },
});

//API for add
app.post('/add-product', async (req, res) => {

    let products = await Product.find({});

    let id;

    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })

});

//API for delete
app.post('/remove-product', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed")
    res.json({
        success: true,
        name: req.body.name,
    })
});

//API for getting all 
app.get('/show-product', async (req, res) => {
    let products = await Product.find({});
    console.log("Showing All Products");

    res.send(products);
});


//schema creating for user model
const Users = mongoose.model('Users', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

//creating endpoint for register user
app.post('/register', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, error: "Email already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        let cart = {};
        for (let index = 0; index < 300; index++) {
            cart[index] = 0;
        }
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart,
        });
        await user.save();

        const data = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(data, 'secret_commerce');
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

//creating endpoint for user login
app.post("/login", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (user) {
            const passCompare = await bcrypt.compare(req.body.password, user.password);
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id,
                    }
                };
                const token = jwt.sign(data, 'secret_commerce');
                res.json({ success: true, token });
            } else {
                res.status(401).json({ success: false, error: "Invalid Password!" });
            }
        } else {
            res.status(404).json({ success: false, error: "Wrong Username or Email" });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});


//creating endpoint for new collection data 
app.get('/new-collection', async (req, res) => {
    let products = await Product.find({});
    let new_collection = products.slice(1).slice(-8);
    console.log("New Collection: ");
    res.send(new_collection);
})



//creating endpoint for popular women
app.get('/popular-women', async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popular_women = products.slice(0, 4);
    console.log("Popular Women : ");
    res.send(popular_women);

})


//creating middleware to fetch user

const fetchUser = async (req, res, next) => {
    let token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using a valid token" })
    } else {
        try {
            const data = jwt.verify(token, 'secret_commerce');
            req.user = data.user;
            next();
        }
        catch (error) {
            res.status(401).send({ error: "Please authenticate using a valid token" })
        }
    }
}

//creating endpoint for add to cart
app.post('/add-to-cart', fetchUser, async (req, res) => {

    console.log("Added", req.body.itemId);

    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added");
})


//creating endpoint for remove from cart
app.post('/remove-from-cart', fetchUser, async (req, res) => {
    console.log("Removed", req.body.itemId)
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
})



//creating endpoint to get cart data
app.post('/get-cart', fetchUser, async (req, res) => {
    console.log("Get Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})

app.listen(port, (error) => {
    if (!error) {
        console.log(`>>>>>>>>>>Server is running on PORT ${port}`)
    }
    else {
        console.log(`Error occurred while starting the server ${error}`)

    }
});