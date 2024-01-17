import React, { Fragment } from "react";

class TerminalShippingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Dom loaded
   */
  componentDidMount() {}

  //did update
  componentDidUpdate(prevProps, prevState) {
    //listen for the update event of shippingData
    if (this.props.shippingData) {
      //trigger event from script.js
      this.loadSelect2();
    }
  }

  //load select2
  loadSelect2() {
    try {
      jQuery(document).ready(function ($) {
        //select2 template
        let formatState = (state) => {
          if (!state.id) {
            return state.text;
          }
          var $state = $(
            "<span>" + state.element.dataset.flag + " " + state.text + "</span>"
          );
          return $state;
        };

        //select2 phone template
        let formatPhoneState = (state) => {
          if (!state.id) {
            return state.text;
          }
          //check if state.text has +
          if (!state.text.includes("+")) {
            state.text = "+" + state.text;
          }

          var $state = $(
            "<span>" + state.element.dataset.flag + " " + state.text + "</span>"
          );
          return $state;
        };

        //init select2 .t-terminal-country
        $(".t-terminal-country").select2({
          placeholder: "Select",
          allowClear: true,
          width: "100%",
          //select class
          dropdownCssClass: "t-form-control",
          //dropdown parent
          dropdownParent: $(".t-terminal-country").parent(),
          //template
          templateResult: formatState,
          templateSelection: formatState
        });

        //init select2 .terminal-state
        $(".terminal-state").select2({
          placeholder: "Select",
          allowClear: true,
          width: "100%",
          //select class
          dropdownCssClass: "t-form-control",
          //dropdown parent
          dropdownParent: $(".terminal-state").parent()
        });

        //init select2 .terminal-city
        $(".terminal-city").select2({
          placeholder: "Select city",
          allowClear: true,
          width: "100%",
          //select class
          dropdownCssClass: "t-form-control",
          //dropdown parent
          dropdownParent: $(".terminal-city").parent()
        });

        //init select2 .t-phone-new-select
        $(".t-phone-new-select").select2({
          placeholder: "Select",
          allowClear: false,
          width: "100%",
          //select class
          dropdownCssClass: "t-form-control",
          //dropdown parent
          dropdownParent: $(".t-phone-new-select").parent(),
          //template
          templateResult: formatPhoneState,
          templateSelection: formatPhoneState
        });
      });

      //init formSubmitEvent
      this.formSubmitEvent();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * clearAllForms
   *
   * @returns void
   */
  clearAllForms = () => {
    //clear forms
    const form = document.querySelector("#t-form-submit");
    if (form) {
      Array.from(form.elements).forEach((element) => {
        if (element.type !== "hidden") {
          switch (element.type) {
            case "checkbox":
            case "radio":
              element.checked = false;
              break;
            default:
              element.value = "";
          }
        }
      });
      // Clear selected options in Select2 .t-terminal-country
      jQuery(
        ".t-terminal-country, .terminal-state, .terminal-city, .t-phone-new-select"
      )
        .val(null)
        .trigger("change");
    }
  };

  /**
   * Initialise Form Submission event
   *
   * @returns void
   */
  formSubmitEvent = () => {
    try {
      jQuery(document).ready(function ($) {
        //.t-form-submit
        $("#t-form-submit").submit(function (e) {
          console.log("Am working");
          //prevent default
          e.preventDefault();
          //form
          var form = $(this);
          //get type
          var type = form.data("type");
          var actionData = "terminal_merchant_save_address";
          //if type is customer
          if (type == "customer") {
            actionData = "terminal_customer_save_address";
          }
          var countryCode = form.find('select[name="country"]').val();
          var phone = form.find('input[name="phone"]').val();
          let tm_countries = terminal_africa.terminal_africal_countries;
          //find country where isoCode is NG
          let tm_country = tm_countries.find(
            (country) => country.isoCode === countryCode
          );
          //phone code
          let phonecode = tm_country.phonecode;
          var plussign = encodeURIComponent("+");
          //check if phonecode not include +
          if (!phonecode.includes("+")) {
            phonecode = "+" + phonecode;
          }
          if (phone) {
            //check if phone has +
            if (!phone.includes("+")) {
              //append to phone
              phone = phonecode + phone;
            }
          } else {
            //append to phone
            phone = "";
          }
          //replace + with encoded +
          phone = phone.replace("+", plussign);
          //get form serialized
          let formSerialized = form.serialize();
          //replace form input 'phone' with new phone number
          formSerialized = formSerialized.replace(
            /phone=[^&]+/,
            "phone=" + phone
          );
          //ajax
          $.ajax({
            type: "POST",
            url: terminal_africa.ajax_url,
            data:
              formSerialized +
              "&action=" +
              actionData +
              "&nonce=" +
              terminal_africa.nonce,
            dataType: "json",
            beforeSend: function () {
              // Swal loader
              Swal.fire({
                title: "Processing...",
                text: "Please wait...",
                imageUrl: terminal_africa.plugin_url + "/img/loader.gif",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showConfirmButton: false,
                footer: `
            <div>
              <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
            </div>
          `
              });
            },
            success: function (response) {
              //close loader
              Swal.close();
              //check response is 200
              if (response.code == 200) {
                //swal success
                Swal.fire({
                  icon: "success",
                  title: "Success!",
                  text: response.message,
                  confirmButtonColor: "rgb(246 146 32)",
                  cancelButtonColor: "rgb(0 0 0)",
                  iconColor: "rgb(246 146 32)",
                  footer: `
              <div>
                <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
              </div>
            `
                }).then((result) => {
                  if (result.value) {
                    //if type is customer
                    if (type == "customer") {
                      //Swal alert 'Customer address changed, please recalculate shipping'
                      Swal.fire({
                        icon: "info",
                        title: "Info",
                        text: "Customer address changed, please recalculate shipping fee",
                        confirmButtonColor: "rgb(246 146 32)",
                        cancelButtonColor: "rgb(0 0 0)",
                        iconColor: "rgb(246 146 32)",
                        footer: `
                    <div>
                      <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
                    </div>
                  `
                      }).then((result) => {
                        if (result.value) {
                          //trigger click #t-carrier-change-button
                          $("#t-carrier-change-button").trigger("click");
                        }
                      });
                    } else {
                      //reload page
                      location.reload();
                    }
                  }
                });
              } else {
                //swal error
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: response.message,
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
            error: function (xhr, status, error) {
              //close loader
              Swal.close();
              //swal error
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  //render
  render() {
    const { saved_address, rate_id, shippingData } = this.props;

    return (
      <Fragment>
        <form method="post" id="t-form-submit" dataType="customer">
          <input
            type="hidden"
            name="address_id"
            value={saved_address?.address_id}
          />
          <input type="hidden" name="rate_id" value={rate_id} />
          <div className="terminal-responsive t-shipping-form-new">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    id="first_name"
                    placeholder="First Name"
                    value={saved_address?.first_name}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    value={saved_address?.last_name}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="address_line_1">Address line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address_line_1"
                    id="address_line_1"
                    placeholder="Address line 1"
                    value={saved_address?.line1}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="address_line_2">Address line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address_line_2"
                    id="address_line_2"
                    placeholder="Address line 2"
                    value={saved_address?.line2}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <div class="input-group mb-3">
                    <span
                      className="input-group-text t-input-group"
                      id="t-emal-input">
                      <img
                        src={terminal_africa.plugin_url + "/img/envelope.svg"}
                        alt="t-email-icon"
                      />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Address line 2"
                      value={saved_address?.email}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    className="form-control terminal-country t-terminal-country"
                    required
                    name="country"
                    id="country">
                    <option value="">Select</option>
                    {terminal_africa?.terminal_africal_countries.map(
                      (country, key) => (
                        <option
                          key={key}
                          value={country.isoCode}
                          data-flag={country.flag}
                          selected={
                            country.isoCode === saved_address?.country
                              ? "selected"
                              : ""
                          }>
                          {country.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <select
                    className="form-control terminal-state"
                    required
                    name="state"
                    id="state">
                    <option value="">Select</option>
                    {shippingData?.states?.map((state, key) => (
                      <option
                        key={key}
                        value={state.name}
                        data-statecode={state.isoCode}
                        selected={
                          state.name === saved_address?.state ? "selected" : ""
                        }>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <label htmlFor="lga">City</label>
                  <select
                    className="form-control terminal-city"
                    required
                    name="lga"
                    id="lga">
                    <option value="">Select</option>
                    {shippingData?.cities?.data?.map((city, key) => (
                      <option
                        key={key}
                        value={city.name}
                        selected={
                          city.name === saved_address?.city ? "selected" : ""
                        }>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="d-flex">
                    <div className="t-phone-new-select-container">
                      <select
                        name="country_code"
                        id=""
                        className="form-control t-phone-new-select">
                        {terminal_africa?.terminal_africal_countries.map(
                          (country, key) => (
                            <option
                              key={key}
                              value={country.phonecode}
                              data-flag={country.flag}
                              selected={
                                country.isoCode === saved_address?.country
                                  ? "selected"
                                  : ""
                              }>
                              {country.phonecode}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="w-100">
                      <input
                        type="text"
                        placeholder="Phone number"
                        className="form-control t-phone-new"
                        name="phone"
                        id="phone"
                        value={saved_address?.phone}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="zipcode">Zip Code</label>
                  <input
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    className="form-control t-zip-new"
                    placeholder="Zip Code"
                    value={saved_address?.zip}
                  />
                </div>
              </div>
              <div className="col-12">
                <div
                  className="t-flex"
                  style={{ justifyContent: "space-between" }}>
                  <div className="t-clear-form">
                    <a
                      href="javascript:;"
                      style={{
                        "font-size": "15px",
                        color: "black",
                        outline: "none"
                      }}
                      onClick={this.clearAllForms}>
                      <div className="t-flex">
                        <img
                          src={
                            terminal_africa.plugin_url + "/img/clearform.svg"
                          }
                          style={{ marginRight: 8 }}
                          alt="Clear forms"
                        />
                        <span>Clear all fields</span>
                      </div>
                    </a>
                  </div>
                  <div className="t-submit-form">
                    <button
                      type="submit"
                      className="t-address-save"
                      style={{
                        width: "fit-content",
                        padding: "13px 40px",
                        borderRadius: 12
                      }}>
                      Update address
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default TerminalShippingForm;
