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
//       if (!email) return res.status(400).send({ error: "Email required" });

//       const result = await usersCollection.updateOne(
//         { email },
//         { $set: { status: "blocked" } }
//       );
//       res.send(result);
//     });

//     // ✅ Unblock user
//     app.patch("/users/unblock", async (req, res) => {
//       const { email } = req.body;
//       if (!email) return res.status(400).send({ error: "Email required" });

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

//       if (!data.donorEmail) {
//         return res.status(400).send({ error: "donorEmail is required" });
//       }

//       // Check if user is blocked
//       const user = await usersCollection.findOne({ email: data.donorEmail });
//       if (!user) return res.status(404).send({ error: "User not found" });
//       if (user.status === "blocked") {
//         return res.status(403).send({ error: "Blocked user cannot create donation requests" });
//       }

//       data.status = "pending"; // default status

//       // Validate required fields (simple example)
//       const requiredFields = [
//         "donorEmail",
//         "requesterName",
//         "recipientName",
//         "recipientDistrict",
//         "recipientUpazila",
//         "hospitalName",
//         "fullAddress",
//         "bloodGroup",
//         "donationDate",
//         "donationTime",
//         "requestMessage",
//       ];

//       for (const field of requiredFields) {
//         if (!data[field]) {
//           return res.status(400).send({ error: `${field} is required` });
//         }
//       }

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

//     // --- New APIs for dashboard and profile ---

//     // Get user profile by email
//     app.get("/users/profile", async (req, res) => {
//       const email = req.query.email;
//       if (!email) return res.status(400).send({ error: "Email required" });

//       const user = await usersCollection.findOne(
//         { email },
//         { projection: { email: 1, name: 1, avatar: 1, district: 1, upazila: 1, bloodGroup: 1, role: 1, status: 1 } }
//       );

//       if (!user) return res.status(404).send({ error: "User not found" });
//       res.send(user);
//     });

//     // Update user profile (except email)
//     app.patch("/users/profile", async (req, res) => {
//       const { email, ...updateData } = req.body;
//       if (!email) return res.status(400).send({ error: "Email required" });

//       delete updateData.email; // make sure email not updated

//       const result = await usersCollection.updateOne(
//         { email },
//         { $set: updateData }
//       );

//       res.send(result);
//     });

//     // Get recent donation requests for a donor (limit 3)
//     app.get("/donate/recent", async (req, res) => {
//       const donorEmail = req.query.email;
//       if (!donorEmail) return res.status(400).send({ error: "Email required" });

//       const requests = await donateCollection
//         .find({ donorEmail })
//         .sort({ donationDate: -1, donationTime: -1 })
//         .limit(3)
//         .toArray();

//       res.send(requests);
//     });

//     // Get all donation requests for a donor with optional filtering & pagination
//     app.get("/donate/my-requests", async (req, res) => {
//       const donorEmail = req.query.email;
//       const status = req.query.status; // optional
//       const page = parseInt(req.query.page) || 1;
//       const limit = 10;

//       if (!donorEmail) return res.status(400).send({ error: "Email required" });

//       const query = { donorEmail };
//       if (status) query.status = status;

//       const total = await donateCollection.countDocuments(query);

//       const requests = await donateCollection.find(query)
//         .sort({ donationDate: -1, donationTime: -1 })
//         .skip((page - 1) * limit)
//         .limit(limit)
//         .toArray();

//       res.send({ total, requests, page, pages: Math.ceil(total / limit) });
//     });

//     // Update donation request status (done/canceled) only if status is "inprogress"
//     app.patch("/donate/status", async (req, res) => {
//       const { id, status } = req.body;
//       if (!id || !status) return res.status(400).send({ error: "Id & status required" });

//       if (!["done", "canceled"].includes(status)) {
//         return res.status(400).send({ error: "Invalid status" });
//       }

//       // Check current status before update
//       const donation = await donateCollection.findOne({ _id: new ObjectId(id) });
//       if (!donation) return res.status(404).send({ error: "Donation request not found" });
//       if (donation.status !== "inprogress") {
//         return res.status(400).send({ error: "Status can be updated only when inprogress" });
//       }

//       const result = await donateCollection.updateOne(
//         { _id: new ObjectId(id) },
//         { $set: { status } }
//       );

//       res.send(result);
//     });

//     // Delete a donation request by ID
//     app.delete("/donate/:id", async (req, res) => {
//       const id = req.params.id;
//       if (!id) return res.status(400).send({ error: "Id required" });

//       const result = await donateCollection.deleteOne({ _id: new ObjectId(id) });
//       res.send(result);
//     });

//     // Get single donation request details (by ID)
//     app.get("/donate/:id", async (req, res) => {
//       const id = req.params.id;
//       if (!id) return res.status(400).send({ error: "Id required" });

//       const donation = await donateCollection.findOne({ _id: new ObjectId(id) });
//       if (!donation) return res.status(404).send({ error: "Donation not found" });

//       res.send(donation);
//     });


//     // GET user by email
// app.get('/users/:email', async (req, res) => {
//   const result = await userCollection.findOne({ email: req.params.email });
//   res.send(result);
// });

// // PUT update profile
// app.put('/users/:email', async (req, res) => {
//   const updated = req.body;
//   const result = await userCollection.updateOne(
//     { email: req.params.email },
//     { $set: updated }
//   );
//   res.send(result);
// });

//     // Ping check
//     await client.db("admin").command({ ping: 1 });
//     console.log("✅ Server ready");
//   } finally {
//     // No client.close() here to keep connection alive during development
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
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lftgrs4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB client setup
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-admin-service-key.json");

// Collections
let usersCollection;
let donationsCollection;
let blogsCollection; //new

/ new added
const verifyFireBaseToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;


  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'unauthorized access' })
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    console.log('decoded token', decoded);
    req.decoded = decoded;
    next();

  }
  catch (error) {
    return res.status(401).send({ message: 'unauthorized access' })
  }


}

// Main MongoDB connection function
async function run() {
  try {
    await client.connect();
    const db = client.db("bloodDonationDB");
    usersCollection = db.collection("users");
    donationsCollection = db.collection("donations");
    blogsCollection = db.collection("blogs"); // new collection

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}
run().catch(console.dir);

// Root
app.get('/', (req, res) => {
  res.send('🩸 Blood donation server is running');
});

// ------------------- USER ROUTES ------------------- //

// Create a user
app.post('/users', async (req, res) => {
  const userData = req.body;

  const existing = await usersCollection.findOne({ email: userData.email });
  if (existing) {
    return res.status(409).json({ message: "User already exists" });
  }

  userData.role = userData.role || "donor";
  userData.status = userData.status || "active";

  const result = await usersCollection.insertOne(userData);
  res.status(201).json(result);
});

// Get a user by email
app.get('/users/:email', async (req, res) => {
  const email = req.params.email;
  const user = await usersCollection.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Update a user
app.put('/users/:email', async (req, res) => {
  const email = req.params.email;
  const updateData = req.body;
  delete updateData.email;

  const result = await usersCollection.updateOne(
    { email },
    { $set: updateData }
  );

  if (result.modifiedCount === 0) {
    return res.status(400).json({ message: 'No changes made' });
  }
  res.json({ message: 'Profile updated successfully' });
});




// Get all users
app.get('/users', async (req, res) => {
  const users = await usersCollection.find().toArray();
  res.json(users);
});






app.get('/donations/all', async (req, res) => {
  const donations = await donationsCollection.find().toArray();
  res.json(donations);
});

// ------------------- DONATION REQUEST ROUTES ------------------- //

// Create a blood donation request
app.post('/donations', async (req, res) => {
  try {
    const donationRequest = req.body;

    // Default status and createdAt
    donationRequest.status = "pending";
    donationRequest.createdAt = new Date();

    const result = await donationsCollection.insertOne(donationRequest);
    res.status(201).json(result);
  } catch (error) {
    console.error("❌ Error saving donation request:", error);
    res.status(500).json({ message: "Failed to create donation request" });
  }
});


// Get donations by user email
app.get('/donations/user/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const donations = await donationsCollection.find({ requesterEmail: email }).sort({ createdAt: -1 }).toArray();
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch donations" });
  }
});



// Get donation by ID
app.get('/donations/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const donation = await donationsCollection.findOne({ _id: new ObjectId(id) });
    if (!donation) return res.status(404).json({ message: "Not found" });
    res.json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching donation" });
  }
});

// Delete a donation by ID
app.delete('/donations/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await donationsCollection.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete donation" });
  }
});

// Update a donation by ID (full update)
app.put('/donations/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const result = await donationsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: "No changes made" });
    }

    res.json({ message: "Donation updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update donation" });
  }
});








//blogs new



















app.get('/blogs', async (req, res) => {
  try {
    const status = req.query.status;
    const filter = status ? { status } : {};
    const blogs = await blogsCollection.find(filter).sort({ createdAt: -1 }).toArray();
    res.json(blogs);
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});


app.get('/blogs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching blog" });
  }
});



app.put('/blogs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const result = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: "No changes made" });
    }

    res.json({ message: "Blog updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update blog" });
  }
});

app.delete('/blogs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await blogsCollection.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (err) {
    console.error("❌ Failed to delete blog:", err);
    res.status(500).json({ message: "Failed to delete blog" });
  }
});













// ------------------- SERVER ------------------- //
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

