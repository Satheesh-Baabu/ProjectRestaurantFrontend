import React, { useState } from "react";
import QRCode from "qrcode";
import axios from "axios";
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;


const QRgenerator = () => {
  const baseURL = "https://msvrestaurant.vercel.app/?table=";
  const [tableNumber, setTableNumber] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [message, setMessage] = useState("");

  const generateAndUploadQRCode = async () => {
    if (!tableNumber.trim()) {
      alert("Please enter a table number!");
      return;
    }

    const qrText = `${baseURL}${tableNumber}`;

    try {
      const qrCodeCanvas = document.createElement("canvas");
      await QRCode.toCanvas(qrCodeCanvas, qrText, { width: 200 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = qrCodeCanvas.width;
      canvas.height = qrCodeCanvas.height + 50;

      ctx.drawImage(qrCodeCanvas, 0, 0);
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "black";
      ctx.fillText(`Table ${tableNumber}`, canvas.width / 2, canvas.height - 20);

      const finalQRCodeUrl = canvas.toDataURL();
      setQrCodeUrl(finalQRCodeUrl);

      const blob = await fetch(finalQRCodeUrl).then((res) => res.blob());
      const formData = new FormData();
      formData.append("qrname", `Table ${tableNumber}`);
      formData.append("file", blob, `Table_${tableNumber}.png`);

      const result = await axios.post(`${API_BASE_URL}/qrgenerator`, formData);
      console.log(result);
      setMessage(`QR Code ${result.data.message}`);
      alert(`QR Code ${result.data.message}`);

      setTimeout(() => {
        setTableNumber("");
        setMessage("");
        setQrCodeUrl("");
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate and upload QR code.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">QR Code Generator</h1>
      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          placeholder="Enter table number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="p-2 w-80 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={generateAndUploadQRCode}
          className="px-4 py-2 bg-bgcolor text-white rounded hover:bg-hovercolor transition"
        >
          Generate & Upload QR Code
        </button>
        {qrCodeUrl && (
          <div className="mt-4 flex flex-col items-center">
            <a href={qrCodeUrl} download={`Table_${tableNumber}.png`} className="cursor-pointer">
              <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 hover:opacity-75 transition" />
            </a>
            <p className="text-gray-600 mt-2 text-sm">Click QR Code to download</p>
          </div>
        )}
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default QRgenerator;
