import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: {
        values: ["free", "premium", "admin"],
        message: "{VALUE} is not a supported data source",
      },
      default: "free",
    },
    stripeCustomerId: {
      type: String,
      trim: true,
    },
    premiumTrialStartDate: {
      type: Date,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    emailVerified: {
      type: Date,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    // User features for premium accounts
    features: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
