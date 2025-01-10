import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import TerminalPhoneBook from "./components/TerminalPhoneBook";
import TerminalManageShipping from "./components/Shipping/TerminalManageShipping";
import MerchantAddressForm from "./components/MerchantAddress/MerchantAddressForm";
import ShippingHomePage from "./components/pages/ShippingHomePage/ShippingHomePage";
//on document ready
document.addEventListener("DOMContentLoaded", () => {
  //load the terminal phonebook button
  const terminalPhoneBookDiv = document.getElementById("t-phonebook-container");
  //check if element exist
  if (terminalPhoneBookDiv) {
    ReactDOM.render(
      <BrowserRouter>
        <TerminalPhoneBook />
      </BrowserRouter>,
      terminalPhoneBookDiv
    );
  }

  //load manage-terminal-shipping
  const manageTerminalShipping = document.getElementById(
    "manage-terminal-shipping"
  );

  //check if element exist
  if (manageTerminalShipping) {
    //render dom TerminalManageShipping
    ReactDOM.render(
      <BrowserRouter>
        <TerminalManageShipping />
      </BrowserRouter>,
      manageTerminalShipping
    );
  }

  //load terminal-merchant-address
  const terminalMerchantAddress = document.getElementById(
    "terminal-merchant-address"
  );

  //check if element exist
  if (terminalMerchantAddress) {
    //render dom MerchantAddressForm
    ReactDOM.render(
      <BrowserRouter>
        <MerchantAddressForm />
      </BrowserRouter>,
      terminalMerchantAddress
    );
  }

  //check if element exist #terminal-new-shipment-page-wrapper
  const terminalNewShipmentPageWrapper = document.getElementById(
    "terminal-new-shipment-page-wrapper"
  );

  //check if element exist
  if (terminalNewShipmentPageWrapper) {
    ReactDOM.render(
      <BrowserRouter>
        <ShippingHomePage />
      </BrowserRouter>,
      terminalNewShipmentPageWrapper
    );
  }
});
