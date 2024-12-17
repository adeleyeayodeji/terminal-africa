import React, { Component } from "react";

export default class BreadCrumb extends Component {
  render() {
    return (
      <div className="t-breadcrumb">
        <a href="#" className="t-breadcrumb--link">
          Shipments
        </a>
        <span className="t-breadcrumb--separator"> / </span>
        <span className="t-breadcrumb--link">SH-Y1UTIYGI8G2GXH0D</span>
      </div>
    );
  }
}
