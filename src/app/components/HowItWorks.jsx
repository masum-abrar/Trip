'use client';
import React from 'react';
import { FaUserPlus, FaSearchLocation, FaPaperPlane } from 'react-icons/fa';
import Link from 'next/link';

const steps = [
  {
    step: '01',
    icon: FaUserPlus,
    title: 'Create Your Account',
    description:
      'Sign up for free and join thousands of travel enthusiasts across Bangladesh. Set up your profile and let your journey begin.',
    color: 'from-green-400 to-emerald-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  {
    step: '02',
    icon: FaSearchLocation,
    title: 'Discover Hidden Gems',
    description:
      'Browse tourist spots by division and district. Read authentic reviews, explore galleries, and plan your perfect itinerary.',
    color: 'from-blue-400 to-cyan-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    step: '03',
    icon: FaPaperPlane,
    title: 'Share Your Experience',
    description:
      'Post your travel stories, photos, and tips. Rate places, write reviews, and inspire fellow travellers across the country.',
    color: 'from-orange-400 to-red-500',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-blue-600 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full mb-4">
            Getting Started
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            How Parjatak Works
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base">
            From signup to your first travel post — three simple steps to explore and share Bangladesh like never before.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-0.5 bg-gradient-to-r from-green-300 via-blue-300 to-orange-300 z-0" />

          {steps.map(({ step, icon: Icon, title, description, color, bg, border }) => (
            <div
              key={step}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Step Badge */}
              <div className="relative mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white text-3xl" />
                </div>
                <span className={`absolute -top-3 -right-3 w-8 h-8 rounded-full ${bg} border-2 ${border} flex items-center justify-center text-xs font-extrabold text-gray-700 shadow`}>
                  {step}
                </span>
              </div>

              {/* Card */}
              <div className={`${bg} border ${border} rounded-2xl p-6 w-full hover:shadow-xl transition-shadow duration-300`}>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8cc163] to-emerald-500 hover:from-emerald-500 hover:to-[#8cc163] text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-base"
          >
            Get Started — It's Free
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
