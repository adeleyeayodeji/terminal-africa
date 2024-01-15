import React, { Component } from "react";

export default class SippingStatus extends Component {
  render() {
    const { className, title } = this.props;
    return (
      <div
        className={"t-status-list " + className}
        style={{ width: "fit-content" }}>
        {title}
      </div>
    );
  }
}
