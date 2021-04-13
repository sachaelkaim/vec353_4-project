import React from "react";
import Person from "./Person.js";
import HealthWorker from "./HealthWorker.js";
import Facility from "./Facility.js";
import SpecificAddress from "./SpecificAddress.js";
import AllFacilities from "./AllFacilities.js";
import WorkersSpecificFacility from "./workersSpecificFacility.js";

const Home = () => {

  return (
    <div className="home">
     <Person/>
     <br/><br/><br/>
     <HealthWorker/>
     <br/><br/><br/>
     <Facility/>
     <br/><br/><br/>
     <SpecificAddress/>
     <br/><br/><br/>
     <AllFacilities/>
     <br/><br/><br/>
     <WorkersSpecificFacility/>
    </div>
  );
};

export default Home;
