import React from "react";
import "../style/DayTile.css";
var moment = require("moment");

const DayCard = ({ reading }) => {
  let newDate = new Date();
  const weekday = reading.dt * 1000;
  newDate.setTime(weekday);

  const imgURL = `owf owf-${reading.weather[0].id} owf-5x`;

  return (
    <div className="col-sm-2">
      <div className="card dayTile">
        <h3 className="card-title tileTitle">
          {moment(newDate).format("dddd")}
        </h3>
        <p className="text-muted dateText">
          {moment(newDate).format("MMMM Do, h:mm a")}
        </p>
        <div className="weatherIcon">
          <i className={imgURL}></i>
        </div>
        <h2 className="temp">{Math.round(reading.main.temp)} °F</h2>
        <div className="card-body description">
          <p className="card-text">{reading.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
