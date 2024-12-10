import React, { Fragment } from "react";
import TerminalShippingHeader from "./Parts/TerminalShippingHeader";
import TerminalShippingSide from "./Parts/TerminalShippingSide";
import TerminalShippingForm from "./Parts/TerminalShippingForm";
import ShippingSkeleton from "./ShippingSkeleton";

class TerminalManageShipping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      shippingData: {},
      shippingStatus: {
        title: "--",
        className: "t-status-draft"
      },
      shippingTrackingNumber: "--"
    };
  }

  //did mount
  componentDidMount() {
    //get api data
    this.getApiData();
  }

  //get url params
  getUrlParams = (key) => {
    var urlScheme = new URLSearchParams(window.location.search);
    return urlScheme.get(key);
  };

  //api request
  getApiData = () => {
    //get url param id
    const id = this.getUrlParams("id");

    //get api data
    jQuery(document).ready(($) => {
      $.ajax({
        type: "GET",
        url: terminal_africa.ajax_url,
        data: {
          action: "terminal_africa_get_shipping_api_data",
          id,
          nonce: terminal_africa.nonce
        },
        dataType: "json",
        beforeSend: () => {
          //set is loading
          this.setState({ isLoading: true });
        },
        success: (response) => {
          //check response code is 200
          if (response.code === 200) {
            //set is loading
            this.setState({ isLoading: false });
            //pass to shipping data
            this.setState({ shippingData: response.data });

            //get shipping status
            this.getShippingStatus();
          } else {
            //swal
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!: " + response.message,
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
        },
        error: (xhr, status, error) => {
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

  //get shipping status
  getShippingStatus = () => {
    jQuery(document).ready(($) => {
      const { shipping_id, order_id, rate_id } = this.state.shippingData;

      //ajax
      $.ajax({
        type: "GET",
        url: terminal_africa.ajax_url,
        data: {
          action: "get_terminal_shipment_status",
          nonce: terminal_africa.nonce,
          shipment_id: shipping_id,
          order_id,
          rate_id
        },
        dataType: "json",
        beforeSend: () => {
          jQuery("#manage-terminal-shipping").block({
            message: "Getting shipments...",
            overlayCSS: {
              background: "#fff",
              opacity: 0.8,
              cursor: "wait"
            },
            css: {
              border: 0,
              padding: 0,
              backgroundColor: "transparent"
            }
          });
        },
        success: (response) => {
          //close   Swal loader
          jQuery("#manage-terminal-shipping").unblock();
          //check if response code is 200
          if (response.code === 200) {
            //shippingStatus
            this.setState({
              shippingStatus: {
                title: response.data,
                className: "t-status-" + response.data
              }
            });
            //check for cancelled shipment
            let cancellation_request =
              response.shipment_info.cancellation_request;
            // PENDING CANCELLATION
            //update #terminal_shipment_status html
            if (cancellation_request) {
              $("#terminal_shipment_status").html("PENDING CANCELLATION");
            } else {
              $("#terminal_shipment_status").html(response.data);
            }
            //check for shipment canceled
            if (!cancellation_request) {
              const {
                shipment_info: {
                  extras: shipping_info = {},
                  address_from = {},
                  address_to = {}
                } = {}
              } = response;
              const {
                shipping_label_url,
                tracking_number,
                commercial_invoice_url,
                carrier_tracking_url
              } = shipping_info;
              const addressFromCountry = address_from.country;
              const addressToCountry = address_to.country;

              //set tracking number
              this.setState({
                shippingTrackingNumber: tracking_number
              });

              const shippingLabelTemplate = shipping_label_url
                ? `
                  <p class="t-shipping-p-left">
                    <b>Shipping Label:</b> <a href="${shipping_label_url}" class="t-shipment-info-link" target="_blank">View Label</a>
                  </p>
                `
                : "";

              const commercialInvoiceTemplate =
                addressFromCountry !== addressToCountry
                  ? `
                  <br>
                  <p class="t-shipping-p-left">
                    <b>Commercial Invoice:</b> <a href="${commercial_invoice_url}" class="t-shipment-info-link" target="_blank">View Invoice</a>
                  </p>
                  <p class="t-shipping-p-left">
                    <b>Carrier Tracking:</b> <a href="${carrier_tracking_url}" class="t-shipment-info-link" target="_blank">View Tracking</a>
                  </p>
                `
                  : "";

              const template = `
                  <div class="t-space"></div>
                  ${shippingLabelTemplate}
                  <p class="t-shipping-p-left">
                    <b>Tracking Link:</b> <a href="${
                      terminal_africa.tracking_url + shipping_id
                    }" class="t-shipment-info-link" target="_blank">Track Shipment</a>
                  </p>
                  ${commercialInvoiceTemplate}
                  <div class="t-space"></div>
                `;

              $("#t_carriers_location").before(template);
            }

            //load button
            $("#t_carriers_location").html(response.button);
          } else {
            //Swal
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.message,
              confirmButtonColor: "rgb(246 146 32)",
              //confirm button text
              confirmButtonText: "Continue",
              footer: `
              <div>
                <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
              </div>
            `
            });
          }
        },
        error: (xhr, status, error) => {
          jQuery("#manage-terminal-shipping").unblock();
          console.log(xhr, status, error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!: " + xhr.responseText,
            confirmButtonColor: "rgb(246 146 32)",
            cancelButtonColor: "rgb(0 0 0)",
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
    const { isLoading, shippingData, shippingStatus, shippingTrackingNumber } =
      this.state;
    const rate_id = shippingData.rate_id;
    const trackingLink = "";

    return (
      <Fragment>
        {isLoading ? (
          <ShippingSkeleton />
        ) : (
          <div className="t-row">
            <div className="t-col-8 t-col-lg-8 t-col-md-12 t-col-sm-12">
              <div className="t-ml-5 t-side-left">
                <TerminalShippingHeader
                  shippingData={shippingData}
                  shippingStatus={shippingStatus}
                />
                <TerminalShippingForm
                  saved_address={shippingData.saved_address}
                  rate_id={rate_id}
                  shippingData={shippingData}
                  action_type="customer"
                />
              </div>
            </div>
            <div className="t-col-4 t-col-lg-4 t-col-md-12 t-col-sm-12">
              <TerminalShippingSide
                shippingData={shippingData}
                shippingTrackingNumber={shippingTrackingNumber}
                trackingLink={trackingLink}
              />
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default TerminalManageShipping;
