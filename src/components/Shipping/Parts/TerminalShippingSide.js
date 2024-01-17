import React, { Component, Fragment } from "react";

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
  gotoWCOrder = () => {
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
    const { shippingData, shippingTrackingNumber } = this.props;

    return (
      <Fragment>
        <div style={{ padding: "0px 30px" }}>
          <div className="t-shipping-side">
            <div className="t-flex t-flex t-mb-2">
              <h3>Manage Order</h3>
              <button
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
              </button>
            </div>
            <div className="t-flex">
              <h4>Order Date</h4>
              <p>{shippingData.order_date}</p>
            </div>
            <div className="t-flex">
              <h4>Order Number</h4>
              <p>#{shippingData.order_id}</p>
            </div>
            <div className="t-flex" style={{ marginTop: 10 }}>
              <a
                href="javascript:;"
                onClick={this.gotoWCOrder}
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
              <div className="t-flex">
                <img
                  src={shippingData?.saved_others?.carrier_logo}
                  alt="Carrier Logo"
                  style={{ height: 15, marginBottom: 8, marginRight: 5 }}
                />
                <p>
                  {shippingData?.saved_others?.carrier_name}{" "}
                  {shippingData?.saved_others?.carrier_rate_description}
                </p>
              </div>
            </div>
            <div className="t-flex">
              <h4>Tracking Number</h4>
              <p className="t-new-tracking-number">{shippingTrackingNumber}</p>
            </div>
            <div className="t-flex">
              <h4>Shipping price</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: shippingData.shipping_price
                }}></p>
            </div>
            <div style={{ marginTop: 13 }} id="t_carriers_location"></div>
          </div>
        </div>
      </Fragment>
    );
  }
}
