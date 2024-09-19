document.addEventListener('DOMContentLoaded', function () {
	let screenTime = 0;
	let exerciseTime = 0;
	let screenGoal = 0;
	let exerciseGoal = 0;

	// Screen switching logic
	const showScreen = (screenId) => {
		document.querySelectorAll('.screen').forEach((screen) => {
			screen.style.display = 'none';
		});
		document.getElementById(screenId).style.display = 'block';
	};

	// Show the welcome screen at the start
	showScreen('welcomeScreen');

	// Handle "Start" button click
	document.getElementById('startButton').addEventListener('click', function () {
		showScreen('selfMonitoringScreen');
	});

	// Handle activity submission
	document
		.getElementById('submitActivities')
		.addEventListener('click', function () {
			screenTime = Number(document.getElementById('screenTime').value);
			exerciseTime = Number(document.getElementById('exerciseTime').value);
			showScreen('goalSettingScreen');
		});

	// Handle goal saving
	document.getElementById('saveGoal').addEventListener('click', function () {
		screenGoal = Number(document.getElementById('screenGoal').value);
		exerciseGoal = Number(document.getElementById('exerciseGoal').value);
		showScreen('resultsScreen');
		checkProgress();
	});

	// Check progress and display feedback
	const checkProgress = () => {
		let feedback = '';

		if (screenTime <= screenGoal) {
			feedback += "Great job! You're within your screen time goal.<br>";
		} else {
			feedback += 'Try to reduce your screen time.<br>';
		}

		if (exerciseTime >= exerciseGoal) {
			feedback += "You're meeting your exercise goals!";
		} else {
			feedback += 'Try to be more active.';
		}

		document.getElementById('feedback').innerHTML = feedback;
	};

	// Restart the app
	document.getElementById('restart').addEventListener('click', function () {
		showScreen('welcomeScreen');
	});
});
