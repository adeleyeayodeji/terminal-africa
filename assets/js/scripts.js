jQuery(document).ready(function ($) {
  //auth
  $("#t_form").submit(function (e) {
    e.preventDefault();
    var form = $(this);
    var public_key = form.find("input[name='public_key']").val();
    var secret_key = form.find("input[name='secret_key']").val();
    //confirm swal
    Swal.fire({
      //icon info
      icon: "info",
      title: "Action required!",
      text: "Terminal Africa will overwrite your existing shipping location to ensure accurate address information",
      //text css
      customClass: {
        title: "swal-title",
        text: "swal-text",
        content: "swal-content",
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button"
      },
      type: "warning",
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
      confirmButtonText: "Yes, continue!"
    }).then((result) => {
      if (result.value) {
        //ajax
        $.ajax({
          type: "POST",
          url: terminal_africa.ajax_url,
          data: {
            action: "terminal_africa_auth",
            public_key: public_key,
            secret_key: secret_key,
            nonce: terminal_africa.nonce
          },
          dataType: "json",
          beforeSend: function () {
            // Swal loader
            Swal.fire({
              title: "Authenticating...",
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
                type: "success",
                title: "Success!",
                text: "Terminal Africa has been successfully authenticated",
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
                  //check if terminal_africa.getting_started_url is none
                  if (terminal_africa.getting_started_url == "none") {
                    //do nothing
                  } else {
                    //show loading
                    Swal.fire({
                      title: "Redirecting...",
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
                    //redirect to getting started page
                    window.location.href = terminal_africa.getting_started_url;
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
          error: function (error) {
            //close loader
            Swal.close();
            //swal error
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
    });
  });

  //.t-form-submit
  $("#t-form-submit").submit(function (e) {
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
    //ajax
    $.ajax({
      type: "POST",
      url: terminal_africa.ajax_url,
      data:
        form.serialize() +
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
                  text: "Customer address changed, please recalculate shipping",
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
      error: function (error) {
        //close loader
        Swal.close();
        //swal error
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

  //init select2 .t-terminal-country
  $(".t-terminal-country").select2({
    placeholder: "Select country",
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

  //event onchange
  $(".t-terminal-country").change(function (e) {
    //prevent default
    e.preventDefault();
    //get value
    var country = $(this).val();
    //check country
    if (country) {
      //ajax
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
            //destroy select2
            $(".t-terminal-state").select2("destroy");
            //remove all options
            $(".t-terminal-state").find("option").remove();
            //append options
            $(".t-terminal-state").append(
              "<option value=''>Select State</option>"
            );
            //loop
            $.each(response.states, function (key, value) {
              //append options
              $(".t-terminal-state").append(
                "<option value='" +
                  value.name +
                  "' data-statecode='" +
                  value.isoCode +
                  "'>" +
                  value.name +
                  "</option>"
              );
            });
            //init select2 .t-terminal-state
            $(".t-terminal-state").select2({
              placeholder: "Select state",
              allowClear: true,
              width: "100%",
              //select class
              dropdownCssClass: "t-form-control",
              //dropdown parent
              dropdownParent: $(".t-terminal-state").parent()
            });
          } else {
            //destroy select2
            $(".t-terminal-state").select2("destroy");
            //remove all options
            $(".t-terminal-state").find("option").remove();
            //append options
            $(".t-terminal-state").append(
              "<option value=''>Select State</option>"
            );
            //init select2 .t-terminal-state
            $(".t-terminal-state").select2({
              placeholder: "Select state",
              allowClear: true,
              width: "100%",
              //select class
              dropdownCssClass: "t-form-control",
              //dropdown parent
              dropdownParent: $(".t-terminal-state").parent()
            });
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
        error: function (error) {
          //close loader
          Swal.close();
          //swal error
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
  });

  //init select2 .t-terminal-state
  $(".t-terminal-state").select2({
    placeholder: "Select Sate",
    allowClear: true,
    width: "100%",
    //select class
    dropdownCssClass: "t-form-control",
    //dropdown parent
    dropdownParent: $(".t-terminal-state").parent()
  });

  //event onchange
  $(".t-terminal-state").change(function (e) {
    //prevent default
    e.preventDefault();
    //get value
    var state = $(this).find("option:selected").data("statecode");
    var country = $(".t-terminal-country").val();
    //check if country is selected
    if (!country) {
      //swal error
      Swal.fire({
        icon: "error",

        title: "Oops...",
        text: "Please select country first!",
        confirmButtonColor: "rgb(246 146 32)",
        cancelButtonColor: "rgb(0 0 0)",
        //footer
        footer: `
          <div>
            <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
          </div>
        `
      });
      //return
      return;
    }
    //check state
    if (state && country) {
      //ajax
      $.ajax({
        type: "GET",
        url: terminal_africa.ajax_url,
        data: {
          action: "terminal_africa_get_cities",
          stateCode: state,
          countryCode: country,
          nonce: terminal_africa.nonce
        },
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
            //destroy select2
            $(".t-terminal-city").select2("destroy");
            //remove all options
            $(".t-terminal-city").find("option").remove();
            //append options
            $(".t-terminal-city").append(
              "<option value=''>Select City</option>"
            );
            //loop
            $.each(response.cities, function (key, value) {
              //append options
              $(".t-terminal-city").append(
                "<option value='" + value.name + "'>" + value.name + "</option>"
              );
            });
            //init select2 .t-terminal-city
            $(".t-terminal-city").select2({
              placeholder: "Select city",
              allowClear: true,
              width: "100%",
              //select class
              dropdownCssClass: "t-form-control",
              //dropdown parent
              dropdownParent: $(".t-terminal-city").parent()
            });
          } else {
            //destroy select2
            $(".t-terminal-city").select2("destroy");
            //remove all options
            $(".t-terminal-city").find("option").remove();
            //append options
            $(".t-terminal-city").append(
              "<option value=''>Select City</option>"
            );
            //init select2 .t-terminal-city
            $(".t-terminal-city").select2({
              placeholder: "Select city",
              allowClear: true,
              width: "100%",
              //select class
              dropdownCssClass: "t-form-control",
              //dropdown parent
              dropdownParent: $(".t-terminal-city").parent()
            });
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
        error: function (error) {
          //close loader
          Swal.close();
          //swal error
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
    } else {
      //destroy select2
      $(".t-terminal-city").select2("destroy");
      //remove all options
      $(".t-terminal-city").find("option").remove();
      //append options
      $(".t-terminal-city").append("<option value=''>Select City</option>");
      //init select2 .t-terminal-city
      $(".t-terminal-city").select2({
        placeholder: "Select city",
        allowClear: true,
        width: "100%",
        //select class
        dropdownCssClass: "t-form-control",
        //dropdown parent
        dropdownParent: $(".t-terminal-city").parent()
      });
      //log
      console.log("Please select state first!", state, country);
    }
  });

  //init select2 .t-terminal-city
  $(".t-terminal-city").select2({
    placeholder: "Select city",
    allowClear: true,
    width: "100%",
    //select class
    dropdownCssClass: "t-form-control",
    //dropdown parent
    dropdownParent: $(".t-terminal-city").parent()
  });

  //t-sign-out
  $("#t-sign-out").on("click", function (e) {
    //prevent default
    e.preventDefault();
    //swal confirm
    Swal.fire({
      title: "Are you sure?",
      text: "You want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(246 146 32)",
      cancelButtonColor: "rgb(0 0 0)",
      confirmButtonText: "Yes, sign out!",
      cancelButtonText: "No, cancel!",
      //footer
      footer: `
        <div>
          <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
        </div>
      `
    }).then((result) => {
      //check result
      if (result.value) {
        //ajax
        $.ajax({
          type: "GET",
          url: terminal_africa.ajax_url,
          data: {
            action: "terminal_africa_sign_out",
            nonce: terminal_africa.nonce
          },
          dataType: "json",
          beforeSend: function () {
            // Swal loader
            Swal.fire({
              title: "Signing out...",
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
              //swal
              Swal.fire({
                icon: "success",
                title: "Success",
                text: response.message,
                confirmButtonColor: "rgb(246 146 32)",
                cancelButtonColor: "rgb(0 0 0)",
                //footer
                footer: `
              <div>
                <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
              </div>
            `
              }).then(function () {
                //reload
                window.location.reload();
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
          error: function (error) {
            //close loader
            Swal.close();
            //swal error
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
    });
  });

  //t-dashboard-intro-list-item
  $(".t-dashboard-intro-list-item").each(function (index, element) {
    $(this).click(function (e) {
      e.preventDefault();
      //remove all active .t-products-active
      $(".t-dashboard-intro-list-item").removeClass("t-products-active");
      //add active
      $(this).addClass("t-products-active");
      //get data box
      let data_box = $(this).attr("data-box");
      //check if cuurent width is min 600px
      if ($(window).width() <= 700) {
        //hide .t-intro-list
        $(".t-intro-list").hide();
        //show .t-intro-content-block
        $(".t-intro-content-block").show();
      } else {
        //hide .t-intro-list
        $(".t-intro-list").show();
        //show .t-intro-content-block
        $(".t-intro-content-block").show();
      }
      //if data box is t-add-products
      if (data_box == "t-add-products") {
        //hide .t-get-support
        $(".t-get-support").hide();
        //show .t-add-products
        $(".t-add-products").show();
      } else {
        //hide .t-add-products
        $(".t-add-products").hide();
        //show .t-get-support
        $(".t-get-support").show();
      }
    });
  });

  //on window resize
  $(window).resize(function () {
    //check if cuurent width is min 600px
    if ($(window).width() <= 700) {
      //hide .t-intro-list
      $(".t-intro-list").hide();
      //show .t-intro-content-block
      $(".t-intro-content-block").show();
    } else {
      //hide .t-intro-list
      $(".t-intro-list").show();
      //show .t-intro-content-block
      $(".t-intro-content-block").show();
    }
  });

  //click mobile-resources-back-link-block
  $(".mobile-resources-back-link-block").click(function (e) {
    e.preventDefault();
    //hide .t-intro-content-block
    $(".t-intro-content-block").hide();
    //show .t-intro-list
    $(".t-intro-list").show();
  });

  //enableTerminal
  $("#enableTerminal").click(function (e) {
    //prevent default
    e.preventDefault();
    //ajax
    $.ajax({
      type: "POST",
      url: terminal_africa.ajax_url,
      data: {
        action: "terminal_africa_enable_terminal",
        nonce: terminal_africa.nonce
      },
      dataType: "json",
      beforeSend: function () {
        // Swal loader
        Swal.fire({
          title: "Enabling...",
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
          //swal
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.message,
            confirmButtonColor: "rgb(246 146 32)",
            cancelButtonColor: "rgb(0 0 0)",
            //footer
            footer: `
          <div>
            <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
          </div>
        `
          }).then(function () {
            //reload
            window.location.reload();
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
      error: function (error) {
        //close loader
        Swal.close();
        //swal error
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
});

let updateData = (elem, e, element_id) => {
  //prevent default
  e.preventDefault();
  jQuery(document).ready(function ($) {
    //get the value
    let value = $(elem).val();
    //get the element
    let element = $(`#${element_id}`);
    //update the value
    element.text(value);
  });
};

let changeTerminalCarrier = (elem, e) => {
  //prevent default
  e.preventDefault();
  jQuery(document).ready(function ($) {
    //process the terminal rates
    var shipment_id = $(elem).data("shipment_id");
    var order_id = $(elem).data("order-id");
    //ajax
    $.ajax({
      type: "GET",
      url: terminal_africa.ajax_url,
      data: {
        action: "terminal_africa_process_terminal_rates_customer",
        nonce: terminal_africa.nonce,
        shipment_id: shipment_id
      },
      dataType: "json",
      beforeSend: function () {
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
                <p class="t-checkout-single" onclick="terminalSetShippingCrarrier2(this, event)" data-carrier-name="${value.carrier_name}" data-amount="${value.amount}" data-order-id="${order_id}" data-duration="${value.delivery_time}" data-pickup="${value.pickup_time}" data-rateid="${value.rate_id}">
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
          var terminal_delivery_html = $("#t_carriers_location");
          //append to li
          terminal_delivery_html.html(terminal_html);
        } else {
          //swal error
          Swal.fire({
            icon: "error",
            title: "Oops...",
            confirmButtonColor: "rgb(246 146 32)",
            cancelButtonColor: "rgb(0 0 0)",
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
          confirmButtonColor: "rgb(246 146 32)",
          cancelButtonColor: "rgb(0 0 0)",
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
};

let terminalSetShippingCrarrier2 = (elem, e) => {
  //prevent default
  e.preventDefault();
  jQuery(document).ready(function ($) {
    //get the data
    var carrier_name = $(elem).data("carrier-name");
    var amount = $(elem).data("amount");
    var duration = $(elem).data("duration");
    var pickup = $(elem).data("pickup");
    var rateid = $(elem).data("rateid");
    var order_id = $(elem).data("order-id");
    //do ajax
    //ajax
    $.ajax({
      type: "GET",
      url: terminal_africa.ajax_url,
      data: {
        action: "terminal_africa_apply_terminal_rates_customer",
        nonce: terminal_africa.nonce,
        carrier_name: carrier_name,
        amount: amount,
        duration: duration,
        pickup: pickup,
        rateid: rateid,
        order_id: order_id
      },
      dataType: "json",
      beforeSend: function () {
        // Swal loader
        Swal.fire({
          title: "Please wait...",
          text: "Applying Shipping Rates",
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
          //swal success
          Swal.fire({
            icon: "success",
            title: "Success",
            confirmButtonColor: "rgb(246 146 32)",
            cancelButtonColor: "rgb(0 0 0)",
            text: response.message,
            footer: `
        <div>
          <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
        </div>
      `
          }).then(() => {
            //reload page
            window.location.href = response.url;
          });
        } else {
          //swal error
          Swal.fire({
            icon: "error",
            title: "Oops...",
            confirmButtonColor: "rgb(246 146 32)",
            cancelButtonColor: "rgb(0 0 0)",
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

//arrangeTerminalDelivery
let arrangeTerminalDelivery = (elem, e) => {
  e.preventDefault();
  jQuery(document).ready(function ($) {
    //Swal confirm
    Swal.fire({
      title: "Are you sure?",
      text: "You want to arrange delivery for this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(246 146 32)",
      cancelButtonColor: "rgb(0 0 0)",
      confirmButtonText: "Yes, arrange it!"
    }).then((result) => {
      if (result.value) {
        //ajax
      }
    });
  });
};
