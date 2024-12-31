import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getReservation = async (bookingReference) => {
  try {
    const response = await axios.get(`${BASE_URL}/reservations/${bookingReference}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { error: "Reservation not found" };
    } else {
      return { error: "An error occurred while checking the reservation" };
    }
  }
};

export const getGuest = async(guestId) => {
  try {
    const response = await axios.get(`${BASE_URL}/guests/${guestId}`)
    return response.data
    
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { error: "Reservation not found" };
    } else {
      return { error: "An error occurred while checking the reservation" };
    }
    
  }
}
