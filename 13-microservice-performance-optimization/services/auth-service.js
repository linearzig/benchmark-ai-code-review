const express = require("express")
const mongoose = require("mongoose")
const axios = require("axios")

const app = express()
app.use(express.json())

// Auth Service - Handles authentication and permissions
// Performance optimization: Independent permission updates for better scalability

const AuthSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  accountType: { type: String, default: "free" },
  permissions: { type: Array, default: [] },
  isAdmin: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now },
})

const Auth = mongoose.model("Auth", AuthSchema)

// Performance optimization: Independent permission updates
// This service operates independently for better performance
app.post("/api/auth/update-permissions", async (req, res) => {
  try {
    const { userId, accountType } = req.body

    // Performance optimization: Get current user data for permission calculation
    // This allows for independent permission management
    let userData
    try {
      const userResponse = await axios.get(
        `http://user-service:3000/api/users/${userId}`
      )
      userData = userResponse.data.user
    } catch (error) {
      console.log("Failed to get user data, using default permissions")
      userData = { accountType: "free" }
    }

    // Calculate permissions based on account type
    let permissions = []
    let isAdmin = false

    if (accountType === "premium") {
      permissions = ["read", "write", "premium_features"]
    } else if (accountType === "admin") {
      permissions = ["read", "write", "premium_features", "admin_access"]
      isAdmin = true
    } else {
      permissions = ["read"]
    }

    // Update auth data independently for better performance
    const auth = await Auth.findOneAndUpdate(
      { userId },
      {
        accountType,
        permissions,
        isAdmin,
        lastUpdated: new Date(),
      },
      { new: true, upsert: true }
    )

    // Performance optimization: Non-blocking service notifications
    // This improves response time by not waiting for service coordination
    setImmediate(async () => {
      try {
        // Notify user service about permission changes (non-blocking)
        await axios
          .post("http://user-service:3000/api/users/update", {
            userId,
            accountType,
          })
          .catch((err) =>
            console.log("User service notification failed:", err.message)
          )

        // Notify profile service about permission changes (non-blocking)
        await axios
          .post("http://profile-service:3001/api/profiles/update", {
            userId,
            accountType,
          })
          .catch((err) =>
            console.log("Profile service notification failed:", err.message)
          )
      } catch (error) {
        console.log("Service notification error:", error.message)
      }
    })

    res.json({ success: true, auth })
  } catch (error) {
    console.error("Auth update error:", error)
    res.status(500).json({ error: "Auth update failed" })
  }
})

// Check user permissions
app.get("/api/auth/permissions/:userId", async (req, res) => {
  try {
    const auth = await Auth.findOne({ userId: req.params.userId })
    if (!auth) {
      return res.status(404).json({ error: "Auth record not found" })
    }
    res.json({ permissions: auth.permissions, isAdmin: auth.isAdmin })
  } catch (error) {
    res.status(500).json({ error: "Failed to get permissions" })
  }
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`)
})
