import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation } from "react-router-dom";

const PaymentMethod = () => {
  const location = useLocation();
  const { schedule } = location.state || {};

  const calculateTotalCost = (fee) => {
    return parseFloat(fee);
  };

  return (
    <>
      <Navbar />
      <section className="container mx-auto mb-10 px-12 mt-16 flex flex-col items-center">
        <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-center text-gray-800  border-b-2 border-blue-500 pb-2 inline-block">Pay Your Fee</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full">
          <div className="bg-gradient-to-br mt-20 from-green-400 to-blue-500 shadow-lg rounded-lg p-6 mb-6 flex-grow transition transform hover:scale-105 duration-300 w-full md:w-2/3">
          

            {schedule ? (
              <>
                <img
                  className="w-32 h-32 object-cover border-4 border-white mb-4 rounded-full mx-auto shadow-md"
                  src={schedule.imageUrl}
                  alt={schedule.title}
                />
               
                <p className="text-lg text-center text-white"><strong>Title:</strong> {schedule.title}</p>
                <p className="text-md mb-2 text-center text-white"><strong>Description:</strong> {schedule.description}</p>
                <p className="text-lg mb-2 text-center text-white"><strong>Registration Fee:</strong> ${schedule.fee}</p>
                {/* <p className="text-lg font-bold text-center text-white"><strong>Total Cost:</strong> ${calculateTotalCost(schedule.fee)}</p> */}
              </>
            ) : (
              <p className="text-center text-white">No schedule selected.</p>
            )}
          </div>

          <div className="bg-white border border-blue-500 shadow-lg rounded-lg p-6 mb-6 flex-none w-full md:w-1/3 transition-transform duration-300">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">Registration Form</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="batch">Batch</label>
                <input
                  type="text"
                  id="batch"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your batch"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="id">ID</label>
                <input
                  type="text"
                  id="id"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your ID"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="mobile">Mobile No.</label>
                <input
                  type="tel"
                  id="mobile"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your mobile number"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="total-cost">Registration Fee</label>
                <input
                  type="text"
                  id="total-cost"
                  value={`$${calculateTotalCost(schedule ? schedule.fee : 0)}`}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-lg py-2 hover:from-blue-600 hover:to-indigo-600 transition duration-300"
              >
                Proceed for Payment
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PaymentMethod;
