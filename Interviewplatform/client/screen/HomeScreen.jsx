

import Navbar from '../componets/Navbar'
import { HiSparkles } from 'react-icons/hi'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuthModel from '../componets/authModel'
import { BsBarChart, BsClock, BsFileEarmark, BsMic, BsRobot } from 'react-icons/bs'
import Footer from '../componets/Footer'

// Image Imports
import aiAns from "../src/assets/ai-ans.png";
import resume from "../src/assets/resume.png";
import pdf from "../src/assets/pdf.png";
import history from "../src/assets/history.png";

import hr from "../src/assets/HR.png";
import tech from "../src/assets/tech.png";
import confi from "../src/assets/confi.png";
import ai from "../src/assets/ai.png";

const HomeScreen = () => {

  const [showAuth, setShowAuth] = useState(false);

  const { userData } = useSelector((state) => state.user)

  const navigate = useNavigate();

  const features = [
    {
      image: aiAns,
      icon: <BsBarChart size={24} />,
      title: "AI Evaluated Answers",
      desc: "Get scores on communication, technical accuracy, and confidence with detailed feedback."
    },
    {
      image: resume,
      icon: <BsFileEarmark size={24} />,
      title: "Resume-Based Interview",
      desc: "Technical questions tailored to projects and skills mentioned in your resume."
    },
    {
      image: pdf,
      icon: <BsFileEarmark size={24} />,
      title: "Download Reports",
      desc: "Comprehensive analyzed reports highlighting your strengths and areas for improvement."
    },
    {
      image: history,
      icon: <BsBarChart size={24} />,
      title: "Analytics & History",
      desc: "Track your progress over time with detailed graphical representations and insights."
    }
  ];

  const interviewModes = [
    {
      image: hr,
      title: "HR Interview",
      desc: "Evaluated on communication skills, behavioral responses, and cultural fit."
    },
    {
      image: tech,
      title: "Technical Interview",
      desc: "Deep technical questioning based on your selected role and expertise level."
    },
    {
      image: confi,
      title: "Confidence Analyzer",
      desc: "AI-powered tone and voice analysis for real-time confidence insights and coaching."
    },
    {
      image: ai,
      title: "AI Feedback Engine",
      desc: "Get instant, actionable improvement suggestions after each interview session."
    }
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black flex flex-col'>

      <Navbar />

      <div className='flex-1 px-6 py-16'>
        <div className='max-w-6xl mx-auto'>

          {/* Badge Section */}
          <div className='flex justify-center mb-8'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className='bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-500/50 text-green-300 px-6 py-3 rounded-full flex items-center gap-2 font-semibold'
            >
              <HiSparkles size={18} className='text-green-400' />
              AI Powered Smart Mock Interview Platform
            </motion.div>
          </div>

          {/* Hero Section */}
          <div className='text-center mb-24'>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className='text-5xl md:text-7xl font-bold leading-tight max-w-5xl mx-auto mb-6 text-white'
            >
              Master Your
              <br />
              <span className='bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent'>
                Interview Skills
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-gray-400 mt-6 max-w-3xl mx-auto text-lg leading-relaxed'
            >
              Role-based mock interviews with smart follow-ups, adaptive difficulty,
              and real-time performance evaluation.
              Practice with AI interviewers and get detailed feedback
              to land your dream job.
            </motion.p>

            {/* CTA Buttons */}
            <div className='flex flex-wrap justify-center gap-4 mt-12'>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return
                  }
                  navigate('/interview')
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300'
              >
                Start Interview
              </motion.button>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return
                  }
                  navigate('/history')
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className='border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-gray-800/50 hover:bg-gray-700/50'
              >
                View History
              </motion.button>

            </div>
          </div>

          {/* Features Section */}
          <div className='mb-32'>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl font-bold text-center mb-16 text-white'
            >
              Advanced AI{" "}
              <span className='bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent'>
                Features
              </span>
            </motion.h2>

            <div className='grid md:grid-cols-2 gap-8'>

              {features.map((item, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className='bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300'
                >

                  <div className='flex flex-col md:flex-row items-center gap-8'>

                    <div className='w-full md:w-1/2 flex justify-center'>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='w-full h-auto object-contain max-h-56 rounded-lg'
                      />
                    </div>

                    <div className='w-full md:w-1/2'>

                      <div className='bg-gradient-to-r from-blue-500/30 to-green-400/30 text-blue-300 w-12 h-12 rounded-xl flex items-center justify-center mb-4'>
                        {item.icon}
                      </div>

                      <h3 className='font-bold mb-3 text-xl text-white'>
                        {item.title}
                      </h3>

                      <p className='text-gray-400 text-sm leading-relaxed'>
                        {item.desc}
                      </p>

                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interview Modes Section */}
          <div className='mb-32'>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl font-bold text-center mb-16 text-white'
            >
              Multiple Interview{" "}
              <span className='bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent'>
                Modes
              </span>
            </motion.h2>

            <div className='grid md:grid-cols-2 gap-8'>

              {interviewModes.map((item, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -4 }}
                  className='bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300'
                >

                  <div className='flex items-center justify-between gap-6'>

                    <div className='flex-1'>

                      <h3 className='font-bold mb-3 text-xl text-white'>
                        {item.title}
                      </h3>

                      <p className='text-gray-400 text-sm leading-relaxed'>
                        {item.desc}
                      </p>

                    </div>

                    <div className='flex-shrink-0'>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='w-32 h-32 object-contain rounded-lg'
                      />
                    </div>

                  </div>

                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

      <Footer />

    </div>
  )
}

export default HomeScreen
// import Navbar from '../componets/Navbar'
// import { HiSparkles } from 'react-icons/hi'
// import { motion }from 'motion/react'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import AuthModel from '../componets/authModel'
// import { BsBarChart, BsClock, BsFileEarmark, BsMic, BsRobot } from 'react-icons/bs'
// import Footer from '../componets/Footer'

// const HomeScreen = () => {
//       const[ showAuth , setShowAuth ] = useState(false);
//       const {userData} = useSelector((state)=> state.user)
//       const navigate = useNavigate();

//   return (
//     <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black flex flex-col'>
//       <Navbar/>
//       <div className='flex-1 px-6 py-16'>
//         <div className='max-w-6xl mx-auto'>

//           {/* Badge Section */}
//           <div className='flex justify-center mb-8'>
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//               className='bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-500/50 text-green-300 px-6 py-3 rounded-full flex items-center gap-2 font-semibold'
//             >
//               <HiSparkles size={18} className='text-green-400'/>
//               AI Powered Smart Mock Interview Platform 
//             </motion.div>
//           </div>

//           {/* Hero Section */}
//           <div className='text-center mb-24'>
//             <motion.h1
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, ease: "easeOut" }}
//               className='text-5xl md:text-7xl font-bold leading-tight max-w-5xl mx-auto mb-6 text-white'
//             >
//               Master Your
//               <br/>
//               <span className='bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent'>
//                 Interview Skills
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className='text-gray-400 mt-6 max-w-3xl mx-auto text-lg leading-relaxed'
//             >
//               Role-based mock interviews with smart follow-ups, adaptive difficulty, and real-time performance evaluation. Practice with AI interviewers and get detailed feedback to land your dream job.
//             </motion.p>

//             {/* CTA Buttons */}
//             <div className='flex flex-wrap justify-center gap-4 mt-12'>
//               <motion.button
//                 onClick={() => {
//                   if(!userData) {
//                     setShowAuth(true)
//                     return
//                   }
//                   navigate('/interview')
//                 }}
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2'
//               >
//                 <span className='text-lg'></span>
//                 Start Interview
//               </motion.button>

//               <motion.button
//                 onClick={() => {
//                   if(!userData) {
//                     setShowAuth(true)
//                     return
//                   }
//                   navigate('/history')
//                 }}
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 className='border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-gray-800/50 hover:bg-gray-700/50'
//               >
//                  View History
//               </motion.button>
//             </div>
//           </div>

//           {/* Steps Section */}
//           <div className='mb-32'>
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className='text-4xl font-bold text-center mb-16 text-white'
//             >
//               How It <span className='bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent'>Works</span>
//             </motion.h2>

//             <div className='flex flex-col md:flex-row justify-center items-center gap-6 md:gap-4'>
//               {[
//                 {
//                   icon: <BsRobot size={24}/>,
//                   step: "STEP 1",
//                   title: "Role & Experience Selection",
//                   desc: "Choose your target position and experience level. AI adapts difficulty accordingly."
//                 },
//                 {
//                   icon: <BsMic size={24}/>,
//                   step: "STEP 2",
//                   title: "Smart Voice Interview",
//                   desc: "Answer dynamic questions with smart follow-ups based on your responses."
//                 },
//                 {
//                   icon: <BsClock size={24}/>,
//                   step: "STEP 3",
//                   title: "Timer-Based Simulation",
//                   desc: "Experience real interview pressure with time tracking and performance metrics."
//                 }
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 60 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.2 }}
//                   whileHover={{ y: -6, scale: 1.02 }}
//                   className='bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-700/50 p-8 w-full md:w-80 hover:border-blue-500/50 transition-all duration-300'
//                 >
//                   <div className='relative pt-6 text-center'>
//                     <div className='absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-blue-500 to-green-400 p-3 rounded-xl shadow-lg'>
//                       <div className='text-white'>
//                         {item.icon}
//                       </div>
//                     </div>

//                     <div className='text-xs text-blue-400 font-bold mb-3 tracking-wider uppercase'>
//                       {item.step}
//                     </div>

//                     <h3 className='font-bold mb-3 text-lg text-white'>
//                       {item.title}
//                     </h3>

//                     <p className='text-sm text-gray-400 leading-relaxed'>
//                       {item.desc}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Features Section */}
//           <div className='mb-32'>
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className='text-4xl font-bold text-center mb-16 text-white'
//             >
//               Advanced AI <span className='bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent'>Features</span>
//             </motion.h2>

//             <div className='grid md:grid-cols-2 gap-8'>
//               {[
//                 {
//                   image: "../src/assets/ai-ans.png",
//                   icon: <BsBarChart size={24}/>,
//                   title: "AI Evaluated Answers",
//                   desc: "Get scores on communication, technical accuracy, and confidence with detailed feedback."
//                 },
//                 {
//                   image: "../src/assets/resume.png",
//                   icon: <BsFileEarmark size={24}/>,
//                   title: "Resume-Based Interview",
//                   desc: "Technical questions tailored to projects and skills mentioned in your resume."
//                 },
//                 {
//                   image: "../src/assets/pdf.png",
//                   icon: <BsFileEarmark size={24}/>,
//                   title: "Download Reports",
//                   desc: "Comprehensive analyzed reports highlighting your strengths and areas for improvement."
//                 },
//                 {
//                   image: "../src/assets/history.png",
//                   icon: <BsBarChart size={24}/>,
//                   title: "Analytics & History",
//                   desc: "Track your progress over time with detailed graphical representations and insights."
//                 }
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 40 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.15 }}
//                   whileHover={{ y: -4, scale: 1.01 }}
//                   className='bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300'
//                 >
//                   <div className='flex flex-col md:flex-row items-center gap-8'>
//                     <div className='w-full md:w-1/2 flex justify-center'>
//                       <img src={item.image} alt={item.title} className='w-full h-auto object-contain max-h-56 rounded-lg'/>
//                     </div>

//                     <div className='w-full md:w-1/2'>
//                       <div className='bg-gradient-to-r from-blue-500/30 to-green-400/30 text-blue-300 w-12 h-12 rounded-xl flex items-center justify-center mb-4'>
//                         {item.icon}
//                       </div>

//                       <h3 className='font-bold mb-3 text-xl text-white'>
//                         {item.title}
//                       </h3>

//                       <p className='text-gray-400 text-sm leading-relaxed'>
//                         {item.desc}
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Interview Modes Section */}
//           <div className='mb-32'>
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className='text-4xl font-bold text-center mb-16 text-white'
//             >
//               Multiple Interview <span className='bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent'>Modes</span>
//             </motion.h2>

//             <div className='grid md:grid-cols-2 gap-8'>
//               {[
//                 {
//                   image: "../src/assets/HR.png",
//                   title: "HR Interview",
//                   desc: "Evaluated on communication skills, behavioral responses, and cultural fit."
//                 },
//                 {
//                   image: "../src/assets/tech.png",
//                   title: "Technical Interview",
//                   desc: "Deep technical questioning based on your selected role and expertise level."
//                 },
//                 {
//                   image: "../src/assets/confi.png",
//                   title: "Confidence Analyzer",
//                   desc: "AI-powered tone and voice analysis for real-time confidence insights and coaching."
//                 },
//                 {
//                   image: "../src/assets/ai.png",
//                   title: "AI Feedback Engine",
//                   desc: "Get instant, actionable improvement suggestions after each interview session."
//                 }
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 40 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.15 }}
//                   whileHover={{ y: -4 }}
//                   className='bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300'
//                 >
//                   <div className='flex items-center justify-between gap-6'>
//                     <div className='flex-1'>
//                       <h3 className='font-bold mb-3 text-xl text-white'>
//                         {item.title}
//                       </h3>

//                       <p className='text-gray-400 text-sm leading-relaxed'>
//                         {item.desc}
//                       </p>
//                     </div>

//                     <div className='flex-shrink-0'>
//                       <img src={item.image} alt={item.title} className='w-32 h-32 object-contain rounded-lg'/>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>

//       {showAuth && <AuthModel onClose={() => setShowAuth(false)}/>}
//       <Footer/>
//     </div>
//   )
// }

// export default HomeScreen
