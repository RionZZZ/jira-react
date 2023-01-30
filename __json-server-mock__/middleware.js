module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.userName === "1" && req.body.password === "1") {
      return res.status(200).json({
        user: {
          token: "11111",
        },
      });
    } else {
      return res.status(400).json({
        msg: "error",
      });
    }
  }
  next();
};
