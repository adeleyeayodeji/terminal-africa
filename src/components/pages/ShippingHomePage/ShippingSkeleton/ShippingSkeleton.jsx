import React, { Component } from "react";

export default class NewShippingSkeleton extends Component {
  render() {
    // Define style objects
    const skeletonStyle10 = { height: "10px", width: "90%" };
    const skeletonStyle15 = { height: "15px", width: "100%" };
    const skeletonStyle25 = { height: "25px", width: "90%" };

    return (
      <div className="t-row terminal-new-shipment-page">
        <div className="t-col-12 t-col-lg-12 t-col-md-12 t-col-sm-12">
          <div className="terminal-skeleton" style={skeletonStyle10}></div>
          <div style={{ height: "10px" }}></div>
          <div className="terminal-new-shipment-page--inner-column">
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
          </div>
          <div style={{ height: "10px" }}></div>
          <div className="terminal-new-shipment-page--inner-column">
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
          </div>
          <div style={{ height: "10px" }}></div>
          <div className="terminal-skeleton" style={skeletonStyle25}></div>
          <div style={{ height: "10px" }}></div>
          <div className="terminal-new-shipment-page--inner-column">
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
          </div>
          <div style={{ height: "10px" }}></div>
          <div className="terminal-new-shipment-page--inner-column">
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
          </div>
          <div style={{ height: "10px" }}></div>
          <div className="terminal-skeleton" style={skeletonStyle25}></div>
          <div style={{ height: "10px" }}></div>
          <div className="terminal-new-shipment-page--inner-column">
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
          </div>
          <div style={{ height: "10px" }}></div>
          <div className="terminal-new-shipment-page--inner-column">
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
            <div className="terminal-skeleton" style={skeletonStyle15}></div>
          </div>
          <div style={{ height: "10px" }}></div>
          <div className="terminal-skeleton" style={skeletonStyle25}></div>
          <div style={{ height: "10px" }}></div>
          <div className="terminal-skeleton" style={skeletonStyle25}></div>
          <div style={{ height: "10px" }}></div>
          <div className="terminal-skeleton" style={skeletonStyle25}></div>
          <div style={{ height: "10px" }}></div>
          <div className="terminal-skeleton" style={skeletonStyle25}></div>
          <div style={{ height: "10px" }}></div>
        </div>
      </div>
    );
  }
}
