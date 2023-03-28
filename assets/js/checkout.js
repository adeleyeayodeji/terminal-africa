let updateCoreWoocommerceElements = (state = "", finaltext = "") => {
  jQuery(document).ready(function ($) {
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
  });
};

function terminalsetValue2(elem) {
  jQuery(document).ready(function ($) {
    var lga = $(elem).val();
    var stateText = $('select[name="terminal_custom_shipping_state2"]')
      .find("option:selected")
      .text();
    var countryCode = $('select[name="billing_country"]').val();
    var state = $('select[name="terminal_custom_shipping_state2"]').val();
    var finaltext = lga + ", " + stateText;

    //process the terminal rates
    var email = $('input[name="billing_email"]').val();
    var first_name = $('input[name="billing_first_name"]').val();
    var last_name = $('input[name="billing_last_name"]').val();
    var phone = $('input[name="billing_phone"]').val();
    var line_1 = $('input[name="billing_address_1"]').val();
    var billing_postcode = $('input[name="billing_postcode"]').val();
    //process updateCoreWoocommerceElements
    updateCoreWoocommerceElements(state, finaltext);
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
                <div class="t-checkout-single" onclick="terminalSetShippingCrarrier(this, event)" data-carrier-name="${value.carrier_name}" data-amount="${value.amount}" data-duration="${value.delivery_time}" data-pickup="${value.pickup_time}" data-rateid="${value.rate_id}" data-image-url="${value.carrier_logo}">
                <label for="shipping">
                <div style="display: flex;justify-content: start;align-items: center;    padding: 10px;">
                  <img class="Terminal-carrier-delivery-logo" alt="${value.carrier_name}" title="${value.carrier_name}" style="width: auto;height: auto;margin-right: 10px;    max-width: 30px;" src="${value.carrier_logo}">
                  <p style=""> 
                        <span style="font-weight: bolder;">${value.carrier_name}</span> - ${value.currency} ${value.amount} - ${value.delivery_time}
                    </p>
                </div>
                </label>
                </div>
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

//get Woocommerce state select
let wooSelectElementOptions = ($) => {
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
  //return
  return {
    state_options,
    data_options
  };
};

////////////////////////////////////////////////////////////////
jQuery(document).ready(function ($) {
  //get woocommerce state select
  var { state_options, data_options } = wooSelectElementOptions($);
  //append to billing_country_field
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
      // if (countrycode == "NG") {
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
      // }
      //check if shipment is applied
      var terminal_delivery_html = $(".Terminal-delivery-logo");
      //find parent li
      var terminal_delivery_li = terminal_delivery_html.parent();
      //check if class exist woocommerce-Price-amount
      if (!terminal_delivery_li.find(".woocommerce-Price-amount").length) {
        //show error
        Swal.fire({
          icon: "error",
          title: "Please select a carrier",
          text: "Carrier is required to proceed with checkout",
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
      //if all is good
      //submit form
      form.submit();
      //clear local storage
      localStorage.removeItem("terminal_delivery_html");
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
    //process updateCoreWoocommerceElements
    updateCoreWoocommerceElements(state, "");
    //country
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

  //on change billing_country
  $('select[name="billing_country"]').change(function (e) {
    e.preventDefault();
    var country = $(this).val();
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
        //update state select name terminal_custom_shipping_state2
        $('select[name="terminal_custom_shipping_state2"]').html(options);
        //update select2
        $('select[name="terminal_custom_shipping_state2"]').select2({
          placeholder: "Select State"
        });
        //clear select name terminal_custom_shipping_lga2
        $('select[name="terminal_custom_shipping_lga2"]').html("");
        //update select2
        $('select[name="terminal_custom_shipping_lga2"]').select2({
          placeholder: "Select LGA"
        });
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

  //checking
  setInterval(() => {
    $("#billing_state_field").hide();
    $("#billing_city_field").hide();
    $("#terminal_custom_shipping_lga2").show();
    $("#terminal_custom_shipping_state2").show();
  }, 300);

  $('select[name="billing_country"]').val("");
  //destroy select2
  $('select[name="billing_country"]').select2("destroy");
  //init select2
  $('select[name="billing_country"]').select2({
    placeholder: "Select Country",
    allowClear: true
  });
  setTimeout(() => {
    //clear current country and state
    $('select[name="terminal_custom_shipping_state2"]').val("");
    //   if (terminal_billing_city != "") {
    //     var city = terminal_billing_city;
    //     //get local storage terminal_delivery_cities
    //     var terminal_delivery_cities = localStorage.getItem(
    //       "terminal_delivery_cities"
    //     );
    //     //if terminal_delivery_cities is not null
    //     if (terminal_delivery_cities != "" && terminal_billing_state != "") {
    //       let countrycode = $('select[name="billing_country"]').val();
    //       let state = $('select[name="terminal_custom_shipping_state2"]').val();
    //       //ajax
    //       $.ajax({
    //         type: "GET",
    //         url: terminal_africa.ajax_url,
    //         data: {
    //           action: "terminal_africa_get_cities",
    //           countryCode: countrycode,
    //           stateCode: state,
    //           nonce: terminal_africa.nonce
    //         },
    //         dataType: "json",
    //         beforeSend: function () {
    //           //block form name="checkout"
    //           $("form[name='checkout']").block({
    //             message: null,
    //             overlayCSS: {
    //               background: "#fff",
    //               opacity: 0.6
    //             }
    //           });
    //         },
    //         success: function (response) {
    //           //unblock
    //           $("form[name='checkout']").unblock();
    //           //check if response code 200
    //           if (response.code != 200) {
    //             return;
    //           }
    //           do_terminal_calculation(response.cities, city);
    //         },
    //         error: function (error) {
    //           //swal
    //           Swal.fire({
    //             icon: "error",
    //             title: "Oops...",
    //             text: "Something went wrong!",
    //             confirmButtonColor: "rgb(246 146 32)",
    //             cancelButtonColor: "rgb(0 0 0)",
    //             //footer
    //             footer: `
    //                   <div>
    //                       <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
    //                   </div>
    //                   `
    //           });
    //         }
    //       });
    //     }
    //   }
  }, 1000);
});
