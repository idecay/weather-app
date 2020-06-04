import React, { Component } from "react";
import apiConfig from "../apiKeys";
import DayTile from "./DayTile";

export default class WeekContainer extends Component {
  state = {
    fullData: [],
    dailyData: [],
  };

  componentDidMount = () => {
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?zip=30047&units=imperial&APPID=${apiConfig.openWeatherKey}`;

    fetch(weatherURL)
      .then((res) => res.json())
      .then((data) => {
        const dailyData = data.list.filter((reading) =>
          reading.dt_txt.includes("18:00:00")
        );
        this.setState(
          {
            fullData: data.list,
            dailyData: dailyData,
          },
          () => console.log(this.state)
        );
      });
  };

  formatDayTiles = () => {
    return this.state.dailyData.map((reading, index) => (
      <DayTile reading={reading} key={index} />
    ));
  };

  render() {
    return (
      <div className="container">
        <h1 className="display-1 jumbotron">Your 5-day Forcast</h1>
        <h5 className="display-5 text-muted">Lilburn, GA</h5>
        <div className="row justify-content-center">
          {this.formatDayTiles()}
        </div>
      </div>
    );
  }
}
