//CONNECTING TO THE DATABASE
require("dotenv").config();
const mongoose = require("mongoose");

//connecting to mongodb from using the uri from .env
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

//step 2 creating a person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number, //
  favoriteFoods: [String],
});

// Creating a model from the schema
const Person = mongoose.model("Person", personSchema);

//Step 3 Creating and saving a record
const person = new Person({
  name: "James Kiprop",
  age: 30,
  favoriteFoods: ["Pilau", "Deep Fried Goat meat"],
});
//saving the new person to the database
person.save((err, data) => {
  if (err) return console.error(err);
  console.log("Person saved", data);
});

//Step 4: Creating many records with Model.create()
const morePeople = [
  { name: "Kiprop", age: "23", favoriteFoods: ["Salad", "fried Goat Meat"] },
  { name: "Stacey", age: "22", favoriteFoods: ["Pizza", "Chicken"] },
];

//creating and saving many people (model.create)
Person.create(morePeople, (err, people) => {
  if (err) return console.error(err);
  console.log("People saved", people);
});

//step 5 : Searching my database using model.find()
Person.find({ name: "John" }, (err, people) => {
  if (err) return console.error(err);
  console.log("People found:", people);
});

//Step 6: using model.findOne() to return a single searching document

Person.findOne({ favoriteFoods: "Pizza" }, (err, person) => {
  if (err) return console.error(err);
  console.log("Person found:", person);
});

//step 7: using findById() to search by id

Person.findById(personId, (err, person) => {
  if (err) return console.error(err);
  console.log("Person found:", person);
});

//step 8: Performing classic updates
Person.findById(personId, (err, person) => {
  if (err) return console.error(err);

  person.favoriteFoods.push("Hamburger"); // Add new food
  person.save((err, updatedPerson) => {
    if (err) return console.error(err);
    console.log("Person updated:", updatedPerson);
  });
});

//Step 9 Performing Updates with findOneAndUpdate()
Person.findOneAndUpdate(
  { name: "John" },
  { age: 20 },
  { new: true },
  (err, updatedPerson) => {
    if (err) return console.error(err);
    console.log("Person updated:", updatedPerson);
  }
);

//Step 10: Deleting One Document with findByIdAndRemove()
Person.findByIdAndRemove(personId, (err, removedPerson) => {
  if (err) return console.error(err);
  console.log("Person removed:", removedPerson);
});

//Step 11: Deleting Many Documents with model.remove()
Person.remove({ name: "Mary" }, (err, result) => {
  if (err) return console.error(err);
  console.log("People removed:", result);
});

//stpe 12 Implementing chain search query helpers

Person.find({ favoriteFoods: "Burritos" })
  .sort({ name: 1 }) // sorting by name
  .limit(2) // restricting the result to two
  .select("-age") // excluding age from the results
  .exec((err, people) => {
    if (err) return console.error(err);
    console.log("People found:", people);
  });
