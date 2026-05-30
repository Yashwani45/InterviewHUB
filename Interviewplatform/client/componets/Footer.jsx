
import React from 'react'
import { BsRobot } from 'react-icons/bs'
import { motion } from 'motion/react'
import { HiArrowUpRight } from 'react-icons/hi2'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className='bg-gradient-to-b from-black to-gray-900 flex justify-center px-4 pb-10 py-12 pt-16'>
      <div className='w-full max-w-6xl'>
        
        {/* Main Footer Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 py-12 px-8 text-center mb-8'
        >
          {/* Logo Section */}
          <div className='flex justify-center items-center gap-3 mb-6'>
            <div className='bg-gradient-to-br from-blue-500 to-green-400 p-2.5 rounded-lg shadow-lg shadow-blue-500/30'>
              <BsRobot size={18} className='text-white'/>
            </div>
            <h2 className='font-bold text-2xl bg-gradient-to-r from-blue-400 via-white to-green-400 bg-clip-text text-transparent'>
              InterviewHub
            </h2>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-gray-400 text-base max-w-2xl mx-auto leading-relaxed mb-8'
          >
            AI-powered interview preparation platform designed to help you master communication skills, build confidence, and land your dream job through adaptive practice and real-time feedback.
          </motion.p>

        

          {/* Divider */}
          <div className='h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent mb-8' />

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='flex justify-center gap-4 mb-8'
          >
            {[
              { icon: '𝕏', label: 'Twitter', href: '#' },
              { icon: 'in', label: 'LinkedIn', href: '#' },
              { icon: '◇', label: 'GitHub', href: '#' }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className='w-10 h-10 bg-gradient-to-br from-gray-700/50 to-gray-800/50 hover:from-blue-500/30 hover:to-green-400/30 border border-gray-700/50 hover:border-blue-500/50 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300'
                title={social.label}
              >
                <span className='text-sm font-bold'>{social.icon}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='text-gray-500 text-xs'
          >
            © {currentYear} InterviewHub. All rights reserved. 
          </motion.p>
        </motion.div>

        {/* Bottom Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='text-center'
        >
          <p className='text-gray-600 text-xs'>
            Made by <span className='text-blue-400 font-semibold'>Yashwani Kushwaha</span>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Footer
