const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Mock user data
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
];

// DELETE endpoint to remove a user
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    users = users.filter(user => user.id !== userId);
    res.status(204).send(); // No Content
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});