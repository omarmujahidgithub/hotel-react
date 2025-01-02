import { useEffect } from "react";
import ScrollToTop from "../components/ScrollToTop";
import { playAudio } from "../services/tts1";

/* eslint-disable react/prop-types */
const Selection = ({ nextHandler }) => {
  useEffect(() => {
    playAudio("welcome", {});
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center px-4">
      <ScrollToTop />
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to Automated Hotel Services
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center">
        Please select an option to proceed.
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-6 px-12 rounded-lg shadow-md transition"
          onClick={nextHandler}
        >
          Check In
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white text-xl font-semibold py-6 px-12 rounded-lg shadow-md transition"
          onClick={() => console.log("Check Out Selected")}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Selection;
