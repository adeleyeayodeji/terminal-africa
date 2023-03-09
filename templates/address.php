<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
$country = get_terminal_countries();
$states = get_terminal_states("NG");
$states = $states['data'];
$saved_address = get_option('terminal_africa_merchant_address', false);
$saved_address_state = "LA";
?>
<div class="t-container">
    <?php terminal_header("fas fa-map", "Pickup Address"); ?>
    <div class="t-body">
        <div class="t-row">
            <div class="t-col-8 t-col-lg-8 t-col-md-8 t-col-sm-12">
                <form method="post" id="t-form-submit" data-type="merchant">
                    <div class="t-row">
                        <div class="t-col-12">
                            <div class="t-address-info">
                                <!-- instructions -->
                                <h3 class="t-title">
                                    <strong>Instructions:</strong>
                                </h3>
                                <p class="t-text">
                                    Please fill in your address details below. This address will be used to pick up your items from your location.
                                </p>
                            </div>

                        </div>
                        <div class="t-col-12">
                            <div class="t-address">
                                <div class="t-address-card">
                                    <div class="t-row t-space-around">
                                        <div class="t-col-5 t-col-lg-5 t-col-md-5 t-col-sm-10">
                                            <div class="t-form-group">
                                                <label for="first_name">First Name</label>
                                                <input type="text" name="first_name" required id="first_name" class="t-form-control" placeholder="First Name" value="<?php echo $saved_address ? esc_html($saved_address->first_name) : ''; ?>" onkeyup="updateData(this,event, 't_first_name')">
                                            </div>
                                        </div>
                                        <div class="t-col-5 t-col-lg-5 t-col-md-5 t-col-sm-10">
                                            <div class="t-form-group">
                                                <label for="last_name">Last Name</label>
                                                <input type="text" name="last_name" required id="last_name" class="t-form-control" placeholder="Last Name" value="<?php echo $saved_address ? esc_html($saved_address->last_name) : ''; ?>" onkeyup="updateData(this,event, 't_last_name')">
                                            </div>
                                        </div>

                                        <div class="t-col-5 t-col-lg-5 t-col-md-5 t-col-sm-10">
                                            <div class="t-form-group">
                                                <label for="email">Email</label>
                                                <input type="email" name="email" required id="email" class="t-form-control" placeholder="Email" value="<?php echo $saved_address ? esc_html($saved_address->email) : ''; ?>" onkeyup="updateData(this,event, 't_email')">
                                            </div>
                                        </div>

                                        <div class="t-col-5 t-col-lg-5 t-col-md-5 t-col-sm-10">
                                            <div class="t-form-group">
                                                <label for="phone">Phone</label>
                                                <input type="text" name="phone" required id="phone" class="t-form-control" placeholder="Phone" value="<?php echo $saved_address ? esc_html($saved_address->phone) : ''; ?>" onkeyup="updateData(this,event, 't_phone')">
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
                                                <input type="text" required name="line_1" id="street_address" class="t-form-control" placeholder="Street Address" value="<?php echo $saved_address ? esc_html($saved_address->line1) : ''; ?>" onkeyup="updateData(this,event, 't_address')">
                                            </div>
                                        </div>
                                        <div class="t-col-11">
                                            <div class="t-form-group">
                                                <label for="line_2">Line 2</label>
                                                <input type="text" name="line_2" id="line_2" class="t-form-control" placeholder="Line 2" value="<?php echo $saved_address ? esc_html($saved_address->line2) : ''; ?>">
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
                                                                <option value="<?php echo esc_html($value->isoCode); ?>" data-flag="<?php echo esc_html($value->flag); ?>" <?php echo $saved_address && $saved_address->country == $value->isoCode ? 'selected' : ''; ?>>
                                                                    <?php echo esc_html($value->name); ?>
                                                                </option>
                                                            <?php endforeach; ?>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="t-col-33">
                                                    <div class="t-form-group">
                                                        <label for="state">State</label>
                                                        <select class="t-form-control t-terminal-state" required name="state" id="">
                                                            <option value="">State</option>
                                                            <?php foreach ($states as $key => $value) :
                                                                //get $saved_address_state
                                                                if ($saved_address && $saved_address->state == $value->name) {
                                                                    $saved_address_state = $value->isoCode;
                                                                }
                                                            ?>
                                                                <option value="<?php echo esc_html($value->name); ?>" data-statecode="<?php echo esc_html($value->isoCode); ?>" <?php echo $saved_address && $saved_address->state == $value->name ? 'selected' : ''; ?>>
                                                                    <?php echo esc_html($value->name); ?>
                                                                </option>
                                                            <?php endforeach; ?>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="t-col-33">
                                                    <div class="t-form-group">
                                                        <label for="lga">LGA</label>
                                                        <select class="t-form-control t-terminal-city" required name="lga" id="">
                                                            <?php
                                                            if ($saved_address) :
                                                                $lga = get_terminal_cities($saved_address->country, $saved_address_state);
                                                                //check if cities is empty
                                                                if (!empty($lga['data'])) :
                                                                    foreach ($lga['data'] as $key => $value) : ?>
                                                                        <option value="<?php echo esc_html($value->name); ?>" <?php echo $saved_address && $saved_address->city == $value->name ? 'selected' : ''; ?>>
                                                                            <?php echo esc_html($value->name); ?>
                                                                        </option>
                                                                <?php endforeach;
                                                                endif;
                                                            else :  ?>
                                                                <option value="">LGA</option>
                                                            <?php
                                                            endif;
                                                            ?>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="t-col-33">
                                                    <div class="t-form-group">
                                                        <label for="zip_code">Zip Code</label>
                                                        <input type="text" name="zip_code" id="zip_code" class="t-form-control" placeholder="Zip Code" value="<?php echo $saved_address ? esc_html($saved_address->zip) : ''; ?>">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="t-col-12">
                            <button type="submit" class="t-address-save" style="width: fit-content;">Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="t-col-4 t-col-lg-4 t-col-md-4 t-col-sm-12 t-d-xs-none">
                <div class="t-display-information t-data-profile">
                    <h3 class="t-title">Personal Information</h3>
                    <p id="t_first_name">
                        <?php echo $saved_address ? esc_html($saved_address->first_name) : ''; ?>
                    </p>
                    <p id="t_last_name">
                        <?php echo $saved_address ? esc_html($saved_address->last_name) : ''; ?>
                    </p>
                    <p id="t_email">
                        <?php echo $saved_address ? esc_html($saved_address->email) : ''; ?>
                    </p>
                    <p id="t_phone">
                        <?php echo $saved_address ? esc_html($saved_address->phone) : ''; ?>
                    </p>
                    <h3 class="t-title" style="padding-top:6px;">Address</h3>
                    <p id="t_address">
                        <?php echo $saved_address ? esc_html($saved_address->line1) : ''; ?>
                    </p>
                </div>
            </div>
        </div>

    </div>
</div>