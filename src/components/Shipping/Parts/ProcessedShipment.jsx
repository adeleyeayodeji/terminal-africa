import React from "react";

const ProcessedShipment = () => {
  return (
    <div className="t-processed-shipment-view">
      <div className="t-processed-shipment-view--sender-receiver">
        <div className="t-processed-shipment-view--sender-receiver--sender">
          <h3>Sender</h3>
          <div className="t-processed-shipment-view--sender-receiver--sender--details">
            <h5>Timothy Odunubi</h5>
            <p className="t-processed-shipment-view--sender-receiver--sender--details--contact">
              <a href="mailto:timothy@terminalafrica.com">
                timothy@terminalafrica.com
              </a>
              <a href="tel:+2348165555555">+2348165555555</a>
            </p>
            <p className="t-processed-shipment-view--sender-receiver--sender--details--address">
              Ogba Multipurpose Shopping Complex, Abiodun J, Ikeja, Agege,
              Lagos, NGA, 101233
            </p>
          </div>
        </div>
        <div className="t-processed-shipment-view--sender-receiver--receiver">
          <h3>Receiver</h3>
          <div className="t-processed-shipment-view--sender-receiver--receiver--details">
            <h5>Timothy Odunubi</h5>
            <p className="t-processed-shipment-view--sender-receiver--receiver--details--contact">
              <a href="mailto:timothy@terminalafrica.com">
                timothy@terminalafrica.com
              </a>
              <a href="tel:+2348165555555">+2348165555555</a>
            </p>
            <p className="t-processed-shipment-view--sender-receiver--receiver--details--address">
              Ogba Multipurpose Shopping Complex, Abiodun J, Ikeja, Agege,
              Lagos, NGA, 101233
            </p>
          </div>
        </div>
      </div>
      <div className="t-processed-shipment-view--parcel-information">
        <div className="t-processed-shipment-view--parcel-information--details">
          <h3>Parcel Information</h3>
          <p>
            Purpose: Commercial (Items are for sale), Total weight: 2kg, Total
            Value: ₦25,000
          </p>
        </div>
        <div className="t-processed-shipment-view--parcel-information--items">
          <h3>Parcel Items</h3>
          <p>
            <span>
              iPad, Apple Pencil and keyboard, 1pieces. 1kg, ₦1,000,000.00, NGA
            </span>
            <span>
              iPad, Apple Pencil and keyboard, 1pieces. 1kg, ₦1,000,000.00, NGA
            </span>
          </p>
        </div>
      </div>
      <div className="t-processed-shipment-view--courier">
        <h3>Courier Information</h3>
        <div className="t-processed-shipment-view--courier--courier-information">
          <div className="t-processed-shipment-view--courier--courier-information--courier-details">
            <div>
              <img src={terminal_africa.plugin_url + "/img/dhl.png"} alt="" />
            </div>
            <div>
              <h5>DHL</h5>
              <p>Express Domestic</p>
            </div>
          </div>
          <div className="t-processed-shipment-view--courier--courier-information--courier-tracking-number">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="0.75"
                y="0.75"
                width="42.5"
                height="42.5"
                rx="7.25"
                stroke="#F7941E"
                stroke-width="1.5"
              />
              <path
                d="M13.875 17.625C13.875 24.5286 19.4714 30.125 26.375 30.125H28.25C29.2855 30.125 30.125 29.2855 30.125 28.25V27.107C30.125 26.6768 29.8322 26.3018 29.4149 26.1975L25.7289 25.276C25.363 25.1845 24.9778 25.3212 24.7515 25.623L23.943 26.701C23.7083 27.0139 23.3025 27.1522 22.9353 27.0177C20.1795 26.0082 17.9918 23.8205 16.9823 21.0647C16.8478 20.6975 16.9861 20.2917 17.299 20.057L18.377 19.2485C18.6788 19.0222 18.8155 18.637 18.724 18.2711L17.8025 14.5851C17.6982 14.1678 17.3232 13.875 16.893 13.875H15.75C14.7145 13.875 13.875 14.7145 13.875 15.75V17.625Z"
                stroke="#F7941E"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="0.75"
                y="0.75"
                width="42.5"
                height="42.5"
                rx="7.25"
                stroke="#F7941E"
                stroke-width="1.5"
              />
              <path
                d="M30.125 17.625V26.375C30.125 27.4105 29.2855 28.25 28.25 28.25H15.75C14.7145 28.25 13.875 27.4105 13.875 26.375V17.625M30.125 17.625C30.125 16.5895 29.2855 15.75 28.25 15.75H15.75C14.7145 15.75 13.875 16.5895 13.875 17.625M30.125 17.625V17.8273C30.125 18.4784 29.7872 19.0829 29.2327 19.4241L22.9827 23.2703C22.38 23.6411 21.62 23.6411 21.0173 23.2703L14.7673 19.4241C14.2128 19.0829 13.875 18.4784 13.875 17.8273V17.625"
                stroke="#F7941E"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessedShipment;
