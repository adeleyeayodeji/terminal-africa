/**
 * Fluid extension for terminal shipment plugin
 */
class FluidCheckoutTerminal {
  constructor() {
    this.$ = jQuery;
    //init
    this.init();
  }

  /**
   * Init function
   */
  init() {
    //Check if shipping is enabled by woocommerce
    var terminal_delivery_html = this.$(".Terminal-delivery-logo");
    //check if terminal_delivery_html exist
    if (!terminal_delivery_html.length) {
      //do nothing
      return;
    }
    //setDefaultCountryAndStateToEmpty
    this.setDefaultCountryAndStateToEmpty();
    //init interval
    this.setInterval();
  }

  /**
   * Switch Town / City with State
   */
  switchTownCityWithState() {
    //check if shipping_state_field is after shipping_city_field
    if (
      this.$("#shipping_state_field").index() >
      this.$("#shipping_city_field").index()
    ) {
      //switch shipping_state_field with shipping_city_field
      this.$("#shipping_state_field").after(this.$("#shipping_city_field"));
    }
    //check if class fluid-checkout-state exist
    if (!this.$("#shipping_state_field").hasClass("fluid-checkout-state")) {
      this.$("#shipping_state_field").addClass("fluid-checkout-state");
    }
    //check if class fluid-checkout-city exist
    if (!this.$("#shipping_city_field").hasClass("fluid-checkout-city")) {
      this.$("#shipping_city_field").addClass("fluid-checkout-city");
    }
  }

  /**
   * Set interval for 3 milliseconds
   */
  setInterval() {
    setInterval(() => {
      //add event to country selection
      this.addEventToCountrySelection();
      //switchTownCityWithState
      this.switchTownCityWithState();
      //addEventToStateSelect
      this.addEventToStateSelect();
      //setShippingCodeIfEmpty
      this.setShippingCodeIfEmpty();
      //removeElementWithClassTCheckoutCarriers
      this.removeElementWithClassTCheckoutCarriers();
      //replaceShipmentMethodTitle
      this.replaceShipmentMethodTitle();
    }, 300);
  }

  /**
   * Replace Shipment Method Title
   */
  replaceShipmentMethodTitle() {
    //check if element exist .terminalFluid-container
    if (this.$(".terminalFluid-container").length > 0) {
      return;
    }
    //get h3 class fc-step__substep-title--shipping_method
    let fluidCheckoutMehtodTitle = this.$(
      ".fc-step__substep-title--shipping_method"
    );
    //get the html
    let fluidCheckoutMehtodTitle_html = fluidCheckoutMehtodTitle.html();
    //replace with
    fluidCheckoutMehtodTitle.replaceWith(`
       <div class="terminalFluid-container">
          <div class="terminalFluid-container-inner">
            <h3 class="fc-step__substep-title--shipping_method">${fluidCheckoutMehtodTitle_html}</h3>
          </div>
          <div class="terminalFluid-container-inner t-restoreInner" onclick="terminalFluidCheckout.reloadCarrierData(event)">
            <img src="${terminal_africa.plugin_url}/img/logo-footer.png" align="left" />
            Get Shipping Rates
          </div>
       </div>
      `);
  }

  /**
   * reloadCarrierData
   * @param {*} event
   */
  reloadCarrierData(event) {
    console.log("reloadCarrierData");
  }

  /**
   * Remove element with class t-checkout-carriers
   */
  removeElementWithClassTCheckoutCarriers() {
    //check if class t-checkout-carriers exist
    if (this.$(".t-checkout-carriers").length) {
      //remove class t-checkout-carriers
      this.$(".t-checkout-carriers").remove();
    }
  }

  /**
   * setShippingCodeIfEmpty
   */
  setShippingCodeIfEmpty() {
    //check if shipping_postcode_field exist
    if (this.$("#shipping_postcode_field").length) {
      //get parent of shipping_postcode_field and remove all class
      this.$("#shipping_postcode_field")
        .parent()
        .parent()
        .parent()
        .removeClass();
      //check if display is none
      if (this.$("#shipping_postcode_field").css("display") == "none") {
        //replace with new shipping_postcode_field
        this.$("#shipping_postcode_field").replaceWith(
          `
          <p class="form-row address-field form-row-wide" id="shipping_postcode_field" data-priority="90" data-o_class="form-row " style="display: block;width:100% !important;">
            <label for="shipping_postcode" class="">Postcode&nbsp;<abbr class="required" title="required">*</abbr></label>
            <span class="woocommerce-input-wrapper">
              <input type="text" class="input-text " name="shipping_postcode" data-autofocus="" required id="shipping_postcode" value="" data-autocomplete="shipping postal-code" autocomplete="shipping postal-code" placeholder="Postcode / ZIP" onfocusout="terminalFluidCheckout.postCodeFocusedOut(event)">
            </span>
          </p>
          `
        );
      } else {
        //check if label has span.optional
        if (
          this.$("#shipping_postcode_field").find("label").find("span.optional")
        ) {
          //replacewith
          this.$("#shipping_postcode_field").find("label").find("span.optional")
            .replaceWith(`
            <abbr class="required" title="required">*</abbr>
            `);
          //set placeholder to Postcode / ZIP
          this.$("#shipping_postcode_field")
            .find("input")
            .attr("placeholder", "Postcode / ZIP");
          //check if shipping_postcode_field has form-row-first class
          if (this.$("#shipping_postcode_field").hasClass("form-row-first")) {
            //remove and add class form-row-wide
            this.$("#shipping_postcode_field")
              .removeClass("form-row-first")
              .addClass("form-row-wide");
          }
        }
      }
    }
    //check if shipping_postcode_field prev element id is shipping_address_1_field
    if (
      this.$("#shipping_postcode_field").prev().attr("id") !=
      "shipping_address_1_field"
    ) {
      //switch shipping_postcode_field with shipping_address_1_field
      this.$("#shipping_address_1_field").after(
        this.$("#shipping_postcode_field")
      );
    }
  }

  /**
   * Postcode focused out
   * @param {*} event
   * @returns
   */
  postCodeFocusedOut(event) {
    //prevent default
    event.preventDefault();
    //check if shipping_state is empty
    if (jQuery("#shipping_state").val() == "") {
      //do nothing
      return;
    }
    //get shipping_state
  }

  /**
   * Set default country and state to empty
   */
  setDefaultCountryAndStateToEmpty() {
    //get country select
    var country_select = this.$("#shipping_country");
    //get state select
    var state_select = this.$("#shipping_state");
    //check if country_select is select element
    if (country_select.is("select")) {
      //set the default country to empty
      country_select.val("");
      //deselect the country selected option
      country_select.find("option:selected").prop("selected", false);
    }
    //check if state_select is select element
    if (state_select.is("select")) {
      //set the default state to empty
      state_select.val("");
      //deselect the state selected option
      state_select.find("option:selected").prop("selected", false);
    }
  }

  /**
   * Add event to state select
   */
  addEventToStateSelect() {
    //get state select
    var state_select = this.$("#shipping_state");
    //get all state options
    var shippingStateOptions = state_select.find("option");
    //options html
    let shippingStateOptionsHtml = "";
    //loop
    shippingStateOptions.each((index, element) => {
      //pass option to html
      shippingStateOptionsHtml += this.$(element).prop("outerHTML");
    });
    //check if class exist .terminal-custom-fluid-added in document
    if (!this.$(".terminal-custom-fluid-added").length) {
      //destroy select2
      state_select.select2("destroy");
      //replace state_select with new state_select
      state_select.replaceWith(
        `
      <select name="shipping_state" id="shipping_state_custom" class="terminal-custom-fluid-added" autocomplete="address-level1" data-placeholder="Select state…" tabindex="-1" aria-hidden="true">
        ${shippingStateOptionsHtml}
      </select>
      `
      );
      //add event to .terminal-custom-fluid-added
      this.$(".terminal-custom-fluid-added").on(
        "change",
        this.stateOnchangeEvent.bind(this, ".terminal-custom-fluid-added")
      );
    }
  }

  /**
   * Add event to country selection
   */
  addEventToCountrySelection() {
    //get country select
    var country_select = this.$("#shipping_country");
    //get all country options
    var shippingcountryOptions = country_select.find("option");
    //options html
    let shippingcountryOptionsHtml = "";
    //loop
    shippingcountryOptions.each((index, element) => {
      //pass option to html
      shippingcountryOptionsHtml += this.$(element).prop("outerHTML");
    });
    //check if class exist .terminal-custom-fluid-country-added in document
    if (!this.$(".terminal-custom-fluid-country-added").length) {
      //destroy select2
      country_select.select2("destroy");
      //replace country_select with new country_select
      country_select.replaceWith(
        `
      <select name="shipping_country" id="shipping_country_custom" class="terminal-custom-fluid-country-added" autocomplete="address-level1" data-placeholder="Select country…" tabindex="-1" aria-hidden="true">
        ${shippingcountryOptionsHtml}
      </select>
      `
      );
      //add event to .terminal-custom-fluid-country-added
      this.$(".terminal-custom-fluid-country-added").on(
        "change",
        this.countryOnchangeEvent.bind(
          this,
          ".terminal-custom-fluid-country-added"
        )
      );
    }
  }

  /**
   * Add event to state select
   * @param {HTMLElement} elem
   */
  stateOnchangeEvent(elem) {
    //get the value
    var state = this.$(elem).val();
    //get the country
    var country = this.$("select[name='shipping_country']");
    //check if country exists
    if (country.length > 0) {
      country = country.val();
    } else {
      country = this.$("input[name='shipping_country']").val();
    }
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
    this.getLocalGovernments(country, state);
  }

  /**
   * countryOnchangeEvent
   * @param {HTMLElement} elem
   */
  countryOnchangeEvent(elem) {
    //get the value
    var country = this.$(elem).val();
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
    //get state
    this.countryOnChange(country);
  }

  /**
   * Get States by country
   * @param {string} country
   */
  countryOnChange(country) {
    //ajax to get states
    this.$.ajax({
      type: "GET",
      url: terminal_africa.ajax_url,
      data: {
        action: "terminal_africa_get_states",
        countryCode: country,
        nonce: terminal_africa.nonce
      },
      dataType: "json",
      beforeSend: () => {
        //block form name="checkout"
        this.$("#fc-wrapper").block({
          message: null,
          overlayCSS: {
            background: "#fff",
            opacity: 0.6
          }
        });
      },
      success: (response) => {
        //unblock
        this.$("#fc-wrapper").unblock();
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
        var state_options = "<option value=''>Select State</option>";
        //loop through states
        for (var i = 0; i < states.length; i++) {
          var state = states[i];
          state_options += `<option value="${state.isoCode}">${state.name}</option>`;
        }
        //set state options
        this.$('select[name="shipping_state"]').html(state_options);
        //clear select name terminal_custom_shipping_lga2
        let lga = this.$('select[name="shipping_city"]');
        //check if element exist
        if (lga.length > 0) {
          //clear
          this.$('select[name="shipping_city"]').html("");
        } else {
          //clear
          this.$("input[name='shipping_city']").val("");
        }
      },
      error: () => {
        //unblock
        this.$("#fc-wrapper").unblock();
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
  }

  /**
   * Get local governments by details
   * @param {string} country
   * @param {string} state
   */
  getLocalGovernments(country, state) {
    //ajax
    this.$.ajax({
      type: "GET",
      url: terminal_africa.ajax_url,
      data: {
        action: "terminal_africa_get_cities",
        countryCode: country,
        stateCode: state,
        nonce: terminal_africa.nonce
      },
      dataType: "json",
      beforeSend: () => {
        //block form name="checkout"
        this.$("#fc-wrapper").block({
          message: null,
          overlayCSS: {
            background: "#fff",
            opacity: 0.6
          }
        });
      },
      success: (response) => {
        //unblock
        this.$("#fc-wrapper").unblock();
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
          <select name="shipping_city" id="shipping_city" class="terminal-custom-fluid-added-shipping-city" data-label="City" placeholder="City" onchange="terminalFluidCheckout.cityOnChange(this,event)">
              <option value="">Select City</option>
               ${response.cities
                 .map((city) => {
                   return `<option value="${city.name}">${city.name}</option>`;
                 })
                 .join("")}
          </select>
          `;
        //replace with #shipping_city
        this.$("#shipping_city").replaceWith(content);
        //animate from     margin-top: -10px; to margin-top: 0px;
        this.$("#shipping_city")
          .css({
            marginTop: "-10px"
          })
          .animate({ marginTop: 0 }, 1000);
      },
      error: function (error) {
        //unblock
        this.$("#fc-wrapper").unblock();
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
  }

  /**
   *
   * @param {HTMLElement} elem
   */
  cityOnChange(elem) {
    //Check if shipping is enabled by woocommerce
    var terminal_delivery_html = this.$(".Terminal-delivery-logo");
    //check if terminal_delivery_html exist
    if (!terminal_delivery_html.length) {
      //do nothing
      return;
    }
    //get country value
    let country = this.$("select[name='shipping_country']");
    //check if country exists
    if (country.length > 0) {
      country = country.val();
    } else {
      country = this.$("input[name='shipping_country']").val();
    }
    //get state selected option value
    let state = this.$("select[name=shipping_state]").val();
    //get city selected option value
    let city = this.$(elem).val();
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
    console.log("Am moving forward...", country, state, city);
    return;
    //getCustomerDetails
    let customer_details = this.getCustomerDetails();
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
  }

  /**
   *
   * @returns object
   */
  getCustomerDetails() {
    //get customer details
    let customer_details = {};
    //check if element exist #shipping_first_name
    if (this.$("#shipping_first_name").length) {
      let firstName = this.$("#shipping_first_name").val();
      //add to customer_details
      customer_details.firstName = firstName;
    }
    //check if element exist #shipping_last_name
    if (this.$("#shipping_last_name").length) {
      let lastName = this.$("#shipping_last_name").val();
      //add to customer_details
      customer_details.lastName = lastName;
    }

    //check if element exist #shipping_phone
    if (this.$("#shipping_phone").length) {
      let phone = this.$("#shipping_phone").val();
      //add to customer_details
      customer_details.phone = phone;
    }
    //check if element exist #billing_email
    if (this.$("#billing_email").length) {
      let billing_email = this.$("#billing_email").val();
      //add to customer_details
      customer_details.email = billing_email;
    }
    //check if element exist #shipping_address_1
    if (this.$("#shipping_address_1").length) {
      let shipping_address_1 = this.$("#shipping_address_1").val();
      //add to customer_details
      customer_details.address = shipping_address_1;
    }
    //check if element exist #shipping_postcode
    if (this.$("#shipping_postcode").length) {
      let shipping_postcode = this.$("#shipping_postcode").val();
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
  }

  /**
   * Get terminal shipping rate
   * @param {object} customer_details
   */
  getTerminalShippingRate(customer_details) {
    let tm_countries = terminal_africa.terminal_africal_countries;
    //get country
    let countryCode = customer_details.country;
    //find country where isoCode is NG
    let tm_country = tm_countries.find(
      (country) => country.isoCode === countryCode
    );
    //get state
    let state = this.$("select[name='shipping_state'] option:selected").val();
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
    let stateText = this.$(
      "select[name='shipping_state'] option:selected"
    ).text();
    //ajax
    this.$.ajax({
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
      beforeSend: () => {
        //update woocommerce
        this.$(document.body).trigger("update_checkout");
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
      success: (response) => {
        //Swal close
        Swal.close();
        //check response is 200
        if (response.code === 200) {
          //do something cool
          //clear .t-checkout-carriers
          this.$(".t-checkout-carriers").remove();
          let terminal_html = `
          <div class="t-checkout-carriers-checkoutWC">
          <div class="t-checkout-carriers">
          `;
          //loop through response.data
          this.$.each(response.data, function (indexInArray, value) {
            //overwrite value.amount
            let terminalAfricaPriceMarkUpPercentage =
              response.terminal_price_markup;
            //check if not empty
            if (terminalAfricaPriceMarkUpPercentage) {
              //parse to int
              terminalAfricaPriceMarkUpPercentage = parseInt(
                terminalAfricaPriceMarkUpPercentage
              );
              //apply percentage
              value.amount =
                value.amount +
                (value.amount * terminalAfricaPriceMarkUpPercentage) / 100;

              //do same to default_amount
              if (value.default_amount) {
                value.default_amount =
                  value.default_amount +
                  (value.default_amount * terminalAfricaPriceMarkUpPercentage) /
                    100;
              }
            }
            //process the amount
            let amount = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: terminal_africa.currency
              //  currencyDisplay: "narrowSymbol",
              //remove decimal
              //  minimumFractionDigits: 0
            }).format(value.amount);
            //set default amount
            let default_amount = value.amount;
            //check if value.default_amount exist
            if (value.default_amount) {
              //set amount to default_amount
              default_amount = value.default_amount;
              //set amount to currency
              amount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: value.default_currency
                //  currencyDisplay: "narrowSymbol",
                //remove decimal
                //  minimumFractionDigits: 0
              }).format(default_amount);
            }
            //append to terminal_html
            terminal_html += `
                <div class="t-checkout-single" onclick="terminalCheckoutWC.terminalSetShippingCrarrier(this, event)" data-carrier-name="${value.carrier_name}" data-amount="${default_amount}" data-duration="${value.delivery_time}" data-pickup="${value.pickup_time}" data-rateid="${value.rate_id}" data-image-url="${value.carrier_logo}">
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
          var terminal_delivery_html = this.$(".Terminal-delivery-logo");
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
  }
}

//init
let terminalFluidCheckout = new FluidCheckoutTerminal();
