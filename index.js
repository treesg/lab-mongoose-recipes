const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Recipe.create({
    //   title: 'Eggs',
    //   level: 'Easy Peasy',
    //   ingredients: ['3 Eggs', 'Some butter'],
    //   cuisine: 'Global',
    //   dishType: 'breakfast',
    //   duration: 5,
    //   creator: 'Sebastian Grana',
    // }).then(result => console.log(result));
    Recipe
      .insertMany(data)
      .then(res => Recipe.findOneAndUpdate({'name': 'Rigatoni alla Genovese'}, {$set:{'duration': 100}}, {new: true, useFindAndModify: false}, (err, doc) => {console.log(err, doc)}));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
