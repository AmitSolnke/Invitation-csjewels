/** @format */

import React, {useEffect, useRef, useState} from "react"
import {motion, useAnimation} from "framer-motion"
import "./App.css"
import invitationVideo from "../src/assets/video/csjewelsInvitation.mp4"

const App = () => {
  const controls = useAnimation()
  const url = window.location.href
  // console.log(url,"url")
  const query = new URLSearchParams(window.location.search)
  const date = query.get("date")
  const location = query.get("location")
  const to = query.get("to")
  const videoRef = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)

  const handleButtonClick = (route) => {
    window.location.href = route
  }

  const nameMapping = {
    s: "Siddharth Shah",
    g: "Gaurav Shah",
    a: "Aditya Shah",
  }

  useEffect(() => {
    const video = videoRef.current

    console.log("Video : ", video.currentTime)

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate)
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate)
      }
    }
  }, [])

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
  
    // Default parameters
    const defaultParams = {
      to: "G",
    };
  
    let shouldUpdate = false;
  
    Object.keys(defaultParams).forEach((key) => {
      if (!query.has(key)) {
        query.set(key, defaultParams[key]);
        shouldUpdate = true;
      }
    });
    if (shouldUpdate) {
      const newUrl = `${window.location.pathname}?${query.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, []);
  

  return (
    <>
      <div className="relative flex justify-center items-center h-screen my-10">
        <video
          ref={videoRef}
          autoPlay
          muted
          // controls
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-screen max-h-full"
        >
          <source src={invitationVideo} type="video/mp4" />
        </video>
        {currentTime >= 19 && currentTime <= 23 && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="absolute text-white text-2xl"
          >
            <div className="flex flex-col justify-center items-center gap-3 text-2xl mt-[100px]">
              <p className=" font-normal ">Just as you did on</p>
              <p className=" font-bold">12-12-2025</p>
              <p className="font-normal">When you adorned the stunning</p>
              <p className="font-bold ">Finger Ring</p>
              <p className=" font-normal">at our</p>
              <p className="font-bold">Pune-Kothrud</p>
            </div>
          </motion.div>
        )}

        {currentTime >= 4 && currentTime <= 23 && (
          <>
            <div
              onClick={() =>
                handleButtonClick("https://csjewels.com/find-a-store")
              }
              className="absolute bottom-10 left-1/4 w-1/3 h-10 cursor-pointer "
            ></div>

            <div
              onClick={() => handleButtonClick("https://csjewels.com/")}
              className="absolute bottom-10 right-1/4 w-1/3  h-10 cursor-pointer"
            ></div>
          </>
        )}

        {currentTime >= 0 && currentTime <= 3 && (
          <motion.h1
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="absolute text-white text-4xl font-secondary top-20"
          >
            {nameMapping[to?.toLowerCase()] || nameMapping["g"]}
          </motion.h1>
        )}

        {/* {currentTime >= 19 && currentTime <= 23 && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="absolute text-white text-2xl"
          >
            Store Location Address
          </motion.div>
        )} */}
      </div>
    </>
  )
}

export default App
