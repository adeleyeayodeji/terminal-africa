import React, { Component } from "react";

export default class BreadCrumb extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Redirect to the plugin page
   * @returns
   */
  redirectToPluginPage(e) {
    e.preventDefault();
    //block the page
    jQuery("#manage-terminal-shipping").block({
      message: "",
      overlayCSS: {
        background: "#fff",
        opacity: 0.8,
        cursor: "wait"
      },
      css: {
        border: 0,
        padding: 0,
        backgroundColor: "transparent"
      }
    });
    //redirect to the plugin page
    window.location.href = terminal_africa.terminal_plugin_page;
  }

  render() {
    return (
      <div className="t-breadcrumb">
        <a
          href={terminal_africa.terminal_plugin_page}
          className="t-breadcrumb--link"
          onClick={this.redirectToPluginPage}>
          Shipments
        </a>
        <span className="t-breadcrumb--separator"> / </span>
        <span className="t-breadcrumb--link">{this.props.shipmentId}</span>
      </div>
    );
  }
}
