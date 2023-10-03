/**
 * Terminal Africa Admin Loggin
 * @since 1.10.3
 * @author Adeleye Ayodeji
 */
class TerminalAfricaAdminLoggin {
  /**
   * Constructor
   */
  constructor() {
    this.init();
    //remove screen distraction
    this.removeScreenDistraction();
    //update admin shipment title
    this.updateAdminShipmentTitle();
  }

  /**
   * Init
   * @return {void}
   * @since 1.10.3
   */
  init() {
    //check if plugin is logged
    //use fetch for ajax check_if_terminal_plugin_already_logged
    let ajaxUrl = terminal_africa.ajax_url;
    let nonce = terminal_africa.nonce;
    let data = {
      action: "check_if_terminal_plugin_already_logged",
      nonce: nonce
    };
    //build the url
    ajaxUrl = `${ajaxUrl}?action=${data.action}&nonce=${data.nonce}`;
    fetch(ajaxUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-WP-Nonce": nonce
      },
      credentials: "same-origin",
      mode: "cors",
      cache: "default"
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Remove screen distraction
   * @return {void}
   */
  removeScreenDistraction() {
    //check if wpbody-content has any child other than 'style, .t-container, .clear' and remove them
    let wpBodyContent = document.querySelector("#wpbody-content");
    let wpBodyContentChildren = wpBodyContent.children;
    let wpBodyContentChildrenArray = Array.from(wpBodyContentChildren);
    //remove all children
    wpBodyContentChildrenArray.forEach((child) => {
      if (
        child.classList.contains("t-container") ||
        child.classList.contains("clear") ||
        child.tagName === "STYLE"
      ) {
        //do nothing
      } else {
        child.remove();
      }
    });
  }

  /**
   * updateAdminShipmentTitle
   * @param {void}
   */
  updateAdminShipmentTitle() {
    //get #toplevel_page_terminal-africa
    let topLevelPageTerminalAfrica = document.querySelector(
      "#toplevel_page_terminal-africa"
    );
    //find wp-first-item
    let wpFirstItem =
      topLevelPageTerminalAfrica.querySelector("a.wp-first-item");
    //update text
    wpFirstItem.innerText = "Shipments";
  }
}

//init
new TerminalAfricaAdminLoggin();
