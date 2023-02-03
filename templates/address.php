<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
$country = get_terminal_countries();
$states = get_terminal_states("NG");
$states = $states['data'];
?>
<div class="t-container">
    <div class="t-header">
        <div class="t-row">
            <div class="t-col-6">
                <h2 class="t-title"><i class="fas fa-map" aria-hidden="true"></i> Pickup Address</h2>
            </div>
            <div class="t-col-6">
                <div class="t-right">
                    <a href="javascript:;">
                        <i class="fa fa-power-off t-font-sign-out" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="t-body">
        <div class="t-row">
            <div class="t-col-8 t-col-lg-8 t-col-md-8 t-col-sm-12">
                <form method="post" id="t-form-submit">
                    <div class="t-row">
                        <div class="t-col-12">
                            <div class="t-address">
                                <div class="t-address-card">
                                    <div class="t-row t-space-around">
                                        <div class="t-col-5 t-col-lg-6 t-col-md-6 t-col-sm-12">
                                            <div class="t-form-group">
                                                <label for="first_name">First Name</label>
                                                <input type="text" name="first_name" required id="first_name" class="t-form-control" placeholder="First Name" value="">
                                            </div>
                                        </div>
                                        <div class="t-col-5 t-col-lg-6 t-col-md-6 t-col-sm-12">
                                            <div class="t-form-group">
                                                <label for="last_name">Last Name</label>
                                                <input type="text" name="last_name" required id="last_name" class="t-form-control" placeholder="Last Name" value="">
                                            </div>
                                        </div>

                                        <div class="t-col-5 t-col-lg-6 t-col-md-6 t-col-sm-12">
                                            <div class="t-form-group">
                                                <label for="email">Email</label>
                                                <input type="email" name="email" required id="email" class="t-form-control" placeholder="Email" value="">
                                            </div>
                                        </div>

                                        <div class="t-col-5 t-col-lg-6 t-col-md-6 t-col-sm-12">
                                            <div class="t-form-group">
                                                <label for="phone">Phone</label>
                                                <input type="text" name="phone" required id="phone" class="t-form-control" placeholder="Phone" value="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="t-col-12">
                            <div class="t-address t-mt-1">
                                <div class="t-address-card">
                                    <div class="t-row t-space-around">
                                        <div class="t-col-11">
                                            <div class="t-form-group">
                                                <label for="street_address">
                                                    Street Address
                                                </label>
                                                <input type="text" required name="line_1" id="street_address" class="t-form-control" placeholder="Street Address" value="">
                                            </div>
                                        </div>
                                        <div class="t-col-11">
                                            <div class="t-form-group">
                                                <label for="line_2">Line 2</label>
                                                <input type="text" name="line_2" id="line_2" class="t-form-control" placeholder="Line 2" value="">
                                            </div>
                                        </div>

                                        <div class="t-col-11">
                                            <div class="t-row t-space-around">
                                                <div class="t-col-33">
                                                    <div class="t-form-group">
                                                        <label for="country">Country</label>
                                                        <select class="t-form-control t-terminal-country" required name="country" id="">
                                                            <option value="">Country</option>
                                                            <?php foreach ($country as $key => $value) : ?>
                                                                <option value="<?php echo $value->isoCode; ?>" data-flag="<?php echo $value->flag; ?>"><?php echo $value->name; ?></option>
                                                            <?php endforeach; ?>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="t-col-33">
                                                    <div class="t-form-group">
                                                        <label for="state">State</label>
                                                        <select class="t-form-control t-terminal-state" required name="state" id="">
                                                            <option value="">State</option>
                                                            <?php foreach ($states as $key => $value) : ?>
                                                                <option value="<?php echo $value->name; ?>" data-statecode="<?php echo $value->isoCode; ?>"><?php echo $value->name; ?></option>
                                                            <?php endforeach; ?>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="t-col-33">
                                                    <div class="t-form-group">
                                                        <label for="lga">LGA</label>
                                                        <select class="t-form-control t-terminal-city" required name="lga" id="">
                                                            <option value="">LGA</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="t-col-33">
                                                    <div class="t-form-group">
                                                        <label for="zip_code">Zip Code</label>
                                                        <input type="text" name="zip_code" id="zip_code" class="t-form-control" placeholder="Zip Code" value="">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="t-col-12">
                            <button type="submit" class="t-address-save">Save</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="t-col-4 t-col-lg-4 t-col-md-4 t-col-sm-12">
                <div class="t-display-information">
                    <h3 class="t-title">Personal Information</h3>
                    <p class="first_name">
                        John
                    </p>
                    <p class="last_name">
                        Doe
                    </p>
                    <p class="email">
                        example@example.com
                    </p>
                    <p class="phone">
                        1234567890
                    </p>
                    <h3 class="t-title" style="padding-top:6px;">Address</h3>
                    <p class="address">
                        1234 Example Street
                    </p>
                </div>
            </div>
        </div>

    </div>
</div>