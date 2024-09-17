import React, { useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

// Assume programName is imported from your Schedule component
import { programName } from "./Schedule"; 

const PaymentMethod = () => {
  const [paymentType, setPaymentType] = useState(null);
  const [bank, setBank] = useState("");
  const [mobileBankingService, setMobileBankingService] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [department, setDepartment] = useState("Computer Science and Engineering");
  const [step, setStep] = useState(1);
  const [entryPass, setEntryPass] = useState(null);

  // Handle moving to the next step
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Generate and download the entry pass
  const generateEntryPass = () => {
    const doc = new jsPDF();
    const uniqueNumber = Math.floor(Math.random() * 1000000);
    
    // Design the PDF with a nicer format
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("MU CSE Society", 20, 20);

    doc.setFontSize(20);
    doc.text(`Hello Mr/Mrs. ${name},`, 20, 40);
    doc.setFontSize(16);
    doc.text(`We are happy that you have registered for the program:`, 20, 55);
    doc.setFont("helvetica", "normal");
    doc.text(`${programName}`, 20, 65);
    doc.text(`Your unique entry code is: ${uniqueNumber}`, 20, 80);

    doc.setFont("helvetica", "italic");
    doc.text("This will be your pass for the event.", 20, 95);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Regards,", 20, 120);
    doc.text("GS, MU CSE Society", 20, 130);

    doc.save("entry-pass.pdf");
    setEntryPass(`Unique Code: ${uniqueNumber}`);
  };

  // Handle payment submission
  const handleSubmitPayment = () => {
    generateEntryPass();
    setStep(4); // Move to the completion step
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
      <motion.div
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Step 1: Select Payment Type */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Select Payment Method</h2>
            <div className="space-y-4">
              <button
                className={`w-full py-4 px-5 text-left rounded-xl shadow-lg ${
                  paymentType === "bank"
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "bg-white border-gray-300 text-gray-800"
                } border-2 transition-transform transform hover:scale-105`}
                onClick={() => setPaymentType("bank")}
              >
                <span className="font-semibold">Bank Transfer</span>
              </button>
              <button
                className={`w-full py-4 px-5 text-left rounded-xl shadow-lg ${
                  paymentType === "mobileBanking"
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "bg-white border-gray-300 text-gray-800"
                } border-2 transition-transform transform hover:scale-105`}
                onClick={() => setPaymentType("mobileBanking")}
              >
                <span className="font-semibold">Mobile Banking</span>
              </button>
            </div>
            <button
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
              onClick={handleNextStep}
              disabled={!paymentType}
            >
              <span className="font-semibold">Next</span>
            </button>
          </motion.div>
        )}

        {/* Other steps remain the same... */}
        {step === 4 && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-extrabold text-green-600 mb-4">Payment Successful!</h2>
            <p className="text-gray-700 text-lg">Your payment has been processed. Thank you!</p>
            {entryPass && (
              <div className="mt-8 p-6 bg-yellow-100 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Entry Pass</h3>
                <p className="text-lg font-semibold">{entryPass}</p>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentMethod;
