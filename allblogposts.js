// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Sample data: In-memory array of blog posts
let blogPosts = [
    { id: 1, title: 'First Post', content: 'This is the first blog post.' },
    { id: 2, title: 'Second Post', content: 'This is the second blog post.' },
    { id: 3, title: 'Third Post', content: 'This is the third blog post.' }
];

// Middleware to parse JSON
app.use(express.json());

// Route to list all blog posts
app.get('/api/blogposts', (req, res) => {
    res.json(blogPosts);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});