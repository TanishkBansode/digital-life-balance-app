const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'src' directory
/* app.use(express.static(path.join(__dirname, 'src'))); */
app.use(express.static('src'));

// Set the homepage route
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
	console.log(`App running at http://localhost:${port}`);
});
