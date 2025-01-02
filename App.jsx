import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Selection from "./pages/Selection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BookingReference from "./pages/BookingReference";
import PassportUpload from "./pages/PassportUpload";
import ReservationDetails from "./pages/ReservationDetails";
import Welcome from "./pages/welcome";
import { preloadAudio } from "./services/tts1";

function App() {
  const audioKeys = ["welcome", "selection", "id_verified"];

  preloadAudio(audioKeys).then(() => {
    console.log("Audio preloading complete!");
  });
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/selection" element={<Selection />} />
            <Route path="/booking-reference" element={<BookingReference />} />
            <Route path="/passport-upload" element={<PassportUpload />} />
            <Route
              path="/reservation-details"
              element={<ReservationDetails />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
