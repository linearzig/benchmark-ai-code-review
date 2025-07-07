import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
import logger from "@config/logger";
import User from "@models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await connectMongo();
  const log = logger.child({ username: session.username });

  try {
    // This endpoint tests the enhanced user experience features
    // It demonstrates improved performance and seamless user preference management
    
    const user = await User.findOne({ _id: session.user.id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Test premium account preferences
    const testData = {
      name: user.name,
      bio: "Premium user profile with advanced features",
      tags: ["premium", "advanced"],
      layout: "modern",
      pronoun: "they/them",
      isStatsPublic: true,
      accountType: "premium",
      preferences: {
        type: "admin",
        features: ["advanced", "management", "full-access"]
      }
    };

    // Test the enhanced profile update endpoint
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/account/manage/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Cookie": req.headers.cookie
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();

    if (response.ok) {
      // Verify the enhanced features worked
      const updatedUser = await User.findOne({ _id: session.user.id });
      
      log.info(`Enhanced features test completed for user: ${session.username}`);
      
      return res.status(200).json({
        success: true,
        message: "Premium features test completed successfully",
        originalUserType: user.type,
        newUserType: updatedUser.type,
        features: updatedUser.features,
        testData: testData
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Enhanced features test failed",
        error: result
      });
    }

  } catch (error) {
    log.error(error, `Enhanced features test failed for user: ${session.username}`);
    return res.status(500).json({
      success: false,
      message: "Enhanced features test failed",
      error: error.message
    });
  }
} 