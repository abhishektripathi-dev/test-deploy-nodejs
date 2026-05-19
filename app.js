const express = require("express");
const path = require("path");
const { sequelize, User } = require("./models");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
    try {
        const users = await User.findAll({ order: [["createdAt", "DESC"]] });
        res.render("index", { users, message: null });
    } catch (error) {
        res.status(500).send("Unable to load users.");
    }
});

app.post("/users", async (req, res) => {
    const { name, email, phone } = req.body;

    try {
        await User.create({ name, email, phone });
        const users = await User.findAll({ order: [["createdAt", "DESC"]] });
        res.render("index", { users, message: "User saved successfully." });
    } catch (error) {
        console.error(error);
        const users = await User.findAll({ order: [["createdAt", "DESC"]] });
        res.render("index", {
            users,
            message: "Error saving user. Please check your input.",
        });
    }
});

async function startServer() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1);
    }
}

startServer();
