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
          <h1>Welcome to My Portfolio</h1>
          <p>This is the homepage of my portfolio website.</p>
          <CarouselPlugin />
          <Chart />
        </div>
    </>
  );
};

export default Homepage;
