import React, { Fragment } from "react";

function TerminalShippingForm() {
  return (
    <Fragment>
      <div className="terminal-responsive t-shipping-form-new">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                id="first_name"
                placeholder="First Name"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                id="last_name"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="address_line_1">Address line 1</label>
              <input
                type="text"
                className="form-control"
                name="address_line_1"
                id="address_line_1"
                placeholder="Address line 1"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="address_line_2">Address line 2</label>
              <input
                type="text"
                className="form-control"
                name="address_line_2"
                id="address_line_2"
                placeholder="Address line 2"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                placeholder="Address line 2"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                className="form-control terminal-country"
                required
                name="country"
                id="country">
                <option value="">Select</option>
              </select>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="form-group">
              <label htmlFor="state">State</label>
              <select
                className="form-control terminal-state"
                required
                name="state"
                id="state">
                <option value="">Select</option>
              </select>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="form-group">
              <label htmlFor="lga">City</label>
              <select
                className="form-control terminal-city"
                required
                name="lga"
                id="lga">
                <option value="">Select</option>
              </select>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="d-flex">
                <div className="w-100">
                  <select
                    name="country_code"
                    id=""
                    className="form-control t-phone-new-select">
                    <option value="234">234</option>
                  </select>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="form-control t-phone-new"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="form-group">
              <label htmlFor="zipcode">Zip Code</label>
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                className="form-control"
                placeholder="Zip Code"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TerminalShippingForm;
