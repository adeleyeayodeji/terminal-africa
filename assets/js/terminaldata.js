jQuery(document).ready(function ($) {
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
      console.log(response);
    }
  });

  setTimeout(() => {
    //fade in #billing_postcode_field
    $("#billing_postcode_field").fadeIn();
  }, 1000);
});

//terminalSetShippingCrarrier
let terminalSetShippingCrarrier = function (elem, e) {
  e.preventDefault();
  jQuery(document).ready(function ($) {
    let carriername = $(elem).attr("data-carrier-name");
    let amount = $(elem).attr("data-amount");
    let duration = $(elem).attr("data-duration");
    let email = $('input[name="billing_email"]').val();
    let rateid = $(elem).attr("data-rateid");
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
        rateid: rateid
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
          //update woocommerce
          $(document.body).trigger("update_checkout");
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
};

let restoreCarrierData = (e) => {
  jQuery(document).ready(function ($) {
    //check if local storage is not empty
    if (localStorage.getItem("terminal_delivery_html") != null) {
      let terminal_html = localStorage.getItem("terminal_delivery_html");
      //append to terminal_html
      var terminal_delivery_html = $(".Terminal-delivery-logo");
      //find parent li
      var terminal_delivery_li = terminal_delivery_html.parent().parent();
      //remove .t-checkout-carriers
      terminal_delivery_li.find(".t-checkout-carriers").remove();
      //append to li
      terminal_delivery_li.append(terminal_html);
    }
  });
};
