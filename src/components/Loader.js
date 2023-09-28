import { Spinner } from "@wordpress/components";
import { Component } from "react";

/**
 * Terminal Loader
 */
class TerminalLoader extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <div className="t-center" style={{ padding: 10 }}>
        <Spinner />
        <p>
          <strong>Loading...</strong>
        </p>
      </div>
    );
  }
}

export default TerminalLoader;
