////////////////////////////// Terminal Africa Checkout ////////////////////////////
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
      //get html
      let shippingCountryHtml = shippingCountry.html();
      //replace country with
      shippingCountry.replaceWith(`
      <select name="shipping_country" id="shipping_country" class="country_to_state country_select cfw-no-select2" data-persist="false" data-saved-value="NG" data-parsley-required="true" data-parsley-group="cfw-customer-info" autocomplete="country" data-placeholder="Country / Region" data-label="Country / Region" onchange="terminalCheckoutWC.countryOnChange(this,event)">
          ${shippingCountryHtml}
      </select>
      `);
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
          <select name="shipping_state" class="state_select cfw-no-select2" id="shipping_state" onchange="terminalCheckoutWC.stateOnChange(this,event)">
              ${state_options}
          </select>
      `);

      //get h3 class cfw-shipping-methods-heading
      let cfw_shipping_methods_heading = $(".cfw-shipping-methods-heading");
      //get the html
      let cfw_shipping_methods_heading_html =
        cfw_shipping_methods_heading.html();
      //replace with
      cfw_shipping_methods_heading.replaceWith(`
       <div class="terminalCheckoutWC-container">
          <div class="terminalCheckoutWC-container-inner">
            <h3 class="cfw-shipping-methods-heading">${cfw_shipping_methods_heading_html}</h3>
          </div>
          <div class="terminalCheckoutWC-container-inner">
            <b class="t-restoreInner" onclick="terminalCheckoutWC.reloadCarrierData(event)"><img src="${terminal_africa.plugin_url}/img/logo-footer.png" /> Get Carriers</b>
          </div>
       </div>
      `);
    });
  },
  //country change
  countryOnChange: (elem, e) => {
    jQuery(document).ready(function ($) {
      e.preventDefault();
      var country = $(elem).val();
      //ajax to get states
      $.ajax({
        type: "GET",
        url: terminal_africa.ajax_url,
        data: {
          action: "terminal_africa_get_states",
          countryCode: country,
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
          var states = response.states;
          //options
          var options = "<option value=''>Select State</option>";
          //loop through states
          for (var i = 0; i < states.length; i++) {
            var state = states[i];
            options += `<option value="${state.isoCode}">${state.name}</option>`;
          }
          //update state select name shipping_state
          let shippingState = $('select[name="shipping_state"]');
          //check if element exist
          if (shippingState.length > 0) {
            $('select[name="shipping_state"]').html(options);
          } else {
            $("#shipping_state").replaceWith(`
          <select name="shipping_state" class="state_select cfw-no-select2" id="shipping_state" onchange="terminalCheckoutWC.stateOnChange(this,event)">
              ${state_options}
          </select>
      `);
          }
          //clear select name terminal_custom_shipping_lga2
          let lga = $('select[name="shipping_city"]');
          //check if element exist
          if (lga.length > 0) {
            $('select[name="shipping_city"]').html("");
          }
        },
        error: function () {
          //error
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong...",
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
  //save terminal cart
  initCartData: ($) => {
    //Save cart item as parcel
    $.ajax({
      type: "POST",
      url: terminal_africa.ajax_url,
      data: {
        action: "terminal_africa_save_cart_item",
        nonce: terminal_africa.nonce
      },
      dataType: "json",
      success: function (response) {
        // check if response code is 200
        if (response.code != 200) {
          //check if response code is 400
          if (response.code == 400) {
            //Swal
            Swal.fire({
              title: "Error!",
              text: response.message,
              icon: "error",
              customClass: {
                title: "swal-title",
                text: "swal-text",
                content: "swal-content",
                confirmButton: "swal-confirm-button",
                cancelButton: "swal-cancel-button"
              },
              type: "error",
              showCancelButton: false,
              confirmButtonColor: "rgb(246 146 32)",
              cancelButtonColor: "rgb(0 0 0)",
              //icon color
              iconColor: "rgb(246 146 32)",
              //swal footer
              footer: `
                <div>
                  <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
                </div>
              `
            });
            return;
          }
          //get terminal_africa_save_cart_itemcount
          let terminal_africa_save_cart_itemcount = sessionStorage.getItem(
            "terminal_africa_save_cart_itemcount"
          );
          //check if terminal_africa_save_cart_itemcount is not empty
          if (terminal_africa_save_cart_itemcount != "") {
            //convert to int
            terminal_africa_save_cart_itemcount = parseInt(
              terminal_africa_save_cart_itemcount
            );
            //check if terminal_africa_save_cart_itemcount is less than 3
            if (terminal_africa_save_cart_itemcount < 3) {
              //try again
              terminalCheckoutWC.initCartData($);
              //increment terminal_africa_save_cart_itemcount
              terminal_africa_save_cart_itemcount++;
              //save to session
              sessionStorage.setItem(
                "terminal_africa_save_cart_itemcount",
                terminal_africa_save_cart_itemcount
              );
            }
          }
        }
      }
    });
  },
  //terminalSetShippingCrarrier
  terminalSetShippingCrarrier: (elem, e) => {
    e.preventDefault();
    jQuery(document).ready(function ($) {
      //get terminal shipping input
      let terminalimage = $(".Terminal-delivery-logo");
      //get parent element
      let terminal_image_parent = terminalimage.parent();
      //get previous element
      let terminal_image_prev = terminal_image_parent.prev();
      //check if terminal_image_prev is not empty
      if (terminal_image_prev.length) {
        //check if terminal_image_prev is input type radio
        if (terminal_image_prev.is("input[type='radio']")) {
          //check the input
          terminal_image_prev.prop("checked", true);
        }
      }
      let carriername = $(elem).attr("data-carrier-name");
      let amount = $(elem).attr("data-amount");
      let duration = $(elem).attr("data-duration");
      let pickup = $(elem).attr("data-pickup");
      let email = $('input[name="billing_email"]').val();
      let rateid = $(elem).attr("data-rateid");
      let carrierlogo = $(elem).attr("data-image-url");
      //save to session
      $.ajax({
        type: "POST",
        url: terminal_africa.ajax_url,
        data: {
          action: "terminal_africa_save_shipping_carrier",
          nonce: terminal_africa.nonce,
          carriername: carriername,
          amount: amount,
          duration: duration,
          email: email,
          rateid: rateid,
          pickup: pickup,
          carrierlogo: carrierlogo
        },
        dataType: "json",
        beforeSend: function () {
          // Swal loader
          Swal.fire({
            title: "Please wait...",
            text: "Applying " + carriername,
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
          //close swal
          Swal.close();
          //if response code 200
          if (response.code == 200) {
            //save carrier logo to session
            localStorage.setItem("terminal_carrier_logo", carrierlogo);
            //update woocommerce
            $(document.body).trigger("update_checkout");
            //restoreCarriers
            terminalCheckoutWC.restoreCarriers();
          } else {
            //show error
            Swal.fire({
              title: "Error",
              text: response.message,
              icon: "error",
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              showConfirmButton: true,
              footer: `
          <div>
            <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
          </div>
        `
            });
          }
        },
        error: function (response) {
          //close swal
          Swal.close();
          //show error
          Swal.fire({
            title: "Error",
            text: "Something went wrong, please try again",
            icon: "error",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: true,
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
              <option value="">Select City</option>
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
  //restore carriers button
  restoreCarriers: () => {
    jQuery(document).ready(function ($) {
      //check if local storage is not empty
      if (localStorage.getItem("terminal_delivery_html") != null) {
        //check if t-restore does not exist
        if (!$(".t-restore").length) {
          let terminal_html = `
          <div class="t-checkout-carriers-reload-checkoutWC">
          <div class="t-checkout-carriers t-update">`;
          terminal_html += `<b class="t-restore" onclick="terminalCheckoutWC.restoreCarrierData(this)">Change Carrier</b>`;
          terminal_html += `</div>
          </div>
          `;
          //append to terminal_html
          var terminal_delivery_html = $(".Terminal-delivery-logo");
          //find parent li
          var terminal_delivery_li = terminal_delivery_html
            .parent()
            .parent()
            .parent();
          //append to li
          terminal_delivery_li.append(terminal_html);
        }
      }
    });
  },
  //restore carrier data
  restoreCarrierData: (e) => {
    jQuery(document).ready(function ($) {
      //check if local storage is not empty
      if (localStorage.getItem("terminal_delivery_html") != null) {
        let terminal_html = localStorage.getItem("terminal_delivery_html");
        //append to terminal_html
        var terminal_delivery_html = $(".Terminal-delivery-logo");
        //find parent li
        var terminal_delivery_li = terminal_delivery_html
          .parent()
          .parent()
          .parent();
        //remove .t-checkout-carriers
        terminal_delivery_li.find(".t-checkout-carriers").remove();
        //append to li
        terminal_delivery_li.append(terminal_html);
      }
    });
  },
  //reload carrier data
  reloadCarrierData: (e) => {
    e.preventDefault();
    jQuery(document).ready(function ($) {
      //check if shipping city is available as select and not input
      if (!$("#shipping_city").is("select")) {
        //swal
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select state and city first!",
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
      //Swal confirm
      Swal.fire({
        title: "Are you sure?",
        text: "This will reload the shipping carrier data",
        icon: "warning",
        customClass: {
          title: "swal-title",
          text: "swal-text",
          content: "swal-content",
          confirmButton: "swal-confirm-button",
          cancelButton: "swal-cancel-button"
        },
        showCancelButton: true,
        confirmButtonColor: "rgb(246 146 32)",
        cancelButtonColor: "rgb(0 0 0)",
        //icon color
        iconColor: "rgb(246 146 32)",
        //swal footer
        footer: `
        <div>
          <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
        </div>
      `,
        confirmButtonText: "Yes, reload it!"
      }).then((result) => {
        if (result.value) {
          //check if element exist $("select[name='shipping_city']")
          if ($("select[name='shipping_city']").length > 0) {
            //trigger event change
            $("select[name='shipping_city']").trigger("change");
          }
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
    jQuery(function ($) {
      let tm_countries = terminal_africa.terminal_africal_countries;
      //get country
      let countryCode = customer_details.country;
      //find country where isoCode is NG
      let tm_country = tm_countries.find(
        (country) => country.isoCode === countryCode
      );
      //get state
      let state = $("select[name='shipping_state'] option:selected").val();
      //get city
      let lga = customer_details.city;
      //get email
      let email = customer_details.email;
      //get first_name
      let first_name = customer_details.firstName;
      //get last_name
      let last_name = customer_details.lastName;
      //get phone
      let phone = customer_details.phone;
      //phone code
      let phonecode = tm_country.phonecode;
      //check if phonecode not include +
      if (!phonecode.includes("+")) {
        phonecode = "+" + phonecode;
      }
      //remove - and space
      phonecode = phonecode.replace(/[- ]/g, "");
      //remove + and space and special characters form phone
      phone = phone.replace(/[-+()]/g, "");
      //append to phone
      phone = phonecode + phone;
      //get line_1
      let line_1 = customer_details.address;
      //get billing_postcode
      let billing_postcode = customer_details.postcode;
      //get stateText
      let stateText = $("select[name='shipping_state'] option:selected").text();
      //ajax
      $.ajax({
        type: "POST",
        url: terminal_africa.ajax_url,
        data: {
          action: "terminal_africa_process_terminal_rates",
          nonce: terminal_africa.nonce,
          state: stateText,
          stateCode: state,
          countryCode: countryCode,
          city: lga,
          email: email,
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          line_1: line_1,
          billing_postcode: billing_postcode
        },
        dataType: "json",
        beforeSend: function () {
          //update woocommerce
          $(document.body).trigger("update_checkout");
          // Swal loader
          Swal.fire({
            title: "Please wait...",
            text: "Getting Shipping Rates",
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
          //Swal close
          Swal.close();
          //check response is 200
          if (response.code === 200) {
            //do something cool
            //clear .t-checkout-carriers
            $(".t-checkout-carriers").remove();
            let terminal_html = `
          <div class="t-checkout-carriers-checkoutWC">
          <div class="t-checkout-carriers">
          `;
            //loop through response.data
            $.each(response.data, function (indexInArray, value) {
              let amount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: terminal_africa.currency
                //  currencyDisplay: "narrowSymbol",
                //remove decimal
                //  minimumFractionDigits: 0
              }).format(value.amount);
              //append to terminal_html
              terminal_html += `
                <div class="t-checkout-single" onclick="terminalCheckoutWC.terminalSetShippingCrarrier(this, event)" data-carrier-name="${value.carrier_name}" data-amount="${value.amount}" data-duration="${value.delivery_time}" data-pickup="${value.pickup_time}" data-rateid="${value.rate_id}" data-image-url="${value.carrier_logo}">
                <label for="shipping">
                <div style="display: flex;justify-content: start;align-items: center;    padding: 10px;">
                  <img class="Terminal-carrier-delivery-logo" alt="${value.carrier_name}" title="${value.carrier_name}" style="width: auto;height: auto;margin-right: 10px;    max-width: 30px;" src="${value.carrier_logo}">
                  <p style=""> 
                        <span style="font-weight: bolder;">${value.carrier_name}</span> - ${amount} - ${value.delivery_time}
                    </p>
                </div>
                </label>
                </div>
            `;
            });
            //close div
            terminal_html += `
          </div>
          </div>
          `;
            //append to terminal_html
            var terminal_delivery_html = $(".Terminal-delivery-logo");
            //find parent li
            var terminal_delivery_li = terminal_delivery_html
              .parent()
              .parent()
              .parent();
            //save terminal_html to localstorage
            localStorage.setItem("terminal_delivery_html", terminal_html);
            //append to li
            terminal_delivery_li.append(terminal_html);
          } else {
            //swal error
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.message,
              footer: `
        <div>
          <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
        </div>
      `
            });
          }
        },
        error: function (error) {
          //swal error
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
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
  //set carrier logo
  setCarrierLogo: function () {
    //set interval carrier logo
    setInterval(function () {
      jQuery(document).ready(function ($) {
        //check if local storage is not empty
        if (localStorage.getItem("terminal_carrier_logo") != null) {
          let terminal_carrier_logo = localStorage.getItem(
            "terminal_carrier_logo"
          );
          //set carrier logo
          let img = $(".Terminal-delivery-logo");
          //check if parent has element .woocommerce-Price-amount amount
          if (img.parent().find(".woocommerce-Price-amount").length) {
            img.attr("src", terminal_carrier_logo);
          }
        } else {
          let old_url = `${terminal_africa.plugin_url}/img/logo-footer.png`;
          let img = $(".Terminal-delivery-logo");
          img.attr("src", old_url);
        }
        //label for shipping_postcode
        let labelTerminal = $("label[for='shipping_postcode']");
        //remove span with class optional
        labelTerminal.find("span.optional").remove();

        //restoreCarriers
        terminalCheckoutWC.restoreCarriers();

        //get session
        let session = sessionStorage.getItem("billing_phone_terminal");
        //check if session is empty
        if (session == null) {
          //check if the element exist #billing_phone_terminal
          if ($("#shipping_phone").length > 0) {
            // console.log("focus");
            //add on focusout
            $("#shipping_phone").on("focusout", function () {
              // console.log("focus out");
              //focus out #billing_phone_terminal
              terminalCheckoutWC.terminalPhoneKeyup();
            });
            //set session
            sessionStorage.setItem("billing_phone_terminal", "true");
          }
        }
      });
    }, 800);

    //check if page url match 'order-received'
    if (window.location.href.indexOf("order-received") > -1) {
      //do nothing
    } else {
      //set interval
      setInterval(() => {
        //check if #shipping_postcode_field display none
        if (jQuery("#shipping_postcode_field").css("display") == "none") {
          //add value to post code
          jQuery("#shipping_postcode").val(terminal_shipping_postcode);
          //fade in #shipping_postcode_field
          jQuery("#shipping_postcode_field").show();
        }
      }, 300);
      //add value to post code
      jQuery("#shipping_postcode").val(terminal_shipping_postcode);
    }
  }
};

if (window.location.href.indexOf("order-received") > -1) {
  //do nothing
} else {
  setTimeout(() => {
    //init
    terminalCheckoutWC.init();
  }, 2000);

  //init cart data
  jQuery(function ($) {
    //init cart data
    terminalCheckoutWC.initCartData($);
    //set carrier logo
    terminalCheckoutWC.setCarrierLogo();
  });
}
