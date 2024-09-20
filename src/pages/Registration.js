import React, { useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { FaArrowLeft } from "react-icons/fa"; // Import the back icon

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
  const [entryPass] = useState(null);

  // Handle moving to the next step
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

 // Generate and download the entry pass
 const generateEntryPass = () => {
  const doc = new jsPDF();

  // Define custom styles
  const headerFontSize = 22;
  const sectionFontSize = 16;
  const textFontSize = 12;
  const headerColor = '#003366'; // Dark blue for header
  const sectionColor = '#0056A0'; // Strong blue for sections
  const textColor = '#333333'; // Dark gray for text
  const backgroundColor = '#F4F4F4'; // Very light gray for background
  const margin = 20;
  const lineHeight = 8; // Adjust line height for readability
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const textMaxWidth = pageWidth - 2 * margin;

  // Generate unique code
  const uniqueCode = Math.floor(Math.random() * 1000000);

  // Set background color
  doc.setFillColor(backgroundColor);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Title Header
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#FFFFFF'); // White text color
  doc.setFillColor(headerColor);
  doc.rect(margin - 2, margin - 2, pageWidth - 2 * (margin - 2), 28, 'F'); // Adjusted header height
  doc.setFontSize(headerFontSize);
  doc.text("Event Registration Confirmation", margin + 10, margin + 18);

  // Content
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textColor);
  doc.setFontSize(textFontSize);

  // Helper function to split text into lines
  const wrapText = (text, x, y, maxWidth) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line, index) => {
      doc.text(line, x, y + index * lineHeight);
    });
    return y + lines.length * lineHeight;
  };

  // Main Text
  const mainText = "Thank you for registering for the [Event Name]! We have successfully received your details, and we are excited to have you join us for this [workshop/seminar/bootcamp/hackathon].";
  let currentY = margin + 40;
  currentY = wrapText(mainText, margin, currentY, textMaxWidth);

  // Registration Details
  doc.setFontSize(sectionFontSize);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(sectionColor);
  doc.text("Below are the details of your registration:", margin, currentY + 10);

  const details = [
    `Event Name: [Insert Event Name]`,
    `Date: [Insert Event Date]`,
    `Time: [Insert Event Time]`,
    `Venue: [Insert Event Venue/Online Platform]`,
    `Participant Name: [Insert Participant's Name]`,
    `Email: [Insert Participant's Email]`
  ];

  currentY += 20; // Add space before details
  doc.setFontSize(textFontSize);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textColor);

  details.forEach((line) => {
    currentY = wrapText(line, margin, currentY, textMaxWidth);
  });

  // Additional Information
  const additionalText = "Please keep this document for your records. If you have any questions or need further assistance, feel free to contact us at [Insert Contact Information]. We look forward to seeing you at the event!";
  currentY = wrapText(additionalText, margin, currentY + 10, textMaxWidth);

  // Unique Code
  doc.setFontSize(sectionFontSize);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#000000'); // Black color for unique code
  doc.text("Your Unique Code is:", margin, currentY + 15);
  doc.setFontSize(textFontSize);
  doc.text(uniqueCode.toString(), margin + 100, currentY + 15); // Adjust position to fit on the same line

  // Closing Remarks
  doc.setFontSize(textFontSize);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textColor);
  doc.text("Regards,", margin, currentY + 30);
  doc.text("General Secretary", margin, currentY + 40);
  doc.text("MU CSE Society", margin, currentY + 50);

  // Add a border around the pass
  doc.setDrawColor('#CCCCCC'); // Light gray color for the border
  doc.setLineWidth(1);
  doc.rect(margin - 5, margin - 5, pageWidth - 2 * (margin - 5), pageHeight - 2 * (margin - 5));

  // Save the PDF
  doc.save("event-registration-confirmation.pdf");
};
 
 



  // Handle payment submission
  const handleSubmitPayment = () => {
    generateEntryPass();
    setStep(4); // Move to the completion step
  };

   // Handle back navigation
   const handleGoBack = () => {
    // Implement the back navigation logic here
    // For example, you might use history.push('/') if using react-router
    // or you might have other logic to go back to the previous step
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-refd-200 p-6 ">
       <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 p-2 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <FaArrowLeft size={24} />
      </button>
      <motion.div
        className="w-full max-w-xl rounded-3xl shadow-2xl p-8 bg-white border border-teal-500"
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
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 ">Select Payment Method</h2>
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
