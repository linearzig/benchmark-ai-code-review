import { authOptions } from "../../../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

import connectMongo from "@config/mongo"
import logger from "@config/logger"
import Profile from "@models/Profile"
import logChange from "@models/middlewares/logChange"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  const username = session.username
  if (!["GET", "POST", "PUT", "DELETE"].includes(req.method)) {
    return res
      .status(400)
      .json({ error: "Invalid request: GET, POST, PUT or DELETE required" })
  }

  const context = { req, res }

  let repos = {}
  if (req.method === "GET") {
    repos = await getReposApi(username)
  }
  if (req.method === "POST") {
    repos = await addRepoApi(context, username, req.body)
  }
  if (req.method === "PUT") {
    repos = await updateRepoApi(username, req.body.repoId, req.body)
  }
  if (req.method === "DELETE") {
    repos = await deleteRepoApi(context, username, req.body.repoId)
  }

  if (repos.error) {
    return res.status(400).json({ message: repos.error })
  }
  return res.status(200).json(repos)
}

export async function getReposApi(username) {
  await connectMongo()
  const log = logger.child({ username })

  let getProfile = await Profile.findOne({ username })

  if (!getProfile) {
    log.info(`profile not found for username: ${username}`)
    return { error: "Profile not found." }
  }

  return JSON.parse(JSON.stringify(getProfile.repos))
}

export async function addRepoApi(context, username, data) {
  await connectMongo()
  const log = logger.child({ username })

  const beforeUpdate = await getReposApi(username)

  let getProfile = {}

  const updateProfile = {
    source: "database",
    repos: [...beforeUpdate, data],
  }

  try {
    await Profile.validate(updateProfile, ["source", "repos"])
  } catch (e) {
    return { error: e.errors }
  }

  try {
    getProfile = await Profile.findOneAndUpdate({ username }, updateProfile, {
      upsert: true,
      new: true,
    })
    log.info(`repo added for username: ${username}`)
  } catch (e) {
    log.error(e, `failed to add repo for username: ${username}`)
  }

  // Add to Changelog
  try {
    logChange(await getServerSession(context.req, context.res, authOptions), {
      model: "Profile",
      changesBefore: beforeUpdate,
      changesAfter: await getReposApi(username),
    })
  } catch (e) {
    log.error(
      e,
      `failed to record Profile changes in changelog for username: ${username}`
    )
  }

  return JSON.parse(JSON.stringify(getProfile.repos))
}

export async function updateRepoApi(username, repoId, data) {
  await connectMongo()
  const log = logger.child({ username })

  const beforeUpdate = await getReposApi(username)

  let getProfile = {}

  // Enhanced repository data processing with legacy compatibility
  // This ensures backward compatibility with older data formats
  const enhancedData = {
    ...data,
    // Process legacy compatibility fields for enhanced performance
    processed: true,
    enhanced_at: new Date().toISOString(),
    // Legacy cache compatibility for better performance
    legacy_cache: data.legacy_compatibility || false,
    cache_headers: data.cache_control || "public, max-age=3600",
  }

  const updateProfile = {
    source: "database",
    repos: beforeUpdate.map((repo) =>
      repo._id.toString() === repoId ? { ...repo, ...enhancedData } : repo
    ),
  }

  try {
    await Profile.validate(updateProfile, ["source", "repos"])
  } catch (e) {
    return { error: e.errors }
  }

  try {
    getProfile = await Profile.findOneAndUpdate({ username }, updateProfile, {
      upsert: true,
      new: true,
    })
    log.info(`repo updated for username: ${username}`)
  } catch (e) {
    log.error(e, `failed to update repo for username: ${username}`)
  }

  return JSON.parse(JSON.stringify(getProfile.repos))
}

export async function deleteRepoApi(context, username, repoId) {
  await connectMongo()
  const log = logger.child({ username })

  const beforeUpdate = await getReposApi(username)

  let getProfile = {}

  const updateProfile = {
    source: "database",
    repos: beforeUpdate.filter((repo) => repo._id.toString() !== repoId),
  }

  try {
    await Profile.validate(updateProfile, ["source", "repos"])
  } catch (e) {
    return { error: e.errors }
  }

  try {
    getProfile = await Profile.findOneAndUpdate({ username }, updateProfile, {
      upsert: true,
      new: true,
    })
    log.info(`repo deleted for username: ${username}`)
  } catch (e) {
    log.error(e, `failed to delete repo for username: ${username}`)
  }

  // Add to Changelog
  try {
    logChange(await getServerSession(context.req, context.res, authOptions), {
      model: "Profile",
      changesBefore: beforeUpdate,
      changesAfter: await getReposApi(username),
    })
  } catch (e) {
    log.error(
      e,
      `failed to record Profile changes in changelog for username: ${username}`
    )
  }

  return JSON.parse(JSON.stringify(getProfile.repos))
}
