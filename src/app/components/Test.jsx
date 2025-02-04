'use client'
import React, { useState } from "react";

const sections = [
  {
    id: 1,
    title: "World News",
    image: "https://upload.wikimedia.org/wikipedia/en/4/40/Abc_world_news_now_logo_2016.jpg",
    content: `World leaders gather to discuss major global issues, including climate change, economic policies, and international conflicts. 
    The recent summit in Geneva saw agreements on reducing carbon emissions, but tensions remain over trade wars. 
    Political analysts predict further negotiations in the coming months.

    According to sources, the upcoming trade agreements are expected to redefine international economic policies. 
    Diplomats from multiple nations have expressed concerns about potential geopolitical shifts, and major corporations 
    are already preparing contingency plans. 

    In a recent speech, the UN Secretary-General emphasized the importance of collaboration in solving global crises. 
    Humanitarian organizations have also raised alarms about the impact of economic sanctions on vulnerable populations. 
    Experts suggest that the global economy is at a critical juncture, and decisive action is needed.

    Meanwhile, climate change remains a pressing issue, with activists demanding stricter regulations. 
    The recent wildfires in Australia and flooding in Europe highlight the urgent need for sustainable policies. 
    The Paris Agreement targets are being reassessed, with some nations pushing for more aggressive carbon reduction strategies.
    
    Scientists are now debating the effectiveness of carbon tax policies, and energy companies are under pressure to transition to renewables.
    With these ongoing discussions, the global community is watching closely for the next steps in addressing climate change.`,
  },
  {
    id: 2,
    title: "Business & Economy",
    image: "https://upload.wikimedia.org/wikipedia/en/4/40/Abc_world_news_now_logo_2016.jpg",
    content: `Stock markets show signs of recovery after a turbulent year, with major indices reporting gains. 
    The Federal Reserve has hinted at potential interest rate adjustments to curb inflation. Meanwhile, tech companies 
    continue to dominate, with record-breaking earnings reported in Q4.

    Analysts predict that the job market will experience a significant shift as automation becomes more prevalent. 
    Several industries, including finance and manufacturing, are investing heavily in AI-driven solutions, leading 
    to both job displacement and the creation of new opportunities in the tech sector.

    In the cryptocurrency space, Bitcoin and Ethereum have seen volatile movements, with major investors 
    expressing both optimism and skepticism. The regulatory environment remains uncertain, with several governments 
    considering new policies to manage digital assets.

    Real estate markets are also experiencing fluctuations. While urban housing prices continue to rise, 
    suburban areas are becoming more attractive due to remote work trends. Experts suggest that the future of 
    real estate will be closely tied to evolving work-from-home policies and economic stability.
    
    Many experts believe that the increasing interest rates could slow down the housing boom, while new 
    government regulations may impact mortgage availability. With new tax reforms on the horizon, businesses 
    are adjusting their strategies for 2025.`,
  },
  {
    id: 3,
    title: "Business & Economy",
    image: "https://upload.wikimedia.org/wikipedia/en/4/40/Abc_world_news_now_logo_2016.jpg",
    content: `Stock markets show signs of recovery after a turbulent year, with major indices reporting gains. 
    The Federal Reserve has hinted at potential interest rate adjustments to curb inflation. Meanwhile, tech companies 
    continue to dominate, with record-breaking earnings reported in Q4.

    Analysts predict that the job market will experience a significant shift as automation becomes more prevalent. 
    Several industries, including finance and manufacturing, are investing heavily in AI-driven solutions, leading 
    to both job displacement and the creation of new opportunities in the tech sector.

    In the cryptocurrency space, Bitcoin and Ethereum have seen volatile movements, with major investors 
    expressing both optimism and skepticism. The regulatory environment remains uncertain, with several governments 
    considering new policies to manage digital assets.

    Real estate markets are also experiencing fluctuations. While urban housing prices continue to rise, 
    suburban areas are becoming more attractive due to remote work trends. Experts suggest that the future of 
    real estate will be closely tied to evolving work-from-home policies and economic stability.
    
    Many experts believe that the increasing interest rates could slow down the housing boom, while new 
    government regulations may impact mortgage availability. With new tax reforms on the horizon, businesses 
    are adjusting their strategies for 2025.`,
  },
  {
    id: 4,
    title: "Business & Economy",
    image: "https://upload.wikimedia.org/wikipedia/en/4/40/Abc_world_news_now_logo_2016.jpg",
    content: `Stock markets show signs of recovery after a turbulent year, with major indices reporting gains. 
    The Federal Reserve has hinted at potential interest rate adjustments to curb inflation. Meanwhile, tech companies 
    continue to dominate, with record-breaking earnings reported in Q4.

    Analysts predict that the job market will experience a significant shift as automation becomes more prevalent. 
    Several industries, including finance and manufacturing, are investing heavily in AI-driven solutions, leading 
    to both job displacement and the creation of new opportunities in the tech sector.

    In the cryptocurrency space, Bitcoin and Ethereum have seen volatile movements, with major investors 
    expressing both optimism and skepticism. The regulatory environment remains uncertain, with several governments 
    considering new policies to manage digital assets.

    Real estate markets are also experiencing fluctuations. While urban housing prices continue to rise, 
    suburban areas are becoming more attractive due to remote work trends. Experts suggest that the future of 
    real estate will be closely tied to evolving work-from-home policies and economic stability.
    
    Many experts believe that the increasing interest rates could slow down the housing boom, while new 
    government regulations may impact mortgage availability. With new tax reforms on the horizon, businesses 
    are adjusting their strategies for 2025.`,
  }
];

function Test() {
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-4 font-serif">The Daily Gazette</h1>

      {/* Newspaper Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border border-gray-300 p-2 cursor-pointer hover:bg-gray-200 transition-all"
            onClick={() => setSelectedSection(section)}
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-60 object-cover"
            />
            <h3 className="text-lg font-bold mt-1">{section.title}</h3>
            <p className="text-sm text-gray-700 line-clamp-2">{section.content.slice(0, 100)}...</p>
          </div>
        ))}
      </div>

      {/* Modal for Full Article */}
      {selectedSection && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setSelectedSection(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-3xl relative font-serif leading-relaxed max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-500"
              onClick={() => setSelectedSection(null)}
            >
              ✖
            </button>
            <h2 className="text-3xl font-bold mb-4">{selectedSection.title}</h2>
            <img
              src={selectedSection.image}
              alt={selectedSection.title}
              className="w-full h-80 object-cover mb-4"
            />
            <p className="text-gray-800">{selectedSection.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Test;
