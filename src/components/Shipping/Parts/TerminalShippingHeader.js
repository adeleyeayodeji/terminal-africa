import React, { Fragment, Component } from "react";
import TerminalPhoneBook from "../../TerminalPhoneBook";
import SippingStatus from "./SippingStatus";

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
        <div className="t-shipment-header t-flex">
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
              <SippingStatus
                className={shippingStatus.className}
                title={shippingStatus.title}
              />
              <div className="t-button-phonebook-mobile-inner">
                <TerminalPhoneBook />
              </div>
            </div>
          </div>
          <div className="t-flex t-button-phonebook">
            <TerminalPhoneBook />
          </div>
        </div>
      </Fragment>
    );
  }
}
