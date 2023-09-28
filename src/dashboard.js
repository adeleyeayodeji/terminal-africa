import React from "react";
import ReactDOM from "react-dom";
import TerminalPhoneBook from "./components/TerminalPhoneBook";
//on document ready
document.addEventListener("DOMContentLoaded", () => {
  //load the terminal phonebook button
  const terminalPhoneBookDiv = document.getElementById("t-phonebook-container");
  //check if element exist
  if (terminalPhoneBookDiv) {
    ReactDOM.render(<TerminalPhoneBook />, terminalPhoneBookDiv);
  }
});
