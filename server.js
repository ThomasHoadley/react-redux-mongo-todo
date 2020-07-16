const express = require("express");

const app = express();

app.get("/api/lists", (req, res) => {
	// hook up mongodb
	const lists = [
		{
			id: 1,
			listName: "Shopping List",
			listItems: [
				{
					id: 1,
					text: "Eggs",
					completed: true,
				},
				{
					id: 2,
					text: "Cheese",
					completed: false,
				},
			],
		},
		{
			id: 2,
			listName: "Gym workout",
			listItems: [
				{
					id: 1,
					text: "Running machine",
					completed: false,
				},
				{
					id: 2,
					text: "Bench Press",
					completed: false,
				},
			],
		},
	];
	res.json(lists);
});

const port = 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
