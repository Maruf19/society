import React, { useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";

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
 
   // Define custom styles
   const titleFontSize = 24;
   const sectionFontSize = 18;
   const textFontSize = 14;
   const titleColor = '#333333';
   const sectionColor = '#555555';
   const textColor = '#777777';
   const margin = 15;
   const lineHeight = 10;
 
   // Title
   doc.setFont('helvetica', 'bold');
   doc.setTextColor(titleColor);
   doc.setFontSize(titleFontSize);
   doc.text("Event Registration Confirmation", margin, 30);
 
   // Add content sections
   doc.setFont('helvetica', 'bold');
   doc.setTextColor(sectionColor);
   doc.setFontSize(sectionFontSize);
   doc.text("Thank you for registering for the [Event Name]!", margin, 50);
 
   doc.setFont('helvetica', 'normal');
   doc.setTextColor(textColor);
   doc.setFontSize(textFontSize);
   doc.text(`We have successfully received your details, and we are excited to have you join us for this [workshop/seminar/bootcamp/hackathon].`, margin, 60);
   
   doc.text("Below are the details of your registration:", margin, 75);
 
   const details = [
     `Event Name: [Insert Event Name]`,
     `Date: [Insert Event Date]`,
     `Time: [Insert Event Time]`,
     `Venue: [Insert Event Venue/Online Platform]`,
     `Participant Name: [Insert Participant's Name]`,
     `Email: [Insert Participant's Email]`
   ];
 
   details.forEach((line, index) => {
     doc.text(line, margin, 90 + index * lineHeight);
   });
 
   doc.text("Please keep this document for your records. If you have any questions or need further assistance, feel free to contact us at [Insert Contact Information]. We look forward to seeing you at the event!", margin, 120 + details.length * lineHeight);
 
   // Add a border around the pass
   const pageWidth = doc.internal.pageSize.width;
   const pageHeight = doc.internal.pageSize.height;
   doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
 
   // Save the PDF
   doc.save("event-registration-confirmation.pdf");
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
                  paymentType === "bank" ? "bg-blue-100 border-blue-500 text-blue-700" : "bg-white border-gray-300 text-gray-800"
                } border-2 transition-transform transform hover:scale-105`}
                onClick={() => setPaymentType("bank")}
              >
                <span className="font-semibold">Bank Transfer</span>
              </button>
              <button
                className={`w-full py-4 px-5 text-left rounded-xl shadow-lg ${
                  paymentType === "mobileBanking" ? "bg-blue-100 border-blue-500 text-blue-700" : "bg-white border-gray-300 text-gray-800"
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

        {/* Step 2: Payment Details */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Payment Details</h2>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="w-full py-3 px-4 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">ID</label>
              <input
                type="text"
                className="w-full py-3 px-4 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter your ID"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                className="w-full py-3 px-4 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Enter your department"
              />
            </div>

            {paymentType === "bank" && (
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">Select Your Bank</label>
                <select
                  className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                >
                  <option value="">--Select Bank--</option>
                  <option value="Bank A">Bank A</option>
                  <option value="Bank B">Bank B</option>
                  <option value="Bank C">Bank C</option>
                </select>
              </div>
            )}

            {paymentType === "mobileBanking" && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Select Mobile Banking Service</label>
                <select
                  className="w-full py-3 px-4 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={mobileBankingService}
                  onChange={(e) => setMobileBankingService(e.target.value)}
                >
                  <option value="">--Select Service--</option>
                  <option value="Service A">Service A</option>
                  <option value="Service B">Service B</option>
                  <option value="Service C">Service C</option>
                </select>

                <label className="block mb-2 text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="text"
                  className="w-full py-3 px-4 border border-gray-300 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter mobile number"
                />
              </div>
            )}

            <label className="block mb-2 text-sm font-medium text-gray-700">Amount</label>
            <input
              type="text"
              className="w-full py-3 px-4 border border-gray-300 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
              onClick={handleNextStep}
              disabled={!amount || (paymentType === "bank" && !bank) || (paymentType === "mobileBanking" && (!mobileBankingService || !mobileNumber))}
            >
              <span className="font-semibold">Next</span>
            </button>
          </motion.div>
        )}

        {/* Step 3: Confirm Payment */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Confirm Payment</h2>
            <div className="text-sm mb-6">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>ID:</strong> {id}</p>
              <p><strong>Department:</strong> {department}</p>
              <p><strong>Payment Method:</strong> {paymentType === "bank" ? "Bank Transfer" : "Mobile Banking"}</p>
              {paymentType === "bank" && <p><strong>Bank:</strong> {bank}</p>}
              {paymentType === "mobileBanking" && (
                <>
                  <p><strong>Mobile Banking Service:</strong> {mobileBankingService}</p>
                  <p><strong>Mobile Number:</strong> {mobileNumber}</p>
                </>
              )}
              <p><strong>Amount:</strong> {amount}</p>
            </div>
            <button
              className="w-full bg-green-600 text-white py-3 rounded-xl shadow-lg hover:bg-green-700 transition-colors"
              onClick={handleSubmitPayment}
            >
              <span className="font-semibold">Confirm and Pay</span>
            </button>
          </motion.div>
        )}

        {/* Step 4: Payment Complete */}
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
