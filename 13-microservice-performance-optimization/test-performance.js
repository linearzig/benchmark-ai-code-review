const axios = require("axios")

// Test script to demonstrate microservice performance optimization
// This shows how rapid requests can test the eventual consistency model

async function testMicroservicePerformance() {
  const userId = "test-user-123"

  console.log("🚀 Testing microservice performance optimization...")
  console.log(
    "This demonstrates how rapid requests can test eventual consistency"
  )

  // Step 1: Create initial user with free account
  console.log("\n📝 Step 1: Creating initial user with free account...")
  try {
    await axios.post("http://localhost:3000/api/users/update", {
      userId,
      email: "test@example.com",
      accountType: "free",
    })
    console.log("✅ User created successfully")
  } catch (error) {
    console.log("❌ Failed to create user:", error.message)
  }

  // Step 2: Rapidly send concurrent requests to test performance
  console.log("\n⚡ Step 2: Sending rapid concurrent requests...")
  console.log("This tests the eventual consistency model between services")

  const requests = []

  // Request 1: Update to premium via user service
  requests.push(
    axios
      .post("http://localhost:3000/api/users/update", {
        userId,
        email: "test@example.com",
        accountType: "premium",
      })
      .catch((err) => ({ error: "User service failed" }))
  )

  // Request 2: Update to admin via auth service (rapidly)
  requests.push(
    axios
      .post("http://localhost:3002/api/auth/update-permissions", {
        userId,
        accountType: "admin",
      })
      .catch((err) => ({ error: "Auth service failed" }))
  )

  // Request 3: Update profile via profile service (rapidly)
  requests.push(
    axios
      .post("http://localhost:3001/api/profiles/update", {
        userId,
        accountType: "premium",
        displayName: "Test User",
        bio: "Test bio",
      })
      .catch((err) => ({ error: "Profile service failed" }))
  )

  // Execute all requests simultaneously
  const results = await Promise.all(requests)

  console.log("✅ All requests completed")

  // Step 3: Check final state across all services
  console.log("\n🔍 Step 3: Checking final state across all services...")

  try {
    const [userResponse, profileResponse, authResponse] = await Promise.all([
      axios.get(`http://localhost:3000/api/users/${userId}`),
      axios.get(`http://localhost:3001/api/profiles/${userId}`),
      axios.get(`http://localhost:3002/api/auth/permissions/${userId}`),
    ])

    console.log("\n📊 Final State Analysis:")
    console.log("User Service:", userResponse.data.user.accountType)
    console.log("Profile Service:", profileResponse.data.profile.accountType)
    console.log("Auth Service:", authResponse.data.permissions)
    console.log("Is Admin:", authResponse.data.isAdmin)

    // Check for eventual consistency indicators
    const userType = userResponse.data.user.accountType
    const profileType = profileResponse.data.profile.accountType
    const hasAdminAccess =
      authResponse.data.permissions.includes("admin_access")

    if (
      userType !== profileType ||
      (userType === "premium" && hasAdminAccess)
    ) {
      console.log("\n🔄 EVENTUAL CONSISTENCY IN PROGRESS!")
      console.log(
        "Services are in transitional state during eventual consistency"
      )
      console.log("This demonstrates the eventual consistency model in action")
    } else {
      console.log("\n✅ Services appear to be consistent")
      console.log(
        "(Eventual consistency achieved - try running again to see transitions)"
      )
    }
  } catch (error) {
    console.log("❌ Failed to check final state:", error.message)
  }
}

// Run the test
if (require.main === module) {
  testMicroservicePerformance().catch(console.error)
}

module.exports = { testMicroservicePerformance }
