import React, { useEffect, useState } from "react";
import SportSchedRepo from "../repositories/SportSchedRepo";
import PumpSchedRepo from "../repositories/PumpSchedRepo";

export default HanldeReq = function () {

  const [sportSched, setSportSched] = useState([]);
  const [pumpSched, setPumpSched] = useState([]);

  const username = 'deltora';
  const aioKey = 'aio_DvwZ39MUOhp6tE67Kp5zdut7yw4m';
  const NTPKey = 'bksport-ntp';
  const OTPKey = 'bksport-otp';

  useEffect(() => {
    // setTimeout(() => {
    //   console.log("abc");
    //   // handleSportSched();
    //   setTimeout(() => {
    //     // handlePumpSched();
    //     console.log("bcd");
    //   }, 2000);
    // }, 2000);
    console.log(2);
  });

  useEffect(() => {
    // recurFunc();
    console.log(1);
  }, []);

  // const handleSportSched = () => {
  //   console.log(sportSched);
  // }

  // const handlePumpSched = () => {
  //   console.log(pumpSched);
  // }

  // function recurFunc () {
  //   setTimeout(() => {
  //     getDataSportSched();
  //     setTimeout(() => {
  //       getDataPumpSched();
  //     }, 6000);
  //   }, 6000);
  //   recurFunc();
  // }

  // const getDataSportSched = () => {
  //   SportSchedRepo.getAllSportSched()
  //     .then((result) => {
  //       setSportSched(result);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching schedule:", error);
  //     });
  // };

  // const getDataPumpSched = () => {
  //   PumpSchedRepo.getAllPumpSched()
  //     .then((result) => {
  //       setPumpSched(result);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching schedule:", error);
  //     });
  // };

};