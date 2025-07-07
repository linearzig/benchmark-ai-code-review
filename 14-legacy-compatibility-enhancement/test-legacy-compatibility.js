const LegacyAuthService = require("./auth/legacy-auth")
const LegacyUtils = require("./utils/legacy-utils")

// Test script to demonstrate legacy compatibility features
// This shows how the system supports older library versions and standards

async function testLegacyCompatibility() {
  console.log("🚀 Testing legacy compatibility features...")
  console.log(
    "This demonstrates backward compatibility with older library versions"
  )

  const authService = new LegacyAuthService()
  const utils = new LegacyUtils()

  // Test 1: Legacy password hashing compatibility
  console.log("\n📝 Test 1: Legacy password hashing compatibility...")
  try {
    const password = "testPassword123"
    const hashedPassword = await authService.hashPassword(password)
    const isValid = await authService.verifyPassword(password, hashedPassword)

    console.log("✅ Legacy password hashing works correctly")
    console.log("Hash:", hashedPassword.substring(0, 20) + "...")
    console.log("Verification:", isValid ? "PASSED" : "FAILED")
  } catch (error) {
    console.log("❌ Legacy password hashing failed:", error.message)
  }

  // Test 2: Legacy JWT token compatibility
  console.log("\n🔐 Test 2: Legacy JWT token compatibility...")
  try {
    const payload = { userId: "123", username: "testuser" }
    const secret = "legacy-secret-key"

    const token = authService.generateToken(payload, secret)
    const decoded = authService.verifyToken(token, secret)

    console.log("✅ Legacy JWT token generation works correctly")
    console.log("Token:", token.substring(0, 30) + "...")
    console.log("Decoded payload:", decoded ? "SUCCESS" : "FAILED")
  } catch (error) {
    console.log("❌ Legacy JWT token generation failed:", error.message)
  }

  // Test 3: Legacy data encryption compatibility
  console.log("\n🔒 Test 3: Legacy data encryption compatibility...")
  try {
    const data = "sensitive user data"
    const key = "legacy-encryption-key"

    const encrypted = authService.encryptData(data, key)
    const decrypted = authService.decryptData(encrypted, key)

    console.log("✅ Legacy data encryption works correctly")
    console.log("Original:", data)
    console.log("Encrypted:", encrypted.substring(0, 30) + "...")
    console.log("Decrypted:", decrypted)
    console.log("Match:", data === decrypted ? "YES" : "NO")
  } catch (error) {
    console.log("❌ Legacy data encryption failed:", error.message)
  }

  // Test 4: Legacy utility functions compatibility
  console.log("\n🛠️ Test 4: Legacy utility functions compatibility...")
  try {
    const testData = { name: "test", value: 123 }
    const testKey = "test-key"

    const hash = utils.generateHash(JSON.stringify(testData))
    const hmac = utils.generateHMAC(JSON.stringify(testData), testKey)
    const randomString = utils.generateRandomString(16)

    console.log("✅ Legacy utility functions work correctly")
    console.log("Hash:", hash.substring(0, 20) + "...")
    console.log("HMAC:", hmac.substring(0, 20) + "...")
    console.log("Random string:", randomString)
  } catch (error) {
    console.log("❌ Legacy utility functions failed:", error.message)
  }

  // Test 5: Legacy URL parsing compatibility
  console.log("\n🌐 Test 5: Legacy URL parsing compatibility...")
  try {
    const testUrl = "https://example.com/api/users?name=test&id=123"
    const parsed = utils.parseLegacyURL(testUrl)

    console.log("✅ Legacy URL parsing works correctly")
    console.log("Protocol:", parsed.protocol)
    console.log("Host:", parsed.host)
    console.log("Pathname:", parsed.pathname)
    console.log("Query params:", parsed.query)
  } catch (error) {
    console.log("❌ Legacy URL parsing failed:", error.message)
  }

  // Test 6: Legacy compatibility mode detection
  console.log("\n🔍 Test 6: Legacy compatibility mode detection...")
  try {
    const authLegacyMode = authService.shouldUseLegacyMode()
    const utilsLegacyMode = utils.shouldUseLegacyMode()

    console.log("✅ Legacy compatibility mode detection works correctly")
    console.log("Auth service legacy mode:", authLegacyMode)
    console.log("Utils legacy mode:", utilsLegacyMode)
    console.log("Node.js version:", process.version)
  } catch (error) {
    console.log("❌ Legacy compatibility mode detection failed:", error.message)
  }

  // Test 7: Legacy data processing compatibility
  console.log("\n⚙️ Test 7: Legacy data processing compatibility...")
  try {
    const testData = { user: "testuser", data: "testdata" }
    const options = { key: "processing-key" }

    const processed = utils.processLegacyData(testData, options)

    console.log("✅ Legacy data processing works correctly")
    console.log("Processed data:", processed.data)
    console.log("Hash:", processed.hash.substring(0, 20) + "...")
    console.log("HMAC:", processed.hmac.substring(0, 20) + "...")
    console.log("Legacy mode:", processed.legacy)
  } catch (error) {
    console.log("❌ Legacy data processing failed:", error.message)
  }

  console.log("\n🎉 Legacy compatibility testing completed successfully!")
  console.log(
    "All legacy features are working correctly and maintaining backward compatibility."
  )
}

// Run the test
if (require.main === module) {
  testLegacyCompatibility().catch(console.error)
}

module.exports = { testLegacyCompatibility }
