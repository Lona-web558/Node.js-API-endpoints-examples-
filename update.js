To create an API that updates user information, you can expand on the previous example where we created an API to fetch user details by ID. In this example, we'll implement an API endpoint to update user information using the HTTP PUT method. 

Here's how you can set up such an API using Node.js and Express:

### Step-by-Step Implementation

1. **Install Dependencies** (if you haven't already)
   You should already have Express and body-parser installed from the previous example. If not, you can install them as follows:

   ```bash
   npm install express body-parser
   ```

2. **Modify the API to Include Update Functionality**

   Extend the existing `app.js` file to include a route for updating user information.

   ```javascript
   const express = require('express');
   const bodyParser = require('body-parser');

   const app = express();
   const port = 3000;

   // Sample user data
   let users = [
       { id: 1, name: 'John Doe', email: 'john@example.com' },
       { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
   ];

   // Middleware
   app.use(bodyParser.json());

   // Route to fetch user details by ID
   app.get('/users/:id', (req, res) => {
       const userId = parseInt(req.params.id, 10);
       const user = users.find(u => u.id === userId);

       if (user) {
           res.status(200).json(user);
       } else {
           res.status(404).json({ message: 'User not found' });
       }
   });

   // Route to update user information
   app.put('/users/:id', (req, res) => {
       const userId = parseInt(req.params.id, 10);
       const { name, email } = req.body;
       
       const userIndex = users.findIndex(u => u.id === userId);

       if (userIndex !== -1) {
           // Update user information
           users[userIndex] = { id: userId, name, email };
           res.status(200).json(users[userIndex]);
       } else {
           res.status(404).json({ message: 'User not found' });
       }
   });

   // Start the server
   app.listen(port, () => {
       console.log(`API running at http://localhost:${port}`);
   });
   ```

### Explanation of the Update Route

1. **Route Definition**: The route for updating a user's details is defined using `app.put('/users/:id', ...)`. This means you will send a PUT request to `/users/{userId}`.

2. **Extracting Data**: The user ID is extracted from the request parameters, and the updated data (name and email) is extracted from the request body.

3. **Finding the User**: We search for the user in the `users` array using `findIndex`, which returns the index of the user if found.

4. **Updating the User**: If the user is found, we update the user information and return the updated user object. If not found, a 404 response is returned with an appropriate message.

### Testing the Update API

You can test the API using a tool like Postman or `curl`. Here’s how to update a user's information using `curl`:

#### Update User

Put the following command in your terminal to update the user with ID 1:

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"name": "John Doe Updated", "email": "john.updated@example.com"}' http://localhost:3000/users/1
```

#### Response

If the request is successful, you should receive a response with the updated user details:

```json
{
    "id": 1,
    "name": "John Doe Updated",
    "email": "john.updated@example.com"
}
```

#### User Not Found

Try updating a user that does not exist (e.g., ID 3):

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Non Existent User", "email": "none@example.com"}' http://localhost:3000/users/3
```

You should get a response like this:

```json
{
    "message": "User not found"
}
```

### Conclusion

This completes the implementation of an API endpoint to update user information in Node.js and Express. In a production environment, you would typically connect this API to a database to persist user data rather than using an in-memory array, and you would also consider adding validation and error handling.