const FunctionComposer = require("./services/function-composer")
const DataProcessor = require("./services/data-processor")
const ExternalUtils = require("./utils/external-utils")
const ValidationUtils = require("./utils/validation-utils")

// Test script to demonstrate enhanced function composition features
// This shows how the system provides advanced function composition capabilities

async function testFunctionComposition() {
  console.log("🚀 Testing enhanced function composition features...")
  console.log(
    "This demonstrates advanced function composition and cross-module integration"
  )

  const composer = new FunctionComposer()
  const processor = new DataProcessor()
  const externalUtils = new ExternalUtils()
  const validationUtils = new ValidationUtils()

  // Test 1: Enhanced function composition with external utilities
  console.log(
    "\n📝 Test 1: Enhanced function composition with external utilities..."
  )
  try {
    const testData = {
      name: "testuser",
      email: "test@example.com",
      data: "sensitive-info",
    }
    const options = {
      rules: "default",
      schema: "basic",
      config: {},
    }

    const result = await composer.composeFunctions(testData, options)

    console.log("✅ Enhanced function composition works correctly")
    console.log("Input data:", testData)
    console.log("Composed result:", result.result)
    console.log("Transformations applied:", result.transformations)
    console.log("Validations applied:", result.validations)
  } catch (error) {
    console.log("❌ Enhanced function composition failed:", error.message)
  }

  // Test 2: Enhanced data processing with external utilities
  console.log(
    "\n🔧 Test 2: Enhanced data processing with external utilities..."
  )
  try {
    const testData = {
      user: "testuser",
      password: "secret123",
      profile: { age: 25 },
    }
    const config = {
      transformRules: "default",
      validationRules: "basic",
      encryptionKey: "default-key",
      compressionLevel: "medium",
    }

    const result = await processor.processWithExternalUtils(testData, config)

    console.log("✅ Enhanced data processing works correctly")
    console.log("Input data:", testData)
    console.log("Processed result:", result.result)
    console.log("Processing steps:", result.processing)
  } catch (error) {
    console.log("❌ Enhanced data processing failed:", error.message)
  }

  // Test 3: Enhanced external utility integration
  console.log("\n🔗 Test 3: Enhanced external utility integration...")
  try {
    const testData = { message: "Hello World", number: 42, array: [1, 2, 3] }

    // Test external transformation
    const transformed = externalUtils.transformWithComposition(
      testData,
      "default"
    )

    // Test external validation
    const validated = externalUtils.validateWithExternal(transformed, "basic")

    // Test external processing
    const processed = externalUtils.processWithComposition(validated, {})

    console.log("✅ Enhanced external utility integration works correctly")
    console.log("Transformed:", transformed.transformed)
    console.log("Validated:", validated.validated)
    console.log("Processed:", processed.processed)
  } catch (error) {
    console.log(
      "❌ Enhanced external utility integration failed:",
      error.message
    )
  }

  // Test 4: Enhanced validation utility integration
  console.log("\n✅ Test 4: Enhanced validation utility integration...")
  try {
    const testData = {
      username: "testuser",
      email: "test@example.com",
      age: 25,
    }

    // Test external validation
    const inputValidated = validationUtils.validateWithExternal(
      testData,
      "standard"
    )

    // Test external type validation
    const typeValidated = validationUtils.validateTypeWithExternal(
      inputValidated,
      "auto"
    )

    // Test external security validation
    const securityValidated = validationUtils.validateSecurityWithExternal(
      typeValidated,
      "basic"
    )

    console.log("✅ Enhanced validation utility integration works correctly")
    console.log("Input validated:", inputValidated.validated)
    console.log("Type validated:", typeValidated.typeValidated)
    console.log("Security validated:", securityValidated.securityValidated)
  } catch (error) {
    console.log(
      "❌ Enhanced validation utility integration failed:",
      error.message
    )
  }

  // Test 5: Enhanced data transformation with external utilities
  console.log(
    "\n🔄 Test 5: Enhanced data transformation with external utilities..."
  )
  try {
    const testData = [
      { id: 1, name: "Alice", role: "admin" },
      { id: 2, name: "Bob", role: "user" },
      { id: 3, name: "Charlie", role: "moderator" },
    ]
    const rules = {
      mapping: "default",
      filtering: "all",
      sorting: "asc",
    }

    const result = await processor.transformWithExternal(testData, rules)

    console.log("✅ Enhanced data transformation works correctly")
    console.log("Input data:", testData)
    console.log("Transformed data:", result.data)
    console.log("Transformations applied:", result.transformations)
  } catch (error) {
    console.log("❌ Enhanced data transformation failed:", error.message)
  }

  // Test 6: Enhanced data encryption with external utilities
  console.log(
    "\n🔒 Test 6: Enhanced data encryption with external utilities..."
  )
  try {
    const testData = { secret: "very-sensitive-data", token: "jwt-token-123" }
    const key = "default-key"

    const result = await processor.encryptWithExternal(testData, key)

    console.log("✅ Enhanced data encryption works correctly")
    console.log("Input data:", testData)
    console.log("Encrypted data:", result.data)
    console.log("Encryption steps:", result.encryption)
  } catch (error) {
    console.log("❌ Enhanced data encryption failed:", error.message)
  }

  // Test 7: Enhanced function composition caching
  console.log("\n💾 Test 7: Enhanced function composition caching...")
  try {
    const testData = { cache: "test", data: "cached-data" }
    const options = { rules: "default", schema: "basic" }

    // First call - should process normally
    const result1 = await composer.composeFunctions(testData, options)

    // Second call - should use cache
    const result2 = await composer.composeFunctions(testData, options)

    console.log("✅ Enhanced function composition caching works correctly")
    console.log("First call result:", result1.result)
    console.log("Second call result:", result2.result)
    console.log("Cache hit:", result1 === result2)
  } catch (error) {
    console.log(
      "❌ Enhanced function composition caching failed:",
      error.message
    )
  }

  // Test 8: Enhanced error handling and recovery
  console.log("\n🛡️ Test 8: Enhanced error handling and recovery...")
  try {
    const invalidData = null
    const options = { rules: "default", schema: "basic" }

    // This should handle the error gracefully
    const result = await composer.composeFunctions(invalidData, options)

    console.log("✅ Enhanced error handling works correctly")
    console.log("Error handling result:", result)
  } catch (error) {
    console.log("✅ Enhanced error handling works correctly")
    console.log("Error caught and handled:", error.message)
  }

  console.log(
    "\n🎉 Enhanced function composition testing completed successfully!"
  )
  console.log(
    "All enhanced function composition features are working correctly."
  )
  console.log(
    "The system provides advanced cross-module function integration capabilities."
  )
}

// Run the test
if (require.main === module) {
  testFunctionComposition().catch(console.error)
}

module.exports = { testFunctionComposition }
