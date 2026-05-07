import { Suspense } from "react";
import AllPlaces from "./components/AllMovies";
import Carousel from "./components/Carousel";
import Category from "./components/Category";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";
import Newsletter from "./components/Newsletter";
import PopularPost from "./components/PopularPost";
import PopularReviews from "./components/PopularReviews";
import Statistics from "./components/Statistics";

export const metadata = {
  title: "Parjatak — Bangladesh's #1 Travel Community",
  description:
    "Explore tourist spots across Bangladesh, share travel experiences, read real reviews and connect with fellow travellers. Join Parjatak — free forever.",
};

export default function Home() {
  return (
    <div className="bg-white h-full">
      {/* ── 1. Navbar ── */}
      <div className="z-50">
        <Navbar />
      </div>

      {/* ── 2. Hero / Carousel ── */}
      <div className="z-0">
        <Suspense fallback={<div className="h-[80vh] animate-pulse bg-gray-200" />}>
          <Carousel />
        </Suspense>
      </div>

      {/* ── 3. Statistics (dynamic from backend) ── */}
      {/* pt-10 gives room for the floating search bar that hangs below the hero */}
      <div className="pt-10">
        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-50" />}>
          <Statistics />
        </Suspense>
      </div>

      {/* ── 4. Browse by Category (Division / District filter) ── */}
      <div>
        <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>
          <Category />
        </Suspense>
      </div>

      {/* ── 5. Popular Places (slider from API) ── */}
      <div>
        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100" />}>
          <AllPlaces />
        </Suspense>
      </div>

      {/* ── 6. How It Works ── */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-50" />}>
        <HowItWorks />
      </Suspense>

      {/* ── 7. New Posts From Friends (logged-in users) ── */}
      <div>
        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100" />}>
          <PopularPost />
        </Suspense>
      </div>

      {/* ── 8. Community Posts (all users) ── */}
      <div>
        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100" />}>
          <NewPost />
        </Suspense>
      </div>

      {/* ── 9. Popular Reviews ── */}
      <div>
        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100" />}>
          <PopularReviews />
        </Suspense>
      </div>

      {/* ── 10. FAQ ── */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-50" />}>
        <FAQ />
      </Suspense>

      {/* ── 11. Newsletter / CTA ── */}
      <Newsletter />

      {/* ── 12. Footer ── */}
      <div>
        <Footer />
      </div>
    </div>
  );
}
