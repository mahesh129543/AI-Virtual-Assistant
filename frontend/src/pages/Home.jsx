import React, { useContext, useEffect, useRef, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import aiImg from "../assets/ai.gif"
import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import userImg from "../assets/user.gif"

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext)
  const navigate = useNavigate()
  const [listening, setListening] = useState(false)
  const [userText, setUserText] = useState("")
  const [aiText, setAiText] = useState("")
  const isSpeakingRef = useRef(false)
  const recognitionRef = useRef(null)
  const [ham, setHam] = useState(false)
  const isRecognizingRef = useRef(false)
  const synth = window.speechSynthesis

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      setUserData(null)
      navigate("/signin")
    } catch (error) {
      setUserData(null)
      console.log(error)
    }
  }

  // ... your recognition + speak logic stays exactly same (not touched) ...

  return (
    <div className="w-full h-[100vh] bg-gradient-to-tr from-black via-[#03033a] to-[#0a0a5c] flex flex-col justify-center items-center gap-4 overflow-hidden relative">
      {/* Hamburger for mobile */}
      <CgMenuRight
        className="lg:hidden text-white absolute top-5 right-5 w-8 h-8 cursor-pointer hover:scale-110 transition"
        onClick={() => setHam(true)}
      />

      {/* Sidebar menu */}
      <div
        className={`absolute lg:hidden top-0 w-full h-full bg-[#00000070] backdrop-blur-md p-6 flex flex-col gap-5 items-start 
        ${ham ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}
      >
        <RxCross1
          className="text-white absolute top-5 right-5 w-8 h-8 cursor-pointer hover:scale-110 transition"
          onClick={() => setHam(false)}
        />
        <button
          className="w-full max-w-[200px] h-[55px] bg-gradient-to-r from-pink-500 to-purple-600 
          text-white font-semibold rounded-full hover:shadow-[0_0_15px_#9333ea] transition"
          onClick={handleLogOut}
        >
          Log Out
        </button>
        <button
          className="w-full max-w-[250px] h-[55px] bg-gradient-to-r from-blue-400 to-indigo-500 
          text-white font-semibold rounded-full hover:shadow-[0_0_15px_#3b82f6] transition"
          onClick={() => navigate("/customize")}
        >
          Customize Assistant
        </button>

        <div className="w-full h-[2px] bg-gray-500 my-2"></div>
        <h1 className="text-white font-semibold text-lg">History</h1>

        <div className="w-full h-[350px] overflow-y-auto space-y-2 pr-2">
          {userData.history?.map((his, i) => (
            <div key={i} className="text-gray-200 text-[16px] truncate hover:text-white">
              {his}
            </div>
          ))}
        </div>
      </div>

      {/* Top buttons (desktop only) */}
      <div className="hidden lg:flex gap-4 absolute top-6 right-6">
        <button
          className="min-w-[150px] h-[50px] bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold 
          rounded-full hover:shadow-[0_0_15px_#f43f5e] transition"
          onClick={handleLogOut}
        >
          Log Out
        </button>
        <button
          className="min-w-[200px] h-[50px] bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold 
          rounded-full hover:shadow-[0_0_15px_#3b82f6] transition"
          onClick={() => navigate("/customize")}
        >
          Customize Assistant
        </button>
      </div>

      {/* Assistant image */}
      <div className="w-[300px] h-[400px] flex justify-center items-center rounded-3xl overflow-hidden shadow-[0_0_30px_#1e40af]">
        <img src={userData?.assistantImage} alt="" className="h-full object-cover" />
      </div>

      {/* Assistant name */}
      <h1 className="text-white text-lg font-semibold mt-2">I'm {userData?.assistantName}</h1>

      {/* Voice animation */}
      {!aiText && <img src={userImg} alt="" className="w-[180px]" />}
      {aiText && <img src={aiImg} alt="" className="w-[180px]" />}

      {/* Display AI / User text */}
      <div className="max-w-[90%] text-center">
        <h1 className="text-white text-[18px] font-medium">
          {userText ? userText : aiText ? aiText : null}
        </h1>
      </div>
    </div>
  )
}

export default Home
