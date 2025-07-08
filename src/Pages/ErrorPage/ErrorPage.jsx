// src/components/ErrorPage.jsx
import React from "react";

import { motion } from "framer-motion";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-9xl font-extrabold text-red-600 mb-6">404</h1>
      <p className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700">
        Oops! Page Not Found
      </p>
      <p className="text-gray-600 mb-8 max-w-md text-center">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </motion.div>
  );
};

export default ErrorPage;
