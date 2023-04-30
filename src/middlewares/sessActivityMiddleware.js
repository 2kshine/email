const isActive = (req, res, next) => {
  if (req.session.user_id) {
    req.session.touch();
  } else {
    res.status(200).json({
      status: "error",
      message: "You are logged out due to inactivity.",
    });
  }
  next();
};

module.exports = isActive;
