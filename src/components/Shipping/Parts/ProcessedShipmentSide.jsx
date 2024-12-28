import React from "react";

export default function ProcessedShipmentSide({
  saved_address,
  rate_id,
  shippingData,
  shippingStatus
}) {
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
          <p
            dangerouslySetInnerHTML={{
              __html: shippingData.shipping_price
            }}></p>
        </div>
      </div>
      <div className="t-processed-shipment-aside--content">
        <p>
          <span>Reference</span>
          <span>{shippingData.shipping_id}</span>
        </p>
        <p>
          <span>Shipping</span>
          <p
            dangerouslySetInnerHTML={{
              __html: shippingData.shipping_price
            }}></p>
        </p>
        <p>
          <span>Insurance</span>
          <span>₦ 0.00</span>
        </p>
        <hr />
        <p>
          <span>Total</span>
          <p
            dangerouslySetInnerHTML={{
              __html: shippingData.shipping_price
            }}></p>
        </p>
      </div>
      {shippingStatus.title == "comfirmed" && (
        <div className="t-processed-shipment-aside--footer">
          <a
            href="javascript:;"
            id="t-carrier-cancel-shipment-button"
            data-shipment_id={shippingData.shipping_id}
            data-order_id={shippingData.order_id}
            onclick="cancelTerminalShipment(this, event)">
            Cancel Shipment
          </a>
        </div>
      )}
    </div>
  );
}
