import React from "react";

export default function TerminalTrackingButton(props) {
  return (
    <>
      <a
        href="javascript:void(0)"
        onClick={props.handleTrackShipmentClick}
        className="t-track-shipment-link">
        <svg
          width={props.width}
          height={props.height}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <ellipse
            cx="10"
            cy="6.6665"
            rx="2.5"
            ry="2.5"
            stroke="white"
            stroke-width="1.5"
          />
          <path
            d="M13.8969 10.0953C14.4838 9.20062 15 8.07763 15 6.84835C15 3.9865 12.7614 1.6665 10 1.6665C7.23858 1.6665 5 3.9865 5 6.84835C5 7.93141 5.32061 8.93687 5.86885 9.76834L9.31968 15.4855C9.59695 15.9449 10.2408 15.95 10.5249 15.4951L13.8969 10.0953Z"
            stroke="white"
            stroke-width="1.5"
          />
          <path
            d="M7.5 17.5H12.5"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        <span>Track shipment</span>
      </a>
    </>
  );
}
