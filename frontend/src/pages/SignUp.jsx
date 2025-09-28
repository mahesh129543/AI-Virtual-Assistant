import React, { useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from "axios"
import { motion } from "framer-motion";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const { serverUrl, setUserData } = useContext(userDataContext)
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")

  const handleSignUp = async (e) => {
    e.preventDefault()
    setErr("")
    setLoading(true)
    try {
      let result = await axios.post(`${serverUrl}/api/auth/signup`, {
        name, email, password
      }, { withCredentials: true })
      setUserData(result.data)
      setLoading(false)
      navigate("/customize")
    } catch (error) {
      console.log(error)
      setUserData(null)
      setLoading(false)
      setErr(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div
      className='w-full h-[100vh] bg-cover flex justify-center items-center px-4'
      style={{ backgroundImage: `url(${bg})` }}
    >
      <motion.form
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-[500px] bg-[#00000080] backdrop-blur-lg shadow-2xl shadow-black flex flex-col items-center justify-center gap-6 px-8 py-10 rounded-2xl'
        onSubmit={handleSignUp}
      >
        <h1 className='text-white text-[32px] font-bold mb-6 text-center'>
          Register to <span className='text-blue-400'>Virtual Assistant</span>
        </h1>

        <input
          type="text"
          placeholder='Enter your Name'
          className='w-full h-[55px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-[18px] focus:border-blue-400 focus:shadow-[0_0_10px_#60a5fa] transition'
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <input
          type="email"
          placeholder='Email'
          className='w-full h-[55px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-[18px] focus:border-blue-400 focus:shadow-[0_0_10px_#60a5fa] transition'
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className='w-full h-[55px] border-2 border-white bg-transparent text-white rounded-full relative flex items-center'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Password'
            className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-5 text-[18px] focus:border-blue-400'
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!showPassword ?
            <IoEye className='absolute right-5 w-6 h-6 text-white cursor-pointer hover:scale-110 transition' onClick={() => setShowPassword(true)} /> :
            <IoEyeOff className='absolute right-5 w-6 h-6 text-white cursor-pointer hover:scale-110 transition' onClick={() => setShowPassword(false)} />}
        </div>

        {err.length > 0 && <p className='text-red-400 text-[16px] font-medium'>*{err}</p>}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='min-w-[160px] h-[55px] mt-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold rounded-full text-[18px] shadow-lg hover:shadow-[0_0_20px_#60a5fa] transition'
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </motion.button>

        <p className='text-white text-[16px] mt-4 cursor-pointer hover:underline'
          onClick={() => navigate("/signin")}>
          Already have an account? <span className='text-blue-400'>Sign In</span>
        </p>
      </motion.form>
    </div>
  )
}

export default SignUp
