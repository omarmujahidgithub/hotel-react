// import axios from "axios";

// const BASE_URL = "http://localhost:5000";

export const passportScan = async (file) => {
  const formData = new FormData();
  formData.append("passport", file);

//   const response = await axios.post(`${BASE_URL}/passport_scan`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
  return {"name" : "Omar Mujahid" , "passportNumber" : "123"}
//   return response.data; 
};
