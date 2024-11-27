/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Loader.js":
/*!**********************************!*\
  !*** ./src/components/Loader.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);




/**
 * Terminal Loader
 */
class TerminalLoader extends react__WEBPACK_IMPORTED_MODULE_2__.Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-center",
      style: {
        padding: 10
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, "Loading...")));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (TerminalLoader);

/***/ }),

/***/ "./src/components/MerchantAddress/MerchantAddressForm.js":
/*!***************************************************************!*\
  !*** ./src/components/MerchantAddress/MerchantAddressForm.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MerchantAddressForm; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TerminalPhoneBook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TerminalPhoneBook */ "./src/components/TerminalPhoneBook.js");
/* harmony import */ var _Shipping_Parts_TerminalShippingForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Shipping/Parts/TerminalShippingForm */ "./src/components/Shipping/Parts/TerminalShippingForm.js");
/* harmony import */ var _MerchantSkeleton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MerchantSkeleton */ "./src/components/MerchantAddress/MerchantSkeleton.js");





class MerchantAddressForm extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor() {
    super();
    this.state = {
      saved_address: {
        first_name: "",
        last_name: "",
        line1: "",
        line2: "",
        email: "",
        country: "",
        state: "",
        city: "",
        phone: "",
        zip: "",
        states: [],
        cities: []
      },
      shippingData: {},
      isLoading: true,
      merchant_address_id: 0
    };
  }

  //did mount
  componentDidMount() {
    //get api data
    this.getApiData();
  }

  //getApiData
  getApiData = () => {
    //ajax
    jQuery(document).ready($ => {
      $.ajax({
        type: "GET",
        url: terminal_africa.ajax_url,
        data: {
          action: "terminal_africa_get_merchant_address_data",
          nonce: terminal_africa.nonce
        },
        dataType: "json",
        success: response => {
          //disable loading
          this.setState({
            isLoading: false
          });
          //check response code is 200
          if (response.code === 200) {
            //set state
            this.setState({
              saved_address: response.data.saved_address,
              shippingData: response.data.shippingData,
              merchant_address_id: response.data.merchant_address_id
            });
          } else {
            //Swal error
            Swal.fire({
              icon: "error",
              title: "Oops...",
              confirmButtonColor: "rgb(246 146 32)",
              //confirm button text
              confirmButtonText: "Close",
              text: response.message,
              footer: `
                <div>
                    <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
                </div>
                 `
            });
          }
        },
        error: function (xhr, status, error) {
          //disable loading
          this.setState({
            isLoading: false
          });
          //swal
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
  };
  render() {
    const {
      saved_address,
      shippingData,
      isLoading,
      merchant_address_id
    } = this.state;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, isLoading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_MerchantSkeleton__WEBPACK_IMPORTED_MODULE_4__["default"], null) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-merchant-page-header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "PickUp Address"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TerminalPhoneBook__WEBPACK_IMPORTED_MODULE_2__["default"], null))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-mt-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Shipping_Parts_TerminalShippingForm__WEBPACK_IMPORTED_MODULE_3__["default"], {
      saved_address: saved_address,
      rate_id: 0,
      shippingData: shippingData,
      merchant_address_id: merchant_address_id,
      action_type: "merchant"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "t-note"
    }, "Please fill in your address details below. This address will be used to pick up your items from your location.")))));
  }
}

/***/ }),

/***/ "./src/components/MerchantAddress/MerchantSkeleton.js":
/*!************************************************************!*\
  !*** ./src/components/MerchantAddress/MerchantSkeleton.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MerchantSkeleton; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class MerchantSkeleton extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  render() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-row"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-col-12"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: {
        height: "10px",
        width: "90%"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: {
        height: "20px",
        width: "90%"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: {
        height: "20px",
        width: "90%"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: {
        height: "30px",
        width: "90%"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-row"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-col-6"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: {
        height: "30px",
        width: "95%"
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-col-6"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: {
        height: "30px",
        width: "80%"
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: {
        height: "30px",
        width: "90%"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: {
        height: "40px",
        width: "90%"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-row"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-col-6"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: {
        height: "30px",
        width: "95%"
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-col-6"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: {
        height: "30px",
        width: "80%"
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: {
        height: "90px",
        width: "90%"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }))));
  }
}

/***/ }),

/***/ "./src/components/Shipping/Parts/ShippingStatus.js":
/*!*********************************************************!*\
  !*** ./src/components/Shipping/Parts/ShippingStatus.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ShippingStatus; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class ShippingStatus extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  render() {
    const {
      className,
      title
    } = this.props;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-status-list " + className,
      style: {
        width: "fit-content"
      }
    }, title);
  }
}

/***/ }),

/***/ "./src/components/Shipping/Parts/TerminalShippingForm.js":
/*!***************************************************************!*\
  !*** ./src/components/Shipping/Parts/TerminalShippingForm.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class TerminalShippingForm extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
  constructor(props) {
    super(props);
    this.state = {
      saved_address: {}
    };
  }

  /**
   * Dom loaded
   */
  componentDidMount() {}

  //did update
  componentDidUpdate(prevProps) {
    // Listen for the update event of shippingData
    if (this.props.shippingData !== prevProps.shippingData && this.props.shippingData) {
      // Trigger event from script.js
      this.loadSelect2();
      //initFormSelectEvent
      this.initFormSelectEvent();
    }

    // Update saved address
    if (this.props.saved_address !== prevProps.saved_address && this.props.saved_address) {
      this.setState({
        saved_address: this.props.saved_address
      });
    }
  }

  //load select2
  loadSelect2() {
    try {
      jQuery(document).ready(function ($) {
        //select2 template
        let formatState = state => {
          if (!state.id) {
            return state.text;
          }
          var $state = $("<span>" + state.element.dataset.flag + " " + state.text + "</span>");
          return $state;
        };

        //select2 phone template
        let formatPhoneState = state => {
          if (!state.id) {
            return state.text;
          }
          //check if state.text has +
          if (!state.text.includes("+")) {
            state.text = "+" + state.text;
          }
          var $state = $("<span>" + state.element.dataset.flag + " " + state.text + "</span>");
          return $state;
        };

        //init select2 .t-terminal-country
        $(".t-terminal-country").select2({
          placeholder: "Select",
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

        //init select2 .terminal-state
        $(".terminal-state").select2({
          placeholder: "Select",
          allowClear: true,
          width: "100%",
          //select class
          dropdownCssClass: "t-form-control",
          //dropdown parent
          dropdownParent: $(".terminal-state").parent()
        });

        //init select2 .terminal-city
        $(".terminal-city").select2({
          placeholder: "Select city",
          allowClear: true,
          width: "100%",
          //select class
          dropdownCssClass: "t-form-control",
          //dropdown parent
          dropdownParent: $(".terminal-city").parent()
        });

        //init select2 .t-phone-new-select
        $(".t-phone-new-select").select2({
          placeholder: "Select",
          allowClear: false,
          width: "100%",
          //select class
          dropdownCssClass: "t-form-control",
          //dropdown parent
          dropdownParent: $(".t-phone-new-select").parent(),
          //template
          templateResult: formatPhoneState,
          templateSelection: formatPhoneState
        });
      });

      //init formSubmitEvent
      this.formSubmitEvent();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Init form select event
   *
   */
  initFormSelectEvent = () => {
    jQuery(document).ready(function ($) {
      //event onchange
      $(".t-terminal-country").change(function (e) {
        //prevent default
        e.preventDefault();
        //get value
        var country = $(this).val();
        //check country
        if (country) {
          //check if t-phone-new-select exist
          if ($(".t-phone-new-select").length) {
            //set address option where option data-isocode is address.country
            $(".t-phone-new-select option[data-isocode=" + country + "]").prop("selected", true).trigger("change");
          }
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
                $(".t-terminal-state").append("<option value=''>Select State</option>");
                //loop
                $.each(response.states, function (key, value) {
                  //append options
                  $(".t-terminal-state").append("<option value='" + value.name + "' data-statecode='" + value.isoCode + "'>" + value.name + "</option>");
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
                $(".t-terminal-state").append("<option value=''>Select State</option>");
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
            error: function (xhr, status, error) {
              //close loader
              Swal.close();
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
                $(".t-terminal-city").append("<option value=''>Select City</option>");
                //loop
                $.each(response.cities, function (key, value) {
                  //append options
                  $(".t-terminal-city").append("<option value='" + value.name + "'>" + value.name + "</option>");
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
            error: function (xhr, status, error) {
              //close loader
              Swal.close();
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
    });
  };

  /**
   * clearAllForms
   *
   * @returns void
   */
  clearAllForms = () => {
    //clear forms
    const form = document.querySelector("#t-form-submit");
    if (form) {
      Array.from(form.elements).forEach(element => {
        if (element.type !== "hidden") {
          switch (element.type) {
            case "checkbox":
            case "radio":
              element.checked = false;
              break;
            default:
              element.value = "";
          }
        }
      });
      // Clear selected options in Select2 .t-terminal-country
      jQuery(".t-terminal-country, .terminal-state, .terminal-city, .t-phone-new-select").val(null).trigger("change");
    }
  };

  /**
   * Initialise Form Submission event
   *
   * @returns void
   */
  formSubmitEvent = () => {
    try {
      jQuery(document).ready(function ($) {
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
          var countryCode = form.find('select[name="country"]').val();
          var phone = form.find('input[name="phone"]').val();
          let tm_countries = terminal_africa.terminal_africal_countries;
          //find country where isoCode is NG
          let tm_country = tm_countries.find(country => country.isoCode === countryCode);
          //phone code
          let phonecode = tm_country.phonecode;
          var plussign = encodeURIComponent("+");
          //check if phonecode not include +
          if (!phonecode.includes("+")) {
            phonecode = "+" + phonecode;
          }
          if (phone) {
            //check if phone has +
            if (!phone.includes("+")) {
              //append to phone
              phone = phonecode + phone;
            }
          } else {
            //append to phone
            phone = "";
          }
          //replace + with encoded +
          phone = phone.replace("+", plussign);
          //get form serialized
          let formSerialized = form.serialize();
          //replace form input 'phone' with new phone number
          formSerialized = formSerialized.replace(/phone=[^&]+/, "phone=" + phone);
          //ajax
          $.ajax({
            type: "POST",
            url: terminal_africa.ajax_url,
            data: formSerialized + "&action=" + actionData + "&nonce=" + terminal_africa.nonce,
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
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  footer: `
              <div>
                <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
              </div>
            `
                }).then(result => {
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
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        footer: `
                    <div>
                      <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
                    </div>
                  `
                      }).then(result => {
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
            error: function (xhr, status, error) {
              //close loader
              Swal.close();
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  //render
  render() {
    const {
      rate_id,
      shippingData,
      action_type
    } = this.props;
    const {
      saved_address
    } = this.state;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
      method: "post",
      id: "t-form-submit",
      "data-type": action_type,
      "data-address-id": saved_address?.address_id
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "hidden",
      name: "address_id",
      value: saved_address?.address_id
    }), rate_id ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "hidden",
      name: "rate_id",
      value: rate_id
    }) : "", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-responsive t-shipping-form-new"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "row"
    }, this.props.children ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-12"
    }, this.props.children) : "", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-lg-6 col-md-6 col-sm-12"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "form-group"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "first_name"
    }, "First Name"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "text",
      className: "form-control",
      name: "first_name",
      id: "first_name",
      placeholder: "First Name",
      value: saved_address?.first_name,
      onChange: e => this.setState({
        saved_address: {
          ...this.state.saved_address,
          first_name: e.target.value
        }
      })
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-lg-6 col-md-6 col-sm-12"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "form-group"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "last_name"
    }, "Last Name"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "text",
      className: "form-control",
      name: "last_name",
      id: "last_name",
      placeholder: "Last Name",
      value: saved_address?.last_name,
      onChange: e => {
        this.setState({
          saved_address: {
            ...this.state.saved_address,
            last_name: e.target.value
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-12"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "form-group"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "address_line_1"
    }, "Address line 1"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "text",
      className: "form-control",
      name: "line_1",
      id: "address_line_1",
      placeholder: "Address line 1",
      value: saved_address?.line1,
      onChange: e => {
        this.setState({
          saved_address: {
            ...this.state.saved_address,
            line1: e.target.value
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-12"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "form-group"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "address_line_2"
    }, "Address line 2"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "text",
      className: "form-control",
      name: "line_2",
      id: "address_line_2",
      placeholder: "Address line 2",
      value: saved_address?.line2,
      onChange: e => {
        this.setState({
          saved_address: {
            ...this.state.saved_address,
            line2: e.target.value
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-12"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "form-group"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "email"
    }, "Email address"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      class: "input-group mb-3"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "input-group-text t-input-group",
      id: "t-emal-input"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: terminal_africa.plugin_url + "/img/envelope.svg",
      alt: "t-email-icon"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "text",
      className: "form-control",
      name: "email",
      id: "email",
      placeholder: "Email address",
      value: saved_address?.email,
      onChange: e => {
        this.setState({
          saved_address: {
            ...this.state.saved_address,
            email: e.target.value
          }
        });
      }
    })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-lg-4 col-md-4 col-sm-12"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "form-group"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "country"
    }, "Country"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      className: "form-control terminal-country t-terminal-country",
      required: true,
      name: "country",
      id: "country"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: ""
    }, "Select"), terminal_africa?.terminal_africal_countries.map((country, key) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      key: key,
      value: country.isoCode,
      "data-flag": country.flag,
      selected: country.isoCode === saved_address?.country ? "selected" : ""
    }, country.name))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-lg-4 col-md-4 col-sm-12"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "form-group"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "state"
    }, "State"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      className: "form-control terminal-state t-terminal-state",
      required: true,
      name: "state",
      id: "state"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: ""
    }, "Select"), shippingData?.states?.map((state, key) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      key: key,
      value: state.name,
      "data-statecode": state.isoCode,
      selected: state.name === saved_address?.state ? "selected" : ""
    }, state.name))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-lg-4 col-md-4 col-sm-12"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "form-group"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "lga"
    }, "City"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      className: "form-control terminal-city t-terminal-city",
      required: true,
      name: "lga",
      id: "lga"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: ""
    }, "Select"), shippingData?.cities?.data?.map((city, key) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      key: key,
      value: city.name,
      selected: city.name === saved_address?.city ? "selected" : ""
    }, city.name))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-lg-6 col-md-6 col-sm-12"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "form-group"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "phone"
    }, "Phone Number"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "d-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-phone-new-select-container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      name: "country_code",
      id: "",
      className: "form-control t-phone-new-select"
    }, terminal_africa?.terminal_africal_countries.map((country, key) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      key: key,
      value: country.phonecode,
      "data-flag": country.flag,
      "data-isocode": country.isoCode,
      selected: country.isoCode === saved_address?.country ? "selected" : ""
    }, country.phonecode)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "w-100"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "text",
      placeholder: "Phone number",
      className: "form-control t-phone-new",
      name: "phone",
      id: "phone",
      value: saved_address?.phone,
      onChange: e => {
        this.setState({
          saved_address: {
            ...this.state.saved_address,
            phone: e.target.value
          }
        });
      }
    }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-lg-6 col-md-6 col-sm-12"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "form-group"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "zipcode"
    }, "Zip Code"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "text",
      name: "zip_code",
      id: "zipcode",
      className: "form-control t-zip-new",
      placeholder: "Zip Code",
      value: saved_address?.zip,
      onChange: e => {
        this.setState({
          saved_address: {
            ...this.state.saved_address,
            zip: e.target.value
          }
        });
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "col-12"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-flex",
      style: {
        justifyContent: "space-between"
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-clear-form"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: "javascript:;",
      style: {
        "font-size": "15px",
        color: "black",
        outline: "none"
      },
      onClick: this.clearAllForms
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: terminal_africa.plugin_url + "/img/clearform.svg",
      style: {
        marginRight: 8
      },
      alt: "Clear forms"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Clear all fields")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-submit-form"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "submit",
      className: "t-address-save",
      style: {
        width: "fit-content",
        padding: "13px 40px",
        borderRadius: 12
      }
    }, "Update address"))))))));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (TerminalShippingForm);

/***/ }),

/***/ "./src/components/Shipping/Parts/TerminalShippingHeader.js":
/*!*****************************************************************!*\
  !*** ./src/components/Shipping/Parts/TerminalShippingHeader.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TerminalShippingHeader; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TerminalPhoneBook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../TerminalPhoneBook */ "./src/components/TerminalPhoneBook.js");
/* harmony import */ var _ShippingStatus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ShippingStatus */ "./src/components/Shipping/Parts/ShippingStatus.js");




class TerminalShippingHeader extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Copy shipping id to clipboard
   *
   * @returns void
   */
  copyShippingIdToClipboard = () => {
    //copy to clipboard
    navigator.clipboard.writeText(this.props?.shippingData?.shipping_id);
    //izitoast
    iziToast.show({
      title: "Copied",
      message: "Shipping ID copied to clipboard",
      theme: "dark",
      position: "topRight",
      progressBarColor: "rgb(246 146 32)",
      transitionIn: "flipInX",
      transitionOut: "flipOutX"
    });
  };
  render() {
    const {
      shippingData,
      shippingStatus
    } = this.props;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-shipment-header t-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      onClick: this.copyShippingIdToClipboard,
      className: "t-flex",
      style: {
        cursor: "pointer"
      },
      "data-shipping-id": shippingData?.shipping_id
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, shippingData?.shipping_id), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: terminal_africa.plugin_url + "/img/copy-icon.svg",
      alt: "Terminal Copy Icon"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-flex t-button-phonebook-mobile"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShippingStatus__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: shippingStatus.className,
      title: shippingStatus.title
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-button-phonebook-mobile-inner"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TerminalPhoneBook__WEBPACK_IMPORTED_MODULE_2__["default"], null)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-flex t-button-phonebook"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TerminalPhoneBook__WEBPACK_IMPORTED_MODULE_2__["default"], null))));
  }
}

/***/ }),

/***/ "./src/components/Shipping/Parts/TerminalShippingSide.js":
/*!***************************************************************!*\
  !*** ./src/components/Shipping/Parts/TerminalShippingSide.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TerminalShippingSide; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class TerminalShippingSide extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Goto WC Order
   *
   * @returns void
   */
  gotoWCOrder = () => {
    try {
      //block ui
      jQuery.blockUI({
        message: "Redirecting to WC Order...",
        css: {
          border: "none",
          padding: "15px",
          backgroundColor: "#000",
          opacity: 0.5,
          color: "#fff"
        },
        overlayCSS: {
          backgroundColor: "#fff",
          opacity: 0.6
        }
      });
      //redirect this.props.shippingData.order_url
      window.location.href = this.props.shippingData.order_url;
    } catch (error) {
      //unblock ui
      jQuery.unblockUI();
    }
  };

  /**
   * Goto Tracking Page
   *
   * @returns void
   */
  gotoTracking = () => {
    const {
      shippingData
    } = this.props;
    //open link in a new tab
    const link = terminal_africa.tracking_url + shippingData.shipping_id;
    //goto page
    window.open(link, "_blank").focus();
  };
  render() {
    const {
      shippingData,
      shippingTrackingNumber
    } = this.props;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        padding: "0px 30px"
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-shipping-side"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-flex t-flex t-mb-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Manage Order"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "t-manage-shipping-button",
      onClick: this.gotoTracking
    }, "Track", " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: terminal_africa.plugin_url + "/img/arrow-forward-new.svg",
      alt: "Track Shipment",
      style: {
        marginLeft: 10
      }
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Order Date"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, shippingData.order_date)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Order Number"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "#", shippingData.order_id)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-flex",
      style: {
        marginTop: 10
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: "javascript:;",
      onClick: this.gotoWCOrder,
      className: "t-btn t-btn-primary t-btn-sm",
      style: {
        padding: "14px",
        borderRadius: "13px"
      }
    }, "Manage in WC Editor"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-shipping-side",
      style: {
        marginTop: 40
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-flex t-flex t-mb-2"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Manage Shipping")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
      style: {
        marginRight: "25%"
      }
    }, "Carrier"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: shippingData?.saved_others?.carrier_logo,
      alt: "Carrier Logo",
      style: {
        height: 15,
        marginBottom: 8,
        marginRight: 5
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, shippingData?.saved_others?.carrier_name, " ", shippingData?.saved_others?.carrier_rate_description))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Tracking Number"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "t-new-tracking-number"
    }, shippingTrackingNumber)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Shipping price"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      dangerouslySetInnerHTML: {
        __html: shippingData.shipping_price
      }
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        marginTop: 13
      },
      id: "t_carriers_location"
    }))));
  }
}

/***/ }),

/***/ "./src/components/Shipping/ShippingSkeleton.js":
/*!*****************************************************!*\
  !*** ./src/components/Shipping/ShippingSkeleton.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ShippingSkeleton; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function ShippingSkeleton() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "t-row",
    style: {
      marginLeft: "25px"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "t-col-8 t-col-lg-8 t-col-md-8 t-col-sm-12"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "terminal-skeleton",
    style: {
      height: "10px",
      width: "90%"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      height: "10px"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "terminal-skeleton",
    style: {
      height: "20px",
      width: "90%"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      height: "10px"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "terminal-skeleton",
    style: {
      height: "20px",
      width: "90%"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      height: "10px"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "terminal-skeleton",
    style: {
      height: "30px",
      width: "90%"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      height: "10px"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "t-row"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "t-col-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "terminal-skeleton",
    style: {
      height: "30px",
      width: "95%"
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "t-col-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "terminal-skeleton",
    style: {
      height: "30px",
      width: "80%"
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      height: "10px"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "terminal-skeleton",
    style: {
      height: "30px",
      width: "90%"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      height: "10px"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "terminal-skeleton",
    style: {
      height: "40px",
      width: "90%"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      height: "10px"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "t-row"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "t-col-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "terminal-skeleton",
    style: {
      height: "30px",
      width: "95%"
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "t-col-6"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "terminal-skeleton",
    style: {
      height: "30px",
      width: "80%"
    }
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      height: "10px"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "terminal-skeleton",
    style: {
      height: "90px",
      width: "90%"
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      height: "10px"
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "t-col-4 t-col-lg-4 t-col-md-4 t-col-sm-12"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "terminal-skeleton",
    style: {
      height: "380px",
      width: "90%"
    }
  })));
}

/***/ }),

/***/ "./src/components/Shipping/TerminalManageShipping.js":
/*!***********************************************************!*\
  !*** ./src/components/Shipping/TerminalManageShipping.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Parts_TerminalShippingHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Parts/TerminalShippingHeader */ "./src/components/Shipping/Parts/TerminalShippingHeader.js");
/* harmony import */ var _Parts_TerminalShippingSide__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Parts/TerminalShippingSide */ "./src/components/Shipping/Parts/TerminalShippingSide.js");
/* harmony import */ var _Parts_TerminalShippingForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Parts/TerminalShippingForm */ "./src/components/Shipping/Parts/TerminalShippingForm.js");
/* harmony import */ var _ShippingSkeleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ShippingSkeleton */ "./src/components/Shipping/ShippingSkeleton.js");






class TerminalManageShipping extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      shippingData: {},
      shippingStatus: {
        title: "--",
        className: "t-status-draft"
      },
      shippingTrackingNumber: "--"
    };
  }

  //did mount
  componentDidMount() {
    //get api data
    this.getApiData();
  }

  //get url params
  getUrlParams = key => {
    var urlScheme = new URLSearchParams(window.location.search);
    return urlScheme.get(key);
  };

  //api request
  getApiData = () => {
    //get url param id
    const id = this.getUrlParams("id");
    //get order_id
    const order_id = this.getUrlParams("order_id");
    //rate_id
    const rate_id = this.getUrlParams("rate_id");

    //get api data
    jQuery(document).ready($ => {
      $.ajax({
        type: "GET",
        url: terminal_africa.ajax_url,
        data: {
          action: "terminal_africa_get_shipping_api_data",
          id,
          order_id,
          rate_id,
          nonce: terminal_africa.nonce
        },
        dataType: "json",
        beforeSend: () => {
          //set is loading
          this.setState({
            isLoading: true
          });
        },
        success: response => {
          //check response code is 200
          if (response.code === 200) {
            //set is loading
            this.setState({
              isLoading: false
            });
            //pass to shipping data
            this.setState({
              shippingData: response.data
            });

            //get shipping status
            this.getShippingStatus();
          } else {
            //swal
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!: " + response.message,
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
        error: (xhr, status, error) => {
          //swal
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
  };

  //get shipping status
  getShippingStatus = () => {
    jQuery(document).ready($ => {
      const {
        shipping_id,
        order_id
      } = this.state.shippingData;
      //get rate_id
      const rate_id = this.getUrlParams("rate_id");

      //ajax
      $.ajax({
        type: "GET",
        url: terminal_africa.ajax_url,
        data: {
          action: "get_terminal_shipment_status",
          nonce: terminal_africa.nonce,
          shipment_id: shipping_id,
          order_id,
          rate_id
        },
        dataType: "json",
        beforeSend: () => {
          // Swal loader
          Swal.fire({
            title: "Please wait...",
            text: "We are fetching your shipment status",
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
        success: response => {
          //close   Swal loader
          Swal.close();
          //check if response code is 200
          if (response.code === 200) {
            //shippingStatus
            this.setState({
              shippingStatus: {
                title: response.data,
                className: "t-status-" + response.data
              }
            });
            //check for cancelled shipment
            let cancellation_request = response.shipment_info.cancellation_request;
            // PENDING CANCELLATION
            //update #terminal_shipment_status html
            if (cancellation_request) {
              $("#terminal_shipment_status").html("PENDING CANCELLATION");
            } else {
              $("#terminal_shipment_status").html(response.data);
            }
            //check for shipment canceled
            if (!cancellation_request) {
              const {
                shipment_info: {
                  extras: shipping_info = {},
                  address_from = {},
                  address_to = {}
                } = {}
              } = response;
              const {
                shipping_label_url,
                tracking_number,
                commercial_invoice_url,
                carrier_tracking_url
              } = shipping_info;
              const addressFromCountry = address_from.country;
              const addressToCountry = address_to.country;

              //set tracking number
              this.setState({
                shippingTrackingNumber: tracking_number
              });
              const shippingLabelTemplate = shipping_label_url ? `
                  <p class="t-shipping-p-left">
                    <b>Shipping Label:</b> <a href="${shipping_label_url}" class="t-shipment-info-link" target="_blank">View Label</a>
                  </p>
                ` : "";
              const commercialInvoiceTemplate = addressFromCountry !== addressToCountry ? `
                  <br>
                  <p class="t-shipping-p-left">
                    <b>Commercial Invoice:</b> <a href="${commercial_invoice_url}" class="t-shipment-info-link" target="_blank">View Invoice</a>
                  </p>
                  <p class="t-shipping-p-left">
                    <b>Carrier Tracking:</b> <a href="${carrier_tracking_url}" class="t-shipment-info-link" target="_blank">View Tracking</a>
                  </p>
                ` : "";
              const template = `
                  <div class="t-space"></div>
                  ${shippingLabelTemplate}
                  <p class="t-shipping-p-left">
                    <b>Tracking Link:</b> <a href="${terminal_africa.tracking_url + shipping_id}" class="t-shipment-info-link" target="_blank">Track Shipment</a>
                  </p>
                  ${commercialInvoiceTemplate}
                  <div class="t-space"></div>
                `;
              $("#t_carriers_location").before(template);
            }

            //load button
            $("#t_carriers_location").html(response.button);
          } else {
            //Swal
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.message,
              confirmButtonColor: "rgb(246 146 32)",
              //confirm button text
              confirmButtonText: "Continue",
              footer: `
              <div>
                <img src="${terminal_africa.plugin_url}/img/logo-footer.png" style="height: 30px;" alt="Terminal Africa">
              </div>
            `
            });
          }
        }
      });
    });
  };
  render() {
    const {
      isLoading,
      shippingData,
      shippingStatus,
      shippingTrackingNumber
    } = this.state;
    const rate_id = this.getUrlParams("rate_id");
    const trackingLink = "";
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, isLoading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShippingSkeleton__WEBPACK_IMPORTED_MODULE_5__["default"], null) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-row"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-col-8 t-col-lg-8 t-col-md-12 t-col-sm-12"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-ml-5 t-side-left"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Parts_TerminalShippingHeader__WEBPACK_IMPORTED_MODULE_2__["default"], {
      shippingData: shippingData,
      shippingStatus: shippingStatus
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Parts_TerminalShippingForm__WEBPACK_IMPORTED_MODULE_4__["default"], {
      saved_address: shippingData.saved_address,
      rate_id: rate_id,
      shippingData: shippingData,
      action_type: "customer"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-col-4 t-col-lg-4 t-col-md-12 t-col-sm-12"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Parts_TerminalShippingSide__WEBPACK_IMPORTED_MODULE_3__["default"], {
      shippingData: shippingData,
      shippingTrackingNumber: shippingTrackingNumber,
      trackingLink: trackingLink
    }))));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (TerminalManageShipping);

/***/ }),

/***/ "./src/components/TerminalPhoneBook.js":
/*!*********************************************!*\
  !*** ./src/components/TerminalPhoneBook.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scss_bootstrap5_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../scss/bootstrap5.scss */ "./src/scss/bootstrap5.scss");
/* harmony import */ var _scss_terminal_phonebook_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../scss/terminal-phonebook.scss */ "./src/scss/terminal-phonebook.scss");
/* harmony import */ var _scss_responsive_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../scss/responsive.scss */ "./src/scss/responsive.scss");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Loader */ "./src/components/Loader.js");








/**
 * Terminal Phone Book
 */
class TerminalPhoneBook extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      closeModal: false,
      search: "",
      addressBook: [],
      isLoading: true,
      isLoadingNew: false,
      scrolledToBottom: false,
      defaultPage: 1,
      nextPageisAvailable: false
    };
  }

  /**
   * componentDidMount
   */
  componentDidMount() {}

  /**
   * componentDidUpdate
   */
  componentWillUnmount() {}

  /**
   * Get phone book
   */
  getAddressBook = () => {
    //ajax
    jQuery(document).ready($ => {
      //ajax
      $.ajax({
        type: "GET",
        url: terminal_africa.ajax_url,
        data: {
          action: "terminal_africa_get_address_book",
          nonce: terminal_africa.nonce,
          page: this.state.defaultPage,
          search: this.state.search
        },
        dataType: "json",
        beforeSend: () => {
          //check if search is not empty
          if (this.state.search !== "") {
            //loading state
            this.setState({
              isLoading: true
            });
          } else {
            //set state
            this.setState({
              isLoadingNew: true
            });
          }
        },
        success: response => {
          //hasnextpage
          var hasNextPage = response.data.pagination.hasNextPage;
          //parse to bool
          hasNextPage = Boolean(hasNextPage);
          //check if the response code is 200
          if (response.code === 200) {
            //check if search is not empty
            if (this.state.search !== "") {
              //clear the previous address book data
              this.setState({
                addressBook: []
              });
            }
            //set state
            this.setState({
              addressBook: [...this.state.addressBook, ...response.data.addresses],
              isLoading: false,
              isLoadingNew: false,
              nextPageisAvailable: hasNextPage
            });
          } else {
            //set state
            this.setState({
              isLoading: false,
              nextPageisAvailable: false,
              isLoadingNew: false
            });
          }
        },
        error: (xhr, status, error) => {
          //show gutenberg toast
          try {
            wp.data.dispatch("core/notices").createNotice("success", "Error: " + xhr.responseText, {
              type: "snackbar",
              isDismissible: true
            });
          } catch (error) {}
        }
      });
    });
  };
  handleScroll = e => {
    const scrollableDiv = e.target;
    //round up scroll
    var totalScroll = scrollableDiv.scrollTop + scrollableDiv.clientHeight;
    totalScroll = Math.ceil(totalScroll);
    if (totalScroll >= scrollableDiv.scrollHeight) {
      this.setState({
        scrolledToBottom: true,
        defaultPage: this.state.defaultPage + 1
      });
      //check if has hasNextPage
      if (this.state.nextPageisAvailable) {
        //get address book
        this.getAddressBook();
      }
    } else {
      this.setState({
        scrolledToBottom: false
      });
    }
  };

  /**
   * showModal
   * @returns {void}
   */
  showModal = event => {
    //prevent default
    event.preventDefault();
    //show alert dialog
    this.setState({
      showModal: true
    });
    //get phone book
    this.getAddressBook();
  };

  /**
   * Close the modal
   * @returns {void}
   */
  closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  /**
   * Handle Change
   * @returns {void}
   */
  handleChange = value => {
    //update state
    this.setState({
      search: value,
      defaultPage: 1
    });
    //check if not empty string
    if (value !== "") {
      //search the server
      this.getAddressBook();
    }
  };

  /**
   * Handle Item Click
   * @returns {void}
   */
  handleItemClick = event => {
    //prevent default
    event.preventDefault();
    //get address id
    var addressId = event.currentTarget.getAttribute("data-address-id");
    //search for address where address id
    var address = this.state.addressBook.find(address => address.address_id === addressId);

    //check if address exist
    if (!address) {
      //show gutenberg toast
      try {
        wp.data.dispatch("core/notices").createNotice("success", "Address not found", {
          type: "snackbar",
          isDismissible: true
        });
      } catch (error) {}
      return;
    }

    //set address
    /////////////////////

    jQuery(document).ready($ => {
      const $tbody = $(".t-body");
      // update first name
      $tbody.find('input[name="first_name"]').val(address.first_name);
      //update p#t_first_name
      $tbody.find("#t_first_name").text(address.first_name);
      // update last name
      $tbody.find('input[name="last_name"]').val(address.last_name);
      //update p#t_last_name
      $tbody.find("#t_last_name").text(address.last_name);
      // update email
      $tbody.find('input[name="email"]').val(address.email);
      //update p#t_email
      $tbody.find("#t_email").text(address.email);
      // update phone
      $tbody.find('input[name="phone"]').val(address.phone);
      //update p#t_phone
      $tbody.find("#t_phone").text(address.phone);
      // update line_1
      $tbody.find('input[name="line_1"]').val(address.line1);
      //update p#t_address
      $tbody.find("#t_address").text(address.line1 + " " + address.line2);
      // update line_2
      $tbody.find('input[name="line_2"]').val(address.line2);
      // update zip_code
      $tbody.find('input[name="zip_code"]').val(address.zip);
      //check if input element with name 'address_id' exist
      if ($tbody.find('input[name="address_id"]').length) {
        // //update address_id, ignore for now
        // $tbody.find('input[name="address_id"]').val(address.address_id);
      } else {
        //create input element
        var input = $("<input>").attr("type", "hidden").attr("name", "address_id").val(address.address_id);
        //append to form
        $tbody.find("form").append($(input));
      }
      // update zip_code
      $tbody.find('input[name="zip_code"]').val(address.zip);

      //close modal
      this.closeModal();

      //remove all city options
      $tbody.find('select[name="lga"] option').remove().trigger("select2.change");

      // update select2 country
      const countrySelect = $tbody.find('select[name="country"]');
      countrySelect.val(address.country);
      //check if t-phone-new-select exist
      if ($(".t-phone-new-select").length) {
        //set address option where option data-isocode is address.country
        $(".t-phone-new-select option[data-isocode=" + address.country + "]").prop("selected", true).trigger("change");
      }
      //trigger event
      countrySelect.trigger("change");
    });
  };
  render() {
    let {
      showModal,
      search,
      isLoading,
      addressBook,
      scrolledToBottom,
      isLoadingNew
    } = this.state;
    //return view
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, showModal && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
      title: "Terminal Address Book",
      onRequestClose: this.closeModal
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-phonebook-modal"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-phonebook-area"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-input-container"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SearchControl, {
      label: "Search Address Book",
      placeholder: "Search Address Book",
      className: "t-phonebook-search",
      value: search,
      onChange: v => this.handleChange(v)
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-scroll-area"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalScrollable, {
      style: {
        maxHeight: 200
      },
      smoothScroll: true,
      onScroll: this.handleScroll,
      className: "t-scroll-area-div"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        maxHeight: 500
      }
    }, isLoading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Loader__WEBPACK_IMPORTED_MODULE_6__["default"], null) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalItemGroup, null, addressBook.map((item, index) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalItem, {
        key: index,
        className: "t-phonebook-item",
        "data-address-id": item.address_id,
        onClick: this.handleItemClick
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "t-phonebook-item-content"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "t-phonebook-item-name"
      }, item.first_name, " ", item.last_name), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "t-phonebook-item-sub"
      }, item.city, ", ", item.state, ", ", item.country), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "t-phonebook-item-phone"
      }, item.line1)));
    })), scrolledToBottom && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-phonebook-scrolled-to-bottom-message"
    }, isLoadingNew ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Loader__WEBPACK_IMPORTED_MODULE_6__["default"], null) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "You've reached the end of the list."))))))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "t-manage-shipping-button",
      onClick: this.showModal
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: terminal_africa.plugin_url + "/img/phone-book.svg",
      alt: "Phone Book"
    }), "Import Address"));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (TerminalPhoneBook);

/***/ }),

/***/ "./src/components/pages/ShippingHomePage/ShippingHomePage.jsx":
/*!********************************************************************!*\
  !*** ./src/components/pages/ShippingHomePage/ShippingHomePage.jsx ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ShippingHomePage; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ShippingSkeleton_ShippingSkeleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShippingSkeleton/ShippingSkeleton */ "./src/components/pages/ShippingHomePage/ShippingSkeleton/ShippingSkeleton.jsx");
/* harmony import */ var _Shipping_Parts_ShippingStatus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Shipping/Parts/ShippingStatus */ "./src/components/Shipping/Parts/ShippingStatus.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_4__);




//import dayjs


/**
 * ShippingHomePage component
 * @extends Component
 */
class ShippingHomePage extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  /**
   * Constructor
   * @param {Object} props - The component props
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      shipments: [],
      pagination: {
        currentPage: null,
        hasNextPage: null,
        hasPrevPage: null,
        nextPage: null,
        pageCount: null,
        pageCounter: null,
        perPage: null,
        prevPage: null,
        total: null
      }
    };

    /**
     * Styles
     */
    this.styles = {
      carrierLogo: {
        height: "28px",
        marginRight: "10px",
        width: "28px",
        objectFit: "contain",
        marginLeft: 10
      }
    };
  }

  /**
   * Get all shipments
   * @returns {void}
   */
  getAllShipments() {
    //get all shipments
    jQuery.ajax({
      url: terminal_africa.ajax_url,
      method: "GET",
      data: {
        action: "terminal_africa_get_all_shipments_v2",
        nonce: terminal_africa.nonce
      },
      beforeSend: () => {
        this.setState({
          isLoading: true
        });
      },
      success: response => {
        this.setState({
          isLoading: false
        });
        //check if response code is 200
        if (response.code == 200) {
          //set shipments data
          this.setState({
            shipments: response.data.shipments
          });
          //set pagination data
          this.setState({
            pagination: response.data.pagination
          });
        } else {
          //show gutenberg toast
          try {
            wp.data.dispatch("core/notices").createNotice("error", response.message, {
              type: "snackbar",
              isDismissible: true
            });
          } catch (error) {}
        }
      },
      error: (error, status, xhr) => {
        this.setState({
          isLoading: false
        });
        console.log(status, xhr);
      }
    });
  }

  /**
   * Lifecycle method
   * @returns {void}
   */
  componentDidMount() {
    //get all shipments
    this.getAllShipments();
  }

  /**
   * Render the component
   * @returns {JSX.Element}
   */
  render() {
    console.log(this.state.shipments);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, this.state.isLoading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ShippingSkeleton_ShippingSkeleton__WEBPACK_IMPORTED_MODULE_2__["default"], null) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-shipping"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-shipping--header"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-shipping--header--left"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-shipping--header--left--title"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "All Shipments")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-shipping--header--left--filter"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      name: "",
      id: ""
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: ""
    }, "Filter"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "confirmed"
    }, "Confirmed"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "in-transit"
    }, "In Transit"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "draft"
    }, "Draft"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-shipping--header--left--search"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-shipping--header--left--search-input"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "text",
      placeholder: "Search"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      width: "13",
      height: "12",
      viewBox: "0 0 13 12",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M6.5 0.75C3.60078 0.75 1.25 3.10078 1.25 6C1.25 8.89922 3.60078 11.25 6.5 11.25C9.39922 11.25 11.75 8.89922 11.75 6C11.75 3.10078 9.39922 0.75 6.5 0.75ZM8.43828 7.99453L7.66484 7.99102L6.5 6.60234L5.33633 7.98984L4.56172 7.99336C4.51016 7.99336 4.46797 7.95234 4.46797 7.89961C4.46797 7.87734 4.47617 7.85625 4.49023 7.83867L6.01484 6.02227L4.49023 4.20703C4.47607 4.18986 4.46822 4.16835 4.46797 4.14609C4.46797 4.09453 4.51016 4.05234 4.56172 4.05234L5.33633 4.05586L6.5 5.44453L7.66367 4.05703L8.43711 4.05352C8.48867 4.05352 8.53086 4.09453 8.53086 4.14727C8.53086 4.16953 8.52266 4.19063 8.50859 4.2082L6.98633 6.02344L8.50977 7.83984C8.52383 7.85742 8.53203 7.87852 8.53203 7.90078C8.53203 7.95234 8.48984 7.99453 8.43828 7.99453Z",
      fill: "#DDDDDD"
    }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-shipping--header--left--search-icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      width: "15",
      height: "16",
      viewBox: "0 0 15 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M14.6 14.1161L9.96254 9.47861C10.6822 8.54825 11.0715 7.41075 11.0715 6.21432C11.0715 4.78218 10.5125 3.43932 9.50182 2.42682C8.49111 1.41432 7.14468 0.857178 5.71432 0.857178C4.28396 0.857178 2.93753 1.41611 1.92682 2.42682C0.91432 3.43753 0.357178 4.78218 0.357178 6.21432C0.357178 7.64468 0.916106 8.99111 1.92682 10.0018C2.93753 11.0143 4.28218 11.5715 5.71432 11.5715C6.91075 11.5715 8.04646 11.1822 8.97682 10.4643L13.6143 15.1C13.6279 15.1136 13.6441 15.1244 13.6618 15.1318C13.6796 15.1392 13.6987 15.143 13.7179 15.143C13.7371 15.143 13.7562 15.1392 13.7739 15.1318C13.7917 15.1244 13.8079 15.1136 13.8215 15.1L14.6 14.3232C14.6136 14.3097 14.6244 14.2935 14.6318 14.2757C14.6392 14.258 14.643 14.2389 14.643 14.2197C14.643 14.2004 14.6392 14.1814 14.6318 14.1636C14.6244 14.1459 14.6136 14.1297 14.6 14.1161ZM8.54289 9.04289C7.78575 9.79825 6.78218 10.2143 5.71432 10.2143C4.64646 10.2143 3.64289 9.79825 2.88575 9.04289C2.13039 8.28575 1.71432 7.28218 1.71432 6.21432C1.71432 5.14646 2.13039 4.14111 2.88575 3.38575C3.64289 2.63039 4.64646 2.21432 5.71432 2.21432C6.78218 2.21432 7.78754 2.62861 8.54289 3.38575C9.29825 4.14289 9.71432 5.14646 9.71432 6.21432C9.71432 7.28218 9.29825 8.28754 8.54289 9.04289Z",
      fill: "black",
      "fill-opacity": "0.45"
    }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-shipping--header--right"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "t-shipping--header--right--refresh"
    }, "Refresh"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "t-shipping--header--right--export"
    }, "Export"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
      width: "100%",
      style: {
        borderCollapse: "separate",
        borderSpacing: "0px 0px",
        textAlign: "start"
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      style: {
        width: "50px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      className: "terminal-dashboard-orders-list-table-heading",
      style: {
        width: "auto"
      }
    }, "Order Date"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      className: "terminal-dashboard-orders-list-table-heading"
    }, "Order Number"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      className: "terminal-dashboard-orders-list-table-heading"
    }, "Customer"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      className: "terminal-dashboard-orders-list-table-heading"
    }, "Shipment ID"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      className: "terminal-dashboard-orders-list-table-heading"
    }, "Status"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, this.state.shipments.map(shipment => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      className: "t-terminal-dashboard-order-row",
      onClick: () => {
        window.location.href = `${terminal_africa.site_url}/wp-admin/admin.php?page=terminal-africa&amp;action=edit&amp;id=${shipment._source.shipment_id}&amp;nonce=${terminal_africa.nonce}`;
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      style: {
        width: "50px"
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: "https://ucarecdn.com/fd1e1d0c-88c7-498a-9762-3ad9a3e2bedf/LONESTAR.jpg",
      alt: "",
      style: this.styles.carrierLogo
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      style: {
        width: "auto"
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-flex"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, dayjs__WEBPACK_IMPORTED_MODULE_4___default()(shipment._source.created_at).format("DD MMM YYYY")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "terminal-dashboard-order-link",
      style: {
        marginBottom: "0px",
        fontSize: "16px",
        color: "black",
        textTransform: "capitalize"
      }
    }, "#93039")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, shipment._source.delivery_name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-dashboard-orders-list-table-shipment-id"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      "data-shipment-id": `${shipment._source.shipment_id}`
    }, `${shipment._source.shipment_id}`.slice(0, 13) + "..."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      onClick: () => {
        navigator.clipboard.writeText(shipment._source.shipment_id);
        //iziToast
        iziToast.success({
          title: "Copied",
          message: "Shipment ID copied to clipboard"
        });
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      width: "29",
      height: "20",
      viewBox: "0 0 29 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
      x: "0.5",
      width: "28",
      height: "20",
      rx: "4",
      fill: "#F7F3EF"
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "M16.375 12.625V14.3125C16.375 14.6232 16.1232 14.875 15.8125 14.875H10.9375C10.6268 14.875 10.375 14.6232 10.375 14.3125V7.9375C10.375 7.62684 10.6268 7.375 10.9375 7.375H11.875C12.1305 7.375 12.3811 7.3963 12.625 7.43722M16.375 12.625H18.0625C18.3732 12.625 18.625 12.3732 18.625 12.0625V9.625C18.625 7.39525 17.0033 5.54428 14.875 5.18722C14.6311 5.1463 14.3805 5.125 14.125 5.125H13.1875C12.8768 5.125 12.625 5.37684 12.625 5.6875V7.43722M16.375 12.625H13.1875C12.8768 12.625 12.625 12.3732 12.625 12.0625V7.43722M18.625 10.75V9.8125C18.625 8.88052 17.8695 8.125 16.9375 8.125H16.1875C15.8768 8.125 15.625 7.87316 15.625 7.5625V6.8125C15.625 5.88052 14.8695 5.125 13.9375 5.125H13.375",
      stroke: "#333333",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Shipping_Parts_ShippingStatus__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: `t-status-${shipment._source.status}`,
      title: shipment._source.status
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: "https://tplug.terminal.africa/wp-content/plugins/terminal-africa/assets/img/arrow-forward.svg",
      alt: "copy icon"
    }))))))));
  }
}

/***/ }),

/***/ "./src/components/pages/ShippingHomePage/ShippingSkeleton/ShippingSkeleton.jsx":
/*!*************************************************************************************!*\
  !*** ./src/components/pages/ShippingHomePage/ShippingSkeleton/ShippingSkeleton.jsx ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ NewShippingSkeleton; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class NewShippingSkeleton extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  render() {
    // Define style objects
    const skeletonStyle10 = {
      height: "10px",
      width: "90%"
    };
    const skeletonStyle15 = {
      height: "15px",
      width: "100%"
    };
    const skeletonStyle25 = {
      height: "25px",
      width: "90%"
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-row terminal-new-shipment-page"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-col-12 t-col-lg-12 t-col-md-12 t-col-sm-12"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle10
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-new-shipment-page--inner-column"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-new-shipment-page--inner-column"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle25
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-new-shipment-page--inner-column"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-new-shipment-page--inner-column"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle25
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-new-shipment-page--inner-column"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-new-shipment-page--inner-column"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle15
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle25
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle25
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle25
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "terminal-skeleton",
      style: skeletonStyle25
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        height: "10px"
      }
    })));
  }
}

/***/ }),

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return b},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=!0),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O}));

/***/ }),

/***/ "./src/scss/bootstrap5.scss":
/*!**********************************!*\
  !*** ./src/scss/bootstrap5.scss ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/responsive.scss":
/*!**********************************!*\
  !*** ./src/scss/responsive.scss ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/terminal-phonebook.scss":
/*!******************************************!*\
  !*** ./src/scss/terminal-phonebook.scss ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ (function(module) {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**************************!*\
  !*** ./src/dashboard.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_TerminalPhoneBook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/TerminalPhoneBook */ "./src/components/TerminalPhoneBook.js");
/* harmony import */ var _components_Shipping_TerminalManageShipping__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Shipping/TerminalManageShipping */ "./src/components/Shipping/TerminalManageShipping.js");
/* harmony import */ var _components_MerchantAddress_MerchantAddressForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/MerchantAddress/MerchantAddressForm */ "./src/components/MerchantAddress/MerchantAddressForm.js");
/* harmony import */ var _components_pages_ShippingHomePage_ShippingHomePage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/pages/ShippingHomePage/ShippingHomePage */ "./src/components/pages/ShippingHomePage/ShippingHomePage.jsx");







//on document ready
document.addEventListener("DOMContentLoaded", () => {
  //load the terminal phonebook button
  const terminalPhoneBookDiv = document.getElementById("t-phonebook-container");
  //check if element exist
  if (terminalPhoneBookDiv) {
    react_dom__WEBPACK_IMPORTED_MODULE_2___default().render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_TerminalPhoneBook__WEBPACK_IMPORTED_MODULE_3__["default"], null), terminalPhoneBookDiv);
  }

  //load manage-terminal-shipping
  const manageTerminalShipping = document.getElementById("manage-terminal-shipping");

  //check if element exist
  if (manageTerminalShipping) {
    //render dom TerminalManageShipping
    react_dom__WEBPACK_IMPORTED_MODULE_2___default().render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Shipping_TerminalManageShipping__WEBPACK_IMPORTED_MODULE_4__["default"], null), manageTerminalShipping);
  }

  //load terminal-merchant-address
  const terminalMerchantAddress = document.getElementById("terminal-merchant-address");

  //check if element exist
  if (terminalMerchantAddress) {
    //render dom MerchantAddressForm
    react_dom__WEBPACK_IMPORTED_MODULE_2___default().render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_MerchantAddress_MerchantAddressForm__WEBPACK_IMPORTED_MODULE_5__["default"], null), terminalMerchantAddress);
  }

  //check if element exist #terminal-new-shipment-page-wrapper
  const terminalNewShipmentPageWrapper = document.getElementById("terminal-new-shipment-page-wrapper");

  //check if element exist
  if (terminalNewShipmentPageWrapper) {
    react_dom__WEBPACK_IMPORTED_MODULE_2___default().render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_pages_ShippingHomePage_ShippingHomePage__WEBPACK_IMPORTED_MODULE_6__["default"], null), terminalNewShipmentPageWrapper);
  }
});
}();
/******/ })()
;
//# sourceMappingURL=dashboard.js.map