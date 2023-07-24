// // Require the MongoDB driver
// const MongoClient = require('mongodb').MongoClient;
// const jwt = require('jsonwebtoken');

// // Connection URL and database name
// const url = 'mongodb://localhost:27017';
// const dbName = 'your_database_name';
// const secretKey = 'your_secret_key'; // Replace this with your secret key

// // Function to generate a JWT token for the user
// function generateToken() {
//   const payload = {
//     user: 'john_doe', // Replace with your user identification
//   };
//   const options = {
//     expiresIn: '1h', // Token validity duration
//   };
//   return jwt.sign(payload, secretKey, options);
// }

// // Function to perform the aggregation
// async function runAggregationPipeline(token) {
//   try {
//     // Verify the JWT token
//     try {
//       const decoded = jwt.verify(token, secretKey);
//       console.log('Authenticated user:', decoded.user);
//     } catch (err) {
//       console.error('Authentication failed:', err.message);
//       return;
//     }

//     // Connect to the MongoDB server
//     const client = await MongoClient.connect(url);
//     console.log('Connected to the database...');

//     // Access the desired database
//     const db = client.db(dbName);

//     // Access the "sales" collection
//     const salesCollection = db.collection('sales');

//     // Aggregation pipeline (same as before)
//   
//     // Execute the aggregation pipeline
//     const result = await salesCollection.aggregate(pipeline).toArray();

//     console.log('Aggregation result:');
//     console.log(result);

//     // Close the connection
//     client.close();
//     console.log('Connection closed.');
//   } catch (err) {
//     console.error('Error:', err);
//   }
// }

// // Generate a token for the user (this would typically be done on login or authentication)
// const token = generateToken();

// // Call the function to run the aggregation pipeline with the token
// runAggregationPipeline(token);

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 4030
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/",  { useNewUrlParser: true,     useUnifiedTopology: true,
   })
   
     .then(() => {
        app.listen(port, () => {
          console.log("DB connected successfully");
       });
      })
     .catch((error) => {
         console.log(error);
       });
   userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type : String,
        required:true,
    },
    age: {
      type: Number,
      validate: {
        validator: function (value) {
          return value >= 10; 
        },
        message: 'Age must be a >= 10',
      },
    },
   });


   const student = mongoose.model("faltuclass",userSchema)



   app.post('/users', async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      await student.create(data)
  
      res.status(200).json({
        data: "received" 
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
    })