import React from "react";

export default function ProcessedShipmentSide({
  saved_address,
  rate_id,
  shippingData
}) {
  console.log(saved_address, rate_id, shippingData);

  return (
    <div className="t-processed-shipment-aside">
      <div className="t-processed-shipment-aside--header">
        <div className="t-processed-shipment-aside--header--icon">
          <img
            src={terminal_africa.plugin_url + "/img/payment-details-icon.svg"}
            alt=""
          />
        </div>
        <h4 className="t-processed-shipment-aside--header--title">
          Payment Details
        </h4>
        <div className="t-processed-shipment-aside--header--price">
          <span>₦</span>
          <span>2,556.00</span>
        </div>
      </div>
      <div className="t-processed-shipment-aside--content">
        <p>
          <span>Reference</span>
          <span>1234567890</span>
        </p>
        <p>
          <span>Shipping</span>
          <span>₦ 2,556.00</span>
        </p>
        <p>
          <span>Insurance</span>
          <span>₦ 0.00</span>
        </p>
        <hr />
        <p>
          <span>Total</span>
          <span>₦ 2,556.00</span>
        </p>
      </div>
      <div className="t-processed-shipment-aside--footer">
        <a href="#">Cancel Shipment</a>
      </div>
    </div>
  );
}
