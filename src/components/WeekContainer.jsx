import React, { Component } from "react";
import apiConfig from "../apiKeys";
import DayTile from "./DayTile";

export default class WeekContainer extends Component {
  state = {
    fullData: [],
    dailyData: [],
    locationData: [],
    zip: "90210",
  };

  componentDidMount = () => {
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?zip=${this.state.zip}&units=imperial&APPID=${apiConfig.openWeatherKey}`;

    const zipURL = `https://www.zipcodeapi.com/rest/${apiConfig.zipCodeKey}/info.json/${this.state.zip}/degrees`;

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

    fetch(zipURL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ locationData: data }, () => console.log(this.state));
      });
  };

  formatDayTiles = () => {
    return this.state.dailyData.map((reading, index) => (
      <DayTile reading={reading} key={index} />
    ));
  };

  onChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const newState = { ...this.state };
    newState[name] = value;
    this.setState(newState);
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.componentDidMount();
  };

  render() {
    return (
      <div className="container">
        <h1 className="display-1 jumbotron">Your 5-day Forcast</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="zip"
            placeholder="Enter zip code..."
            value={this.state.zip}
            onChange={this.onChange}
          />
        </form>
        <h5 className="display-5 text-muted">
          {this.state.locationData.city}, {this.state.locationData.state}
        </h5>

        <div className="row justify-content-center">
          {this.formatDayTiles()}
        </div>
      </div>
    );
  }
}
