const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

  

// had it in Server.js
// const app = require('./app')

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

// chat

// const mongoose = require("mongoose");

// const app = require('./app');

// const DB_HOST = "mongodb+srv://Mikky:mikkypassword@cluster0.lwo3hql.mongodb.net/db-contacts?retryWrites=true&w=majority"

// mongoose.set('strictQuery', true);

// mongoose.connect(DB_HOST).then(() => {
//     console.log('Database connection successful');
//   })
//   .catch((error) => {
//     console.error('Error connecting to database:', error.message);
//     process.exit(1);
//   });


// old

// mongoose.connect(DB_HOST).then(() => console.log("Database connection successful"))
//   .catch(error => console.log("Database connection failed"));