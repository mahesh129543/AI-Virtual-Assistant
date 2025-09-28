import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Customize2() {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } = useContext(userDataContext)
  const [assistantName, setAssistantName] = useState(userData?.AssistantName || "")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleUpdateAssistant = async () => {
    setLoading(true)
    try {
      let formData = new FormData()
      formData.append("assistantName", assistantName)
      if (backendImage) {
        formData.append("assistantImage", backendImage)
      } else {
        formData.append("imageUrl", selectedImage)
      }
      const result = await axios.post(`${serverUrl}/api/user/update`, formData, { withCredentials: true })
      setLoading(false)
      setUserData(result.data)
      navigate("/")
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex flex-col justify-center items-center p-6 relative">
      {/* Back button */}
      <MdKeyboardBackspace
        className="absolute top-6 left-6 text-white cursor-pointer w-8 h-8 hover:scale-110 transition"
        onClick={() => navigate("/customize")}
      />

      {/* Title */}
      <h1 className="text-white mb-10 text-[32px] font-bold text-center">
        Enter Your <span className="text-blue-300">Assistant Name</span>
      </h1>

      {/* Input box */}
      <input
        type="text"
        placeholder="e.g. Shifra"
        className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white/70 bg-white/10 
        text-white placeholder-gray-400 px-6 rounded-full text-[18px] 
        focus:border-blue-400 focus:shadow-[0_0_15px_#60a5fa] transition"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />

      {/* Submit button */}
      {assistantName && (
        <button
          className={`min-w-[280px] h-[55px] mt-8 rounded-full text-[18px] font-semibold transition
          ${loading
              ? "bg-gray-400 text-black cursor-not-allowed"
              : "bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg hover:shadow-[0_0_20px_#60a5fa]"
            }`}
          disabled={loading}
          onClick={handleUpdateAssistant}
        >
          {!loading ? "Finally Create Your Assistant" : "Loading..."}
        </button>
      )}
    </div>
  )
}

export default Customize2
