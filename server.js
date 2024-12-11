const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Password for accessing the site
const PASSWORD = "securepassword";

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// HTML and CSS for the password page
const passwordPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Protected</title>
    <style>
        body {
            background-color: #121212;
            color: #e0e0e0;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
        }

        h1 {
            color: #1e90ff;
            margin-bottom: 20px;
        }

        form {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        input[type="password"] {
            padding: 10px;
            margin-bottom: 15px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            width: 300px;
        }

        button {
            background-color: #1e90ff;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #00bfff;
        }

        .error {
            color: #ff4d4d;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <h1>Enter Password</h1>
    <form method="POST" action="/login">
        <input type="password" name="password" placeholder="Enter Password" required>
        <button type="submit">Submit</button>
    </form>
    <div class="error">{{error}}</div>
</body>
</html>
`;

let isAuthenticated = false;

// Route to display the password page
app.get('/', (req, res) => {
    if (isAuthenticated) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        res.send(passwordPage.replace('{{error}}', ''));
    }
});

// Route to handle password submission
app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === PASSWORD) {
        isAuthenticated = true;
        res.redirect('/');
    } else {
        const errorPage = passwordPage.replace('{{error}}', 'Incorrect password. Please try again.');
        res.send(errorPage);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
