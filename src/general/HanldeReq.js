import SportSchedRepo from "../repositories/SportSchedRepo";
import PumpSchedRepo from "../repositories/PumpSchedRepo";
import AdminRepo from "../repositories/AdminRepo";
import axios from "axios";

const username = "deltora";
const aioKey = "aio_xvKh78C2PjEvGg1Iph5MukmmQ4YV";
const NTPKey = "bksport-ntp";
const OTPKey = "bksport-otp";
var sportSched = [];
var pumpSched = [];
var adminID = 1;
var color = "red";

export default HanldeReq = function () {
  setInterval(() => {
    const delay = 2000;
    const delayFunction = async () => {
      handleSportSched();
      await new Promise((resolve) => setTimeout(resolve, delay));
      handlePumpSched();
      await new Promise((resolve) => setTimeout(resolve, delay));
      getDataSportSched();
      await new Promise((resolve) => setTimeout(resolve, delay));
      getDataPumpSched();
      await new Promise((resolve) => setTimeout(resolve, delay));
      getColorByAdminID();
    };
    delayFunction();
  }, 10000);

  const handleSportTime = (date_time, start_time) => {
    var time = new Date();
    time = JSON.stringify(time);
    time = time.slice(1, -1);
    var year = Number(time.substring(0, 4));
    var month = Number(time.substring(5, 7));
    var date = Number(time.substring(8, 10));
    var hour = Number(time.substring(11, 13));
    var minute = Number(time.substring(14, 16));
    var reserved_date = date_time.split("-");
    var reserved_time = start_time.split(":");

    hour = hour - 17;
    if (hour < 0) {
      hour += 24;
    }

    minute = minute + hour * 60;

    var reserved_minute =
      Number(reserved_time[1]) + Number(reserved_time[0]) * 60;

    if (
      year === Number(reserved_date[2]) &&
      month === Number(reserved_date[1]) &&
      date === Number(reserved_date[0]) &&
      minute >= reserved_minute - 5 &&
      minute <= reserved_minute
    ) {
      return true;
    }
    return false;
  };

  const handlePumpTime = (start_time) => {
    var time = new Date();
    time = JSON.stringify(time);
    time = time.slice(1, -1);
    var hour = Number(time.substring(11, 13));
    var minute = Number(time.substring(14, 16));
    var reserved_time = start_time.split(":");

    hour = hour - 17;
    if (hour < 0) {
      hour += 24;
    }

    minute = minute + hour * 60;

    var reserved_minute =
      Number(reserved_time[1]) + Number(reserved_time[0]) * 60;

    if (minute === reserved_minute) {
      return true;
    }
    return false;
  };

  const sendNTPToAdafruit = async (value) => {
    try {
      const response = await axios.post(
        `https://io.adafruit.com/api/v2/${username}/feeds/${NTPKey}/data`,
        {
          value: value,
        },
        {
          headers: {
            "X-AIO-Key": aioKey,
          },
        }
      );
      console.log("NTP sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const sendOTPToAdafruit = async (value) => {
    try {
      const response = await axios.post(
        `https://io.adafruit.com/api/v2/${username}/feeds/${OTPKey}/data`,
        {
          value: value,
        },
        {
          headers: {
            "X-AIO-Key": aioKey,
          },
        }
      );
      console.log("NTP sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleNTPData = (start_time, duration) => {
    const start_time_split = start_time.split(":");
    duration = duration * 1000;
    duration = duration.toString();
    const result =
      start_time_split[0] + "-" + start_time_split[1] + "-" + duration;
    console.log(result);
    return result;
  };

  const handleSportSched = () => {
    sportSched.map((item) => {
      if (
        handleSportTime(item.date_time, item.start_time) &&
        item.verification === 1
      ) {
        sendOTPToAdafruit(color);
      }
    });
  };

  const handlePumpSched = () => {
    pumpSched.map((item) => {
      if (handlePumpTime(item.start_time)) {
        sendNTPToAdafruit(handleNTPData(item.start_time, item.duration));
      }
    });
  };

  const getDataSportSched = () => {
    SportSchedRepo.getAllSportSched()
      .then((result) => {
        sportSched = result;
      })
      .catch((error) => {
        console.error("Error fetching schedule:", error);
      });
  };

  const getDataPumpSched = () => {
    PumpSchedRepo.getAllPumpSched()
      .then((result) => {
        pumpSched = result;
      })
      .catch((error) => {
        console.error("Error fetching schedule:", error);
      });
  };

  const getColorByAdminID = () => {
    AdminRepo.getAdminByID(adminID)
      .then((result) => {
        color = result.light_color;
      })
      .catch((error) => {
        console.error("Error fetching schedule:", error);
      });
  };
};
