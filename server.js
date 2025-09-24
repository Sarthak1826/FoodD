// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors);

// 1. Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://sarthak27ghule_db_user:Sarthak1027@foodd.kmrxalq.mongodb.net/?retryWrites=true&w=majority&appName=FoodD", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

// 2. Schema & Model
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});
const User = mongoose.model("User", userSchema);
module.exports = User;




// 3. Signup Route
app.post("/Sign-up", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if email exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Account already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Account created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error creating account", error });
    }
});


// Start server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
