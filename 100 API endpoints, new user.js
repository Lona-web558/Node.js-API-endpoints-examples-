//100 practice API endpoints 


//create new user

app.post('/api/v1 /users', async (req, res) => {
	const user = new User(req.body);
	await user.save();;
	res.status(202).json(user)
});




