import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { ObjectId } from "bson"

import { serverEnv } from "@config/schemas/serverSchema"
import stripe from "@config/stripe"
import DbAdapter from "./db-adapter"
import connectMongo from "@config/mongo"
import { Account, Link, Profile, User } from "@models/index"
import {
  getAccountByProviderAccountId,
  associateProfileWithAccount,
} from "../account/account"
import logger from "@config/logger"

export const authOptions = {
  adapter: DbAdapter(connectMongo),
  providers: [
    GithubProvider({
      clientId: serverEnv.GITHUB_ID,
      clientSecret: serverEnv.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, profile: githubProfile }) {
      await connectMongo()
      await Account.findOneAndUpdate(
        { userId: user._id },
        {
          github: {
            company: githubProfile.company,
            publicRepos: githubProfile.public_repos,
            followers: githubProfile.followers,
            following: githubProfile.following,
          },
        },
        { upsert: true }
      )
      return true
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/account/onboarding`
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
        token.username = profile.login
      }
      return token
    },
    async session({ session, token }) {
      await connectMongo()
      // Send properties to the client, like an access_token and user id from a provider.
      // note: `sub` is the user id
      session.accessToken = token.accessToken
      session.user.id = token.sub
      session.username = token.username

      // Get user data and update session
      const user = await User.findOne({ _id: token.sub })
      if (user) {
        session.accountType = user.type
        session.stripeCustomerId = user.stripeCustomerId

        // Set trial start date for new free users
        if (user.type === "free" && !user.premiumTrialStartDate) {
          user.premiumTrialStartDate = new Date()
          await user.save()
        }
      } else {
        session.accountType = "free"
        session.stripeCustomerId = null
      }

      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}
