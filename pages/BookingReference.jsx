import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReservation } from "../services/bookingService";

const BookingReference = () => {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setReferenceNumber(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!referenceNumber.trim()) {
      setErrorMessage("Please enter a valid booking reference number.");
      return;
    }

    const result = await getReservation(referenceNumber);
    if (result.error) {
      setErrorMessage(result.error);
    } else {
      console.log("Reservation Found:", result);
      navigate("/passport-upload", { state:  referenceNumber});
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Enter Your Booking Reference
      </h1>
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Booking Reference Number"
          value={referenceNumber}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
        />
      </div>
      {errorMessage && (
        <p className="text-red-600 mt-4">{errorMessage}</p>
      )}
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-3 bg-color text-white font-bold rounded-lg shadow-md hover:bg-hover transition"
      >
        Submit
      </button>
    </div>
  );
};

export default BookingReference;
