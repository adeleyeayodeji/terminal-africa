import React, { Fragment, Component } from "react";
import TerminalPhoneBook from "../../TerminalPhoneBook";
import ShippingStatus from "./ShippingStatus";

export default class TerminalShippingHeader extends Component {
  //constructor
  constructor(props) {
    super(props);

    this.state = {};
  }

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

  render() {
    const { shippingData, shippingStatus } = this.props;

    return (
      <Fragment>
        <div
          className="t-shipment-header"
          style={{ flexDirection: "column", gap: 25 }}>
          <div className="t-flex">
            <div>
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
              <div className="t-flex t-button-phonebook-mobile">
                <ShippingStatus
                  className={shippingStatus.className}
                  title={shippingStatus.title}
                />
                <div className="t-button-phonebook-mobile-inner">
                  {shippingStatus.title == "draft" ? (
                    <TerminalPhoneBook />
                  ) : (
                    <a
                      href={shippingData.tracking_link}
                      target="_blank"
                      className="t-track-shipment-link">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <ellipse
                          cx="10"
                          cy="6.6665"
                          rx="2.5"
                          ry="2.5"
                          stroke="white"
                          stroke-width="1.5"
                        />
                        <path
                          d="M13.8969 10.0953C14.4838 9.20062 15 8.07763 15 6.84835C15 3.9865 12.7614 1.6665 10 1.6665C7.23858 1.6665 5 3.9865 5 6.84835C5 7.93141 5.32061 8.93687 5.86885 9.76834L9.31968 15.4855C9.59695 15.9449 10.2408 15.95 10.5249 15.4951L13.8969 10.0953Z"
                          stroke="white"
                          stroke-width="1.5"
                        />
                        <path
                          d="M7.5 17.5H12.5"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                      <span>Track shipment</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="t-flex t-button-phonebook">
              {shippingStatus.title == "draft" ? (
                <TerminalPhoneBook />
              ) : (
                <a
                  href={shippingData?.tracking_link}
                  target="_blank"
                  className="t-track-shipment-link">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <ellipse
                      cx="10"
                      cy="6.6665"
                      rx="2.5"
                      ry="2.5"
                      stroke="white"
                      stroke-width="1.5"
                    />
                    <path
                      d="M13.8969 10.0953C14.4838 9.20062 15 8.07763 15 6.84835C15 3.9865 12.7614 1.6665 10 1.6665C7.23858 1.6665 5 3.9865 5 6.84835C5 7.93141 5.32061 8.93687 5.86885 9.76834L9.31968 15.4855C9.59695 15.9449 10.2408 15.95 10.5249 15.4951L13.8969 10.0953Z"
                      stroke="white"
                      stroke-width="1.5"
                    />
                    <path
                      d="M7.5 17.5H12.5"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  <span>Track shipment</span>
                </a>
              )}
            </div>
          </div>
          {shippingStatus.title != "draft" && shippingStatus.title != "--" && (
            <div className="t-waybill-actions">
              <a href={shippingData?.waybill_link} target="_blank">
                View Invoice
              </a>
              <a href={shippingData?.waybill_link} target="_blank">
                View Waybill
              </a>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}
