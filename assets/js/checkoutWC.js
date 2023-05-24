let terminalCheckoutWC = {
  //init
  init: () => {
    jQuery(function ($) {
      //check if element exist #shipping_country
      let shippingCountry = $("#shipping_country");
      if (!shippingCountry.length) {
        //Swal alert if element not exist
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Country field not found, please contact support",
          footer: `
        <div>
          <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
        </div>
      `
        });
        //return
        return;
      }
      //check if element exist #shipping_state
      let shippingState = $("#shipping_state");
      if (!shippingState.length) {
        //Swal alert if element not exist
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "State field not found, please contact support",
          footer: `
        <div>
          <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
        </div>
      `
        });
        //return
        return;
      }

      //check if element exist #shipping_city
      let shippingCity = $("#shipping_city");
      if (!shippingCity.length) {
        //Swal alert if element not exist
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "City field not found, please contact support",
          footer: `
        <div>
          <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
        </div>
      `
        });
        //return
        return;
      }

      //clear current state selected option value
      shippingState.val("");
      //deselect current state selected option
      shippingState.find("option:selected").prop("selected", false);
      //get woocommerce state select
      var { state_options } = terminalCheckoutWC.overrideStateSelect(
        shippingState,
        $
      );

      //append to billing_country_field
      shippingState.replaceWith(`
          <select name="shipping_state" class="state_select cfw-no-select2" onchange="terminalCheckoutWC.stateOnChange(this,event)">
              ${state_options}
          </select>
      `);
    });
  },
  //getLocalGovernments
  getLocalGovernments: (country, state) => {
    jQuery(document).ready(function ($) {
      //ajax
      $.ajax({
        type: "GET",
        url: terminal_africa.ajax_url,
        data: {
          action: "terminal_africa_get_cities",
          countryCode: country,
          stateCode: state,
          nonce: terminal_africa.nonce
        },
        dataType: "json",
        beforeSend: function () {
          //block form name="checkout"
          $("#order_review").block({
            message: null,
            overlayCSS: {
              background: "#fff",
              opacity: 0.6
            }
          });
        },
        success: function (response) {
          //unblock
          $("#order_review").unblock();
          //check if response code 200
          if (response.code != 200) {
            //swal
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
            return;
          }
          //pass data to #shipping_city
          let content = `
          <select name="shipping_city" id="shipping_city" class="state_select cfw-no-select2 garlic-auto-save" data-parsley-trigger="keyup change focusout" data-saved-value="CFW_EMPTY" data-parsley-required="true" data-parsley-group="cfw-customer-info" autocomplete="address-level1" data-placeholder="City" data-input-classes="cfw-no-select2" data-label="City" placeholder="City" onchange="terminalCheckoutWC.cityOnChange(this,event)">
               ${response.cities
                 .map((city) => {
                   return `<option value="${city.name}">${city.name}</option>`;
                 })
                 .join("")}
          </select>
          `;
          //replace with #shipping_city
          $("#shipping_city").replaceWith(content);
          //animate from     margin-top: -10px; to margin-top: 0px;
          $("#shipping_city")
            .css({
              marginTop: "-10px"
            })
            .animate({ marginTop: 0 }, 1000);
        },
        error: function (error) {
          //swal
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
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
  },
  //overide state select
  overrideStateSelect: (shippingState, $) => {
    //data option
    var data_options = {
      state: [],
      city: [
        {
          state: "",
          lga: "",
          placeholder: "Select City"
        }
      ]
    };
    var wc_state_options = shippingState.find("option");
    wc_state_options.each(function (index, element) {
      var state_value = $(element).val();
      var state_name = $(element).text();

      //if state_name is undefined skip
      if (state_name === undefined) {
        return;
      }
      //push to data_options
      data_options.state.push({
        state: state_name,
        value: state_value
      });
    });
    //array unique
    var unique_state = [...new Set(data_options.state)];
    var state_options = "";
    $.each(unique_state, function (indexInArray, valueOfElement) {
      state_options += `<option value="${valueOfElement.value}" ${
        valueOfElement.value == terminal_billing_state ? "" : ""
      }>${valueOfElement.state}</option>`;
    });
    //return
    return {
      state_options,
      data_options
    };
  },
  //state on change event
  stateOnChange: (elem, e) => {
    jQuery(function ($) {
      //get country value
      let country = $("#shipping_country").val();
      //get state selected option value
      let state = $(elem).val();
      //check if value is not empty
      if (country == "") {
        //show alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select a country",
          footer: `
          <div>
            <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
          </div>
        `
        });
        //return
        return;
      }
      //get local governments by details
      terminalCheckoutWC.getLocalGovernments(country, state);
    });
  },
  //city on change event
  cityOnChange: (elem, e) => {
    jQuery(document).ready(function ($) {
      //get country value
      let country = $("#shipping_country").val();
      //get state selected option value
      let state = $("#shipping_state").val();
      //get city selected option value
      let city = $(elem).val();
      //check if value is not empty
      if (country == "") {
        //show alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select a country",
          footer: `
          <div>
            <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
          </div>
        `
        });
        //return
        return;
      }
      //check if value is not empty
      if (state == "") {
        //show alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select a state",
          footer: `
          <div>
            <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
          </div>
        `
        });
        //return
        return;
      }
      //getCustomerDetails
      let customer_details = terminalCheckoutWC.getCustomerDetails($);
      //check if customer_details is empty
      if (Object.keys(customer_details).length === 0) {
        //show alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter all required fields",
          footer: `
          <div>
            <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
          </div>
        `
        });
        //return
        return;
      }
      //append to customer_details
      customer_details.city = city;
      //state
      customer_details.state = state;
      //country
      customer_details.country = country;
      //get terminal shipping rate
      terminalCheckoutWC.getTerminalShippingRate(customer_details);
    });
  },
  //get customer details
  getCustomerDetails: ($) => {
    //get customer details
    let customer_details = {};
    //check if element exist #shipping_full_name
    if ($("#shipping_full_name").length) {
      let fullName = $("#shipping_full_name").val();
      //split full name
      let splitFullName = fullName.split(" ");
      //get first name
      let firstName = splitFullName[0];
      //get last name
      let lastName = splitFullName[1];
      //add to customer_details
      customer_details.firstName = firstName;
      customer_details.lastName = lastName;
    } else {
      //check if element exist #shipping_first_name
      if ($("#shipping_first_name").length) {
        let firstName = $("#shipping_first_name").val();
        //add to customer_details
        customer_details.firstName = firstName;
      }
      //check if element exist #shipping_last_name
      if ($("#shipping_last_name").length) {
        let lastName = $("#shipping_last_name").val();
        //add to customer_details
        customer_details.lastName = lastName;
      }
    }
    //check if element exist #shipping_phone
    if ($("#shipping_phone").length) {
      let phone = $("#shipping_phone").val();
      //add to customer_details
      customer_details.phone = phone;
    }
    //check if element exist #billing_email
    if ($("#billing_email").length) {
      let billing_email = $("#billing_email").val();
      //add to customer_details
      customer_details.email = billing_email;
    }
    //check if element exist #shipping_address_1
    if ($("#shipping_address_1").length) {
      let shipping_address_1 = $("#shipping_address_1").val();
      //add to customer_details
      customer_details.address = shipping_address_1;
    }
    //check if element exist #shipping_postcode
    if ($("#shipping_postcode").length) {
      let shipping_postcode = $("#shipping_postcode").val();
      //add to customer_details
      customer_details.postcode = shipping_postcode;
    }

    //confirm customer details are not empty
    if (
      customer_details.firstName == "" ||
      customer_details.lastName == "" ||
      customer_details.phone == "" ||
      customer_details.email == "" ||
      customer_details.address == "" ||
      customer_details.postcode == ""
    ) {
      //show alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fields",
        footer: `
          <div>
            <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
          </div>
        `
      });
      //return
      return {};
    }

    //return
    return customer_details;
  },
  //getTerminalShippingRate
  getTerminalShippingRate: (customer_details) => {
    console.log(customer_details);
  }
};

setTimeout(() => {
  //init
  terminalCheckoutWC.init();
}, 5000);
