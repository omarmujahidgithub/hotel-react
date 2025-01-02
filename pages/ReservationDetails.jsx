/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getGuest, getReservation } from "../services/bookingService";
import ScrollToTop from "../components/ScrollToTop";
import { playAudio } from "../services/tts1";
const ReservationDetails = ({
  bookingReference,
  passport,
  nextHandler,
  setGuest,
}) => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [guestDetails, setGuestDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const reservation = await getReservation(bookingReference);
        const guest = await getGuest(reservation.guest_id);

        if (guest.name === passport.name) {
          setBookingDetails(reservation);
          setGuestDetails(guest);
          setGuest(guest);
        } else {
          throw new Error("Passport information does not match.");
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingReference, passport, setGuest]);

  useEffect(() => {
    if (guestDetails && bookingDetails && !audioPlayed) {
      const params = {
        name: guestDetails.name.split(" ")[0],
        dates: bookingDetails.check_in_date,
        room_type: bookingDetails.room_type,
      };
      playAudio("id_verified", params);
      setAudioPlayed(true);
    }
  }, [guestDetails, bookingDetails, audioPlayed]);

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
        <div className="text-lg font-semibold text-red-600">{errorMessage}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center px-6 py-10">
      <ScrollToTop />
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
        <div className="bg-color p-6">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome, {guestDetails?.name.split(" ")[0] || "Guest"}!
          </h1>
          <p className="text-lg text-white">
            We <a href=""></a>re excited to have you stay with us. Relax,
            unwind, and enjoy your time.
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
        We are here to make your stay memorable. If you need any assistance,
        please let us know.
      </footer>
    </div>
  );
};

export default ReservationDetails;
