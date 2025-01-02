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
  return {"name" : "SAIF ABDUL RAHMAN OBAID MOHAMM ALKAABI" , "passportNumber" : "123"}
//   return response.data; 
};
