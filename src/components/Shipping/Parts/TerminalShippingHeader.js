import React, { Fragment } from "react";
import TerminalPhoneBook from "../../TerminalPhoneBook";

export default function TerminalShippingHeader() {
  return (
    <Fragment>
      <div className="t-shipment-header t-flex">
        <div>
          <div className="t-flex">
            <h1>SH-16380611554</h1>
            <img
              src={terminal_africa.plugin_url + "/img/copy-icon.svg"}
              alt="Terminal Copy Icon"
            />
          </div>
          <div
            className="t-status-list t-status-draft"
            style={{ width: "fit-content" }}>
            draft
          </div>
        </div>
        <div className="t-flex">
          <TerminalPhoneBook />
        </div>
      </div>
    </Fragment>
  );
}
