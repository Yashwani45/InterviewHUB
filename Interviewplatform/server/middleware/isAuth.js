import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {

    let token;

    // Cookie token
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // Bearer token
    else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({
        message: "No token found"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;
    req.userId = decoded.userId;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

export default isAuth;