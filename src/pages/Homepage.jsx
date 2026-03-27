import React from "react";
import {Link} from "react-router";
import './Homepage.scss';
import Header from "../components/Header.jsx";
import CarouselPlugin from "../components/CarouselPlugin.jsx";
import Chart from "../components/Chart.jsx";
import Banner from '../components/Banner.jsx'

const Homepage = () => {
  return (
    <>
      <Header />
        <Banner />
        <div className="container">
          <CarouselPlugin />
          <Chart />
        </div>
    </>
  );
};

export default Homepage;
