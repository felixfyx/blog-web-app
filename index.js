import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 3000; // For testing purposes

// A generic class for post
class Post {
    date;
    title = "";
    post = "";

    constructor(date, title, post) {
        this.date = date;
        this.title = title;
        this.post = post;
    }

    // getters
    get dateVal() {
        return this.date;
    }
    get titleVal() {
        return this.title;
    }
    get postVal() {
        return this.post;
    }
}

// The key will be title and the post will be the value
var postMap = new Map();

// Middleware for reading body
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// The starting page
app.get("/", (req, res) => {
    res.render("index.ejs", {
        posts: postMap
    });
});

app.get("/newpost", (req, res) => {
    res.render("newpost.ejs");
});

app.post("/submit", (req, res) => {
    // Create new post and put in map
    var post = new Post(new Date().toString(), req.body["title"], req.body["post"]);
    postMap.set(req.body["title"], post);

    // Go back to index
    res.render("index.ejs", {
        posts: postMap
    });
});

app.post("/post", (req, res) => {
    // Retrieve title from req
    var blogpost = postMap.get(req.body["title"]);

    res.render("post.ejs", {
        // Add params for post
        title: blogpost.titleVal,
        post: blogpost.postVal,
        date: blogpost.dateVal
    });
});

app.listen(port, () => {
    console.log(`Listening in to port ${port}`);
});;