const express = require("express");

const app = express();

const PORT = 3000;

// Home route
app.get("/", (req, res) => {
    res.send("Express server is running...");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});