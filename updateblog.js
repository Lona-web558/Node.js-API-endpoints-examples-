const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_db_name' with your database name)
mongoose.connect('mongodb://localhost:27017/your_db_name', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model (example)
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    date: { type: Date, default: Date.now }
});

const BlogPost = mongoose.model('BlogPost', blogSchema);

// Routes
app.put('/api/posts/:id', async (req, res) => {
    const postId = req.params.id;
    const updates = req.body;

    try {
        const updatedPost = await BlogPost.findByIdAndUpdate(postId, updates, { new: true, runValidators: true });
        if (!updatedPost) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.send(updatedPost);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});