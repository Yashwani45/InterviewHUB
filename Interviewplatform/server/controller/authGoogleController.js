 // import admin from "../config/firebaseAdmin.js";
// import User from "../model/userModel.js";
// import genToken from "../config/token.js";
// import jwt from "jsonwebtoken";

// export const googleAuth = async (req, res) => {
//   try {
//     console.log("BODY:", req.body);

//     const { token } = req.body;

//     if (!token) {
//       return res.status(400).json({ message: "Token not provided" });
//     }

//     // console.log("TOKEN RECEIVED:", token);

   
//     const decoded = await admin.auth().verifyIdToken(token);

//     console.log("DECODED USER:", decoded);

//     const name = decoded.name || decoded.name || "No Name";
//     const email = decoded.email;

//     if (!email) {
//       return res.status(400).json({ message: "Email not found in token" });
//     }

    
//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//       });
//     }

    
//     const jwtToken = await genToken(user._id);

//     console.log("JWT TOKEN CREATED");

// res.cookie("token", jwtToken, {
//   httpOnly: true,
//   secure: false,
//   sameSite: "lax",
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// });

//     return res.status(200).json({
//   success: true,
//   user,
//   token: jwtToken
// });
// console.log("SENDING TOKEN:", jwtToken);

//   } catch (error) {
//     console.log("AUTH ERROR:", error.message);
//     return res.status(401).json({
//       success: false,
//       message: "Invalid Firebase Token",
//       error: error.message,
//     });
//   }
// };

import admin from "../config/firebaseAdmin.js";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    const decoded = await admin.auth().verifyIdToken(token);

    // CHECK USER
    let existingUser = await User.findOne({
      email: decoded.email,
    });

    // CREATE USER
    if (!existingUser) {
      existingUser = await User.create({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        uid: decoded.uid,
      });
    }

    // JWT TOKEN
    const jwtToken = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        uid: existingUser.uid,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // ✅ Cookie set karo
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      user: existingUser,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Authentication failed",
    });
  }
};

export const Logout = async (req, res) => {
  try {
   
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};