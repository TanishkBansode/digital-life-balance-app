document.addEventListener('DOMContentLoaded', function () {
	let screenTime = 0;
	let exerciseTime = 0;
	let screenGoal = 0;
	let exerciseGoal = 0;

	const loadData = () => {
		const data = JSON.parse(localStorage.getItem('activityData')) || [];
		return data;
	};

	const saveData = (date, screenTime, exerciseTime) => {
		const data = loadData();
		data.push({ date, screenTime, exerciseTime });
		localStorage.setItem('activityData', JSON.stringify(data));
	};

	const displayData = () => {
		const data = loadData();
		const resultsContainer = document.getElementById('previousData');
		resultsContainer.innerHTML = ''; // Clear previous content

		data.forEach((entry) => {
			const entryDiv = document.createElement('div');
			entryDiv.innerHTML = `
				<strong>Date:</strong> ${entry.date} <br>
				<strong>Screen Time:</strong> ${entry.screenTime} hours <br>
				<strong>Exercise Time:</strong> ${entry.exerciseTime} hours <hr>
			`;
			resultsContainer.appendChild(entryDiv);
		});
	};

	const showScreen = (screenId) => {
		document.querySelectorAll('.screen').forEach((screen) => {
			screen.style.display = 'none';
		});
		document.getElementById(screenId).style.display = 'block';
	};

	showScreen('welcomeScreen');

	document.getElementById('startButton').addEventListener('click', function () {
		showScreen('selfMonitoringScreen');
	});

	document.getElementById('submitActivities').addEventListener('click', function () {
		screenTime = Number(document.getElementById('screenTime').value);
		exerciseTime = Number(document.getElementById('exerciseTime').value);
		const today = new Date().toLocaleDateString();

		saveData(today, screenTime, exerciseTime);
		displayData(); 
		showScreen('goalSettingScreen');
	});

	document.getElementById('saveGoal').addEventListener('click', function () {
		screenGoal = Number(document.getElementById('screenGoal').value);
		exerciseGoal = Number(document.getElementById('exerciseGoal').value);
		showScreen('resultsScreen');
		checkProgress();
	});

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

	document.getElementById('restart').addEventListener('click', function () {
		showScreen('welcomeScreen');
	});

	displayData();
});
