import React, { Component } from "react";
import Header from "../../components/Header/index";
import { SiteHeading } from "../../constants/messages";

export default class Detail extends Component {
  render() {
    return (
      <div>
        <Header
          heading={SiteHeading + " : " + this.props.location.title}
        ></Header>
        <div className="movie-detail">
          <b>Summary:</b> <br></br>
          <div className="overview">{this.props.location.overview}</div>
        </div>
      </div>
    );
  }
}
