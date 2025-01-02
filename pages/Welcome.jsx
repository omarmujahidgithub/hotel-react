/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { textToSpeech } from "../services/tts1";
import WelcomeView from "./WelcomeView";
import Selection from "./Selection";
import BookingReference from "./BookingReference";
import PassportUpload from "./PassportUpload";
import ReservationDetails from "./ReservationDetails";

const Welcome = () => {
  const [currentView, setCurrentView] = useState("welcome");
  const [passportData, setPassport] = useState("");
  const [guest, setGuest] = useState("");
  const [bookingReference, setBookingReference] = useState("");

  const handleGuestId = (value) => {
    setGuest(value);
  };

  const goToWelcome = () => setCurrentView("welcome");
  const goToSelection = () => setCurrentView("selection");
  const goToBookingReference = () => setCurrentView("reference");
  const goToPassportUpload = () => setCurrentView("passport");
  const goToReservationDetails = () => setCurrentView("reservation");

  return (
    <div>
      {currentView === "welcome" && <WelcomeView nextHandler={goToSelection} />}

      {currentView === "selection" && (
        <Selection nextHandler={goToBookingReference} />
      )}

      {currentView === "reference" && (
        <BookingReference
          nextHandler={goToPassportUpload}
          setBookingReference={setBookingReference}
        />
      )}

      {currentView === "passport" && (
        <PassportUpload
          setScannedPassport={setPassport}
          nextHandler={goToReservationDetails}
        />
      )}

      {currentView === "reservation" && (
        <ReservationDetails
          passport = {passportData}
          bookingReference = {bookingReference}
          setGuest={setGuest}
          nextHandler={goToWelcome}
        />
      )}
    </div>
  );
};

export default Welcome;
