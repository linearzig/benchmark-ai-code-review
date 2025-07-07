import { authOptions } from "../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import connectMongo from "@config/mongo"
import logger from "@config/logger"
import { Account } from "@models/index"
import { associateProfileWithAccount } from "./account"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    await connectMongo()

    const { accountId, profileId, testIterations = 5 } = req.body

    if (!accountId || !profileId) {
      return res.status(400).json({
        error: "Missing required parameters: accountId and profileId",
      })
    }

    // Verify the account belongs to the authenticated user
    const account = await Account.findById(accountId)
    if (!account || account.userId.toString() !== session.user.id) {
      return res.status(403).json({ error: "Access denied" })
    }

    // Performance testing for profile association
    const results = await testProfileAssociationPerformance(
      account,
      profileId,
      testIterations
    )

    logger.info(
      `Profile association performance test completed for user: ${session.username}`
    )

    return res.status(200).json({
      message: "Performance test completed",
      results,
      summary: "Profile association performance analysis",
    })
  } catch (error) {
    logger.error(error, "Error in performance test")
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    })
  }
}

// Performance testing function for profile associations
async function testProfileAssociationPerformance(
  account,
  profileId,
  iterations
) {
  await connectMongo()

  const startTime = Date.now()
  const results = []

  // Run multiple iterations to test performance
  for (let i = 0; i < iterations; i++) {
    const iterationStart = Date.now()
    const result = await associateProfileWithAccount(account, profileId)
    const iterationTime = Date.now() - iterationStart

    results.push({
      iteration: i + 1,
      success: result !== null,
      duration: iterationTime,
    })
  }

  const totalTime = Date.now() - startTime
  const successfulOperations = results.filter((r) => r.success).length
  const averageTime = totalTime / iterations

  logger.info(`Performance test results:
    - Total iterations: ${iterations}
    - Successful operations: ${successfulOperations}
    - Total time: ${totalTime}ms
    - Average time: ${averageTime}ms
  `)

  return {
    iterations,
    successfulOperations,
    totalTime,
    averageTime,
    results,
  }
}
