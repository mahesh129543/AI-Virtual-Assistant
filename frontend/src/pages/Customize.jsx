import React, { useContext, useRef } from 'react'
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardBackspace } from "react-icons/md";

function Customize() {
  const {
    backendImage, setBackendImage,
    frontendImage, setFrontendImage,
    selectedImage, setSelectedImage
  } = useContext(userDataContext)

  const navigate = useNavigate()
  const inputImage = useRef()

  const handleImage = (e) => {
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex flex-col justify-center items-center p-6 relative">
      {/* Back button */}
      <MdKeyboardBackspace
        className="absolute top-6 left-6 text-white cursor-pointer w-8 h-8 hover:scale-110 transition"
        onClick={() => navigate("/")}
      />

      {/* Title */}
      <h1 className="text-white mb-10 text-[32px] font-bold text-center">
        Select your <span className="text-blue-300">Assistant Image</span>
      </h1>

      {/* Image Grid */}
      <div className="w-full max-w-[950px] flex justify-center items-center flex-wrap gap-6">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        {/* Upload option */}
        <div
          className={`w-[80px] h-[150px] lg:w-[160px] lg:h-[260px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden 
          flex items-center justify-center cursor-pointer
          hover:shadow-2xl hover:shadow-blue-900 hover:border-4 hover:border-white transition
          ${selectedImage === "input" ? "border-4 border-white shadow-2xl shadow-blue-900" : ""}`}
          onClick={() => {
            inputImage.current.click()
            setSelectedImage("input")
          }}
        >
          {!frontendImage && (
            <RiImageAddLine className="text-white w-8 h-8 opacity-80 hover:opacity-100 transition" />
          )}
          {frontendImage && (
            <img src={frontendImage} className="h-full w-full object-cover" />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>

      {/* Next button */}
      {selectedImage && (
        <button
          className="min-w-[160px] h-[55px] mt-8 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold rounded-full text-[18px] shadow-lg hover:shadow-[0_0_20px_#60a5fa] transition"
          onClick={() => navigate("/customize2")}
        >
          Next
        </button>
      )}
    </div>
  )
}

export default Customize
