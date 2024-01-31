/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Loader.js":
/*!**********************************!*\
  !*** ./src/components/Loader.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./src/components/Shipping/Parts/SippingStatus.js":
/*!********************************************************!*\
  !*** ./src/components/Shipping/Parts/SippingStatus.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SippingStatus; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


class SippingStatus extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
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
      placeholder: "Address line 2",
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TerminalShippingHeader; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TerminalPhoneBook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../TerminalPhoneBook */ "./src/components/TerminalPhoneBook.js");
/* harmony import */ var _SippingStatus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SippingStatus */ "./src/components/Shipping/Parts/SippingStatus.js");




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
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SippingStatus__WEBPACK_IMPORTED_MODULE_3__["default"], {
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
        //update address_id
        $tbody.find('input[name="address_id"]').val(address.address_id);
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
        console.log(address);
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

/***/ "./src/scss/bootstrap5.scss":
/*!**********************************!*\
  !*** ./src/scss/bootstrap5.scss ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/responsive.scss":
/*!**********************************!*\
  !*** ./src/scss/responsive.scss ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/terminal-phonebook.scss":
/*!******************************************!*\
  !*** ./src/scss/terminal-phonebook.scss ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ (function(module) {

module.exports = window["ReactDOM"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
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
});
}();
/******/ })()
;
//# sourceMappingURL=dashboard.js.map