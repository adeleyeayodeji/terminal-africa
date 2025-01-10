import React, { Component, Fragment } from "react";
import ShippingAsideDraft from "./ShippingAsideDraft";
import ProcessedShipmentSide from "./ProcessedShipmentSide";

export default class TerminalShippingSide extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Goto WC Order
   *
   * @returns void
   */
  gotoWCOrder = (event) => {
    event.preventDefault();

    try {
      //block ui
      jQuery.blockUI({
        message: "Redirecting to WC Order...",
        css: {
          border: "none",
          padding: "15px",
          backgroundColor: "#000",
          opacity: 0.5,
          color: "#fff"
        },
        overlayCSS: {
          backgroundColor: "#fff",
          opacity: 0.6
        }
      });
      //redirect this.props.shippingData.order_url
      window.location.href = this.props.shippingData.order_url;
    } catch (error) {
      //unblock ui
      jQuery.unblockUI();
    }
  };

  /**
   * Goto Tracking Page
   *
   * @returns void
   */
  gotoTracking = () => {
    const { shippingData } = this.props;
    //open link in a new tab
    const link = terminal_africa.tracking_url + shippingData.shipping_id;
    //goto page
    window.open(link, "_blank").focus();
  };

  render() {
    const { shippingData, shippingTrackingNumber, shippingStatus, rate_id } =
      this.props;

    return (
      <Fragment>
        <div style={{ padding: "0px 30px" }}>
          <div className="t-shipping-side">
            <div className="t-flex t-flex t-mb-2">
              <h3>Order Details</h3>
              {/* <button
                className="t-manage-shipping-button"
                onClick={this.gotoTracking}>
                Track{" "}
                <img
                  src={
                    terminal_africa.plugin_url + "/img/arrow-forward-new.svg"
                  }
                  alt="Track Shipment"
                  style={{ marginLeft: 10 }}
                />
              </button> */}
            </div>
            <div className="t-flex">
              <h4>Order Date</h4>
              <p>{shippingData.order_date}</p>
            </div>
            <div className="t-flex">
              <h4>Order Number</h4>
              <p>#{shippingData.order_id}</p>
            </div>
            <div className="t-flex">
              <h4>Order Value</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: shippingData.order_value
                }}></p>
            </div>
            <div className="t-flex" style={{ marginTop: 10 }}>
              <a
                href={shippingData.order_url}
                className="t-shipment-wc-link"
                onClick={this.gotoWCOrder}>
                <span>View Order</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.21967 9.78033C0.512563 10.0732 0.987437 10.0732 1.28033 9.78033L8.5 2.56066V8.25C8.5 8.66421 8.83579 9 9.25 9C9.66421 9 10 8.66421 10 8.25V0.75C10 0.335787 9.66421 0 9.25 0H1.75C1.33579 0 1 0.335787 1 0.75C1 1.16421 1.33579 1.5 1.75 1.5H7.43934L0.21967 8.71967C-0.0732233 9.01256 -0.0732233 9.48744 0.21967 9.78033Z"
                    fill="#F7941E"
                  />
                </svg>
              </a>
            </div>
          </div>
          {shippingStatus.title == "draft" || shippingStatus.title == "--" ? (
            <ShippingAsideDraft
              shippingData={shippingData}
              shippingTrackingNumber={shippingTrackingNumber}
            />
          ) : (
            <ProcessedShipmentSide
              saved_address={shippingData.saved_address}
              rate_id={rate_id}
              shippingData={shippingData}
              shippingStatus={shippingStatus}
            />
          )}
        </div>
      </Fragment>
    );
  }
}
