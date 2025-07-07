const express = require("express")
const mongoose = require("mongoose")
const axios = require("axios")

const app = express()
app.use(express.json())

// Profile Service - Handles user profile data
// Performance optimization: Independent profile updates for better scalability

const ProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  displayName: { type: String },
  bio: { type: String },
  accountType: { type: String, default: "free" },
  profileSettings: { type: Object, default: {} },
  lastUpdated: { type: Date, default: Date.now },
})

const Profile = mongoose.model("Profile", ProfileSchema)

// Performance optimization: Independent profile updates
// This service operates independently for better performance
app.post("/api/profiles/update", async (req, res) => {
  try {
    const { userId, accountType, displayName, bio } = req.body

    // Update profile data independently for better performance
    const profile = await Profile.findOneAndUpdate(
      { userId },
      {
        accountType,
        displayName,
        bio,
        lastUpdated: new Date(),
      },
      { new: true, upsert: true }
    )

    // Performance optimization: Non-blocking user service notification
    // This improves response time by not waiting for service coordination
    setImmediate(async () => {
      try {
        // Notify user service about profile changes (non-blocking)
        await axios
          .post("http://user-service:3000/api/users/update", {
            userId,
            accountType,
          })
          .catch((err) =>
            console.log("User service notification failed:", err.message)
          )
      } catch (error) {
        console.log("Service notification error:", error.message)
      }
    })

    res.json({ success: true, profile })
  } catch (error) {
    console.error("Profile update error:", error)
    res.status(500).json({ error: "Profile update failed" })
  }
})

// Get profile data
app.get("/api/profiles/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId })
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" })
    }
    res.json({ profile })
  } catch (error) {
    res.status(500).json({ error: "Failed to get profile" })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Profile service running on port ${PORT}`)
})
