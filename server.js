const express = require("express");

const app = express();

const tasks = [
	{
		id: "111",
		text: "Chest Press",
		complete: true,
	},
	{
		id: "222",
		text: "Leg Press",
		complete: true,
	},
	{
		id: "333",
		text: "Running Machine",
		complete: false,
	},
	{
		id: "444",
		text: "Shoulder Press",
		complete: false,
	},
	{
		id: "555",
		text: "Squats",
		complete: false,
	},
	{
		id: "666",
		text: "Dead Lift",
		complete: false,
	},
];

app.get("/api/lists", (req, res) => {
	const data = {
		items: [
			{
				id: "yuGASdgyasdasdvsaudyg",
				title: "Exercise Routine 2",
				tasks: [tasks[0].id, tasks[1].id, tasks[2].id],
			},
			{
				id: "UYsd6ftasfd6sfydtgh",
				title: "Exercise Routine 1",
				tasks: [tasks[3].id, tasks[4].id, tasks[5].id],
			},
		],
		count: 10,
	};

	res.json(data);
});

app.get("/api/tasks", (req, res) => {
	res.json({
		items: tasks,
		count: 200,
	});
});

const port = 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
