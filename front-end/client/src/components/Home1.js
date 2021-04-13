import React from "react";
import SpecificAddress from "./SpecificAddress.js";
import AllFacilities from "./AllFacilities.js";

const Home1 = () => {

  return (
    <div className="home">
     <SpecificAddress/>
     <br/><br/><br/>
     <AllFacilities/>
     <br/><br/><br/>
    </div>
  );
};

export default Home1;