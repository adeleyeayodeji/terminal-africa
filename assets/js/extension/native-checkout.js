/**
 * Extension for native woocommerce checkout page
 */
class TerminalNativeWoocommerce {
  /**
   * Constructor
   */
  constructor() {
    this.$ = jQuery;
    //get terminal autoload merchant address
    this.terminal_autoload_merchant_address =
      terminal_africa_parcel.terminal_autoload_merchant_address;
    //load in 2 seconds
    setTimeout(() => {
      var length = Object.keys(this.terminal_autoload_merchant_address).length;
      //check if the this.terminal_autoload_merchant_address is not empty
      if (length) {
        //init
        this.init();
      }
    }, 3000);
  }

  /**
   * Init
   */
  init() {
    //set the country default based on the merchant autoload address
    this.setCountryDefaultSelection();
    //set the state default based on the state default
    this.setStateDefaultSelection();
  }

  /**
   * setCountryDefaultSelection
   */
  setCountryDefaultSelection() {
    //Get the country element
    let country = this.$("#billing_country");
    //get the default country
    let defaultCountry = this.terminal_autoload_merchant_address["country"];
    // Set the value of the country element to the default country
    country.val(defaultCountry);
    // Trigger the Select2 event to update the styled select box
    country.trigger("change.select2");
  }

  /**
   * Check if word is uppercase
   * @param {String} string
   * @return {Boolean}
   */
  isUpperCase(string) {
    return string.toUpperCase() === string;
  }

  /**
   * setStateDefaultSelection
   */
  setStateDefaultSelection() {
    //Get the state element
    let state = this.$("select[name='terminal_custom_shipping_state2']");
    //get the default state
    let defaultState = this.terminal_autoload_merchant_address["state"];
    //check if defaultState is mixed with uppercase and lowercase
    if (this.isUpperCase(defaultState)) {
      //set the default state
      state.val(defaultState);
    } else {
      // Find the option with a text matching the default state and set the value
      let matchingOption = state.find(`option:contains('${defaultState}')`);
      if (matchingOption.length) {
        state.val(matchingOption.val());
      }
    }
    // Trigger the Select2 event to update the styled select box
    state.trigger("change.select2");
  }
}

/**
 * Initialise TerminalNativeWoocommerce
 */
new TerminalNativeWoocommerce();
