import React, { Component } from "react";
import apiConfig from "../apiKeys";

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

  render() {
    return (
      <div>
        <h1>Welcome to the Weather App</h1>
      </div>
    );
  }
}
