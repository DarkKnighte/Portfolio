import React from "react";
import {Link} from "react-router";
import './Homepage.scss';
import Header from "../components/Header.jsx";
import ProjectsCarousel from '../components/Projectscarousel.jsx';
import Chart from "../components/Chart.jsx";
import Banner from '../components/Banner.jsx'
import ContactForm from '../components/Form.jsx'

const Homepage = () => {
  return (
    <>
      <Header />
        <Banner />
        <div className="container">
          <ProjectsCarousel />
          <Chart />
        </div>
        <div className="Footer">
          <ContactForm />
        </div>

    </>
  );
};

export default Homepage;
