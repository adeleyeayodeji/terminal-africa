jQuery(document).ready(function ($) {
  /**
   * Init payment object
   *
   */
  var terminal_africa_payment = {
    init: function () {
      this.payment_form();
      this.auto_load();
    },
    //button event
    payment_form: function () {
      $(".terminal_africa_payment_form_class").on("submit", function (e) {
        e.preventDefault();
        //get the form element
        var form = $(this);
        //send ajax request
        $.ajax({
          type: "POST",
          url: wc_terminal_africa_payment_params.ajax_url,
          data: {
            action: "terminal_africa_payment_init",
            order_id: wc_terminal_africa_payment_params.order_id,
            nonce: wc_terminal_africa_payment_params.nonce
          },
          beforeSend: function () {
            //block ui
            $.blockUI({
              message: "<p>Processing Payment</p>",
              css: {
                border: "none",
                padding: "15px",
                backgroundColor: "#000",
                "-webkit-border-radius": "10px",
                "-moz-border-radius": "10px",
                opacity: 0.5,
                color: "#fff"
              }
            });
          },
          success: function (response) {
            if (response.success) {
              //block ui
              $.blockUI({
                message: "<p>Redirecting to payment page</p>",
                css: {
                  border: "none",
                  padding: "15px",
                  backgroundColor: "#000",
                  "-webkit-border-radius": "10px",
                  "-moz-border-radius": "10px",
                  opacity: 0.5,
                  color: "#fff"
                }
              });
              //redirect to payment page
              window.location.href = response.data.redirect_url;
            } else {
              //unblock ui
              $.unblockUI();
              //swal error
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.message,
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
            //unblock ui
            $.unblockUI();
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
    },
    //trigger on page load
    auto_load: function () {
      $(".terminal_africa_payment_form_class").submit();
    }
  };

  //init payment object
  terminal_africa_payment.init();
});
