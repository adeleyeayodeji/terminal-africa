import React, { Fragment, Component } from "react";
import TerminalPhoneBook from "../../TerminalPhoneBook";
import SippingStatus from "./SippingStatus";

export default class TerminalShippingHeader extends Component {
  //constructor
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { shippingData, shippingStatus } = this.props;

    return (
      <Fragment>
        <div className="t-shipment-header t-flex">
          <div>
            <div className="t-flex">
              <h1>{shippingData?.shipping_id}</h1>
              <img
                src={terminal_africa.plugin_url + "/img/copy-icon.svg"}
                alt="Terminal Copy Icon"
              />
            </div>
            <SippingStatus
              className={shippingStatus.className}
              title={shippingStatus.title}
            />
          </div>
          <div className="t-flex">
            <TerminalPhoneBook />
          </div>
        </div>
      </Fragment>
    );
  }
}
