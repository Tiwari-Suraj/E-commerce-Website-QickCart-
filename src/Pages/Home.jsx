import React from "react";
import Hero from "../Components/Hero";
import Latestcollection from "../Components/Latestcollection";
import BestSeller from "../Components/BestSeller";
import OurPolicy from "../Components/OurPolicy";
import NewsletterBox from "../Components/NewsletterBox";

const Home = () => {
  return (
    <div>
      <Hero />
      <Latestcollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
