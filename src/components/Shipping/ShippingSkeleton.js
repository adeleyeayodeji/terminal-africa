import React from "react";

export default function ShippingSkeleton() {
  return (
    <div className="t-row" style={{ marginLeft: "25px" }}>
      <div className="t-col-8 t-col-lg-8 t-col-md-8 t-col-sm-12">
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
      <div className="t-col-4 t-col-lg-4 t-col-md-4 t-col-sm-12">
        <div
          className="terminal-skeleton"
          style={{ height: "380px", width: "90%" }}
        />
      </div>
    </div>
  );
}
