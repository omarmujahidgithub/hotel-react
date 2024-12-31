import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { textToSpeech } from "../services/tts1";

const Welcome = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/selection");
  };

  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!audioPlayed) {
      console.log("audio played");
      setAudioPlayed(true);

      textToSpeech("welcome").catch((error) => {
        if (isMounted) console.error("Error playing audio:", error);
      });

      return () => {
        isMounted = false; // Cleanup on unmount
      };
    }
  }, [audioPlayed]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Full-Size Image Section */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('src/assets/4.avif')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-5xl font-bold">
            Travel like you mean it
          </h1>
        </div>
      </div>

      {/* Welcome Content Section */}
      <div className="flex flex-col justify-center items-center text-center px-4 py-12">
        <h1 className="text-gray-700 uppercase font-bold text-sm tracking-wide">
          Welcome to Automated Hotel Check-In & Out
        </h1>
        <h2 className="text-4xl font-bold mt-4 text-gray-800">
          Smart, Secure, and Hassle-Free
        </h2>
        <p className="text-lg text-gray-600 mt-6">
          Experience the future of hospitality with seamless check-in and
          check-out services. No lines, no waiting—just comfort and convenience.
        </p>
        <p className="text-lg text-gray-600 mt-2">
          Our system ensures a personalized and efficient stay, whether you are
          traveling for business or leisure.
        </p>
        <button
          className="mt-6 px-6 py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
          onClick={handleNavigate}
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default Welcome;
