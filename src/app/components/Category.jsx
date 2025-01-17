'use client'
import React, { useState } from 'react';

const Category = () => {
  // State for dropdown selection
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [subdistrict, setSubdistrict] = useState('');
  const [place, setPlace] = useState('');

  // Example Bangladesh data
  const data = {
    Dhaka: {
      districts: {
        Dhaka: {
          subdistricts: {
            Dhanmondi: ['Rabindra Sarobar', 'Dhanmondi Lake'],
            Mirpur: ['National Zoo', 'Martyr Intellectuals Memorial'],
          },
        },
        Gazipur: {
          subdistricts: {
            Tongi: ['Tongi Bazaar', 'Tongi Bridge'],
            Sreepur: ['Bhawal Resort', 'National Park'],
          },
        },
      },
    },
    Chittagong: {
      districts: {
        Chittagong: {
          subdistricts: {
            Halishahar: ['Beach Area', 'Local Market'],
            Pahartali: ['Mini Bangladesh', 'Park'],
          },
        },
        CoxBazar: {
          subdistricts: {
            Teknaf: ['St. Martin\'s Island', 'Shahparir Dwip'],
            Ukhiya: ['Campsite', 'Scenic Spot'],
          },
        },
      },
    },
  };

  // Handlers for dropdown changes
  const handleDivisionChange = (e) => {
    setDivision(e.target.value);
    setDistrict('');
    setSubdistrict('');
    setPlace('');
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setSubdistrict('');
    setPlace('');
  };

  const handleSubdistrictChange = (e) => {
    setSubdistrict(e.target.value);
    setPlace('');
  };

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };

  return (
    <div className=" p-6 container max-w-[1120px] mx-auto mt-5">
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
        {/* Division Dropdown */}
        <h1 className='text-black'>Browse By :</h1>
        <select
          className="bg-black text-white rounded-md p-2 w-full md:w-auto"
          value={division}
          onChange={handleDivisionChange}
        >
          <option value="">Select Division</option>
          {Object.keys(data).map((div) => (
            <option key={div} value={div}>
              {div}
            </option>
          ))}
        </select>

        {/* District Dropdown */}
        <select
          className="bg-black text-white rounded-md p-2 w-full md:w-auto"
          value={district}
          onChange={handleDistrictChange}
          disabled={!division}
        >
          <option value="">Select District</option>
          {division &&
            Object.keys(data[division].districts).map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
        </select>

        {/* Subdistrict Dropdown */}
        <select
          className="bg-black text-white rounded-md p-2 w-full md:w-auto"
          value={subdistrict}
          onChange={handleSubdistrictChange}
          disabled={!district}
        >
          <option value="">Select Subdistrict</option>
          {district &&
            Object.keys(data[division].districts[district].subdistricts).map(
              (sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              )
            )}
        </select>

        {/* Place Dropdown */}
        <select
          className="bg-black text-white rounded-md p-2 w-full md:w-auto"
          value={place}
          onChange={handlePlaceChange}
          disabled={!subdistrict}
        >
          <option value="">Select Place</option>
          {subdistrict &&
            data[division].districts[district].subdistricts[subdistrict].map(
              (plc) => (
                <option key={plc} value={plc}>
                  {plc}
                </option>
              )
            )}
        </select>

        {/* Search Box */}
        <h1  className='text-black'>Search Place:</h1>
        <input
          type="text"
          placeholder="Search..."
          className="bg-black text-white rounded-md p-2 w-full md:w-auto outline-none"
        />
      </div>
    </div>
  );
};

export default Category;
