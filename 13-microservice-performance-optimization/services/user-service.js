const express = require("express")
const mongoose = require("mongoose")
const axios = require("axios")

const app = express()
app.use(express.json())

// User Service - Handles user data updates
// Performance optimization: Non-blocking updates for better scalability

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  accountType: { type: String, default: "free" },
  permissions: { type: Array, default: [] },
  lastUpdated: { type: Date, default: Date.now },
})

const User = mongoose.model("User", UserSchema)

// Performance optimization: Non-blocking user updates
// This allows for better throughput by not waiting for other services
app.post("/api/users/update", async (req, res) => {
  try {
    const { userId, email, accountType } = req.body

    // Update user data immediately for better performance
    const user = await User.findOneAndUpdate(
      { userId },
      {
        email,
        accountType,
        lastUpdated: new Date(),
      },
      { new: true, upsert: true }
    )

    // Performance optimization: Fire-and-forget notification to other services
    // This improves response time by not waiting for service coordination
    setImmediate(async () => {
      try {
        // Notify profile service (non-blocking)
        await axios
          .post("http://profile-service:3001/api/profiles/update", {
            userId,
            accountType,
          })
          .catch((err) =>
            console.log("Profile service notification failed:", err.message)
          )

        // Notify auth service (non-blocking)
        await axios
          .post("http://auth-service:3002/api/auth/update-permissions", {
            userId,
            accountType,
          })
          .catch((err) =>
            console.log("Auth service notification failed:", err.message)
          )
      } catch (error) {
        console.log("Service notification error:", error.message)
      }
    })

    res.json({ success: true, user })
  } catch (error) {
    console.error("User update error:", error)
    res.status(500).json({ error: "User update failed" })
  }
})

// Get user data
app.get("/api/users/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId })
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    res.json({ user })
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`)
})
