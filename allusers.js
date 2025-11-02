const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Sample user data (in-memory storage)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Sam Johnson', email: 'sam@example.com' }
];

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint to get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});