import React from "react";
import Person from "./Person.js";
import HealthWorker from "./HealthWorker.js";
import Facility from "./Facility.js";

const Home = () => {

  return (
    <div className="home">
     <Person/>
     <br/><br/><br/>
     <HealthWorker/>
     <br/><br/><br/>
     <Facility/>
    </div>
  );
};

export default Home;
