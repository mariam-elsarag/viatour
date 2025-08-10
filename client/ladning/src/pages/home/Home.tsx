import React from "react";
import Faq from "./Components/Faq";
import Support from "./Components/Support";
import Testimonial from "./Components/Testimonial";

const Home = () => {
  return (
    <section className="">
      <Testimonial />
      <Support />
      <Faq />
    </section>
  );
};

export default Home;
