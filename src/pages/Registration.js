import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const programOptions = [
  { id: 1, name: 'Artificial Intelligence Workshop' },
  { id: 2, name: 'Web Development Bootcamp' },
  { id: 3, name: 'Cybersecurity Seminar' },
  { id: 4, name: 'Hackathon' },
];

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    paymentMethod: '',
    transactionId: '',
    programName: '',
    uniqueCode: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const generateUniqueCode = () => {
    const randomValue = Math.floor(100000 + Math.random() * 900000);
    return `REG-${randomValue}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueCode = generateUniqueCode();
    setFormData({
      ...formData,
      uniqueCode,
    });
    setIsSubmitted(true);
  };

  const downloadPDF = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('registration-confirmation.pdf');
    });
  };

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        downloadPDF();
      }, 100); // Small delay to ensure content is rendered
    }
  }, [isSubmitted]);

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <motion.div
        className="bg-white border border-black shadow-2xl rounded-xl p-8 max-w-lg w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-black">Program Registration Form</h2>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-black text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="shadow-sm appearance-none border border-black rounded-lg w-full py-3 px-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-black text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="shadow-sm appearance-none border border-black rounded-lg w-full py-3 px-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Contact Number */}
            <div className="mb-4">
              <label className="block text-black text-sm font-medium mb-2">Contact Number</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="shadow-sm appearance-none border border-black rounded-lg w-full py-3 px-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your contact number"
              />
            </div>

            {/* Program Name */}
            <div className="mb-4">
              <label className="block text-black text-sm font-medium mb-2">Select Program</label>
              <select
                name="programName"
                value={formData.programName}
                onChange={handleChange}
                required
                className="shadow-sm appearance-none border border-black rounded-lg w-full py-3 px-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select program</option>
                {programOptions.map((program) => (
                  <option key={program.id} value={program.name}>
                    {program.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <label className="block text-black text-sm font-medium mb-2">Select Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
                className="shadow-sm appearance-none border border-black rounded-lg w-full py-3 px-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select payment method</option>
                <option value="bkash">Bkash</option>
                <option value="nagad">Nagad</option>
              </select>
            </div>

            {/* Transaction ID */}
            <div className="mb-4">
              <label className="block text-black text-sm font-medium mb-2">Transaction ID</label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                required
                className="shadow-sm appearance-none border border-black rounded-lg w-full py-3 px-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter transaction ID"
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div id="pdf-content" className="p-6 bg-white border border-black rounded-lg shadow-lg">
            <header className="text-center mb-6">
              <h1 className="text-3xl font-extrabold text-black">Registration Confirmation</h1>
              <p className="text-lg text-black mt-2">GS, MU CSE Society</p>
            </header>
            <div className="border border-black p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-center mb-4">Payment Successful</h2>
              <p className="mb-4 text-lg text-black">
                Hello Mr/Mrs {formData.name},<br />
                Congratulations! Your registration for the <strong>{formData.programName}</strong> has been successfully completed.<br />
                We have received your payment, and your unique registration code is <strong>{formData.uniqueCode}</strong>.<br />
                Please keep this code safe as you will need it for check-in at the event.<br />
                We look forward to seeing you at the program. Thank you for registering, and we hope you have a great experience!<br /><br />
                Regards,<br />
                GS, MU CSE Society
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default RegistrationForm;
