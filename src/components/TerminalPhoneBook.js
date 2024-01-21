import React, { Component } from "react";
import {
  Modal,
  SearchControl,
  __experimentalScrollable as Scrollable,
  Spinner,
  Snackbar,
  __experimentalItemGroup as ItemGroup,
  __experimentalItem as Item
} from "@wordpress/components";

import "./../scss/bootstrap5.scss";
import "./../scss/terminal-phonebook.scss";
import "./../scss/responsive.scss";
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
      search: "",
      addressBook: [],
      isLoading: true,
      isLoadingNew: false,
      scrolledToBottom: false,
      defaultPage: 1,
      nextPageisAvailable: false
    };
  }

  /**
   * componentDidMount
   */
  componentDidMount() {}

  /**
   * componentDidUpdate
   */
  componentWillUnmount() {}

  /**
   * Get phone book
   */
  getAddressBook = () => {
    //ajax
    jQuery(document).ready(($) => {
      //ajax
      $.ajax({
        type: "GET",
        url: terminal_africa.ajax_url,
        data: {
          action: "terminal_africa_get_address_book",
          nonce: terminal_africa.nonce,
          page: this.state.defaultPage,
          search: this.state.search
        },
        dataType: "json",
        beforeSend: () => {
          //check if search is not empty
          if (this.state.search !== "") {
            //loading state
            this.setState({ isLoading: true });
          } else {
            //set state
            this.setState({ isLoadingNew: true });
          }
        },
        success: (response) => {
          //hasnextpage
          var hasNextPage = response.data.pagination.hasNextPage;
          //parse to bool
          hasNextPage = Boolean(hasNextPage);
          //check if the response code is 200
          if (response.code === 200) {
            //check if search is not empty
            if (this.state.search !== "") {
              //clear the previous address book data
              this.setState({ addressBook: [] });
            }
            //set state
            this.setState({
              addressBook: [
                ...this.state.addressBook,
                ...response.data.addresses
              ],
              isLoading: false,
              isLoadingNew: false,
              nextPageisAvailable: hasNextPage
            });
          } else {
            //set state
            this.setState({
              isLoading: false,
              nextPageisAvailable: false,
              isLoadingNew: false
            });
          }
        },
        error: (xhr, status, error) => {
          //show gutenberg toast
          try {
            wp.data
              .dispatch("core/notices")
              .createNotice("success", "Error: " + xhr.responseText, {
                type: "snackbar",
                isDismissible: true
              });
          } catch (error) {}
        }
      });
    });
  };

  handleScroll = (e) => {
    const scrollableDiv = e.target;
    //round up scroll
    var totalScroll = scrollableDiv.scrollTop + scrollableDiv.clientHeight;
    totalScroll = Math.ceil(totalScroll);
    if (totalScroll >= scrollableDiv.scrollHeight) {
      this.setState({
        scrolledToBottom: true,
        defaultPage: this.state.defaultPage + 1
      });
      //check if has hasNextPage
      if (this.state.nextPageisAvailable) {
        //get address book
        this.getAddressBook();
      }
    } else {
      this.setState({ scrolledToBottom: false });
    }
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
    //get phone book
    this.getAddressBook();
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
    //update state
    this.setState({ search: value, defaultPage: 1 });
    //check if not empty string
    if (value !== "") {
      //search the server
      this.getAddressBook();
    }
  };

  /**
   * Handle Item Click
   * @returns {void}
   */
  handleItemClick = (event) => {
    //prevent default
    event.preventDefault();
    //get address id
    var addressId = event.currentTarget.getAttribute("data-address-id");
    //search for address where address id
    var address = this.state.addressBook.find(
      (address) => address.address_id === addressId
    );

    //check if address exist
    if (!address) {
      //show gutenberg toast
      try {
        wp.data
          .dispatch("core/notices")
          .createNotice("success", "Address not found", {
            type: "snackbar",
            isDismissible: true
          });
      } catch (error) {}
      return;
    }

    //set address
    /////////////////////

    jQuery(document).ready(($) => {
      const $tbody = $(".t-body");
      // update first name
      $tbody.find('input[name="first_name"]').val(address.first_name);
      //update p#t_first_name
      $tbody.find("#t_first_name").text(address.first_name);
      // update last name
      $tbody.find('input[name="last_name"]').val(address.last_name);
      //update p#t_last_name
      $tbody.find("#t_last_name").text(address.last_name);
      // update email
      $tbody.find('input[name="email"]').val(address.email);
      //update p#t_email
      $tbody.find("#t_email").text(address.email);
      // update phone
      $tbody.find('input[name="phone"]').val(address.phone);
      //update p#t_phone
      $tbody.find("#t_phone").text(address.phone);
      // update line_1
      $tbody.find('input[name="line_1"]').val(address.line1);
      //update p#t_address
      $tbody.find("#t_address").text(address.line1 + " " + address.line2);
      // update line_2
      $tbody.find('input[name="line_2"]').val(address.line2);
      // update zip_code
      $tbody.find('input[name="zip_code"]').val(address.zip);
      //check if input element with name 'address_id' exist
      if ($tbody.find('input[name="address_id"]').length) {
        //update address_id
        $tbody.find('input[name="address_id"]').val(address.address_id);
      } else {
        //create input element
        var input = $("<input>")
          .attr("type", "hidden")
          .attr("name", "address_id")
          .val(address.address_id);
        //append to form
        $tbody.find("form").append($(input));
      }
      // update zip_code
      $tbody.find('input[name="zip_code"]').val(address.zip);

      //close modal
      this.closeModal();

      //remove all city options
      $tbody
        .find('select[name="lga"] option')
        .remove()
        .trigger("select2.change");

      // update select2 country
      const countrySelect = $tbody.find('select[name="country"]');
      countrySelect.val(address.country);
      //check if t-phone-new-select exist
      if ($(".t-phone-new-select").length) {
        console.log(address);
        //set address option where option data-isocode is address.country
        $(".t-phone-new-select option[data-isocode=" + address.country + "]")
          .prop("selected", true)
          .trigger("change");
      }
      //trigger event
      countrySelect.trigger("change");
    });
  };

  render() {
    let {
      showModal,
      search,
      isLoading,
      addressBook,
      scrolledToBottom,
      isLoadingNew
    } = this.state;
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
                    className="t-phonebook-search"
                    value={search}
                    onChange={(v) => this.handleChange(v)}
                  />
                </div>
                <div className="t-scroll-area">
                  <Scrollable
                    style={{ maxHeight: 200 }}
                    smoothScroll={true}
                    onScroll={this.handleScroll}
                    className="t-scroll-area-div">
                    <div style={{ maxHeight: 500 }}>
                      {isLoading ? (
                        <TerminalLoader />
                      ) : (
                        <>
                          <ItemGroup>
                            {addressBook.map((item, index) => {
                              return (
                                <Item
                                  key={index}
                                  className="t-phonebook-item"
                                  data-address-id={item.address_id}
                                  onClick={this.handleItemClick}>
                                  <div className="t-phonebook-item-content">
                                    <div className="t-phonebook-item-name">
                                      {item.first_name} {item.last_name}
                                    </div>
                                    <div className="t-phonebook-item-sub">
                                      {item.city}, {item.state}, {item.country}
                                    </div>
                                    <div className="t-phonebook-item-phone">
                                      {item.line1}
                                    </div>
                                  </div>
                                </Item>
                              );
                            })}
                          </ItemGroup>
                          {scrolledToBottom && (
                            <div className="t-phonebook-scrolled-to-bottom-message">
                              {isLoadingNew ? (
                                <TerminalLoader />
                              ) : (
                                <>You've reached the end of the list.</>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </Scrollable>
                </div>
              </div>
            </div>
          </Modal>
        )}
        <button className="t-manage-shipping-button" onClick={this.showModal}>
          <img
            src={terminal_africa.plugin_url + "/img/phone-book.svg"}
            alt="Phone Book"
          />
          Import Address
        </button>
      </>
    );
  }
}

export default TerminalPhoneBook;
