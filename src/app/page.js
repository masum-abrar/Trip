import AllMovies from "./components/AllMovies";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import Category from "./components/Category";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PopularReviews from "./components/PopularReviews";
import Reviews from "./components/Reviews";


export default function Home() {
  return (
   <div className="bg-white h-full">
   <div className=" z-50">  
   <Navbar  />
   </div >
   <div className="z-0">
    <Carousel/>
   </div>
   <div className="">
    <Category/>
   </div>
   <div>
    <AllMovies/>
   </div>
   <div>
    <Banner/>
   </div>
   <div>
    <Reviews/>
   </div>
   <div>
    <PopularReviews/>
   </div>
   <div >
    <Footer/>
   </div>
   </div>
  );
}
