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
});
