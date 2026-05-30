
// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { FaTimes } from 'react-icons/fa'
// import AuthScreen from '../screen/AuthScreen'
// import { motion, AnimatePresence } from 'framer-motion'

// const AuthModel = ({ onClose }) => {

//   const { userData } = useSelector((state) => state.user)

//   useEffect(() => {
//     if (userData) {
//       onClose()
//     }
//   }, [userData, onClose])

//   return (

//     <AnimatePresence>

//       <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md px-4'>

//         {/* CARD */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8, y: 40 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.8, y: 40 }}
//           transition={{ duration: 0.35 }}
//           className='relative w-full max-w-md'
//         >

//           {/* CLOSE BUTTON */}
//           <button
//             onClick={onClose}
//             className='absolute -top-4 -right-4 z-50 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-110 transition'
//           >
//             <FaTimes size={16} />
//           </button>

//           {/* AUTH SCREEN */}
//           <AuthScreen isModel={true} />

//         </motion.div>

//       </div>

//     </AnimatePresence>
//   )
// }

// export default AuthModel

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
 import AuthScreen from '../screen/AuthScreen'
import { motion, AnimatePresence } from 'framer-motion'
 

const AuthModel = ({ onClose }) => {

  return (

    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

      <AuthScreen
        isModel={true}
        onClose={onClose}
      />

    </div>

  );
};

export default AuthModel;