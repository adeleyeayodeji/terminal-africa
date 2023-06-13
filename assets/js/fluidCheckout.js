/**
 * Fluid extension for terminal shipment plugin
 */
class FluidCheckoutTerminal {
  constructor() {
    this.$ = jQuery;
    //init
    this.init();
  }

  /**
   * Init function
   */
  init() {
    //Check if shipping is enabled by woocommerce
    var terminal_delivery_html = this.$(".Terminal-delivery-logo");
    //check if terminal_delivery_html exist
    if (!terminal_delivery_html.length) {
      //do nothing
      return;
    }
    //init interval
    this.setInterval();
  }

  /**
   * Switch Town / City with State
   */
  switchTownCityWithState() {
    //check if shipping_state_field is after shipping_city_field
    if (
      this.$("#shipping_state_field").index() >
      this.$("#shipping_city_field").index()
    ) {
      //switch shipping_state_field with shipping_city_field
      this.$("#shipping_state_field").after(this.$("#shipping_city_field"));
    }
    //check if class fluid-checkout-state exist
    if (!this.$("#shipping_state_field").hasClass("fluid-checkout-state")) {
      this.$("#shipping_state_field").addClass("fluid-checkout-state");
      console.log("state added");
    }
    //check if class fluid-checkout-city exist
    if (!this.$("#shipping_city_field").hasClass("fluid-checkout-city")) {
      this.$("#shipping_city_field").addClass("fluid-checkout-city");
      console.log("city added");
    }
  }

  /**
   * Set interval for 1 second
   */
  setInterval() {
    setInterval(() => {
      this.switchTownCityWithState();
    }, 500);
  }
}

//init
new FluidCheckoutTerminal();
