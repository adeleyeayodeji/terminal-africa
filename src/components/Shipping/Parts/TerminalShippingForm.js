import React, { Fragment } from "react";

class TerminalShippingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { saved_address, rate_id, shippingData } = this.props;

    return (
      <Fragment>
        <form method="post" id="t-form-submit" dataType="customer">
          <input
            type="hidden"
            name="address_id"
            value={saved_address?.address_id}
          />
          <input type="hidden" name="rate_id" value={rate_id} />
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
                    value={saved_address?.first_name}
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
                    value={saved_address?.last_name}
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
                    value={saved_address?.line1}
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
                    value={saved_address?.line2}
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
                    value={saved_address?.email}
                  />
                </div>
                <div class="input-group mb-3">
                  <span
                    className="input-group-text t-input-group"
                    id="t-emal-input">
                    <img
                      src={terminal_africa.plugin_url + "/img/envelope.svg"}
                      alt="t-email-icon"
                    />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="t-emal-input"
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
                    {terminal_africa?.terminal_africal_countries.map(
                      (country, key) => (
                        <option
                          key={key}
                          value={country.isoCode}
                          data-flag={country.flag}
                          selected={
                            country.isoCode === saved_address?.country
                              ? "selected"
                              : ""
                          }>
                          {country.name}
                        </option>
                      )
                    )}
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
                    {shippingData?.states?.map((state, key) => (
                      <option
                        key={key}
                        value={state.name}
                        data-statecode={state.isoCode}
                        selected={
                          state.name === saved_address?.state ? "selected" : ""
                        }>
                        {state.name}
                      </option>
                    ))}
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
                    {shippingData?.cities?.data?.map((city, key) => (
                      <option
                        key={key}
                        value={city.name}
                        selected={
                          city.name === saved_address?.city ? "selected" : ""
                        }>
                        {city.name}
                      </option>
                    ))}
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
                    className="form-control t-zip-new"
                    placeholder="Zip Code"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default TerminalShippingForm;
