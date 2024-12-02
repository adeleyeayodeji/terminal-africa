import React, { Component } from "react";
import NewShippingSkeleton from "./ShippingSkeleton/ShippingSkeleton";
import ShippingStatus from "../../Shipping/Parts/ShippingStatus";
//import dayjs
import dayjs from "dayjs";
import ShipmentsPagination from "./Inner/ShipmentsPagination";

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
      isLoading: true,
      liteLoading: false,
      showClearSearch: false,
      shipments: [],
      pagination: {
        currentPage: 1,
        hasNextPage: null,
        hasPrevPage: null,
        nextPage: null,
        pageCount: 0,
        pageCounter: null,
        perPage: 10,
        prevPage: null,
        total: 0
      },
      status: "",
      search: ""
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
   * Get all shipments
   * @returns {void}
   */
  getAllShipments(liteLoading = false) {
    //get all shipments
    jQuery.ajax({
      url: terminal_africa.ajax_url,
      method: "GET",
      data: {
        action: "terminal_africa_get_all_shipments_v2",
        status: this.state.status,
        search: this.state.search,
        page: this.state.pagination.currentPage,
        per_page: this.state.pagination.perPage,
        nonce: terminal_africa.nonce
      },
      beforeSend: () => {
        //check if liteLoading is true
        if (liteLoading) {
          //set liteLoading to true
          this.setState({ liteLoading: true });
        } else {
          //set isLoading to true
          this.setState({ isLoading: true });
        }
      },
      success: (response) => {
        this.setState({ isLoading: false, liteLoading: false });
        //check if response code is 200
        if (response.code == 200) {
          //set shipments data
          this.setState({ shipments: response.data.shipments });
          //set pagination data
          this.setState({ pagination: response.data.pagination });
          //log response.data
          console.log(response.data);
        } else {
          //show gutenberg toast
          try {
            //iziToast
            iziToast.error({
              title: "Error",
              message: response.message
            });
          } catch (error) {}
        }
      },
      error: (error, status, xhr) => {
        this.setState({ isLoading: false, liteLoading: false });
        console.log(status, xhr);
      }
    });
  }

  /**
   * Handle shipment click
   * @param {string} shipmentId - The shipment ID
   * @returns {void}
   */
  handleShipmentClick(shipmentId) {
    //redirect to shipment edit page
    window.location.href = `${terminal_africa.site_url}/wp-admin/admin.php?page=terminal-africa&action=edit&id=${shipmentId}&nonce=${terminal_africa.terminal_africa_edit_shipment_nonce}`;
  }

  /**
   * Lifecycle method
   * @returns {void}
   */
  componentDidMount() {
    // Create a debounced version of getAllShipments
    this.debouncedGetAllShipments = this.debounce(() => {
      this.getAllShipments(true);
    }, 500);

    //get all shipments
    this.getAllShipments();
  }

  /**
   * Component did update
   * @param {Object} prevProps - The previous props
   * @param {Object} prevState - The previous state
   * @returns {void}
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.liteLoading && !prevState.liteLoading) {
      // Block the UI when liteLoading becomes true
      jQuery(".t-shipping--table").block({
        message: "Getting shipments...",
        overlayCSS: {
          background: "#fff",
          opacity: 0.8,
          cursor: "wait"
        },
        css: {
          border: 0,
          padding: 0,
          backgroundColor: "transparent"
        }
      });
    } else if (!this.state.liteLoading && prevState.liteLoading) {
      // Unblock the UI when liteLoading becomes false
      jQuery(".t-shipping--table").unblock();
    }

    // Check if status has changed
    if (prevState.status !== this.state.status) {
      //get all shipments
      this.getAllShipments(true);
    }

    // Check if search has changed
    if (prevState.search !== this.state.search) {
      //debounce the search
      this.debouncedGetAllShipments();
    }

    // Update showClearSearch based on the search state
    if (prevState.search !== this.state.search) {
      //set showClearSearch to true if search is not empty
      this.setState({ showClearSearch: this.state.search.trim() !== "" });
    }

    //check for pagination change
    if (
      prevState.pagination.currentPage !== this.state.pagination.currentPage
    ) {
      //log
      console.log("Pagination changed", this.state.pagination.currentPage);
      //get all shipments
      this.getAllShipments(true);
    }
  }

  /**
   * Handle filter change
   * @param {Object} e - The event object
   * @returns {void}
   */
  handleFilterChange = (e) => {
    //get the value
    const filter = e.target.value;
    //set the status
    this.setState({ status: filter });
  };

  /**
   * Handle search change
   * @param {Object} e - The event object
   * @returns {void}
   */
  handleSearchChange = (e) => {
    //get the value
    const search = e.target.value;
    //set the search
    this.setState({ search });
  };

  /**
   * Debounce function to delay the execution
   * @param {Function} func - The function to debounce
   * @param {number} wait - The delay time in milliseconds
   * @returns {Function}
   */
  debounce(func, wait) {
    //let timeout
    let timeout;
    //return the debounced function
    return function (...args) {
      //define later function
      const later = () => {
        //clear timeout
        clearTimeout(timeout);
        //execute the function
        func(...args);
      };
      //clear timeout
      clearTimeout(timeout);
      //set timeout
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Handle clear search
   * @returns {void}
   */
  handleClearSearch = () => {
    //set the search to empty
    this.setState({ search: "" });
  };

  /**
   * Handle export
   * @returns {void}
   */
  handleExport = () => {
    console.log("Export");
  };

  /**
   * Handle refresh
   * @returns {void}
   */
  handleRefresh = () => {
    //reload the page
    window.location.reload();
  };

  /**
   * Handle pagination change
   * @param {number} page - The page number
   * @returns {void}
   */
  handlePaginationChange = (page) => {
    //check if page is greater than total pages
    if (page > this.state.pagination.pageCount) {
      //toast
      iziToast.error({
        title: "Error",
        message: "Page number is greater than total pages"
      });
      return;
    }
    //check if page is less than 1
    if (page < 1) {
      //toast
      iziToast.error({
        title: "Error",
        message: "Page number is less than 1"
      });
      return;
    }
    //set the current page
    this.setState({
      pagination: { ...this.state.pagination, currentPage: page }
    });
  };

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
            <div className="t-shipping--header" style={{ flexWrap: "wrap" }}>
              <div className="t-shipping--header--left">
                <div className="t-shipping--header--left--title">
                  <span>All Shipments</span>
                </div>
                <div className="t-shipping--header--left--filter">
                  <select name="" id="" onChange={this.handleFilterChange}>
                    <option value="">Filter</option>
                    <option
                      value="confirmed"
                      selected={this.state.status === "confirmed"}>
                      Confirmed
                    </option>
                    <option
                      value="in-transit"
                      selected={this.state.status === "in-transit"}>
                      In Transit
                    </option>
                    <option
                      value="draft"
                      selected={this.state.status === "draft"}>
                      Draft
                    </option>
                  </select>
                </div>
                <div className="t-shipping--header--left--search">
                  <div className="t-shipping--header--left--search-input">
                    <input
                      type="text"
                      placeholder="Search"
                      onChange={this.handleSearchChange}
                      value={this.state.search}
                    />

                    {this.state.showClearSearch && (
                      <svg
                        onClick={this.handleClearSearch}
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
                    )}
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
                <button
                  className="t-shipping--header--right--refresh"
                  onClick={this.handleRefresh}>
                  Refresh
                </button>
                <button
                  className="t-shipping--header--right--export"
                  onClick={this.handleExport}>
                  Export
                </button>
              </div>
            </div>
            <table
              width="100%"
              className="t-shipping--table"
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
                {this.state.shipments.map((shipment) => (
                  <tr
                    className="t-terminal-dashboard-order-row"
                    key={shipment._id}>
                    <td
                      style={{ width: "50px" }}
                      onClick={() =>
                        this.handleShipmentClick(shipment._source.shipment_id)
                      }>
                      <img
                        src={
                          shipment._source.carrier_logo ||
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC4zIiB5PSIwLjMiIHdpZHRoPSIzOS40IiBoZWlnaHQ9IjM5LjQiIHJ4PSIxNS43IiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjQuMDUxNCAxMy43Mzg5TDI1LjQ1NzYgMTIuMzMyNkMyNi4wNjc4IDExLjcyMjUgMjcuMDU3MiAxMS43MjI1IDI3LjY2NzQgMTIuMzMyNkMyOC4yNzc1IDEyLjk0MjggMjguMjc3NSAxMy45MzIyIDI3LjY2NzQgMTQuNTQyNEwxNS42OTM1IDI2LjUxNjJDMTUuMjUyOSAyNi45NTY4IDE0LjcwOTUgMjcuMjgwNiAxNC4xMTI0IDI3LjQ1ODVMMTEuODc1IDI4LjEyNUwxMi41NDE1IDI1Ljg4NzZDMTIuNzE5NCAyNS4yOTA1IDEzLjA0MzIgMjQuNzQ3MSAxMy40ODM4IDI0LjMwNjVMMjQuMDUxNCAxMy43Mzg5Wk0yNC4wNTE0IDEzLjczODlMMjYuMjUgMTUuOTM3NSIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxyZWN0IHg9IjAuMyIgeT0iMC4zIiB3aWR0aD0iMzkuNCIgaGVpZ2h0PSIzOS40IiByeD0iMTUuNyIgc3Ryb2tlPSIjRTZFNkU2IiBzdHJva2Utd2lkdGg9IjAuNiIvPgo8L3N2Zz4K"
                        }
                        alt=""
                        style={this.styles.carrierLogo}
                      />
                    </td>
                    <td
                      style={{ width: "auto" }}
                      onClick={() =>
                        this.handleShipmentClick(shipment._source.shipment_id)
                      }>
                      <div className="t-flex">
                        <span>
                          {dayjs(shipment._source.created_at).format(
                            "DD MMM YYYY"
                          )}
                        </span>
                      </div>
                    </td>
                    <td
                      onClick={() =>
                        this.handleShipmentClick(shipment._source.shipment_id)
                      }>
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
                    <td
                      onClick={() =>
                        this.handleShipmentClick(shipment._source.shipment_id)
                      }>
                      <span>{shipment._source.delivery_name}</span>
                    </td>
                    <td>
                      <div className="terminal-dashboard-orders-list-table-shipment-id">
                        <span
                          data-shipment-id={`${shipment._source.shipment_id}`}
                          onClick={() =>
                            this.handleShipmentClick(
                              shipment._source.shipment_id
                            )
                          }>
                          {`${shipment._source.shipment_id}`.slice(0, 13) +
                            "..."}
                        </span>
                        <a
                          onClick={() => {
                            navigator.clipboard.writeText(
                              shipment._source.shipment_id
                            );
                            //iziToast
                            iziToast.success({
                              title: "Copied",
                              message: "Shipment ID copied to clipboard"
                            });
                          }}>
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
                        </a>
                      </div>
                    </td>
                    <td
                      onClick={() =>
                        this.handleShipmentClick(shipment._source.shipment_id)
                      }>
                      <ShippingStatus
                        className={`t-status-${shipment._source.status}`}
                        title={shipment._source.status}
                      />
                    </td>
                    <td
                      onClick={() =>
                        this.handleShipmentClick(shipment._source.shipment_id)
                      }>
                      <img
                        src={`${terminal_africa.plugin_url}/img/arrow-forward.svg`}
                        alt="Shipment Details"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ShipmentsPagination
              pagination={this.state.pagination}
              handlePaginationChange={this.handlePaginationChange}
              currentPage={this.state.pagination.currentPage}
              totalPages={this.state.pagination.pageCount}
              perPage={this.state.pagination.perPage}
            />
          </div>
        )}
      </div>
    );
  }
}
