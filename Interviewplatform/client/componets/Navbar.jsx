import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsRobot } from 'react-icons/bs'
import { HiOutlineLogout } from 'react-icons/hi'
import { FaUserAstronaut } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setUserData } from '../redux/userSlice'
import AuthModel from './authModel'

const serverUrl = import.meta.env.VITE_SERVER_URL;

const Navbar = () => {

  const { userData } = useSelector((state) => state.user)

  console.log("USER DATA:", userData)

  const [showUserPopup, setUserPopup] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // USER INITIAL
  const getInitial = (user) => {

    if (!user) return null

    const name =
      user?.displayName ||
      user?.name ||
      user?.username ||
      user?.email ||
      user?.user?.displayName ||
      user?.user?.email ||
      ''

    return name.charAt(0).toUpperCase()
  }

  // LOGOUT
  const logoutHandler = async () => {

    try {

      await axios.get(
        serverUrl + "/api/auth/logout",
        { withCredentials: true }
      )

      dispatch(setUserData(null))

      setUserPopup(false)

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <>

      <div className='relative overflow-visible bg-gradient-to-b from-gray-900 via-gray-900 to-black flex justify-center px-4 pt-6'>

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className='relative overflow-visible w-full max-w-6xl bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 px-8 py-4 flex justify-between items-center hover:border-gray-600/70 transition-all duration-300'
        >

          {/* LOGO */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >

            <div className='bg-gradient-to-br from-blue-500 to-green-400 p-2 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300'>
              <BsRobot size={18} className='text-white' />
            </div>

            <div className='flex flex-col'>

              <h1 className='font-bold hidden md:block text-lg bg-gradient-to-r from-blue-400 via-white to-green-400 bg-clip-text text-transparent'>
                InterviewHub
              </h1>

              <p className='text-xs text-gray-400 hidden lg:block'>
                AI Interview Platform
              </p>

            </div>

          </motion.div>

          {/* USER SECTION */}
          <div className='flex items-center gap-6 relative z-[9999]'>

            {/* AVATAR BUTTON */}
            <motion.button
              onClick={() => {

                if (!userData) {

                  setShowAuth(true)
                  return
                }

                setUserPopup(!showUserPopup)
              }}
              className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 border border-blue-400/30'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >

              {userData ? (
                <span className='text-xs font-bold'>
                  {getInitial(userData)}
                </span>
              ) : (
                <FaUserAstronaut size={16} />
              )}

            </motion.button>

            {/* USER POPUP */}
            <AnimatePresence>

              {showUserPopup && (

                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className='absolute top-14 right-0 w-64 bg-gradient-to-b from-gray-800/95 to-gray-900/95 backdrop-blur-xl shadow-2xl border border-gray-700/50 rounded-xl p-4 z-[9999]'
                >

                  {/* USER INFO */}
                  <div className='mb-4 pb-3 border-b border-gray-700/50'>

                    <p className='text-sm font-semibold text-white'>
                      {
                        userData?.displayName ||
                        userData?.name ||
                        userData?.username ||
                        userData?.user?.displayName ||
                        "User"
                      }
                    </p>

                    <p className='text-xs text-gray-400 mt-1 break-all'>
                      {
                        userData?.email ||
                        userData?.user?.email ||
                        "No Email"
                      }
                    </p>

                  </div>

                  {/* HISTORY */}
                  <button
                    onClick={() => {

                      navigate('/history')

                      setUserPopup(false)
                    }}
                    className='w-full text-left text-sm py-2.5 px-3 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-lg transition-all duration-200'
                  >
                    Interview History
                  </button>

                  {/* LOGOUT */}
                  <button
                    onClick={logoutHandler}
                    className='w-full text-left text-sm py-2.5 px-3 hover:bg-red-500/10 text-gray-300 hover:text-red-400 rounded-lg transition-all duration-200 flex items-center gap-2 mt-2'
                  >

                    <HiOutlineLogout size={16} />

                    Logout

                  </button>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </motion.div>

        {/* BG GLOW */}
        <div className='absolute inset-0 top-0 left-1/4 w-96 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none' />

      </div>

      {/* AUTH MODAL */}
      {showAuth && (
        <AuthModel onClose={() => setShowAuth(false)} />
      )}

    </>
  )
}

export default Navbar
