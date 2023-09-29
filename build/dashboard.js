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
/* harmony import */ var _scss_terminal_phonebook_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../scss/terminal-phonebook.scss */ "./src/scss/terminal-phonebook.scss");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Loader */ "./src/components/Loader.js");






/**
 * Terminal Phone Book
 */
class TerminalPhoneBook extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      closeModal: false,
      value: "",
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
          page: this.state.defaultPage
        },
        dataType: "json",
        beforeSend: () => {
          //set state
          this.setState({
            isLoadingNew: true
          });
        },
        success: response => {
          //hasnextpage
          var hasNextPage = response.data.pagination.hasNextPage;
          //parse to bool
          hasNextPage = Boolean(hasNextPage);
          //check if the response code is 200
          if (response.code === 200) {
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
              isLoading: false
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
      } else {}
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
    this.setState({
      value: value
    });
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
      // update last name
      $tbody.find('input[name="last_name"]').val(address.last_name);
      // update email
      $tbody.find('input[name="email"]').val(address.email);
      // update phone
      $tbody.find('input[name="phone"]').val(address.phone);
      // update line_1
      $tbody.find('input[name="line_1"]').val(address.line1);
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
      //trigger event
      countrySelect.trigger("change");
    });
  };
  render() {
    let {
      showModal,
      value,
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
      value: value,
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
    }, isLoading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Loader__WEBPACK_IMPORTED_MODULE_4__["default"], null) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalItemGroup, null, addressBook.map((item, index) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalItem, {
        key: index,
        className: "t-phonebook-item",
        "data-address-id": item.address_id,
        onClick: this.handleItemClick
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "t-phonebook-item-content"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "t-phonebook-item-name"
      }, item.city, ", ", item.state, ", ", item.country), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "t-phonebook-item-phone"
      }, item.line1)));
    })), scrolledToBottom && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "t-phonebook-scrolled-to-bottom-message"
    }, isLoadingNew ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Loader__WEBPACK_IMPORTED_MODULE_4__["default"], null) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "You've reached the end of the list."))))))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "t-phonebook",
      onClick: this.showModal
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      className: "fa fa-address-book",
      ariaHidden: "true"
    }), " Import Address"));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (TerminalPhoneBook);

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




//on document ready
document.addEventListener("DOMContentLoaded", () => {
  //load the terminal phonebook button
  const terminalPhoneBookDiv = document.getElementById("t-phonebook-container");
  //check if element exist
  if (terminalPhoneBookDiv) {
    react_dom__WEBPACK_IMPORTED_MODULE_2___default().render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_TerminalPhoneBook__WEBPACK_IMPORTED_MODULE_3__["default"], null), terminalPhoneBookDiv);
  }
});
}();
/******/ })()
;
//# sourceMappingURL=dashboard.js.map