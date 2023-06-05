/**
 * Terminal Data Parcel
 * @since 1.10.3
 * @author Adeleye Ayodeji
 */
class TerminalDataParcel {
  /**
   * Constructor
   */
  constructor() {
    this.jquery = jQuery;
    this.createOrupdateParcel();
  }

  /**
   * Create or update parcel
   * @since 1.10.3
   */
  createOrupdateParcel() {
    //set session storage terminal_africa_save_cart_itemcount
    sessionStorage.setItem("terminal_africa_save_cart_itemcount", "0");
    //Check if shipping is enabled by woocommerce
    var terminal_delivery_html = this.jquery(".Terminal-delivery-logo");
    //check if terminal_delivery_html exist
    if (!terminal_delivery_html.length) {
      //do nothing
      return;
    }
    //Save cart item as parcel
    this.jquery.ajax({
      type: "POST",
      url: terminal_africa_parcel.ajax_url,
      data: {
        action: "terminal_africa_save_cart_item",
        nonce: terminal_africa_parcel.nonce
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
                  <img src="${terminal_africa_parcel.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
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
              saveCartTerminalData();
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
  }
}

//init
new TerminalDataParcel();
