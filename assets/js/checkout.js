function terminalsetValue2(elem) {
  jQuery(document).ready(function ($) {
    var lga = $(elem).val();
    var stateCode = $('select[name="terminal_custom_shipping_state2"]')
      .find("option:selected")
      .val();
    var countryCode = $('select[name="billing_country"]').val();
    var state = $('select[name="terminal_custom_shipping_state2"]').val();
    var finaltext = lga + ", " + state;
    //find select[name='billing_state'] option with value and set it to selected
    $('select[name="billing_state"]')
      .find("option")
      .each(function (index, element) {
        if ($(element).val() == finaltext) {
          let element2 = document.querySelector('select[name="billing_state"]');
          element2.value = finaltext;
          element2.dispatchEvent(new Event("change"));
        } else {
          $(element).removeAttr("selected");
        }
      });
    //get selected option
    var selected_option = $('select[name="billing_state"]')
      .find("option:selected")
      .val();
    document.querySelector("#billing_city").value = selected_option;
    //form name="checkout" input name billing_city
    //custom
    document.querySelector(
      'form[name="checkout"] input[name="billing_city"]'
    ).value = selected_option;
    //state
    if (
      document.querySelector(
        'form[name="checkout"] input[name="billing_state"]'
      )
    ) {
      document.querySelector(
        'form[name="checkout"] input[name="billing_state"]'
      ).value = selected_option;
      //custom
    }
    $(document.body).trigger("update_checkout");
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

  let do_terminal_calculation = (datas) => {
    //check data count
    if (datas.length < 1) {
      datas = [
        {
          name: "Select City",
          value: ""
        }
      ];
    }
    var lga = "";
    //create options
    $.each(datas, function (indexInArray, valueOfElement) {
      lga += `<option value="${valueOfElement.name}" ${
        valueOfElement.name == terminal_billing_city ? "selected" : ""
      }>${valueOfElement.name}</option>`;
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

  //on ajax complete
  $(document).ajaxComplete(function () {
    //select2 init
    setTimeout(() => {
      //select2 update
      $('select[name="terminal_custom_shipping_state2"]').select2({
        placeholder: "Select State"
      });
      terminalButton();
    }, 700);
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
    if (terminal_billing_state != "") {
      var state = terminal_billing_state;
      var lga = "";
      do_terminal_calculation(state, lga);
    }
  }, 1000);
});
