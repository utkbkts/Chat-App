export default (user, statusCode, res) => {
  const jwtToken = user.getJwtToken();

  const setCookies = () => {
    res.cookie("jwtToken", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: process.env.COOKIE_EXPRES_TIME * 24 * 60 * 60 * 1000,
    });
  };
  setCookies();
  res.status(statusCode).json({
    user,
  });
};
