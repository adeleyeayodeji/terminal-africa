import React, { Component } from "react";
import NewShippingSkeleton from "./ShippingSkeleton/ShippingSkeleton";

/**
 * ShippingHomePage component
 * @extends Component
 */
export default class ShippingHomePage extends Component {
  /**
   * Constructor
   * @param {Object} props - The component props
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  /**
   * Lifecycle method
   * @returns {void}
   */
  componentDidMount() {
    this.setState({ isLoading: false });
  }

  /**
   * Render the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div>{this.state.isLoading ? <NewShippingSkeleton /> : <div></div>}</div>
    );
  }
}
