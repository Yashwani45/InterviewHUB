import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FaUserTie, FaChartLine, FaMicrophoneAlt, FaFileUpload } from 'react-icons/fa'
import { HiSparkles, HiCheckCircle } from 'react-icons/hi2'
import axios from 'axios'

const Step1Setup = ({ onStart }) => {
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false);
  const [experience, setExperience] = useState('')
  const [interview, setInterview] = useState("technical")
  const [project, setProject] = useState([])
  const [skills, setSkills] = useState([])
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeText, setResumeText] = useState("")
  const [analysisDone, setAnalysisDone] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  

  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData.items;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.kind === "file") {
          const file = item.getAsFile();

          if (file) {
            setResumeFile(file);
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  // ✅ START INTERVIEW
  const handleStart = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/interview/generate-questions`,
        {
          role,
          experience,
          mode: interview,
          resumeText,
          projects: project,
          skills
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onStart(result.data);
      setLoading(false);

    } catch (error) {
      console.error(
        "Error generating questions:",
        error.response?.data || error.message
      );
      setLoading(false);
    }
  };

  // ✅ RESUME ANALYSIS
  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;
const token = localStorage.getItem("token");
    setAnalyzing(true);

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/interview/resume`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const projectsData = result.data.projects;
      const skillsData = result.data.skills;

      setRole(result.data.role || "");
      setExperience(result.data.experience || "");

      setProject(
        Array.isArray(projectsData)
          ? projectsData
          : typeof projectsData === "string"
          ? projectsData.split(",")
          : []
      );

      setSkills(
        Array.isArray(skillsData)
          ? skillsData
          : typeof skillsData === "string"
          ? skillsData.split(",")
          : []
      );

      setResumeText(result.data.resumeText || "");
      setAnalysisDone(true);

    } catch (error) {
      console.error(
        "Error analyzing resume:",
        error.response?.data || error.message
      );
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-8'
    >
      {/* Background Glow Effects */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl'/>
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl'/>
      </div>

      <div className='w-full max-w-5xl relative z-10'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-700/50 grid md:grid-cols-2 overflow-hidden hover:border-blue-500/30 transition-all duration-300'
        >

          {/* Left Side - Info Section */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className='bg-gradient-to-br from-blue-900/40 via-gray-900/40 to-gray-900/20 flex flex-col justify-center p-10 md:p-12 border-r border-gray-700/30'
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-white to-green-400 bg-clip-text text-transparent mb-4'>
                Start Your AI Interview
              </h2>

              <p className='text-gray-400 text-lg mb-10 leading-relaxed'>
                Practice real interview scenarios with intelligent follow-ups and real-time feedback.
              </p>
            </motion.div>

            <div className='space-y-4'>
              {[
                { icon: <FaUserTie />, text: "Choose Role & Experience", color: 'from-blue-500 to-cyan-400' },
                { icon: <FaMicrophoneAlt />, text: "Smart Voice Interview", color: 'from-cyan-500 to-blue-400' },
                { icon: <FaChartLine />, text: "Get Performance Feedback", color: 'from-green-500 to-emerald-400' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className='flex items-center gap-4 bg-gradient-to-r from-gray-800/50 to-gray-700/30 hover:from-gray-800/70 hover:to-gray-700/50 p-4 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 group'
                >
                  <div className={`bg-gradient-to-br ${item.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <span className='text-gray-300 font-medium group-hover:text-white transition-colors'>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Form Section */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className='bg-gradient-to-br from-gray-900/60 to-black/40 p-10 md:p-12 space-y-6'
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className='text-3xl font-bold text-white mb-2'>Ready to Begin?</h3>
              <div className='h-1 w-16 bg-gradient-to-r from-blue-500 to-green-400 rounded-full'/>
            </motion.div>

            {/* Role Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label className='text-sm font-semibold text-gray-300 mb-2 block'>Job Role *</label>
              <input
                type="text"
                placeholder='e.g. Senior Software Engineer'
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 focus:border-blue-500 text-white placeholder-gray-500 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
              />
            </motion.div>

            {/* Experience Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <label className='text-sm font-semibold text-gray-300 mb-2 block'>Years of Experience *</label>
              <input
                type="text"
                placeholder='e.g. 5 years'
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 focus:border-blue-500 text-white placeholder-gray-500 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
              />
            </motion.div>

            {/* Interview Mode Select */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className='text-sm font-semibold text-gray-300 mb-2 block'>Interview Type *</label>
              <select
                value={interview}
                onChange={(e) => setInterview(e.target.value)}
                className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 focus:border-blue-500 text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer'
              >
                <option value="technical" className='bg-gray-800'>Technical Interview</option>
                <option value="hr" className='bg-gray-800'>HR Interview</option>
              </select>
            </motion.div>

            {/* Resume Upload Area */}
            {!analysisDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                onClick={() => document.getElementById("resumeUpload").click()}
                className='border-2 border-dashed border-gray-700/50 hover:border-blue-500/70 p-8 text-center rounded-xl cursor-pointer hover:bg-blue-500/5 transition-all duration-300 group'
              >
                <input
                  type='file'
                  id='resumeUpload'
                  className='hidden'
                  accept=".docx,.pdf,.txt"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className='text-4xl mb-3 text-blue-400 group-hover:text-blue-300 transition-colors'
                >
                  <FaFileUpload className='mx-auto'/>
                </motion.div>

                <p className='text-gray-300 font-medium'>
                  {resumeFile
                    ? ` ${resumeFile.name}`
                    : "Drag & drop or click to upload resume"
                  }
                </p>

                <p className='text-gray-500 text-sm mt-2'>Supported: DOCX, PDF, TXT</p>

                {resumeFile && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadResume();
                    }}
                    disabled={analyzing}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {analyzing ? " Analyzing..." : " Analyze Resume"}
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Analysis Results */}
            <AnimatePresence>
              {analysisDone && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className='bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 p-6 rounded-xl space-y-4'
                >
                  <div className='flex items-center gap-2 text-green-400'>
                    <HiCheckCircle size={20}/>
                    <p className='font-semibold'>Resume Analyzed Successfully!</p>
                  </div>

                  {skills.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-2'>Skills Detected</p>
                      <div className='flex flex-wrap gap-2'>
                        {skills.slice(0, 5).map((s, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className='bg-gradient-to-r from-blue-500/30 to-green-400/30 border border-blue-400/50 text-blue-300 px-3 py-1 rounded-full text-sm font-medium'
                          >
                            {s}
                          </motion.span>
                        ))}
                        {skills.length > 5 && <span className='text-gray-400 text-sm'>+{skills.length - 5} more</span>}
                      </div>
                    </motion.div>
                  )}

                  {project.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-2'>Projects Found</p>
                      <ul className='space-y-1'>
                        {project.slice(0, 3).map((p, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className='text-gray-300 text-sm flex items-center gap-2'
                          >
                            <span className='text-green-400'>•</span> {p}
                          </motion.li>
                        ))}
                        {project.length > 3 && <li className='text-gray-500 text-sm'>+{project.length - 3} more</li>}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Start Interview Button */}
            <motion.button
              onClick={handleStart}
              disabled={!role || !experience || loading}
              whileHover={{ scale: !role || !experience || loading ? 1 : 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className='w-full bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white font-bold py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2'
            >
              <span className='text-lg'>
                {loading ? '' : ''}
              </span>
              {loading ? 'Generating Interview...' : 'Start Interview'}
            </motion.button>

            {(!role || !experience) && (
              <p className='text-gray-400 text-sm text-center'>
                Fill in all required fields to begin
              </p>
            )}

          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Step1Setup;



// import React, { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'motion/react'
// import { FaUserTie, FaChartLine, FaMicrophoneAlt, FaFileUpload } from 'react-icons/fa'
// import { HiSparkles, HiCheckCircle } from 'react-icons/hi2'
// import axios from 'axios'

// const Step1Setup = ({ onStart }) => {
//   const [role, setRole] = useState('')
//   const [loading, setLoading] = useState(false);
//   const [experience, setExperience] = useState('')
//   const [interview, setInterview] = useState("technical")
//   const [project, setProject] = useState([])
//   const [skills, setSkills] = useState([])
//   const [resumeFile, setResumeFile] = useState(null)
//   const [resumeText, setResumeText] = useState("")
//   const [analysisDone, setAnalysisDone] = useState(false)
//   const [analyzing, setAnalyzing] = useState(false)

//   useEffect(() => {
//     const handlePaste = (e) => {
//       const items = e.clipboardData.items;

//       for (let i = 0; i < items.length; i++) {
//         const item = items[i];

//         if (item.kind === "file") {
//           const file = item.getAsFile();

//           if (file) {
//             setResumeFile(file); 
//           }
//         }
//       }
//     };

//     window.addEventListener("paste", handlePaste);

//     return () => {
//       window.removeEventListener("paste", handlePaste);
//     };
//   }, []);

//   const handleStart = async () => {
//     setLoading(true);

//     try { 
//       const result = await axios.post(
//         `${import.meta.env.VITE_SERVER_URL}/api/interview/generate-questions`,
//         { role, experience, mode: interview, resumeText, project, skills },
//         { withCredentials: true }
//       )
//       onStart(result.data);
//       setLoading(false);
//     }
//     catch (error) {
//       console.error("Error generating questions:", error.response?.data || error.message);
//       setLoading(false);
//     }
//   }

//   const handleUploadResume = async () => {
//     if (!resumeFile || analyzing) return;

//     setAnalyzing(true);

//     const formData = new FormData();
//     formData.append("resume", resumeFile);

//     try {
//       const result = await axios.post(
//         `${import.meta.env.VITE_SERVER_URL}/api/interview/resume`,
//         formData,
//         { withCredentials: true }
//       );

//       const projectsData = result.data.projects;
//       const skillsData = result.data.skills;

//       setRole(result.data.role || "");
//       setExperience(result.data.experience || "");

//       setProject(
//         Array.isArray(projectsData)
//           ? projectsData
//           : typeof projectsData === "string"
//           ? projectsData.split(",")
//           : []
//       );

//       setSkills(
//         Array.isArray(skillsData)
//           ? skillsData
//           : typeof skillsData === "string"
//           ? skillsData.split(",")
//           : []
//       );

//       setResumeText(result.data.resumeText || "");
//       setAnalysisDone(true);

//     } catch (error) {
//       console.error("Error analyzing resume:", error.response?.data || error.message);
//     } finally {
//       setAnalyzing(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-8'
//     >
//       {/* Background Glow Effects */}
//       <div className='absolute inset-0 overflow-hidden pointer-events-none'>
//         <div className='absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl'/>
//         <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl'/>
//       </div>

//       <div className='w-full max-w-5xl relative z-10'>
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95, y: 40 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className='bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-700/50 grid md:grid-cols-2 overflow-hidden hover:border-blue-500/30 transition-all duration-300'
//         >

//           {/* Left Side - Info Section */}
//           <motion.div
//             initial={{ x: -80, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.7, delay: 0.1 }}
//             className='bg-gradient-to-br from-blue-900/40 via-gray-900/40 to-gray-900/20 flex flex-col justify-center p-10 md:p-12 border-r border-gray-700/30'
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-white to-green-400 bg-clip-text text-transparent mb-4'>
//                 Start Your AI Interview
//               </h2>

//               <p className='text-gray-400 text-lg mb-10 leading-relaxed'>
//                 Practice real interview scenarios with intelligent follow-ups and real-time feedback.
//               </p>
//             </motion.div>

//             <div className='space-y-4'>
//               {[
//                 { icon: <FaUserTie />, text: "Choose Role & Experience", color: 'from-blue-500 to-cyan-400' },
//                 { icon: <FaMicrophoneAlt />, text: "Smart Voice Interview", color: 'from-cyan-500 to-blue-400' },
//                 { icon: <FaChartLine />, text: "Get Performance Feedback", color: 'from-green-500 to-emerald-400' }
//               ].map((item, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
//                   whileHover={{ x: 8 }}
//                   className='flex items-center gap-4 bg-gradient-to-r from-gray-800/50 to-gray-700/30 hover:from-gray-800/70 hover:to-gray-700/50 p-4 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 group'
//                 >
//                   <div className={`bg-gradient-to-br ${item.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
//                     {item.icon}
//                   </div>
//                   <span className='text-gray-300 font-medium group-hover:text-white transition-colors'>
//                     {item.text}
//                   </span>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Right Side - Form Section */}
//           <motion.div
//             initial={{ x: 80, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.7, delay: 0.1 }}
//             className='bg-gradient-to-br from-gray-900/60 to-black/40 p-10 md:p-12 space-y-6'
//           >
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               <h3 className='text-3xl font-bold text-white mb-2'>Ready to Begin?</h3>
//               <div className='h-1 w-16 bg-gradient-to-r from-blue-500 to-green-400 rounded-full'/>
//             </motion.div>

//             {/* Role Input */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               <label className='text-sm font-semibold text-gray-300 mb-2 block'>Job Role *</label>
//               <input
//                 type="text"
//                 placeholder='e.g. Senior Software Engineer'
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 focus:border-blue-500 text-white placeholder-gray-500 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
//               />
//             </motion.div>

//             {/* Experience Input */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.35 }}
//             >
//               <label className='text-sm font-semibold text-gray-300 mb-2 block'>Years of Experience *</label>
//               <input
//                 type="text"
//                 placeholder='e.g. 5 years'
//                 value={experience}
//                 onChange={(e) => setExperience(e.target.value)}
//                 className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 focus:border-blue-500 text-white placeholder-gray-500 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
//               />
//             </motion.div>

//             {/* Interview Mode Select */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               <label className='text-sm font-semibold text-gray-300 mb-2 block'>Interview Type *</label>
//               <select
//                 value={interview}
//                 onChange={(e) => setInterview(e.target.value)}
//                 className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 focus:border-blue-500 text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer'
//               >
//                 <option value="technical" className='bg-gray-800'>Technical Interview</option>
//                 <option value="hr" className='bg-gray-800'>HR Interview</option>
//               </select>
//             </motion.div>

//             {/* Resume Upload Area */}
//             {!analysisDone && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.45 }}
//                 onClick={() => document.getElementById("resumeUpload").click()}
//                 className='border-2 border-dashed border-gray-700/50 hover:border-blue-500/70 p-8 text-center rounded-xl cursor-pointer hover:bg-blue-500/5 transition-all duration-300 group'
//               >
//                 <input
//                   type='file'
//                   id='resumeUpload'
//                   className='hidden'
//                   accept=".docx,.pdf,.txt"
//                   onChange={(e) => setResumeFile(e.target.files[0])}
//                 />

//                 <motion.div
//                   whileHover={{ scale: 1.1 }}
//                   className='text-4xl mb-3 text-blue-400 group-hover:text-blue-300 transition-colors'
//                 >
//                   <FaFileUpload className='mx-auto'/>
//                 </motion.div>

//                 <p className='text-gray-300 font-medium'>
//                   {resumeFile
//                     ? ` ${resumeFile.name}`
//                     : "Drag & drop or click to upload resume"
//                   }
//                 </p>

//                 <p className='text-gray-500 text-sm mt-2'>Supported: DOCX, PDF, TXT</p>

//                 {resumeFile && (
//                   <motion.button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleUploadResume();
//                     }}
//                     disabled={analyzing}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className='mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
//                   >
//                     {analyzing ? " Analyzing..." : " Analyze Resume"}
//                   </motion.button>
//                 )}
//               </motion.div>
//             )}

//             {/* Analysis Results */}
//             <AnimatePresence>
//               {analysisDone && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.5 }}
//                   className='bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 p-6 rounded-xl space-y-4'
//                 >
//                   <div className='flex items-center gap-2 text-green-400'>
//                     <HiCheckCircle size={20}/>
//                     <p className='font-semibold'>Resume Analyzed Successfully!</p>
//                   </div>

//                   {skills.length > 0 && (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.1 }}
//                     >
//                       <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-2'>Skills Detected</p>
//                       <div className='flex flex-wrap gap-2'>
//                         {skills.slice(0, 5).map((s, i) => (
//                           <motion.span
//                             key={i}
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ delay: i * 0.05 }}
//                             className='bg-gradient-to-r from-blue-500/30 to-green-400/30 border border-blue-400/50 text-blue-300 px-3 py-1 rounded-full text-sm font-medium'
//                           >
//                             {s}
//                           </motion.span>
//                         ))}
//                         {skills.length > 5 && <span className='text-gray-400 text-sm'>+{skills.length - 5} more</span>}
//                       </div>
//                     </motion.div>
//                   )}

//                   {project.length > 0 && (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.2 }}
//                     >
//                       <p className='text-xs text-gray-400 uppercase tracking-wider font-bold mb-2'>Projects Found</p>
//                       <ul className='space-y-1'>
//                         {project.slice(0, 3).map((p, i) => (
//                           <motion.li
//                             key={i}
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: i * 0.05 }}
//                             className='text-gray-300 text-sm flex items-center gap-2'
//                           >
//                             <span className='text-green-400'>•</span> {p}
//                           </motion.li>
//                         ))}
//                         {project.length > 3 && <li className='text-gray-500 text-sm'>+{project.length - 3} more</li>}
//                       </ul>
//                     </motion.div>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Start Interview Button */}
//             <motion.button
//               onClick={handleStart}
//               disabled={!role || !experience || loading}
//               whileHover={{ scale: !role || !experience || loading ? 1 : 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.5 }}
//               className='w-full bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white font-bold py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2'
//             >
//               <span className='text-lg'>
//                 {loading ? '' : ''}
//               </span>
//               {loading ? 'Generating Interview...' : 'Start Interview'}
//             </motion.button>

//             {(!role || !experience) && (
//               <p className='text-gray-400 text-sm text-center'>
//                 Fill in all required fields to begin
//               </p>
//             )}

//           </motion.div>
//         </motion.div>
//       </div>
//     </motion.div>
//   )
// }

// export default Step1Setup
