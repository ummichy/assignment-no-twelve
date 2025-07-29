const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oarqmbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB Client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected");

    const db = client.db("donateDB");
    const usersCollection = db.collection("users");
    const donateCollection = db.collection("donate");
    const blogsCollection = db.collection("blogs");
    const fundsCollection = db.collection("funds");

    // ➕ Add user or update loginCount
    app.post("/add-user", async (req, res) => {
      const { email, loginCount, ...rest } = req.body;

      if (!email) return res.status(400).send({ error: "Email required" });

      const existing = await usersCollection.findOne({ email });

      if (existing) {
        await usersCollection.updateOne(
          { email },
          { $inc: { loginCount: 1 } }
        );
        return res.send({ msg: "User already exists" });
      }

      const newUser = {
        email,
        role: "donor", // ✅ default role
        status: "active", // default status
        loginCount: loginCount || 1,
        ...rest
      };

      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

    // ✅ Get user role by email
    app.get("/get-user-role", async (req, res) => {
      const email = req.query.email;
      if (!email) return res.status(400).send({ error: "Email required" });

      const user = await usersCollection.findOne({ email });
      if (!user) return res.status(404).send({ error: "User not found" });

      res.send({ role: user.role });
    });

    // 🔄 Update user role (admin only)
    app.patch("/users/role", async (req, res) => {
      const { email, role } = req.body;
      if (!email || !role) return res.status(400).send({ error: "Email & role required" });

      const result = await usersCollection.updateOne(
        { email },
        { $set: { role } }
      );
      res.send(result);
    });

    // ❌ Block user
    app.patch("/users/block", async (req, res) => {
      const { email } = req.body;
      const result = await usersCollection.updateOne(
        { email },
        { $set: { status: "blocked" } }
      );
      res.send(result);
    });

    // ✅ Unblock user
    app.patch("/users/unblock", async (req, res) => {
      const { email } = req.body;
      const result = await usersCollection.updateOne(
        { email },
        { $set: { status: "active" } }
      );
      res.send(result);
    });

    // 👥 Get all users (optional filter by status)
    app.get("/users", async (req, res) => {
      const status = req.query.status; // optional query param
      const query = status ? { status } : {};
      const users = await usersCollection.find(query).toArray();
      res.send(users);
    });

    // ➕ Add a donation request
    app.post("/donate", async (req, res) => {
      const data = req.body;
      data.status = "pending"; // default status
      const result = await donateCollection.insertOne(data);
      res.send(result);
    });

    // 📦 Get all donation requests
    app.get("/donate", async (req, res) => {
      const result = await donateCollection.find().toArray();
      res.send(result);
    });

    // 📊 Dashboard stats for admin
    app.get("/dashboard-stats", async (req, res) => {
      const totalUsers = await usersCollection.estimatedDocumentCount();
      const totalDonations = await donateCollection.estimatedDocumentCount();
      const totalFunds = await fundsCollection.aggregate([
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]).toArray();

      res.send({
        totalUsers,
        totalDonations,
        totalFunds: totalFunds[0]?.total || 0
      });
    });

    // ✅ Ping check
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Server ready");
  } finally {
    // No need to close client in development
  }
}
run().catch(console.dir);

// Root route
app.get("/", (req, res) => {
  res.send({ msg: "🩸 Blood Donation Server Running" });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
