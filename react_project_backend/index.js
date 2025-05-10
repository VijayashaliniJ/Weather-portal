// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const User = require('./models/userSchema'); // Ensure this path is correct

// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect("mongodb+srv://subashinip130:Subha%402004@weather-detection.treki.mongodb.net/auth-db", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });

// mongoose.connection.on('connected', () => {
//   console.log('Connected to MongoDB');
// });

// // Sign Up Route
// app.post('/signup', async (req, res) => {
//   const { username, name, email, password } = req.body;

//   if (!username || !name || !email || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, name, email, password: hashedPassword });
//     await newUser.save();
//     res.status(201).json({ message: 'Sign Up Successful' });
//   } catch (error) {
//     console.error('Sign Up Error:', error.message);
//     res.status(500).json({ message: 'Sign Up Unsuccessful', error: error.message });
//   }
// });

// // Sign In Route
// app.post('/signin', async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required', loggedIn:false });
//   }

//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ message: 'User not found', loggedIn:false });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials', loggedIn:false });
//     }

//     res.status(200).json({ message: 'Sign In Successful', loggedIn:true });
//   } catch (error) {
//     console.error('Sign In Error:', error.message);
//     res.status(500).json({ message: 'Sign In Unsuccessful', error: error.message, loggedIn:false });
//   }
// });






// // Search City Route
// app.post('/search', async (req, res) => {
//   const { userId, city } = req.body;

//   if (!userId || !city) {
//     return res.status(400).json({ message: 'User ID and city are required' });
//   }

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Add the search record to the user's history
//     user.searchHistory.push({ city });

//     // Save the updated user document
//     await user.save();

//     res.status(200).json({ message: 'Search history updated', searchHistory: user.searchHistory });
//   } catch (error) {
//     console.error('Error updating search history:', error.message);
//     res.status(500).json({ message: 'Error updating search history', error: error.message });
//   }
// });




// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });





const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/userSchema'); // Ensure this path is correct

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// mongoose.connect("mongodb+srv://subashinip130:Subha%402004@weather-detection.treki.mongodb.net/", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect("mongodb+srv://shalinisankar069:Vijayashalini%402005@weatherportal.973ww.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   });

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Sign Up Route
app.post('/signup', async (req, res) => {
  const { username, name, email, password } = req.body;

  if (!username || !name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Sign Up Successful' });
  } catch (error) {
    console.error('Sign Up Error:', error.message);
    res.status(500).json({ message: 'Sign Up Unsuccessful', error: error.message });
  }
});

// Sign In Route
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required', loggedIn: false });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found', loggedIn: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials', loggedIn: false });
    }

    res.status(200).json({ message: 'Sign In Successful', loggedIn: true });
  } catch (error) {
    console.error('Sign In Error:', error.message);
    res.status(500).json({ message: 'Sign In Unsuccessful', error: error.message, loggedIn: false });
  }
});

// Search City Route
app.post('/search', async (req, res) => {
  const { username, city } = req.body;
  console.log(req.body)
  if (!username || !city) {
    return res.status(400).json({ message: 'User ID and city are required' });
  }

  try {
    const user = await User.findOne({username:username});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the search record to the user's history
    user.searchHistory.push({ city });

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Search history updated', searchHistory: user.searchHistory });
  } catch (error) {
    console.error('Error updating search history:', error.message);
    res.status(500).json({ message: 'Error updating search history', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});







