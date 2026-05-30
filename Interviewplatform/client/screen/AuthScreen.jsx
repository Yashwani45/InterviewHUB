
import { BsRobot } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark, HiSparkles } from "react-icons/hi2";
import {
  signInWithPopup,
  getRedirectResult,
} from "firebase/auth";

import { auth, provider } from "../src/utils/firebase.js";

import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { useEffect, useState } from "react";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const AuthScreen = ({ onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // =========================
  // GOOGLE POPUP LOGIN
  // =========================
  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);

      // Firebase Google Login
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // Firebase Token
      const firebaseToken = await user.getIdToken();

      // Send token to backend
      const response = await axios.post(
        `${serverUrl}/api/auth/google`,
        {
          token: firebaseToken,
        },
        {
          withCredentials: true,
        }
      );

      console.log("FULL RESPONSE:", response.data);

      // Backend JWT Token
      const jwtToken = response?.data?.token;

      console.log("JWT TOKEN:", jwtToken);

      // Save JWT
      if (jwtToken) {
        localStorage.setItem("token", jwtToken);
      }

      // Save user in redux
      dispatch(setUserData(response.data.user));

      // Close modal
      onClose();

    } catch (error) {
      console.log("GOOGLE LOGIN ERROR:", error);

      dispatch(setUserData(null));

    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // REDIRECT LOGIN
  // =========================
  useEffect(() => {
    const fetchRedirectUser = async () => {
      try {
        const result = await getRedirectResult(auth);

        if (result?.user) {
          const user = result.user;

          const firebaseToken = await user.getIdToken(true);

          const response = await axios.post(
            `${serverUrl}/api/auth/google`,
            {
              token: firebaseToken,
            },
            {
              withCredentials: true,
            }
          );

          console.log("REDIRECT RESPONSE:", response.data);

          const jwtToken = response?.data?.token;

          console.log("REDIRECT JWT:", jwtToken);

          if (jwtToken) {
            localStorage.setItem("token", jwtToken);
          }

          dispatch(setUserData(response.data.user));

          onClose();
        }

      } catch (error) {
        console.log("REDIRECT LOGIN ERROR:", error);
      }
    };

    fetchRedirectUser();
  }, [dispatch, onClose]);
// import { BsRobot } from "react-icons/bs";
// import { FcGoogle } from "react-icons/fc";
// import { motion, AnimatePresence } from "framer-motion";
// import { HiXMark, HiSparkles } from "react-icons/hi2";
// import {
//   signInWithPopup,
//   getRedirectResult
// } from "firebase/auth";

// import { auth, provider } from "../src/utils/firebase.js";

// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../redux/userSlice.js";
// import { useEffect, useState } from "react";

// const serverUrl = import.meta.env.VITE_SERVER_URL;

// const AuthScreen = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);

//   // GOOGLE LOGIN
//   const handleGoogleAuth = async () => {
//     try {
//       setIsLoading(true);
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       const token = await user.getIdToken();

// const response = await axios.post(
//   `${serverUrl}/api/auth/google`,
//   { token },
//   { withCredentials: true }
// );
// const jwtToken = response.data.token;

// console.log("JWT TOKEN:", jwtToken);

// localStorage.setItem("token", jwtToken);
// if (jwtToken) {
//   localStorage.setItem("token", jwtToken);
// }

// dispatch(setUserData(response.data.user));



// onClose();

//     } catch (error) {
//       console.log("GOOGLE LOGIN ERROR:", error);
//       dispatch(setUserData(null));
//       setIsLoading(false);
//     }
//   };

//   // REDIRECT LOGIN
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const result = await getRedirectResult(auth);

//         if (result?.user) {
//           const user = result.user;
//           const token = await user.getIdToken(true);

//          const response = await axios.post(
//   `${serverUrl}/api/auth/google`,
//   { token },
//   { withCredentials: true }
// );

// const jwtToken = response?.data?.token;

// if (jwtToken) {
//   localStorage.setItem("token", jwtToken);
// }

// dispatch(setUserData(response.data.user));

// onClose();
//         }

//       } catch (error) {
//         console.log("REDIRECT LOGIN ERROR:", error);
//       }
//     };

//     fetchUser();
//   }, [dispatch]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md px-4 py-8">
        
        {/* Background Glow Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        </div>

        {/* MODAL CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 60 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700/50 rounded-3xl shadow-2xl p-8 sm:p-10 overflow-hidden"
        >

          {/* CLOSE BUTTON */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 hover:from-red-500/40 hover:to-red-600/40 border border-red-500/50 text-red-400 hover:text-red-300 flex items-center justify-center transition-all duration-300"
          >
            <HiXMark size={22} />
          </motion.button>

          {/* GLOW EFFECTS */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/15 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 right-0 w-60 h-60 bg-green-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* CONTENT */}
          <div className="relative z-10 space-y-8">

            {/* LOGO & BRANDING */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-center gap-3"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 12 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-blue-500 to-cyan-400 p-3 rounded-xl shadow-lg shadow-blue-500/30"
              >
                <BsRobot size={26} className="text-white" />
              </motion.div>

              <div>
                <h2 className="font-bold text-2xl bg-gradient-to-r from-blue-400 via-white to-cyan-400 bg-clip-text text-transparent">
                  InterviewHub
                </h2>
                <p className="text-xs text-gray-500 mt-0.5 tracking-wider uppercase">
                  AI Interview Platform
                </p>
              </div>
            </motion.div>

            {/* MAIN HEADING */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-center space-y-3"
            >
              <div className="flex items-center justify-center gap-2">
                
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Welcome</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black leading-tight text-white">
                Ace Your <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                  Next Interview
                </span>
              </h1>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center text-sm sm:text-base leading-relaxed text-gray-400"
            >
              Practice with AI-powered interviews, get real-time feedback, build confidence, and track your progress with detailed analytics.
            </motion.p>

            {/* BENEFITS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { icon: "🤖", label: "AI Powered" },
                { icon: "📊", label: "Real Feedback" },
                { icon: "📈", label: "Track Growth" }
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-lg p-3 text-center hover:border-blue-500/50 transition-all"
                >
                  <div className="text-2xl mb-1">{benefit.icon}</div>
                  <p className="text-xs text-gray-400 font-medium">{benefit.label}</p>
                </div>
              ))}
            </motion.div>

            {/* GOOGLE BUTTON */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={handleGoogleAuth}
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.03 }}
              whileTap={{ scale: isLoading ? 1 : 0.97 }}
              className="w-full flex items-center justify-center gap-3 py-2 sm:py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <div className="bg-white rounded-lg p-2 group-hover:scale-110 transition-transform">
                    <FcGoogle size={20} />
                  </div>
                  Continue with Google
                </>
              )}
            </motion.button>

             

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};

export default AuthScreen;
