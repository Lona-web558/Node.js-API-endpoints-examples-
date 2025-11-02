To create an API to get a specific blog post using Express.js, you can follow these steps:

1. **Set Up Your Node.js Project**: Make sure you have Node.js installed. Create a new project directory and initialize it with npm.

   ```bash
   mkdir my-blog-api
   cd my-blog-api
   npm init -y
   ```

2. **Install Express**: Install Express and any other required packages, such as body-parser for parsing JSON.

   ```bash
   npm install express body-parser
   ```

3. **Create a Basic Express Server**: Create a file named `server.js` in your project directory.

4. **Define Your Blog Posts**: For demonstration, you can create an array of blog posts.

5. **Create an API Endpoint**: Set up a GET endpoint to retrieve a specific blog post by its ID.

Here's an example implementation:

```javascript
// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Sample data: array of blog posts
const blogPosts = [
    { id: 1, title: "First Post", content: "This is the first blog post." },
    { id: 2, title: "Second Post", content: "This is the second blog post." },
    { id: 3, title: "Third Post", content: "This is the third blog post." },
];

// GET endpoint to retrieve a specific blog post by ID
app.get('/api/posts/:id', (req, res) => {
    const postId = Number(req.params.id);
    const post = blogPosts.find(p => p.id === postId);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Explanation:

1. **Array of Blog Posts**: We have a simple array called `blogPosts` representing our blog posts. Each post has an `id`, `title`, and `content`.

2. **GET Endpoint**: The `/api/posts/:id` endpoint uses a route parameter `:id` to match the requested post ID. The code retrieves the post from the array and returns it in JSON format. If no post is found, it sends a 404 response.

3. **Node Server**: The server listens on a specified port (default 3000) and logs a message once it's running.

### To Test the API:

1. **Run the Server**: Start your server by executing:

   ```bash
   node server.js
   ```

2. **Test the Endpoint**: You can test the GET request using tools like Postman or curl:

   ```bash
   curl http://localhost:3000/api/posts/1
   ```

This will return:

```json
{ "id": 1, "title": "First Post", "content": "This is the first blog post." }
```

To try retrieving a non-existent post:

```bash
curl http://localhost:3000/api/posts/10
```

This will return:

```json
{ "message": "Post not found" }
```

### Important Notes:

- In real-world applications, you'd typically not hard-code your data. Instead, you would retrieve data from a database like MongoDB, MySQL, etc.
- You may want to use an ORM/ODM (like Sequelize or Mongoose) for database connections.
- Add proper error handling and validation for production applications.