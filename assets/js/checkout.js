function terminalsetValue2(elem) {
  jQuery(document).ready(function ($) {
    var lga = $(elem).val();
    var stateText = $('select[name="terminal_custom_shipping_state2"]')
      .find("option:selected")
      .text();
    var countryCode = $('select[name="billing_country"]').val();
    var state = $('select[name="terminal_custom_shipping_state2"]').val();
    var finaltext = lga + ", " + stateText;
    //find select[name='billing_state'] option with value and set it to selected
    $('select[name="billing_state"]')
      .find("option")
      .each(function (index, element) {
        if ($(element).val() == state) {
          let element2 = document.querySelector('select[name="billing_state"]');
          element2.value = state;
          element2.dispatchEvent(new Event("change"));
        } else {
          $(element).removeAttr("selected");
        }
      });
    //get selected option
    var selected_option = $('select[name="billing_state"]')
      .find("option:selected")
      .val();
    document.querySelector("#billing_city").value = finaltext;
    //form name="checkout" input name billing_city
    //custom
    document.querySelector(
      'form[name="checkout"] input[name="billing_city"]'
    ).value = finaltext;
    //state
    if (
      document.querySelector(
        'form[name="checkout"] input[name="billing_state"]'
      )
    ) {
      document.querySelector(
        'form[name="checkout"] input[name="billing_state"]'
      ).value = selected_option;
    }
    //process the terminal rates
    var email = $('input[name="billing_email"]').val();
    var first_name = $('input[name="billing_first_name"]').val();
    var last_name = $('input[name="billing_last_name"]').val();
    var phone = $('input[name="billing_phone"]').val();
    var line_1 = $('input[name="billing_address_1"]').val();
    var billing_postcode = $('input[name="billing_postcode"]').val();
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
          <div class="t-checkout-carriers">
          `;
          //loop through response.data
          $.each(response.data, function (indexInArray, value) {
            //append to terminal_html
            terminal_html += `
                <p class="t-checkout-single" onclick="terminalSetShippingCrarrier(this, event)" data-carrier-name="${value.carrier_name}" data-amount="${value.amount}" data-duration="${value.delivery_time}" data-pickup="${value.pickup_time}" data-rateid="${value.rate_id}">
                <label for="shipping"><img class="Terminal-carrier-delivery-logo" alt="${value.carrier_name}" title="${value.carrier_name}" style="width: 11px;
                height: 12px;
                display: inline;" src="${value.carrier_logo}"> ${value.carrier_name} - ${value.currency} ${value.amount} 
                <br>
                <b class="t-carrier-desc">${value.carrier_rate_description}</b>
                <br />
                <b class="t-delivery-time">Pickup: ${value.pickup_time}</b>
                <br />
                 <b class="t-delivery-time">Delivery: ${value.delivery_time}</b>
                </label>
                </p>
            `;
          });
          //close div
          terminal_html += `
          </div>
          `;
          //append to terminal_html
          var terminal_delivery_html = $(".Terminal-delivery-logo");
          //find parent li
          var terminal_delivery_li = terminal_delivery_html.parent().parent();
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
    //end
  });
}

////////////////////////////////////////////////////////////////
jQuery(document).ready(function ($) {
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
  var wc_state_options = $("select[name='billing_state']").find("option");
  wc_state_options.each(function (index, element) {
    var state_value = $(element).val();
    var state_name = $(element).text();

    // var state_lga = state_value.split(", ")[0];
    //if state_name is undefined skip
    if (state_name === undefined) {
      return;
    }
    //push to data_options
    data_options.state.push({
      state: state_name,
      value: state_value
    });
    // data_options.city.push({
    //   state: state_name,
    //     lga: state_lga
    // });
  });
  //array unique
  var unique_state = [...new Set(data_options.state)];
  var state_options = "";
  $.each(unique_state, function (indexInArray, valueOfElement) {
    state_options += `<option value="${valueOfElement.value}" ${
      valueOfElement.value == terminal_billing_state ? "selected" : ""
    }>${valueOfElement.state}</option>`;
  });
  $("#billing_country_field").after(`
        <p class="form-row address-field validate-required validate-state form-row-wide woocommerce-validated" id="terminal_custom_shipping_state2">
          <label for="terminal_custom_shipping_state2">State <abbr class="required" title="required">*</abbr></label>
          <span class="woocommerce-input-wrapper">
            <select name="terminal_custom_shipping_state2" class="state_select">
                ${state_options}
            </select>
          </span>
        </p>
      `);

  let do_terminal_calculation = (datas, selected = "") => {
    //check data count
    if (datas.length < 1) {
      datas = [
        {
          name: "Select City",
          value: ""
        }
      ];
    }
    var lga = "<option value=''>Select City</option>";
    //create options
    $.each(datas, function (indexInArray, valueOfElement) {
      lga += `<option value="${valueOfElement.name}"  ${
        selected == valueOfElement.name ? "selected" : ""
      }
      >${valueOfElement.name}</option>`;
    });
    //check if terminal_custom_shipping_lga2 element exists
    if (!$("#terminal_custom_shipping_lga2").length) {
      $("#terminal_custom_shipping_state2").after(`
        <p class="form-row address-field validate-required validate-state form-row-wide woocommerce-validated" id="terminal_custom_shipping_lga2" >
          <label for="terminal_custom_shipping_lga2">City <abbr class="required" title="required">*</abbr></label>
          <span class="woocommerce-input-wrapper">
            <select name="terminal_custom_shipping_lga2" class="lga_select" style="    width: 100% !important;" onchange="terminalsetValue2(this)">
                ${lga}
            </select>
          </span>
        </p>
      `);
      //check if select2 is added to select[name="terminal_custom_shipping_lga2"]
      if (
        !$("select[name='terminal_custom_shipping_lga2']").hasClass(
          "select2-hidden-accessible"
        )
      ) {
        //select2 init
        $('select[name="terminal_custom_shipping_lga2"]').select2({
          placeholder: "Select City"
        });
      } else {
        //destroy and update
        // $('select[name="terminal_custom_shipping_lga2"]').select2("destroy");
        $('select[name="terminal_custom_shipping_lga2"]').select2({
          placeholder: "Select City"
        });
      }
    } else {
      //destroy and update
      // $('select[name="terminal_custom_shipping_lga2"]').select2("destroy");
      //update select
      $('select[name="terminal_custom_shipping_lga2"]').html(lga);
      //update select2
      $('select[name="terminal_custom_shipping_lga2"]').select2({
        placeholder: "Select City"
      });
    }

    //recalculate
    $(document.body).trigger("update_checkout");
  };

  //overide submit button
  let terminalButton = () => {
    var countrycode = $('select[name="billing_country"]').val();
    let submitButton = $("button[name='woocommerce_checkout_place_order']");
    // console.log(submitButton);
    submitButton.removeAttr("id");
    //remove event on button
    submitButton.off("click");
    //change type to button
    submitButton.attr("type", "button");
    //if input is checked
    submitButton.click(function (e) {
      e.preventDefault();
      var form = $(this).parents("form");
      var state = $('select[name="terminal_custom_shipping_state2"]').val();
      var lga = $('select[name="terminal_custom_shipping_lga2"]').val();
      //if countrycode is empty
      if (countrycode == "") {
        //show error
        Swal.fire({
          icon: "error",
          title: "Please select a country",
          text: "Country is required",
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
      //check if countrycode is not NG
      if (countrycode == "NG") {
        //if state is empty
        if (
          state == "" ||
          state == null ||
          state == undefined ||
          state == "null" ||
          state == "undefined"
        ) {
          //show error
          Swal.fire({
            icon: "error",
            title: "Please select a state",
            text: "State is required",
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
        //if lga is empty
        if (
          lga == "" ||
          lga == null ||
          lga == undefined ||
          lga == "null" ||
          lga == "undefined"
        ) {
          //show error
          Swal.fire({
            icon: "error",
            title: "Please select a city",
            text: "City is required",
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
      }
      //if all is good
      //submit form
      form.submit();
    });
  };

  let restoreCarriers = () => {
    //check if local storage is not empty
    if (localStorage.getItem("terminal_delivery_html") != null) {
      //check if t-restore does not exist
      if (!$(".t-restore").length) {
        let terminal_html = `<div class="t-checkout-carriers t-update">`;
        terminal_html += `<b class="t-restore" onclick="restoreCarrierData(this)">Change Carrier</b>`;
        terminal_html += `<b class="t-restore" onclick="reloadCarrierData(event)">Reload Carrier</b>`;
        terminal_html += `</div>`;
        //append to terminal_html
        var terminal_delivery_html = $(".Terminal-delivery-logo");
        //find parent li
        var terminal_delivery_li = terminal_delivery_html.parent().parent();
        //append to li
        terminal_delivery_li.append(terminal_html);
      }
    }
  };

  //on ajax complete
  $(document).ajaxComplete(function (event, xhr, settings) {
    var url = settings.url;
    //if url match update_order_review
    if (url.indexOf("update_order_review") >= 0) {
      //select2 init
      setTimeout(() => {
        restoreCarriers();
        //select2 update
        $('select[name="terminal_custom_shipping_state2"]').select2({
          placeholder: "Select State"
        });
        terminalButton();
      }, 700);
    }
  });

  $('select[name="terminal_custom_shipping_state2"]').change(function (e) {
    e.preventDefault();
    var state = $(this).val();
    var countrycode = $('select[name="billing_country"]').val();
    var lga = "";
    //if countrycode and state is empty
    if (countrycode == "" || state == "") {
      //show error
      Swal.fire({
        icon: "error",
        title: "Please select a country and state",
        text: "Country and state is required",
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
    //ajax
    $.ajax({
      type: "GET",
      url: terminal_africa.ajax_url,
      data: {
        action: "terminal_africa_get_cities",
        countryCode: countrycode,
        stateCode: state,
        nonce: terminal_africa.nonce
      },
      dataType: "json",
      beforeSend: function () {
        //block form name="checkout"
        $("form[name='checkout']").block({
          message: null,
          overlayCSS: {
            background: "#fff",
            opacity: 0.6
          }
        });
      },
      success: function (response) {
        //unblock
        $("form[name='checkout']").unblock();
        //stringify
        var cities = JSON.stringify(response.cities);
        //save to local storage response.cities
        localStorage.setItem("terminal_delivery_cities", cities);
        do_terminal_calculation(response.cities);
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

  //checking
  setInterval(() => {
    let c = $("select[name='billing_country']");
    let country;
    if (c.length > 0) {
      country = c.find("option:selected").val();
    } else {
      country = "NG";
    }

    if (country == "NG") {
      //hide c
      $("#billing_state_field").hide();
      $("#billing_city_field").hide();
      $("#terminal_custom_shipping_lga2").show();
      $("#terminal_custom_shipping_state2").show();
    } else {
      //show c
      $("#billing_state_field").show();
      $("#billing_city_field").show();
      $("#terminal_custom_shipping_lga2").hide();
      $("#terminal_custom_shipping_state2").hide();
    }
  }, 300);

  setTimeout(() => {
    if (terminal_billing_city != "") {
      var city = terminal_billing_city;
      //get local storage terminal_delivery_cities
      var terminal_delivery_cities = localStorage.getItem(
        "terminal_delivery_cities"
      );
      //if terminal_delivery_cities is not null
      if (terminal_delivery_cities != null) {
        //parse
        terminal_delivery_cities = JSON.parse(terminal_delivery_cities);
        //do terminal calculation
        do_terminal_calculation(terminal_delivery_cities, city);
      }
    }
  }, 1000);
});
