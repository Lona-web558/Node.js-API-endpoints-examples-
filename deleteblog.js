const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_database_uri' with your MongoDB connection string)
mongoose.connect('your_database_uri', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Blog model definition
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    // Add other fields as needed
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

// DELETE endpoint to delete a blog post by ID
app.delete('/api/blogs/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findByIdAndDelete(id);
        
        // Check if the blog was found and deleted
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});