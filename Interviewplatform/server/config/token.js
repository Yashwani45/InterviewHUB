import jwt from "jsonwebtoken";

const genToken = (id) => {

  return jwt.sign(
    { userId: id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

};

export default genToken;