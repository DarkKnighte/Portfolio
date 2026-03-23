import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import './App.scss';
//import './temp.scss';
import Homepage from './pages/Homepage.jsx';
import Header from './components/Header.jsx';
import { CarouselPlugin } from "./components/CarouselPlugin.jsx";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App
