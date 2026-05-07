'use client';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    id: 1,
    question: 'Is Parjatak free to use?',
    answer:
      'Yes! Parjatak is completely free for all travellers. You can browse tourist spots, read reviews, explore community posts, and join discussions without any subscription or payment.',
  },
  {
    id: 2,
    question: 'How do I find tourist spots in my area?',
    answer:
      'Use our "Browse By" filter to select your Division and then your District. Our system will show you all listed tourist spots in that area with photos, descriptions, and community reviews.',
  },
  {
    id: 3,
    question: 'Can I share my own travel experiences?',
    answer:
      'Absolutely! Once you create a free account, you can write posts, upload photos, leave reviews on places, and share your travel stories with the entire Parjatak community.',
  },
  {
    id: 4,
    question: 'How are Popular Places determined?',
    answer:
      'Popular Places are ranked based on a combination of community engagement metrics — including view count, heart count, and the number of reviews and comments a place has received.',
  },
  {
    id: 5,
    question: 'Can I follow other travellers on Parjatak?',
    answer:
      'Yes! You can follow your favourite travellers and see their new posts directly on your home feed under "New Posts From Friends", keeping you updated with the journeys of people you care about.',
  },
  {
    id: 6,
    question: 'How do I add a new tourist place to the platform?',
    answer:
      'After logging in, you can submit a new tourist spot through the community contribution form. Our team reviews submissions to ensure quality before publishing them for everyone to discover.',
  },
];

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div
    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
      isOpen ? 'border-green-300 shadow-md' : 'border-gray-200 hover:border-gray-300'
    }`}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
    >
      <span className={`font-semibold text-base ${isOpen ? 'text-green-700' : 'text-gray-800'}`}>
        {faq.question}
      </span>
      <span className={`ml-4 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
        isOpen ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'
      }`}>
        {isOpen ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
      </span>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
        {faq.answer}
      </p>
    </div>
  </div>
);

const FAQ = () => {
  const [openId, setOpenId] = useState(1);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f7fdf9] to-white -z-10" />

      <div className="container max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-green-600 bg-green-50 border border-green-200 px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto text-base">
            Everything you need to know about Parjatak — your travel companion for exploring Bangladesh.
          </p>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-400 text-sm mt-10">
          Still have questions?{' '}
          <a href="https://facebook.com/officialPARJATAK" target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">
            Reach us on Facebook
          </a>
        </p>
      </div>
    </section>
  );
};

export default FAQ;
