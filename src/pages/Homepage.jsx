import React from "react";
import {Link} from "react-router";
import './Homepage.scss';
import Header from "../components/Header.jsx";
import ProjectsCarousel from '../components/Projectscarousel.jsx';
import Chart from "../components/Chart.jsx";
import Banner from '../components/Banner.jsx'

const Homepage = () => {
  return (
    <>
      <Header />
        <Banner />
        <div className="container">
          <ProjectsCarousel />
          <Chart />
        </div>
    </>
  );
};

export default Homepage;
