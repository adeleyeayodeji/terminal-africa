import React, { Component, Fragment } from "react";
import TerminalPhoneBook from "../TerminalPhoneBook";
import TerminalShippingForm from "../Shipping/Parts/TerminalShippingForm";
import MerchantSkeleton from "./MerchantSkeleton";

export default class MerchantAddressForm extends Component {
  constructor() {
    super();
    this.state = {
      saved_address: {
        first_name: "",
        last_name: "",
        line1: "",
        line2: "",
        email: "",
        country: "",
        state: "",
        city: "",
        phone: "",
        zip: "",
        states: [],
        cities: []
      },
      shippingData: {},
      isLoading: true,
      merchant_address_id: 0
    };
  }

  //did mount
  componentDidMount() {
    //get api data
    this.getApiData();
  }

  //getApiData
  getApiData = () => {
    //ajax
    jQuery(document).ready(($) => {
      $.ajax({
        type: "GET",
        url: terminal_africa.ajax_url,
        data: {
          action: "terminal_africa_get_merchant_address_data",
          nonce: terminal_africa.nonce
        },
        dataType: "json",
        success: (response) => {
          //disable loading
          this.setState({
            isLoading: false
          });
          //check response code is 200
          if (response.code === 200) {
            //set state
            this.setState({
              saved_address: response.data.saved_address,
              shippingData: response.data.shippingData,
              merchant_address_id: response.data.merchant_address_id
            });
          } else {
            //Swal error
            Swal.fire({
              icon: "error",
              title: "Oops...",
              confirmButtonColor: "rgb(246 146 32)",
              //confirm button text
              confirmButtonText: "Close",
              text: response.message,
              footer: `
                <div>
                    <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
                </div>
                 `
            });
          }
        },
        error: function (xhr, status, error) {
          //disable loading
          this.setState({
            isLoading: false
          });
          //swal
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!: " + xhr.responseText,
            confirmButtonColor: "rgb(246 146 32)",
            cancelButtonColor: "rgb(0 0 0)",
            //footer
            footer: `
                    <div>
                        <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
                    </div>
                    `
          });
        }
      });
    });
  };

  render() {
    const { saved_address, shippingData, isLoading, merchant_address_id } =
      this.state;

    return (
      <Fragment>
        {isLoading ? (
          <MerchantSkeleton />
        ) : (
          <>
            <div className="t-merchant-page-header">
              <div className="t-flex">
                <h2>PickUp Address</h2>
                <TerminalPhoneBook />
              </div>
            </div>
            <div className="t-mt-3">
              <TerminalShippingForm
                saved_address={saved_address}
                rate_id={0}
                shippingData={shippingData}
                merchant_address_id={merchant_address_id}
                action_type="merchant">
                <p className="t-note">
                  Please fill in your address details below. This address will
                  be used to pick up your items from your location.
                </p>
              </TerminalShippingForm>
            </div>
          </>
        )}
      </Fragment>
    );
  }
}
