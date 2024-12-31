import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGuest, getReservation } from "../services/bookingService";

const ReservationDetails = () => {
  const location = useLocation();
  const bookingReference = location.state|| "";
  console.log(`ref num : ${bookingReference}`)
  const [bookingDetails, setBookingDetails] = useState(null);
  const [guestDetails, setGuestDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        
        const reservation = await getReservation(bookingReference);
        const guest = await getGuest(reservation.guest_id)
        setBookingDetails(reservation);
        setGuestDetails(guest)

      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingReference]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-lg font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-lg font-semibold text-red-600">
          {errorMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center px-6 py-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
        <div className="bg-color p-6">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome, {guestDetails?.name.split(' ')[0] || "Guest"}!
          </h1>
          <p className="text-lg text-white">
            We're excited to have you stay with us. Relax, unwind, and enjoy
            your time.
          </p>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 font-medium">Room Type:</span>
            <span className="text-lg font-semibold text-gray-800">
              {bookingDetails?.room_type || "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 font-medium">Check-In Date:</span>
            <span className="text-lg font-semibold text-gray-800">
              {bookingDetails?.check_in_date || "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Check-Out Date:</span>
            <span className="text-lg font-semibold text-gray-800">
              {bookingDetails?.check_out_date || "N/A"}
            </span>
          </div>
        </div>
      </div>
      <footer className="mt-10 text-center text-gray-600">
        We're here to make your stay memorable. If you need any assistance,
        please let us know.
      </footer>
    </div>
  );
};

export default ReservationDetails;
