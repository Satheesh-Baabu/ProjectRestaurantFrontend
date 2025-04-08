import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const ScanQR = () => {
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scannerRef.current.render(
      (decodedText) => {
        setScanResult(decodedText);
        localStorage.setItem("tableNumber", decodedText);
        navigate("/cart");
      },
      (error) => console.log(error)
    );

    return () => scannerRef.current.clear();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Scan QR Code</h2>
      <div id="reader" className="w-full max-w-md"></div>

      {scanResult && <p className="mt-4 text-green-600 font-semibold">Scanned: {scanResult}</p>}

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/cart")}
      >
        Go to Cart
      </button>
    </div>
  );
};

export default ScanQR;
