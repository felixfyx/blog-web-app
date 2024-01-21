import express from "express"

const app = express();
const port = 3000; // For testing purposes

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Listening in to port ${port}`);
});;