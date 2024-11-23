import React, { Component } from "react";
import NewShippingSkeleton from "./ShippingSkeleton/ShippingSkeleton";
import ShippingStatus from "../../Shipping/Parts/ShippingStatus";

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

    /**
     * Styles
     */
    this.styles = {
      carrierLogo: {
        height: "28px",
        marginRight: "10px",
        width: "28px",
        objectFit: "contain",
        marginLeft: 10
      }
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
      <div>
        {this.state.isLoading ? (
          <NewShippingSkeleton />
        ) : (
          <div className="t-shipping">
            <div className="t-shipping--header">
              <div className="t-shipping--header--left">
                <div className="t-shipping--header--left--title">
                  <span>All Shipments</span>
                </div>
                <div className="t-shipping--header--left--filter">
                  <select name="" id="">
                    <option value="">Filter</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in-transit">In Transit</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div className="t-shipping--header--left--search">
                  <div className="t-shipping--header--left--search-input">
                    <input type="text" placeholder="Search" />
                    <svg
                      width="13"
                      height="12"
                      viewBox="0 0 13 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.5 0.75C3.60078 0.75 1.25 3.10078 1.25 6C1.25 8.89922 3.60078 11.25 6.5 11.25C9.39922 11.25 11.75 8.89922 11.75 6C11.75 3.10078 9.39922 0.75 6.5 0.75ZM8.43828 7.99453L7.66484 7.99102L6.5 6.60234L5.33633 7.98984L4.56172 7.99336C4.51016 7.99336 4.46797 7.95234 4.46797 7.89961C4.46797 7.87734 4.47617 7.85625 4.49023 7.83867L6.01484 6.02227L4.49023 4.20703C4.47607 4.18986 4.46822 4.16835 4.46797 4.14609C4.46797 4.09453 4.51016 4.05234 4.56172 4.05234L5.33633 4.05586L6.5 5.44453L7.66367 4.05703L8.43711 4.05352C8.48867 4.05352 8.53086 4.09453 8.53086 4.14727C8.53086 4.16953 8.52266 4.19063 8.50859 4.2082L6.98633 6.02344L8.50977 7.83984C8.52383 7.85742 8.53203 7.87852 8.53203 7.90078C8.53203 7.95234 8.48984 7.99453 8.43828 7.99453Z"
                        fill="#DDDDDD"
                      />
                    </svg>
                  </div>
                  <div className="t-shipping--header--left--search-icon">
                    <svg
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.6 14.1161L9.96254 9.47861C10.6822 8.54825 11.0715 7.41075 11.0715 6.21432C11.0715 4.78218 10.5125 3.43932 9.50182 2.42682C8.49111 1.41432 7.14468 0.857178 5.71432 0.857178C4.28396 0.857178 2.93753 1.41611 1.92682 2.42682C0.91432 3.43753 0.357178 4.78218 0.357178 6.21432C0.357178 7.64468 0.916106 8.99111 1.92682 10.0018C2.93753 11.0143 4.28218 11.5715 5.71432 11.5715C6.91075 11.5715 8.04646 11.1822 8.97682 10.4643L13.6143 15.1C13.6279 15.1136 13.6441 15.1244 13.6618 15.1318C13.6796 15.1392 13.6987 15.143 13.7179 15.143C13.7371 15.143 13.7562 15.1392 13.7739 15.1318C13.7917 15.1244 13.8079 15.1136 13.8215 15.1L14.6 14.3232C14.6136 14.3097 14.6244 14.2935 14.6318 14.2757C14.6392 14.258 14.643 14.2389 14.643 14.2197C14.643 14.2004 14.6392 14.1814 14.6318 14.1636C14.6244 14.1459 14.6136 14.1297 14.6 14.1161ZM8.54289 9.04289C7.78575 9.79825 6.78218 10.2143 5.71432 10.2143C4.64646 10.2143 3.64289 9.79825 2.88575 9.04289C2.13039 8.28575 1.71432 7.28218 1.71432 6.21432C1.71432 5.14646 2.13039 4.14111 2.88575 3.38575C3.64289 2.63039 4.64646 2.21432 5.71432 2.21432C6.78218 2.21432 7.78754 2.62861 8.54289 3.38575C9.29825 4.14289 9.71432 5.14646 9.71432 6.21432C9.71432 7.28218 9.29825 8.28754 8.54289 9.04289Z"
                        fill="black"
                        fill-opacity="0.45"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="t-shipping--header--right">
                <button className="t-shipping--header--right--refresh">
                  Refresh
                </button>
                <button className="t-shipping--header--right--export">
                  Export
                </button>
              </div>
            </div>
            <table
              width="100%"
              style={{
                borderCollapse: "separate",
                borderSpacing: "0px 0px",
                textAlign: "start"
              }}>
              <thead>
                <tr>
                  <th style={{ width: "50px" }}></th>
                  <th
                    className="terminal-dashboard-orders-list-table-heading"
                    style={{ width: "auto" }}>
                    Order Date
                  </th>
                  <th className="terminal-dashboard-orders-list-table-heading">
                    Order Number
                  </th>
                  <th className="terminal-dashboard-orders-list-table-heading">
                    Customer
                  </th>
                  <th className="terminal-dashboard-orders-list-table-heading">
                    Shipment ID
                  </th>
                  <th className="terminal-dashboard-orders-list-table-heading">
                    Status
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className="t-terminal-dashboard-order-row"
                  onclick="window.location.href='https://tplug.terminal.africa/wp-admin/admin.php?page=terminal-africa&amp;action=edit&amp;id=SH-YHDKM0CVFINZBUWQ&amp;order_id=588&amp;rate_id=RT-UFKF9ZQ8N0WZOYED&amp;nonce=98940844c3'">
                  <td style={{ width: "50px" }}>
                    <img
                      src="https://ucarecdn.com/fd1e1d0c-88c7-498a-9762-3ad9a3e2bedf/LONESTAR.jpg"
                      alt=""
                      style={this.styles.carrierLogo}
                    />
                  </td>
                  <td style={{ width: "auto" }}>
                    <div className="t-flex">
                      <span>Jun 24 2024, 9:13am</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className="terminal-dashboard-order-link"
                      style={{
                        marginBottom: "0px",
                        fontSize: "16px",
                        color: "black",
                        textTransform: "capitalize"
                      }}>
                      #93039
                    </span>
                  </td>
                  <td>
                    <span>Ifeoma Adebayo</span>
                  </td>
                  <td>
                    <div className="terminal-dashboard-orders-list-table-shipment-id">
                      <span data-shipment-id={`SH-YHDKM0CVFINZBUWQ`}>
                        {`SH-YHDKM0CVFINZBUWQ`.slice(0, 13) + "..."}
                      </span>
                      <svg
                        width="29"
                        height="20"
                        viewBox="0 0 29 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect
                          x="0.5"
                          width="28"
                          height="20"
                          rx="4"
                          fill="#F7F3EF"
                        />
                        <path
                          d="M16.375 12.625V14.3125C16.375 14.6232 16.1232 14.875 15.8125 14.875H10.9375C10.6268 14.875 10.375 14.6232 10.375 14.3125V7.9375C10.375 7.62684 10.6268 7.375 10.9375 7.375H11.875C12.1305 7.375 12.3811 7.3963 12.625 7.43722M16.375 12.625H18.0625C18.3732 12.625 18.625 12.3732 18.625 12.0625V9.625C18.625 7.39525 17.0033 5.54428 14.875 5.18722C14.6311 5.1463 14.3805 5.125 14.125 5.125H13.1875C12.8768 5.125 12.625 5.37684 12.625 5.6875V7.43722M16.375 12.625H13.1875C12.8768 12.625 12.625 12.3732 12.625 12.0625V7.43722M18.625 10.75V9.8125C18.625 8.88052 17.8695 8.125 16.9375 8.125H16.1875C15.8768 8.125 15.625 7.87316 15.625 7.5625V6.8125C15.625 5.88052 14.8695 5.125 13.9375 5.125H13.375"
                          stroke="#333333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </td>
                  <td>
                    <ShippingStatus
                      className="t-status-in-transit"
                      title="In transit"
                    />
                  </td>
                  <td>
                    <img
                      src="https://tplug.terminal.africa/wp-content/plugins/terminal-africa/assets/img/arrow-forward.svg"
                      alt=""
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}
