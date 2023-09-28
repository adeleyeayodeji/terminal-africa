import React, { Component } from "react";
import {
  Modal,
  SearchControl,
  __experimentalScrollable as Scrollable,
  Spinner
} from "@wordpress/components";
import "./../scss/terminal-phonebook.scss";
import TerminalLoader from "./Loader";

/**
 * Terminal Phone Book
 */
class TerminalPhoneBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      closeModal: false,
      value: ""
    };
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    //get phone book
    this.props.getPhoneBook();
  }

  /**
   * Get phone book
   */
  getPhoneBook = () => {
    //ajax
    jQuery(document).ready(function () {
      //TODO
      //ajax
      // $.ajax({
      //   type: "Get",
      //   url: terminal_africa.ajax_url,
      //   data: "data",
      //   dataType: "dataType",
      //   success: function (response) {
      //   }
      // });
    });
  };

  /**
   * showModal
   * @returns {void}
   */
  showModal = (event) => {
    //prevent default
    event.preventDefault();
    //show alert dialog
    this.setState({ showModal: true });
  };

  /**
   * Close the modal
   * @returns {void}
   */
  closeModal = () => {
    this.setState({ showModal: false });
  };

  /**
   * Handle Change
   * @returns {void}
   */
  handleChange = (value) => {
    this.setState({ value: value });
  };

  render() {
    let { showModal, value } = this.state;
    //return view
    return (
      <>
        {showModal && (
          <Modal title="Terminal Address Book" onRequestClose={this.closeModal}>
            <div className="t-phonebook-modal">
              <div className="t-phonebook-area">
                <div className="t-input-container">
                  <SearchControl
                    label="Search Address Book"
                    placeholder="Search Address Book"
                    value={value}
                    onChange={(v) => this.handleChange(v)}
                  />
                </div>
                <div className="t-scroll-area">
                  <Scrollable
                    style={{ maxHeight: 200 }}
                    smoothScroll={true}
                    className="t-scroll-area-div">
                    <div style={{ maxHeight: 500 }}>
                      <TerminalLoader />
                    </div>
                  </Scrollable>
                </div>
              </div>
            </div>
          </Modal>
        )}
        <button className="t-phonebook" onClick={this.showModal}>
          <i className="fa fa-address-book" ariaHidden="true"></i> Import
          phonebook
        </button>
      </>
    );
  }
}

export default TerminalPhoneBook;
