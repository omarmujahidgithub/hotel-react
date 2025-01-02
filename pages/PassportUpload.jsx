/* eslint-disable react/prop-types */
import { useState } from "react";
import { passportScan } from "../services/passportScan";
import ScrollToTop from "../components/ScrollToTop";

const PassportUpload = ({setScannedPassport, nextHandler}) => {

  const [passportFile, setPassportFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();


  const handleFileChange = (e) => {
    setPassportFile(e.target.files[0]);
    setErrorMessage("");
  };

  const handleUpload = async () => {
    if (!passportFile) {
      setErrorMessage("Please upload your passport.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await passportScan(passportFile);
      setScannedPassport(response)
      setUserInfo(response)
    } catch (error) {
        print(error)
      setErrorMessage("Failed to process the passport. Please try again. \n ");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    nextHandler()
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center px-4">
      <ScrollToTop />
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Verify Your Identity
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Please upload your passport to verify your identity.
      </p>

      <div className="w-full max-w-md mb-6">
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
        />
      </div>

      {errorMessage && (
        <p className="text-red-600 mb-4">{errorMessage}</p>
      )}

      <button
        onClick={handleUpload}
        className="mt-4 px-6 py-3 bg-color text-white font-bold rounded-lg shadow-md hover:bg-hover transition"
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload Passport"}
      </button>

      {userInfo && (
        <div className="mt-8 w-full max-w-lg bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Extracted Information
          </h2>
          <table className="w-full text-left border-collapse">
            <tbody>
              {Object.entries(userInfo).map(([key, value]) => (
                <tr key={key} className="border-b">
                  <th className="text-gray-700 py-2 px-4 capitalize">
                    {key.replace("_", " ")}
                  </th>
                  <td className="text-gray-600 py-2 px-4">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleConfirm}
            className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Confirm and Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default PassportUpload;
