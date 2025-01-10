import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import TerminalPhoneBook from "../../TerminalPhoneBook";
import ShippingStatus from "./ShippingStatus";
import TerminalTrackingButton from "./TerminalTrackingButton";

export default class TerminalShippingHeader extends Component {
  //constructor
  constructor(props) {
    super(props);

    this.state = {};
  }

  //componentDidMount
  componentDidMount() {}

  //componentDidUpdate
  componentDidUpdate() {}

  /**
   * Copy shipping id to clipboard
   *
   * @returns void
   */
  copyShippingIdToClipboard = () => {
    //copy to clipboard
    navigator.clipboard.writeText(this.props?.shippingData?.shipping_id);
    //izitoast
    iziToast.show({
      title: "Copied",
      message: "Shipping ID copied to clipboard",
      theme: "dark",
      position: "topRight",
      progressBarColor: "rgb(246 146 32)",
      transitionIn: "flipInX",
      transitionOut: "flipOutX"
    });
  };

  /**
   * Handle track shipment click
   *
   * @returns void
   */
  handleTrackShipmentClick = () => {
    //get tracking url from props
    const trackingUrl =
      this.props.shippingData?.all_shipping_data?.extras?.tracking_url;
    //redirect to tracking url
    window.open(trackingUrl, "_blank");
  };

  /**
   * Handle invoice link click
   *
   * @returns void
   */
  handleInvoiceLinkClick = () => {
    //redirect to invoice link
    window.open(
      this.props.shippingData?.all_shipping_data?.extras
        ?.commercial_invoice_url,
      "_blank"
    );
  };

  /**
   * Handle waybill link click
   *
   * @returns void
   */
  handleWaybillLinkClick = () => {
    //redirect to waybill link
    window.open(
      this.props.shippingData?.all_shipping_data?.extras
        ?.aws_shipping_label_url,
      "_blank"
    );
  };

  render() {
    const { shippingData, shippingStatus } = this.props;

    return (
      <Fragment>
        <div
          className="t-shipment-header"
          style={{ flexDirection: "column", gap: 25 }}>
          <div
            className="t-flex"
            style={{
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start"
            }}>
            <div className="t-flex" style={{ width: "100%" }}>
              <div
                onClick={this.copyShippingIdToClipboard}
                className="t-flex"
                style={{ cursor: "pointer" }}
                data-shipping-id={shippingData?.shipping_id}>
                <h1>{shippingData?.shipping_id}</h1>
                <img
                  src={terminal_africa.plugin_url + "/img/copy-icon.svg"}
                  alt="Terminal Copy Icon"
                />
              </div>
              <div className="t-flex t-button-phonebook">
                {shippingStatus.title == "draft" ? (
                  <TerminalPhoneBook />
                ) : (
                  <TerminalTrackingButton
                    handleTrackShipmentClick={this.handleTrackShipmentClick}
                    width="20"
                    height="20"
                  />
                )}
              </div>
            </div>
            <div
              className="t-flex t-button-phonebook-mobile-custom"
              style={{
                width: "100%"
              }}>
              <ShippingStatus
                className={shippingStatus.className}
                title={shippingStatus.title}
              />
              <div className="t-flex t-button-phonebook-mobile">
                {shippingStatus.title == "draft" ? (
                  <TerminalPhoneBook />
                ) : (
                  <TerminalTrackingButton
                    handleTrackShipmentClick={this.handleTrackShipmentClick}
                    width="20"
                    height="20"
                  />
                )}
              </div>
            </div>
          </div>
          {shippingStatus.title != "draft" && shippingStatus.title != "--" && (
            <div className="t-waybill-actions">
              <a
                href="javascript:void(0)"
                onClick={this.handleInvoiceLinkClick}>
                View Invoice
              </a>
              <a
                href="javascript:void(0)"
                onClick={this.handleWaybillLinkClick}>
                View Waybill
              </a>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}
