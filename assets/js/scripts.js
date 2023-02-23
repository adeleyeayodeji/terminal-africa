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
        //clear terminal_delivery_html
        localStorage.removeItem("terminal_delivery_html");
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
                <div class="t-checkout-single" onclick="terminalSetShippingCrarrier2(this, event)" data-carrier-name="${value.carrier_name}" data-amount="${value.amount}" data-duration="${value.delivery_time}" data-pickup="${value.pickup_time}" data-order-id="${order_id}" data-rateid="${value.rate_id}" data-image-url="${value.carrier_logo}">
                <label for="shipping">
                <div style="display: flex;justify-content: start;align-items: center;    padding: 10px;    padding-bottom: 0px;">
                  <img class="Terminal-carrier-delivery-logo" alt="${value.carrier_name}" title="${value.carrier_name}" style="width: auto;height: auto;margin-right: 10px;    max-width: 30px;" src="${value.carrier_logo}">
                  <b style=""> 
                        <span style="font-weight: bolder;">${value.carrier_name}</span> - ${value.currency} ${value.amount}
                    </b>
                </div>
                <div>
                  <p>
                    <span class="t-carrier-desc">${value.carrier_rate_description}</span>
                    <br />
                    <span class="t-delivery-time">Pickup: ${value.pickup_time}</span>
                    <br />
                    <span class="t-delivery-time">Delivery: ${value.delivery_time}</span>
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
    let carrierlogo = $(elem).attr("data-image-url");
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
        order_id: order_id,
        carrierlogo: carrierlogo
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
    let rateid = $(elem).data("rate-id");
    let order_id = $(elem).data("order-id");
    let shipment_id = $(elem).data("shipment_id");
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
        $.ajax({
          type: "POST",
          url: terminal_africa.ajax_url,
          data: {
            action: "terminal_africa_arrange_terminal_delivery",
            nonce: terminal_africa.nonce,
            order_id: order_id,
            rateid: rateid,
            shipment_id: shipment_id
          },
          beforeSend: function () {
            // Swal loader
            Swal.fire({
              title: "Please wait...",
              text: "Arranging Delivery",
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
          dataType: "json",
          success: function (response) {
            //Swal close
            Swal.close();
            //check response is 200
            if (response.code == 200) {
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
                window.location.reload();
              });
            } else {
              if (response.code === 400) {
                //swal error
                Swal.fire({
                  icon: "error",
                  title: "Insufficient funds",
                  confirmButtonColor: "rgb(246 146 32)",
                  cancelButtonColor: "rgb(0 0 0)",
                  //confirm button
                  confirmButtonText: "Add funds",
                  showCancelButton: true,
                  cancelButtonText: "Cancel, I'll do it later",
                  text: response.message,
                  footer: `
        <div>
          <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
        </div>
      `
                }).then((result) => {
                  if (result.value) {
                    //redirect to add funds page
                    window.location.href = terminal_africa.wallet_url;
                    return;
                  }
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
      }
    });
  });
};

//gotoTerminalPage
let gotoTerminalPage = (elem, page) => {
  jQuery(document).ready(function ($) {
    let page1 = ["t-wallet-home", "t-wallet-topup"];
    let page2 = ["t-amount-input", "t-confirm-bank"];
    //if page is in page1
    if (page1.includes(page)) {
      //remove active class from all page1
      $.each(page1, function (i, v) {
        $(`.${v}`).hide();
      });
      //check if session storage is set
      if (sessionStorage.getItem("bank") === "true") {
        //remove active class from all page2
        $.each(page2, function (i, v) {
          $(`.${v}`).hide();
        });
        //add active class to page
        $(`.t-wallet-topup, .t-amount-input`).show();
        //clear session storage
        sessionStorage.clear();
        // console.log("session storage cleared");
        return;
      }
      //add active class to page
      $(`.${page}`).show();
    }
    //if page is in page2
    if (page2.includes(page)) {
      //check if session storage is
      if (sessionStorage.getItem("amount") !== "true") {
        //Swal
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter amount first!",
          confirmButtonColor: "rgb(246 146 32)",
          cancelButtonColor: "rgb(0 0 0)",
          footer: `
        <div>
          <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
        </div>
      `
        });
        return;
      }
      //remove active class from all page2
      $.each(page2, function (i, v) {
        $(`.${v}`).hide();
      });
      //add active class to page
      $(`.${page}`).show();
      //check if page is t-confirm-bank then session storage
      if (page === "t-confirm-bank") {
        sessionStorage.setItem("bank", "true");
        // console.log("session storage set");
      } else {
        //remove session storage
        sessionStorage.removeItem("bank");
        // console.log("session storage removed");
      }
    }
  });
};

//.t-top-up-amount-input keyup and change
jQuery(document).ready(function ($) {
  $(document).on("keyup change", ".t-top-up-amount-input", function () {
    let amount = $(this).val();
    //check if amount is empty
    if (amount === "") {
      //disable button
      $(".t-top-up-amount-btn").attr("disabled", true);
      //remove session storage
      sessionStorage.removeItem("amount");
      return;
    }
    //enable button
    $(".t-top-up-amount-btn").attr("disabled", false);
    //session storage
    sessionStorage.setItem("amount", "true");
    //get old balance
    let oldBalance = $(".t-NGN-balance");
    let amount2 = amount;
    //check if element exist
    if (oldBalance.length) {
      //get data balance
      let dataBalance = oldBalance.data("balance");
      //convert to number
      let balance = Number(dataBalance);
      //convert amount to number
      amount = Number(amount);
      //add amount to balance
      amount = balance + amount;
    }
    //format to price format
    let formattedAmount = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN"
    }).format(amount);
    //format amount2
    let formattedAmount2 = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN"
    }).format(amount2);
    //set amount to display
    $(".t-balance-sub-text:first").html(
      `Balance after topup - ${formattedAmount}`
    );
    $(".t-top-up-amount").html(formattedAmount2);
  });
});

let confirmTerminalTransfer = (elem, e) => {
  //prevent default
  e.preventDefault();
  jQuery(document).ready(function ($) {
    //Swal success
    Swal.fire({
      icon: "success",
      title: "Top Up Completed!",
      confirmButtonColor: "rgb(246 146 32)",
      //confirm button text
      confirmButtonText: "Continue",
      text: "You should receive confirmation once your transfer is confirmed.",
      footer: `
        <div>
          <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
        </div>
      `
    }).then(() => {
      //reload page
      window.location.href = terminal_africa.wallet_home;
    });
  });
};

//refreshTerminalWallet
let refreshTerminalWallet = () => {
  jQuery(document).ready(function ($) {
    //ajax
    $.ajax({
      type: "GET",
      url: terminal_africa.ajax_url,
      data: {
        action: "refresh_terminal_wallet",
        nonce: terminal_africa.nonce
      },
      dataType: "json",
      success: function (response) {
        // console.log(response);
      }
    });
  });
};

//refreshTerminalRate
let refreshTerminalRate = (rate_id) => {
  jQuery(document).ready(function ($) {
    //ajax
    $.ajax({
      type: "GET",
      url: terminal_africa.ajax_url,
      data: {
        action: "refresh_terminal_rate_data",
        nonce: terminal_africa.nonce,
        rate_id: rate_id
      },
      dataType: "json",
      success: function (response) {
        // console.log(response);
      }
    });
  });
};

//refreshTerminalCarriers
let refreshTerminalCarriers = () => {
  jQuery(document).ready(function ($) {
    //ajax
    $.ajax({
      type: "GET",
      url: terminal_africa.ajax_url,
      data: {
        action: "refresh_terminal_carriers_data",
        nonce: terminal_africa.nonce
      },
      dataType: "json",
      success: function (response) {
        // console.log(response);
      }
    });
  });
};

let getShipmentStatus = (shipment_id) => {
  jQuery(document).ready(function ($) {
    //ajax
    $.ajax({
      type: "GET",
      url: terminal_africa.ajax_url,
      data: {
        action: "get_terminal_shipment_status",
        nonce: terminal_africa.nonce,
        shipment_id
      },
      dataType: "json",
      success: function (response) {
        //update #terminal_shipment_status html
        $("#terminal_shipment_status").html(response.data);
      }
    });
  });
};

//check if page match admin.php?page=terminal-africa-wallet
var currentpageurl = window.location.href;
if (currentpageurl.includes("admin.php?page=terminal-africa-wallet")) {
  //refresh terminal wallet
  refreshTerminalWallet();
  //check if tab is in url
  if (currentpageurl.includes("tab=")) {
    //trigger click .t-top-up-landing
    jQuery(document).ready(function ($) {
      $(".t-top-up-landing").trigger("click");
    });
  }
}
//check if page match admin.php?page=terminal-africa and has rate_id
if (currentpageurl.includes("admin.php?page=terminal-africa")) {
  //check if rate_id is in url
  if (currentpageurl.includes("rate_id=")) {
    //get rate id
    let rate_id = currentpageurl.split("rate_id=")[1];
    //check if & is in rate id
    if (rate_id.includes("&")) {
      //split rate id
      rate_id = rate_id.split("&")[0];
    }
    //if rate id is not undefined
    if (rate_id !== undefined && rate_id !== "") {
      //refresh terminal rate
      refreshTerminalRate(rate_id);
    }
    //get shipment status
    let shipment_id = currentpageurl.split("id=")[1];
    //check if & is in id
    if (shipment_id.includes("&")) {
      //split id
      shipment_id = shipment_id.split("&")[0];
    }
    //if shipment id is not undefined
    if (shipment_id !== undefined && shipment_id !== "") {
      //get shipment status
      getShipmentStatus(shipment_id);
    }
  }
}

//check if page is admin.php?page=terminal-africa-carriers
if (currentpageurl.includes("admin.php?page=terminal-africa-carriers")) {
  refreshTerminalCarriers();
}
//getSelectedDataTerminal
let getSelectedDataTerminal = () => {
  let terminalEnabledCarriers = [];
  let terminalDisabledCarriers = [];
  //get all element .t-carrier-region-listing-block check if input is check
  jQuery(document).ready(function ($) {
    //get all element .t-carrier-region-listing-block
    let elements = $(".t-carrier-region-listing-block");
    //check if element exist
    if (elements.length) {
      //loop through elements
      $.each(elements, function (i, v) {
        //get input
        let input = $(v).find("input");
        let ppp = $(v);
        let carrier_id = input.data("carrier-id");
        let domestic = ppp.data("domestic");
        //check if domestic is empty
        if (
          domestic === "" ||
          domestic === undefined ||
          domestic === null ||
          domestic === "null" ||
          domestic === "undefined" ||
          carrier_id === "undefined" ||
          carrier_id === undefined ||
          carrier_id === null ||
          carrier_id === "null"
        ) {
          //skip
          return;
        }
        let international = ppp.data("international");
        let regional = ppp.data("regional");
        //create carrier object
        let carrierObj = {
          id: carrier_id,
          domestic,
          international,
          regional
        };
        //check if input is checked
        if (input.is(":checked")) {
          //push to terminalEnabledCarriers
          terminalEnabledCarriers.push(carrierObj);
        } else {
          //push to terminalDisabledCarriers
          terminalDisabledCarriers.push(carrierObj);
        }
      });
    }
  });

  //return object
  return {
    terminalEnabledCarriers,
    terminalDisabledCarriers
  };
};

//.save-carrier-settings
jQuery(document).ready(function ($) {
  //click
  $(".save-carrier-settings").on("click", function (e) {
    //prevent default
    e.preventDefault();
    //get selected data
    let selectedData = getSelectedDataTerminal();
    //use Promise
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(selectedData);
      }, 300);
    });
    //then
    myPromise.then((selectedData) => {
      //ajax
      $.ajax({
        type: "POST",
        url: terminal_africa.ajax_url,
        data: {
          action: "save_terminal_carrier_settings",
          nonce: terminal_africa.nonce,
          terminalEnabledCarriers: selectedData.terminalEnabledCarriers,
          terminalDisabledCarriers: selectedData.terminalDisabledCarriers
        },
        dataType: "json",
        beforeSend: () => {
          // Swal loader
          Swal.fire({
            title: "Please wait...",
            text: "Saving settings",
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
          console.log(response);
          if (response.code == 200) {
            //Swal success
            Swal.fire({
              icon: "success",
              title: "Settings Saved!",
              confirmButtonColor: "rgb(246 146 32)",
              cancelButtonColor: "rgb(0 0 0)",
              //confirm button text
              confirmButtonText: "Continue",
              footer: `
              <div>
                <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
              </div>
            `
            });
          } else {
            //Swal error
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.message,
              confirmButtonColor: "rgb(246 146 32)",
              cancelButtonColor: "rgb(0 0 0)",
              footer: `
              <div>
                <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
              </div>
            `
            });
          }
        },
        error: function (error) {
          console.log(error);
          //Swal error
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
  });
});

//load terminal_packaging
let loadTerminalPackaging = () => {
  jQuery(document).ready(function ($) {
    $.ajax({
      type: "GET",
      url: terminal_africa.ajax_url,
      data: {
        action: "get_terminal_packaging",
        nonce: terminal_africa.nonce
      },
      dataType: "json",
      success: function (response) {
        // console.log(response);
      }
    });
  });
};

//check if terminal_africa.packaging_id is no
if (terminal_africa.packaging_id == "no") {
  loadTerminalPackaging();
}

//.t-carrier-switch
jQuery(document).ready(function ($) {
  //each element
  $(".t-carrier-switch").each(function (i, v) {
    //find input checkbox and change event
    $(v)
      .find("input")
      .on("change", function (e) {
        //get parent
        let parent = $(this).parents(".t-carrier-region-listing-block");
        //carrier id
        let carrier_id = $(this).data("carrier-id");
        //domestic
        let domestic = parent.data("domestic");
        //international
        let international = parent.data("international");
        //regional
        let regional = parent.data("regional");
        //create carrier object
        let carrierObj = {
          id: carrier_id,
          domestic,
          international,
          regional
        };
        //check if all are not empty
        if (
          carrier_id !== "" &&
          carrier_id !== undefined &&
          carrier_id !== null &&
          carrier_id !== "null" &&
          carrier_id !== "undefined" &&
          domestic !== "" &&
          domestic !== undefined &&
          domestic !== null &&
          domestic !== "null" &&
          domestic !== "undefined" &&
          international !== "" &&
          international !== undefined &&
          international !== null &&
          international !== "null" &&
          international !== "undefined" &&
          regional !== "" &&
          regional !== undefined &&
          regional !== null &&
          regional !== "null" &&
          regional !== "undefined"
        ) {
          //check if input is checked
          if ($(this).is(":checked")) {
            //update server
            $.ajax({
              type: "POST",
              url: terminal_africa.ajax_url,
              data: {
                action: "update_user_carrier_terminal",
                nonce: terminal_africa.nonce,
                carrierObj,
                status: "enabled"
              },
              dataType: "json",
              beforeSend: () => {
                //block element
                $(parent).block({
                  message: '<i class="fa fa-spinner fa-spin"></i>',
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
              success: function (response) {
                //unblock element
                $(parent).unblock();
                //izitoast success if response code is 200
                if (response.code == 200) {
                  iziToast.success({
                    title: "Success",
                    message: response.message,
                    position: "topRight",
                    timeout: 3000,
                    transitionIn: "flipInX",
                    transitionOut: "flipOutX"
                  });
                }
              }
            });
          } else {
            //update server
            $.ajax({
              type: "POST",
              url: terminal_africa.ajax_url,
              data: {
                action: "update_user_carrier_terminal",
                nonce: terminal_africa.nonce,
                carrierObj,
                status: "disabled"
              },
              dataType: "json",
              beforeSend: () => {
                //block element
                $(parent).block({
                  message: "<i class='fa fa-spinner fa-spin'></i>",
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
              success: function (response) {
                //unblock element
                $(parent).unblock();
                //izitoast success if response code is 200
                if (response.code == 200) {
                  iziToast.info({
                    title: "Success",
                    message: response.message,
                    position: "topRight",
                    timeout: 3000,
                    transitionIn: "flipInX",
                    transitionOut: "flipOutX"
                  });
                }
              }
            });
          }
          return;
        }
        //log data are empty
        console.log("data are empty", carrierObj);
      });
  });
});
