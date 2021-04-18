import React from "react";
import Person from "./Person.js";
import HealthWorker from "./HealthWorker.js";
import Facility from "./Facility.js";
import SpecificAddress from "./SpecificAddress.js";
import AllFacilities from "./AllFacilities.js";
import WorkersSpecificFacility from "./workersSpecificFacility.js";
import Region from "./Region.js";
import GroupZone from "./GroupZone.js";
import PHRecommendations from "./PHRecommendations.js";
import AllRegions from "./AllRegions.js";
import ResultTestPeople from "./ResultTestPeople.js";
import AllMessages from "./AllMessages.js";
import DetailProgress from "./DetailProgress.js";
import Report from "./Report.js";
import PositiveFacility from "./PositiveFacility.js";
import SymptomsFollowUp from "./SymptomsFollowUp.js";

const Home = () => {
  return (
    <div className="home">
      <Person />
      <br />
      <br />
      <br />
      <HealthWorker />
      <br />
      <br />
      <br />
      <Facility />
      <br />
      <br />
      <br />
      <Region />
      <br />
      <br />
      <br />
      <GroupZone />
      <br />
      <br />
      <br />
      <PHRecommendations />
      <br />
      <br />
      <br />
      <SymptomsFollowUp />
      <br />
      <br />
      <br />
      <DetailProgress />
      <br />
      <br />
      <br />
      <AllMessages />
      <br />
      <br />
      <br />
      <SpecificAddress />
      <br />
      <br />
      <br />
      <AllFacilities />
      <br />
      <br />
      <br />
      <AllRegions />
      <br />
      <br />
      <br />
      <ResultTestPeople />
      <br />
      <br />
      <br />
      <WorkersSpecificFacility />
      <br />
      <br />
      <br />
      <PositiveFacility />
      <br />
      <br />
      <br />
      <Report />
    </div>
  );
};

export default Home;
