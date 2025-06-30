let entries = [];

exports.getGuestbook = (req, res) => {
  res.render('guestbook', { entries });
};

exports.postGuestbook = (req, res) => {
  entries.push({ message: req.body.message });
  res.redirect('/guestbook');
}; 