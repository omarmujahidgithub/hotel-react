import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Welcome from "./pages/Welcome";
import Selection from "./pages/Selection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BookingReference from "./pages/BookingReference";
import PassportUpload from "./pages/PassportUpload";
import ReservationDetails from "./pages/ReservationDetails";

function App() {
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
            <Route path="/reservation-details" element={<ReservationDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
