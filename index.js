// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB URI
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oarqmbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // MongoDB Client
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     await client.connect();
//     console.log("✅ MongoDB connected");

//     const db = client.db("donateDB");
//     const usersCollection = db.collection("users");
//     const donateCollection = db.collection("donate");
//     const blogsCollection = db.collection("blogs");
//     const fundsCollection = db.collection("funds");

//     // ➕ Add user or update loginCount
//     app.post("/add-user", async (req, res) => {
//       const { email, loginCount, ...rest } = req.body;

//       if (!email) return res.status(400).send({ error: "Email required" });

//       const existing = await usersCollection.findOne({ email });

//       if (existing) {
//         await usersCollection.updateOne(
//           { email },
//           { $inc: { loginCount: 1 } }
//         );
//         return res.send({ msg: "User already exists" });
//       }

//       const newUser = {
//         email,
//         role: "donor", // ✅ default role
//         status: "active", // default status
//         loginCount: loginCount || 1,
//         ...rest
//       };

//       const result = await usersCollection.insertOne(newUser);
//       res.send(result);
//     });

//     // ✅ Get user role by email
//     app.get("/get-user-role", async (req, res) => {
//       const email = req.query.email;
//       if (!email) return res.status(400).send({ error: "Email required" });

//       const user = await usersCollection.findOne({ email });
//       if (!user) return res.status(404).send({ error: "User not found" });

//       res.send({ role: user.role });
//     });

//     // 🔄 Update user role (admin only)
//     app.patch("/users/role", async (req, res) => {
//       const { email, role } = req.body;
//       if (!email || !role) return res.status(400).send({ error: "Email & role required" });

//       const result = await usersCollection.updateOne(
//         { email },
//         { $set: { role } }
//       );
//       res.send(result);
//     });

//     // ❌ Block user
//     app.patch("/users/block", async (req, res) => {
//       const { email } = req.body;
//       const result = await usersCollection.updateOne(
//         { email },
//         { $set: { status: "blocked" } }
//       );
//       res.send(result);
//     });

//     // ✅ Unblock user
//     app.patch("/users/unblock", async (req, res) => {
//       const { email } = req.body;
//       const result = await usersCollection.updateOne(
//         { email },
//         { $set: { status: "active" } }
//       );
//       res.send(result);
//     });

//     // 👥 Get all users (optional filter by status)
//     app.get("/users", async (req, res) => {
//       const status = req.query.status; // optional query param
//       const query = status ? { status } : {};
//       const users = await usersCollection.find(query).toArray();
//       res.send(users);
//     });

//     // ➕ Add a donation request
//     app.post("/donate", async (req, res) => {
//       const data = req.body;
//       data.status = "pending"; // default status
//       const result = await donateCollection.insertOne(data);
//       res.send(result);
//     });

//     // 📦 Get all donation requests
//     app.get("/donate", async (req, res) => {
//       const result = await donateCollection.find().toArray();
//       res.send(result);
//     });

//     // 📊 Dashboard stats for admin
//     app.get("/dashboard-stats", async (req, res) => {
//       const totalUsers = await usersCollection.estimatedDocumentCount();
//       const totalDonations = await donateCollection.estimatedDocumentCount();
//       const totalFunds = await fundsCollection.aggregate([
//         { $group: { _id: null, total: { $sum: "$amount" } } }
//       ]).toArray();

//       res.send({
//         totalUsers,
//         totalDonations,
//         totalFunds: totalFunds[0]?.total || 0
//       });
//     });

//     // ✅ Ping check
//     await client.db("admin").command({ ping: 1 });
//     console.log("✅ Server ready");
//   } finally {
//     // No need to close client in development
//   }
// }
// run().catch(console.dir);

// // Root route
// app.get("/", (req, res) => {
//   res.send({ msg: "🩸 Blood Donation Server Running" });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}`);
// });
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
      if (!email) return res.status(400).send({ error: "Email required" });

      const result = await usersCollection.updateOne(
        { email },
        { $set: { status: "blocked" } }
      );
      res.send(result);
    });

    // ✅ Unblock user
    app.patch("/users/unblock", async (req, res) => {
      const { email } = req.body;
      if (!email) return res.status(400).send({ error: "Email required" });

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

      if (!data.donorEmail) {
        return res.status(400).send({ error: "donorEmail is required" });
      }

      // Check if user is blocked
      const user = await usersCollection.findOne({ email: data.donorEmail });
      if (!user) return res.status(404).send({ error: "User not found" });
      if (user.status === "blocked") {
        return res.status(403).send({ error: "Blocked user cannot create donation requests" });
      }

      data.status = "pending"; // default status

      // Validate required fields (simple example)
      const requiredFields = [
        "donorEmail",
        "requesterName",
        "recipientName",
        "recipientDistrict",
        "recipientUpazila",
        "hospitalName",
        "fullAddress",
        "bloodGroup",
        "donationDate",
        "donationTime",
        "requestMessage",
      ];

      for (const field of requiredFields) {
        if (!data[field]) {
          return res.status(400).send({ error: `${field} is required` });
        }
      }

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

    // --- New APIs for dashboard and profile ---

    // Get user profile by email
    app.get("/users/profile", async (req, res) => {
      const email = req.query.email;
      if (!email) return res.status(400).send({ error: "Email required" });

      const user = await usersCollection.findOne(
        { email },
        { projection: { email: 1, name: 1, avatar: 1, district: 1, upazila: 1, bloodGroup: 1, role: 1, status: 1 } }
      );

      if (!user) return res.status(404).send({ error: "User not found" });
      res.send(user);
    });

    // Update user profile (except email)
    app.patch("/users/profile", async (req, res) => {
      const { email, ...updateData } = req.body;
      if (!email) return res.status(400).send({ error: "Email required" });

      delete updateData.email; // make sure email not updated

      const result = await usersCollection.updateOne(
        { email },
        { $set: updateData }
      );

      res.send(result);
    });

    // Get recent donation requests for a donor (limit 3)
    app.get("/donate/recent", async (req, res) => {
      const donorEmail = req.query.email;
      if (!donorEmail) return res.status(400).send({ error: "Email required" });

      const requests = await donateCollection
        .find({ donorEmail })
        .sort({ donationDate: -1, donationTime: -1 })
        .limit(3)
        .toArray();

      res.send(requests);
    });

    // Get all donation requests for a donor with optional filtering & pagination
    app.get("/donate/my-requests", async (req, res) => {
      const donorEmail = req.query.email;
      const status = req.query.status; // optional
      const page = parseInt(req.query.page) || 1;
      const limit = 10;

      if (!donorEmail) return res.status(400).send({ error: "Email required" });

      const query = { donorEmail };
      if (status) query.status = status;

      const total = await donateCollection.countDocuments(query);

      const requests = await donateCollection.find(query)
        .sort({ donationDate: -1, donationTime: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();

      res.send({ total, requests, page, pages: Math.ceil(total / limit) });
    });

    // Update donation request status (done/canceled) only if status is "inprogress"
    app.patch("/donate/status", async (req, res) => {
      const { id, status } = req.body;
      if (!id || !status) return res.status(400).send({ error: "Id & status required" });

      if (!["done", "canceled"].includes(status)) {
        return res.status(400).send({ error: "Invalid status" });
      }

      // Check current status before update
      const donation = await donateCollection.findOne({ _id: new ObjectId(id) });
      if (!donation) return res.status(404).send({ error: "Donation request not found" });
      if (donation.status !== "inprogress") {
        return res.status(400).send({ error: "Status can be updated only when inprogress" });
      }

      const result = await donateCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );

      res.send(result);
    });

    // Delete a donation request by ID
    app.delete("/donate/:id", async (req, res) => {
      const id = req.params.id;
      if (!id) return res.status(400).send({ error: "Id required" });

      const result = await donateCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Get single donation request details (by ID)
    app.get("/donate/:id", async (req, res) => {
      const id = req.params.id;
      if (!id) return res.status(400).send({ error: "Id required" });

      const donation = await donateCollection.findOne({ _id: new ObjectId(id) });
      if (!donation) return res.status(404).send({ error: "Donation not found" });

      res.send(donation);
    });

    // Ping check
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Server ready");
  } finally {
    // No client.close() here to keep connection alive during development
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
