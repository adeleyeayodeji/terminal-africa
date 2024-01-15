import React, { Fragment } from "react";

export default function TerminalShippingSide() {
  return (
    <Fragment>
      <div style={{ padding: "0px 30px" }}>
        <div className="t-shipping-side">
          <div className="t-flex t-flex t-mb-2">
            <h3>Manage Order</h3>
            <button className="t-manage-shipping-button">
              Track{" "}
              <img
                src={terminal_africa.plugin_url + "/img/arrow-forward-new.svg"}
                alt="Track Shipment"
                style={{ marginLeft: 10 }}
              />
            </button>
          </div>
          <div className="t-flex">
            <h4>Order Date</h4>
            <p>5th March 21, 7:00:00PM</p>
          </div>
          <div className="t-flex">
            <h4>Order Number</h4>
            <p>74</p>
          </div>
          <div className="t-flex" style={{ marginTop: 10 }}>
            <a
              href="#"
              className="t-btn t-btn-primary t-btn-sm"
              style={{ padding: "14px", borderRadius: "13px" }}>
              Manage in WC Editor
            </a>
          </div>
        </div>
        <div className="t-shipping-side" style={{ marginTop: 40 }}>
          <div className="t-flex t-flex t-mb-2">
            <h3>Manage Shipping</h3>
          </div>
          <div className="t-flex">
            <h4>Carrier</h4>
            <p>DHL Express</p>
          </div>
          <div className="t-flex">
            <h4>Tracking Number</h4>
            <p>938737329293</p>
          </div>
          <div className="t-flex">
            <h4>Shipping price</h4>
            <p>₦ 2,556.00</p>
          </div>
          <div style={{ marginTop: 13 }} id="t_carriers_location"></div>
        </div>
      </div>
    </Fragment>
  );
}
