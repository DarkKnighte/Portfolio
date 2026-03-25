import React from "react";
import {Link} from "react-router";
import './Homepage.scss';
import Header from "../components/Header.jsx";
import { CarouselPlugin } from "../components/CarouselPlugin.jsx";
import { GithubLanguages } from "../components/Chart.jsx";

const Homepage = () => {
  return (
    <>
      <Header />

      <div className="container">
        <h1>Welcome to My Portfolio</h1>
        <p>This is the homepage of my portfolio website.</p>
        <CarouselPlugin />
        <GithubLanguages />
      </div>
    </>
  );
};

export default Homepage;
