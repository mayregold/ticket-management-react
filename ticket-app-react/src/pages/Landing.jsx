import React from 'react'
import { Link } from 'react-router-dom'

function Waves() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full"
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
    >
      <path
        fill="#0ea5a4"
        fillOpacity="0.2"
        d="M0,64C80,96,240,160,480,144C720,128,960,32,1200,48C1328,60,1408,96,1440,112L1440,200L0,200Z"
      ></path>
      <path
        fill="#0891b2"
        fillOpacity="0.1"
        d="M0,96C160,128,320,160,480,152C640,144,800,96,960,74C1120,52,1280,60,1440,80L1440,200L0,200Z"
      ></path>
    </svg>
  )
}

export default function Landing() {
  return (
    <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 overflow-hidden">
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <Waves />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-6 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-10">
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 leading-tight">
            Manage Your <span className="text-teal-600">Tickets</span> with Ease
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-lg mx-auto md:mx-0">
            Ticketly helps you track issues, organize support requests, and deliver faster
            solutions. Perfect for teams who value efficiency and clarity.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/register"
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-lg font-medium rounded-lg shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              🎟️ Get Started
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3 border border-teal-600 text-teal-700 hover:bg-teal-50 text-lg font-medium rounded-lg transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>


        <div className="flex-1 flex justify-center">
          <div className="bg-gradient-to-tr from-teal-500 to-cyan-600 rounded-3xl p-10 shadow-2xl transform hover:scale-105 transition-transform duration-300 w-64 sm:w-72 md:w-80 text-center">
            <div className="text-7xl mb-4 animate-pulse">🎫</div>
            <p className="text-white font-semibold text-xl sm:text-2xl">Book • Track • Manage</p>
            <p className="text-cyan-100 text-sm mt-2">Your all-in-one ticket solution</p>
          </div>
        </div>
      </div>

      <div className="h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}
