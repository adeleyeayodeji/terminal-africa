import React, { Component, Fragment } from "react";

export default class MerchantSkeleton extends Component {
  render() {
    return (
      <Fragment>
        <div className="t-row">
          <div className="t-col-12">
            <div
              className="terminal-skeleton"
              style={{ height: "10px", width: "90%" }}
            />
            <div style={{ height: "10px" }} />
            <div
              className="terminal-skeleton"
              style={{ height: "20px", width: "90%" }}
            />
            <div style={{ height: "10px" }} />
            <div
              className="terminal-skeleton"
              style={{ height: "20px", width: "90%" }}
            />
            <div style={{ height: "10px" }} />
            <div
              className="terminal-skeleton"
              style={{ height: "30px", width: "90%" }}
            />
            <div style={{ height: "10px" }} />
            <div className="t-row">
              <div className="t-col-6">
                <div
                  className="terminal-skeleton"
                  style={{ height: "30px", width: "95%" }}
                />
              </div>
              <div className="t-col-6">
                <div
                  className="terminal-skeleton"
                  style={{ height: "30px", width: "80%" }}
                />
              </div>
            </div>
            <div style={{ height: "10px" }} />
            <div
              className="terminal-skeleton"
              style={{ height: "30px", width: "90%" }}
            />
            <div style={{ height: "10px" }} />
            <div
              className="terminal-skeleton"
              style={{ height: "40px", width: "90%" }}
            />
            <div style={{ height: "10px" }} />
            <div className="t-row">
              <div className="t-col-6">
                <div
                  className="terminal-skeleton"
                  style={{ height: "30px", width: "95%" }}
                />
              </div>
              <div className="t-col-6">
                <div
                  className="terminal-skeleton"
                  style={{ height: "30px", width: "80%" }}
                />
              </div>
            </div>
            <div style={{ height: "10px" }} />
            <div
              className="terminal-skeleton"
              style={{ height: "90px", width: "90%" }}
            />
            <div style={{ height: "10px" }} />
          </div>
        </div>
      </Fragment>
    );
  }
}
