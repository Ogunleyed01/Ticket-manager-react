import React from 'react'
import { Link } from 'react-router-dom'
import wave from '../assets/wave.svg'
import circle from '../assets/circle.svg'

export default function Landing(){
  return (
    <div className="max-w-[1440px] mx-auto p-6">
      <header
        className="relative bg-white rounded-xl overflow-hidden p-8"
        aria-label="Hero header"
      >
        {/* Decorative wave background */}
        <div
          className="pointer-events-none absolute inset-x-0 -bottom-1 h-48 md:h-56 lg:h-72 bg-no-repeat bg-bottom"
          style={{ backgroundImage: `url(${wave})`, backgroundSize: 'cover' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl font-semibold">Mi Bulleto</h1>
          <p className="mt-2 text-gray-700">
            A polished ticket management app — create, prioritize and resolve issues with speed and clarity.
            Designed for teams who want a clean workflow, clear status tracking, and fast resolutions.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/auth/login" className="px-4 py-2 rounded bg-sky-600 text-white">Login</Link>
            <Link to="/auth/signup" className="px-4 py-2 rounded border">Get Started</Link>
            {/* <span className="ml-2 text-sm text-gray-500 self-center">Demo: try login with <strong>demo@demo.test</strong></span> */}
          </div>
        </div>

  <img src={circle} alt="decor" className="absolute right-8 top-6 w-20 opacity-90"/>
  {/* second decorative circle */}
  <img src={circle} alt="decorative circle" className="absolute left-6 top-10 w-16 opacity-70"/>
      </header>

      <main id="features" className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium">Create & Manage</h3>
          <p className="text-sm text-gray-600">Create tickets, assign priorities, and track progress with inline validation.</p>
        </section>
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium">Track Status</h3>
          <p className="text-sm text-gray-600">Visual status tags: open, in_progress, and closed — color-coded for clarity.</p>
        </section>
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium">Team Dashboard</h3>
          <p className="text-sm text-gray-600">Summary stats, quick actions, and secure access control for your team.</p>
        </section>
      </main>

    </div>
  )
}
