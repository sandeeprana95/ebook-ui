import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../util/http';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {data} = await http.post("/user/forgot-password",{email})
    console.log(data)
    console.log('Reset link sent to:', email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-2">Forgot Your Password?</h2>
          <p className="text-gray-600 mb-6">
            Enter your email address and we’ll send you a link to reset your password.
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
          >
            Send Reset Link
          </button>

          <Link
            href="/login"
            className="text-blue-600 text-sm text-center mt-4 hover:underline"
          >
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
