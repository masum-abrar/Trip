import { Suspense } from "react";
import AllPlaces from "./components/AllMovies";

import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import Category from "./components/Category";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CommunitySlider from "./components/NewPost";
import NewPost from "./components/NewPost";
import PopularPost from "./components/PopularPost";
import PopularReviews from "./components/PopularReviews";
import Reviews from "./components/Reviews";
import Test from "./components/Test";


export default function Home() {
  return (
    <div className="bg-white h-full">
      <div className="z-50">  
        <Navbar />
      </div>
      
      <div className="z-0">
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-200" />}>
          <Carousel/>
        </Suspense>
      </div>
      
      <div>
        <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>
          <Category/>
        </Suspense>
      </div>
      
      <div>
        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100" />}>
          <AllPlaces/>
        </Suspense>
      </div>
      
      <div>
        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100" />}>
          <PopularPost/>
        </Suspense>
      </div>
      
      <div>
        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100" />}>
          <CommunitySlider/>
        </Suspense>
      </div>
      
      <div>
        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100" />}>
          <PopularReviews/>
        </Suspense>
      </div>
      
      <div>
        <Footer/>
      </div>
    </div>
  );
}
