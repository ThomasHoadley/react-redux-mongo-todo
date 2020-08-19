const express = require("express");

const app = express();

app.get("/api/lists", (req, res) => {
	const lists = {
		"UYsd6ftasfd6sfydtgh": {
			title: "Exercise Routine 1",
			tasks: [1, 2, 3]
		},
		"yuGASdgyasdasdvsaudyg": {
			title: "Exercise Routine 2",
			tasks: [4, 5, 6]
		}
	}
	res.json(lists);
});

app.get("/api/tasks", (req, res) => {
	const tasks = {
		1: {
			text: "Chest Press",
			complete: true
		},
		2: {
			text: "Leg Press",
			complete: true
		},
		3: {
			text: "Running Machine",
			complete: false
		},
		4: {
			text: "Shoulder Press",
			complete: false
		},
		5: {
			text: "Squats",
			complete: false
		},
		6: {
			text: "Dead Lift",
			complete: false
		}
	}

	res.json(tasks);
});

const port = 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
