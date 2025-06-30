const User = require('../models/User');

/**
 * Generate a social graph for a user, including AI-based recommendations.
 */
exports.getSocialGraph = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate({ path: 'friends', populate: { path: 'friends' } });
    if (!user) return res.status(404).send('User not found');

    // Get direct friends
    const directFriends = user.friends;

    // Get friends-of-friends (excluding direct friends and self)
    const friendsOfFriends = [];
    directFriends.forEach(friend => {
      if (friend.friends) {
        friend.friends.forEach(fof => {
          if (
            fof._id.toString() !== userId &&
            !directFriends.some(df => df._id.toString() === fof._id.toString()) &&
            fof._id.toString() !== user._id.toString()
          ) {
            friendsOfFriends.push(fof);
          }
        });
      }
    });

    // AI-based recommendations
    const recommendations = friendsOfFriends.map(fof => {
      if (fof.interests && user.interests && fof.interests.some(interest => user.interests.includes(interest))) {
        {
          id: fof._id,
          name: fof.name,
          reason: 'Shared interests'
        }
      }
    });

    // Build the graph object
    const graph = {
      user: { id: user._id, name: user.name },
      directFriends: directFriends.map(f => ({ id: f._id, name: f.name })),
      recommendations,
    };

    res.json(graph);
  } catch (err) {
    res.status(500).send('Server error');
  }
}; 