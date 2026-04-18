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
        <h1 id="projets" className="projet-title">Projets</h1>
        <div className="container">
          <ProjectsCarousel />
          <Chart />
        </div>
        <div className="footer">
          <h1 id="contact" className="footer-title">Contact</h1>
          <ContactForm />
        </div>

    </>
  );
};

export default Homepage;
