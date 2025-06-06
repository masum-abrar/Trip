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
    < AllPlaces/>
   </div>
   <div>
    <PopularPost/>
   </div>
   <div> 
   <CommunitySlider/>
     </div>
   {/* <div>
    <Banner/>
   </div> */}
   {/* <div>
    <Reviews/>
   </div> */}
   {/* <div>
    <Test/>
   </div> */}
   <div>
    <PopularReviews/>
   </div>
   <div >
    <Footer/>
   </div>
   </div>
  );
}
