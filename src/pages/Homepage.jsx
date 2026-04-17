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
        <div id="projets" className="container">
          <h1 className="container-title">Projets</h1>
          <ProjectsCarousel />
          <Chart />
        </div>
        <div id="contact" className="footer">
          <h1 className="footer-title">Contact</h1>
          <ContactForm />
        </div>

    </>
  );
};

export default Homepage;
