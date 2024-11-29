import { Component } from "react";

/**
 * ShipmentsPagination component
 *
 * @extends Component
 */
class ShipmentsPagination extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * @returns {JSX.Element}
   */
  render() {
    const { perPage, currentPage, totalPages } = this.props;

    return (
      <div className="t-shipments-pagination">
        <div className="t-shipments-pagination--left">
          <span>
            Showing {perPage * (currentPage - 1) + 1} to {perPage * currentPage}{" "}
            of {totalPages * perPage}
          </span>
        </div>
        <div className="t-shipments-pagination--right">
          <div className="t-shipments-pagination--right--prev-icon">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() =>
                this.props.handlePaginationChange(currentPage - 1)
              }>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.9716 3.52876C11.2319 3.78911 11.2319 4.21122 10.9716 4.47157L7.44297 8.00016L10.9716 11.5288C11.2319 11.7891 11.2319 12.2112 10.9716 12.4716C10.7112 12.7319 10.2891 12.7319 10.0288 12.4716L6.02876 8.47157C5.76841 8.21122 5.76841 7.78911 6.02876 7.52876L10.0288 3.52876C10.2891 3.26841 10.7112 3.26841 10.9716 3.52876Z"
                fill="#F7941E"
              />
            </svg>
          </div>
          <div className="t-shipments-pagination--right--page-number">
            {Array.from({ length: totalPages }, (_, indexRaw) => {
              let index = indexRaw + 1;
              if (
                index < 4 || // First three pages
                index >= totalPages - 1 || // Last two pages
                index === currentPage // Current page
              ) {
                return (
                  <span
                    key={index}
                    className={`t-shipments-pagination--right--page-number--item ${
                      index === currentPage ? "active" : ""
                    }`}
                    onClick={() => this.props.handlePaginationChange(index)}>
                    {index}
                  </span>
                );
              } else if (index === 4) {
                // Ellipsis after the first three pages
                return <span key="ellipsis1">...</span>;
              }
              return null;
            })}
          </div>
          <div className="t-shipments-pagination--right--next-icon">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() =>
                this.props.handlePaginationChange(currentPage + 1)
              }>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.02876 3.52876C5.76841 3.78911 5.76841 4.21122 6.02876 4.47157L9.55735 8.00016L6.02876 11.5288C5.76841 11.7891 5.76841 12.2112 6.02876 12.4716C6.28911 12.7319 6.71122 12.7319 6.97157 12.4716L10.9716 8.47157C11.2319 8.21122 11.2319 7.78911 10.9716 7.52876L6.97157 3.52876C6.71122 3.26841 6.28911 3.26841 6.02876 3.52876Z"
                fill="#F7941E"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default ShipmentsPagination;
