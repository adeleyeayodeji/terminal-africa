jQuery(document).ready(function ($) {
  $("#t_form").submit(function (e) {
    e.preventDefault();
    var form = $(this);
    var public_key = form.find("input[name='public_key']").val();
    var secret_key = form.find("input[name='secret_key']").val();
    //confirm swal
    Swal.fire({
      title: "Action required!",
      text: "Terminal Africa will overwrite your existing shipping address, are you sure you want to continue?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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
              imageUrl: terminal_africa.plugin_url,
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              showConfirmButton: false,
              onOpen: () => {
                Swal.showLoading();
              }
            });
          },
          success: function (response) {
            //close loader
            Swal.close();
            console.log(response);
          },
          error: function (error) {
            //close loader
            Swal.close();
            //swal error
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: "Something went wrong!"
            });
          }
        });
      }
    });
  });
});
