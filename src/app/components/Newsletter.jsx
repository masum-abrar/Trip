'use client';
import React, { useState } from 'react';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a2a] via-[#0f2d1e] to-[#0a1f14] -z-10" />

      {/* Decorative circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-500 rounded-full opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-400 rounded-full opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-green-800 rounded-full opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-green-700 rounded-full opacity-20 pointer-events-none" />

      <div className="container max-w-3xl mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-green-400 bg-green-900/50 border border-green-700 px-4 py-1.5 rounded-full mb-6">
          Stay Connected
        </span>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          Never Miss a Hidden Gem
        </h2>
        <p className="text-gray-300 text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Subscribe to Parjatak's weekly newsletter for curated travel spots, community highlights, and insider tips from fellow explorers across Bangladesh.
        </p>

        {/* Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-start sm:items-center max-w-lg mx-auto">
            <div className="flex-1 w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="Enter your email address..."
                className={`w-full px-5 py-4 rounded-xl bg-white/10 backdrop-blur border ${
                  error ? 'border-red-400' : 'border-white/20'
                } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all text-sm`}
              />
              {error && (
                <p className="text-red-400 text-xs mt-2 text-left">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-[#8cc163] to-emerald-500 hover:from-emerald-500 hover:to-[#8cc163] text-white font-bold px-7 py-4 rounded-xl shadow-lg hover:shadow-green-800/50 transition-all duration-300 text-sm whitespace-nowrap"
            >
              <FaPaperPlane />
              Subscribe
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-4 animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center">
              <FaCheckCircle className="text-green-400 text-3xl" />
            </div>
            <p className="text-white text-lg font-semibold">You're in! Welcome to the Parjatak community 🎉</p>
            <p className="text-gray-400 text-sm">Watch your inbox for the best of Bangladesh travel.</p>
          </div>
        )}

        {/* Trust note */}
        {!submitted && (
          <p className="text-gray-500 text-xs mt-6">
            No spam, ever. Unsubscribe anytime. 🔒 Your privacy is respected.
          </p>
        )}

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
          {[
            { value: '5K+', label: 'Subscribers' },
            { value: 'Weekly', label: 'Newsletter' },
            { value: '100%', label: 'Free Forever' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-extrabold text-green-400">{value}</span>
              <span className="text-gray-400 text-xs mt-1 uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
