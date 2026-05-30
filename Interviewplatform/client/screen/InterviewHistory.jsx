
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { FaArrowLeft, FaCalendar, FaTrophy } from "react-icons/fa";
import { HiSparkles, HiCheckCircle, HiExclamationTriangle } from "react-icons/hi2";
import axios from "axios";

const InterviewHistory = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyInterviews = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/interview/get-interviews`,
          { withCredentials: true },
        );
        setInterviews(result.data);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("Error fetching interviews:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    getMyInterviews();
  }, []);

  const getStatusConfig = (status) => {
    switch (status) {
      case "completed":
        return {
          bg: "from-green-500/20 to-emerald-500/20",
          border: "border-green-500/40",
          text: "text-green-300",
         
          label: "✓ Completed",
        };
      case "aborted":
        return {
          bg: "from-red-500/20 to-orange-500/20",
          border: "border-red-500/40",
          text: "text-red-300",
          icon: <HiExclamationTriangle size={16} />,
          label: " Aborted",
        };
      default:
        return {
          bg: "from-yellow-500/20 to-amber-500/20",
          border: "border-yellow-500/40",
          text: "text-yellow-300",
          
          label: " Pending",
        };
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "from-green-400 to-emerald-400";
    if (score >= 5) return "from-yellow-400 to-amber-400";
    return "from-red-400 to-orange-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8 sm:py-12 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-start gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="p-3 rounded-full bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md border border-gray-700/50 hover:border-blue-500/50 shadow-lg text-gray-300 hover:text-blue-400 transition-all"
          >
            <FaArrowLeft size={20} />
          </motion.button>

          <div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-white to-green-400 bg-clip-text text-transparent flex items-center gap-2"
            >
             
              Interview History
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 mt-2"
            >
              Track your past interviews and performance insights
            </motion.p>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full"
            />
          </motion.div>
        ) : interviews.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="text-6xl mb-4"
            >
              📋
            </motion.div>
            <p className="text-gray-400 text-lg mb-6">
              No interviews found yet. Start your first interview to begin tracking your progress!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              Start Your First Interview
            </motion.button>
          </motion.div>
        ) : (
          /* Interviews Grid */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <AnimatePresence>
              {interviews.map((item, index) => {
                const statusConfig = getStatusConfig(item.status);
                const scoreColor = getScoreColor(item.finalScore ?? 0);

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    onClick={() => navigate(`/report/${item._id}`)}
                    className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 hover:border-blue-500/50 p-6 cursor-pointer transition-all duration-300 group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      {/* Left Section - Interview Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold">
                            {(item.role || "?").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                              {item.role || "Unknown Role"}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {item.experience || "N/A"} • {(item.mode || "N/A").charAt(0).toUpperCase() + (item.mode || "N/A").slice(1)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <FaCalendar size={14} />
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                            : "N/A"}
                        </div>
                      </div>

                      {/* Right Section - Score & Status */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
                        {/* Score Display */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`flex items-center gap-3 bg-gradient-to-r ${scoreColor} bg-clip-text text-transparent`}
                        >
                          <div className="flex flex-col items-center">
                            <div className="flex items-center gap-1">
                              <FaTrophy size={18} className={`text-yellow-400`} />
                              <span className="text-2xl font-bold">
                                {item.finalScore ?? 0}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400 mt-1">Score</span>
                          </div>
                        </motion.div>

                        {/* Status Badge */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm bg-gradient-to-r ${statusConfig.bg} border ${statusConfig.border} ${statusConfig.text} transition-all`}
                        >
                          {statusConfig.icon}
                          {statusConfig.label}
                        </motion.div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="mt-4 h-1 bg-gray-700/50 rounded-full overflow-hidden origin-left"
                    >
                      <div
                        className={`h-full bg-gradient-to-r ${scoreColor}`}
                        style={{ width: `${(item.finalScore ?? 0) * 10}%` }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Stats Summary - Only show if there are interviews */}
        {!loading && interviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {/* Total Interviews */}
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-blue-500/40 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">
                {interviews.length}
              </div>
              <div className="text-sm text-gray-400">Total Interviews</div>
            </div>

            {/* Average Score */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-500/40 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">
                {(
                  interviews.reduce((sum, i) => sum + (i.finalScore ?? 0), 0) /
                  interviews.length
                ).toFixed(1)}
              </div>
              <div className="text-sm text-gray-400">Average Score</div>
            </div>

            {/* Completed Interviews */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-500/40 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-300 mb-2">
                {interviews.filter((i) => i.status === "completed").length}
              </div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InterviewHistory;
