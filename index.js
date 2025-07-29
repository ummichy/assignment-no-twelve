const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oarqmbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

const donateCollection = client.db('donateDB').collection('donate');
 const userCollection = client.db('donateDB').collection('users');

app.get('/donate', async (req, res) => {
  const cursor = donateCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  } 
);

app.post("/add-user", async (req, res) => {
  const userData = req.body;
  const find_result = await userCollection.findOne({
    email: userData.email,
  });
  if (find_result) {
     userCollection.updateOne(
          { email: userData.email },
          {
            $inc: { loginCount: 1 },
          }
        );
    res.send({ msg: "user already exist" });
  } else {
    const result = await userCollection.insertOne(userData);
    res.send(result);
  }
});


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// Default route
app.get('/', (req, res) => {
  res.send({msg : "hello"});
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});