import React from "react";

export default function ShippingAsideDraft({
  shippingData,
  shippingTrackingNumber
}) {
  return (
    <div className="t-shipping-side" style={{ marginTop: 20 }}>
      <div className="t-flex t-flex t-mb-2">
        <h3>Manage Shipping</h3>
      </div>
      <div className="t-flex">
        <h4 style={{ marginRight: "25%" }}>Carrier</h4>
        <div className="t-flex">
          <img
            src={shippingData?.saved_others?.carrier_logo}
            alt="Carrier Logo"
            style={{ height: 15, marginBottom: 8, marginRight: 5 }}
          />
          <p>
            {shippingData?.saved_others?.carrier_name}{" "}
            {shippingData?.saved_others?.carrier_rate_description}
          </p>
        </div>
      </div>
      <div className="t-flex">
        <h4>Tracking Number</h4>
        <p className="t-new-tracking-number">
          {shippingTrackingNumber || "N/A"}
        </p>
      </div>
      <div className="t-flex">
        <h4>Shipping price</h4>
        <p
          dangerouslySetInnerHTML={{
            __html: shippingData.shipping_price
          }}></p>
      </div>
      <div style={{ marginTop: 13 }} id="t_carriers_location"></div>
    </div>
  );
}
