import React from "react";
import ReactDOM from "react-dom";
import TerminalPhoneBook from "./components/TerminalPhoneBook";
import TerminalManageShipping from "./components/Shipping/TerminalManageShipping";
import MerchantAddressForm from "./components/MerchantAddress/MerchantAddressForm";
//on document ready
document.addEventListener("DOMContentLoaded", () => {
  //load the terminal phonebook button
  const terminalPhoneBookDiv = document.getElementById("t-phonebook-container");
  //check if element exist
  if (terminalPhoneBookDiv) {
    ReactDOM.render(<TerminalPhoneBook />, terminalPhoneBookDiv);
  }

  //load manage-terminal-shipping
  const manageTerminalShipping = document.getElementById(
    "manage-terminal-shipping"
  );

  //check if element exist
  if (manageTerminalShipping) {
    //render dom TerminalManageShipping
    ReactDOM.render(<TerminalManageShipping />, manageTerminalShipping);
  }

  //load terminal-merchant-address
  const terminalMerchantAddress = document.getElementById(
    "terminal-merchant-address"
  );

  //check if element exist
  if (terminalMerchantAddress) {
    //render dom MerchantAddressForm
    ReactDOM.render(<MerchantAddressForm />, terminalMerchantAddress);
  }
});
