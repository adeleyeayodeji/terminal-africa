import React, { Fragment } from "react";
import TerminalShippingHeader from "./Parts/TerminalShippingHeader";
import TerminalShippingSide from "./Parts/TerminalShippingSide";

function TerminalManageShipping() {
  return (
    <Fragment>
      <div className="t-row">
        <div className="t-col-8 t-col-lg-8 t-col-md-8 t-col-sm-12">
          <div className="t-ml-5">
            <TerminalShippingHeader />
          </div>
        </div>
        <div className="t-col-4 t-col-lg-4 t-col-md-4 t-col-sm-12">
          <TerminalShippingSide />
        </div>
      </div>
    </Fragment>
  );
}

export default TerminalManageShipping;
