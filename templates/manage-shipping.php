<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
//get shipping address
$country = get_terminal_countries();
$states = get_terminal_states("NG");
$states = $states['data'];
//get shipping id
$shipping_id = $_GET['id'];
//sanitize
$shipping_id = sanitize_text_field($shipping_id);
$order_id = $_GET['order_id'];
//sanitize
$order_id = sanitize_text_field($order_id);
//get order
$order = wc_get_order($order_id);
//rate_id
$rate_id = sanitize_text_field($_GET['rate_id']);
//get rate data
$get_rate_data = getTerminalRateData($rate_id);
//order date
$order_date = $order->get_date_created();
//get order date
$order_date = $order_date->date('Y-m-d H:i:s');
//human readable date
$order_time = human_time_diff(strtotime($order_date), current_time('timestamp')) . ' ago';
//order status
$order_status = $order->get_status();
//$order_url
$order_url = admin_url('post.php?post=' . $order_id . '&action=edit');
//order shipping method
$order_shipping_method = $order->get_shipping_method();
//order shipping price
$order_shipping_price = $order->get_shipping_total();
//get the items
$items = $order->get_items();
//check if $get_rate_data is not empty
$saved_address = null;
$saved_others = null;
if ($get_rate_data['code'] == 200) {
    $saved_address = $get_rate_data['data']->delivery_address;
    $saved_others = $get_rate_data['data'];
}
?>
<style>
    b {
        font-weight: bold !important;
        font-family: LatoBold;
    }
</style>
<div class="t-container">
    <?php terminal_header("fas fa-map", "Customer Address"); ?>
    <div class="t-body">
        <div class="t-row">
            <div class="t-col-8 t-col-lg-8 t-col-md-8 t-col-sm-12">
                <form method="post" id="t-form-submit" data-type="customer">
                    <input type="hidden" name="address_id" value="<?php echo $saved_address ? esc_html($saved_address->address_id) : ''; ?>">
                    <input type="hidden" name="rate_id" value="<?php echo esc_html($rate_id); ?>">
                    <div class="t-row">
                        <div class="t-col-12">
                            <div class="t-address-info">
                                <p class="t-text">
                                    Update your customer address here. <br>This address will be used to re-calculate the shipping cost if the customer changes the shipping address.
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
                                                <input type="text" name="first_name" required id="first_name" class="t-form-control" placeholder="First Name" value="<?php echo $saved_address ? esc_html($saved_address->first_name) : ''; ?>">
                                            </div>
                                        </div>
                                        <div class="t-col-5 t-col-lg-5 t-col-md-5 t-col-sm-10">
                                            <div class="t-form-group">
                                                <label for="last_name">Last Name</label>
                                                <input type="text" name="last_name" required id="last_name" class="t-form-control" placeholder="Last Name" value="<?php echo $saved_address ? esc_html($saved_address->last_name) : ''; ?>">
                                            </div>
                                        </div>

                                        <div class="t-col-5 t-col-lg-5 t-col-md-5 t-col-sm-10">
                                            <div class="t-form-group">
                                                <label for="email">Email</label>
                                                <input type="email" name="email" required id="email" class="t-form-control" placeholder="Email" value="<?php echo $saved_address ? esc_html($saved_address->email) : ''; ?>">
                                            </div>
                                        </div>

                                        <div class="t-col-5 t-col-lg-5 t-col-md-5 t-col-sm-10">
                                            <div class="t-form-group">
                                                <label for="phone">Phone</label>
                                                <input type="text" name="phone" required id="phone" class="t-form-control" placeholder="Phone" value="<?php echo $saved_address ? esc_html($saved_address->phone) : ''; ?>">
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
                                                <input type="text" required name="line_1" id="street_address" class="t-form-control" placeholder="Street Address" value="<?php echo $saved_address ? esc_html($saved_address->line1) : ''; ?>">
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
                                                                <option value="<?php echo esc_html($value->isoCode); ?>" data-flag="<?php echo $value->flag; ?>" <?php echo $saved_address && $saved_address->country == $value->isoCode ? 'selected' : ''; ?>>
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
                                                                <option value="<?php echo esc_html($value->name); ?>" data-statecode="<?php echo $value->isoCode; ?>" <?php echo $saved_address && $saved_address->state == $value->name ? 'selected' : ''; ?>>
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
            <div class="t-col-4 t-col-lg-4 t-col-md-4 t-col-sm-12">
                <div class="t-display-information t-data-profile t-m-sm-3">
                    <h3 class="t-title" style="    margin-bottom: 5px;">Manage order</h3>
                    <p>
                        <b>Order Date:</b> <?php echo esc_html($order_date); ?> <b style="color:orange;">(<?php echo esc_html($order_time); ?>)</b>
                    </p>
                    <p>
                        <b>Order Number:</b> <?php echo esc_html($order_id); ?>
                    </p>
                    <p>
                        <b>Order Status:</b> <b style="color:orange;text-transform: capitalize;"><?php echo esc_html($order_status); ?></b>
                    </p>
                    <p style="margin-top: 13px;">
                        <a href="<?php echo esc_url($order_url); ?>" class="t-btn t-btn-primary t-btn-sm" style="    padding: 8px 8px;">Manage in WC Editor</a>
                    </p>

                    <div class="t-space"></div>

                    <h3 class="t-title" style="    margin-bottom: 5px;">Manage Shipping</h3>
                    <p>
                        <b>Carrier name:</b> <b style="color:orange;"><?php echo $saved_others ? '<img style="    height: 11px;
    margin-right: 4px;" src="' . esc_url($saved_others->carrier_logo) . '" >' . esc_html($saved_others->carrier_name . ' : ' . $saved_others->carrier_rate_description) : ''; ?></b>
                    </p>
                    <p>
                        <b>Shipping Price:</b> <?php echo wc_price($saved_others->amount); ?>
                    </p>
                    <p>
                        <b>Shipment Status:</b> <b style="color:orange;">Draft</b>
                    </p>
                    <p style="margin-top: 13px;" id="t_carriers_location">
                        <a href="javascript:;" class="t-btn t-btn-primary t-btn-sm" id="t-carrier-change-button" data-shipment_id="<?php echo esc_html($shipping_id); ?>" data-order-id="<?php echo esc_html($order_id); ?>" onclick="changeTerminalCarrier(this, event)" style="padding: 8px 8px;">Change Carrier</a>
                        <a href="javascript:;" class="t-btn t-btn-primary t-btn-sm" id="t-carrier-change-button" data-shipment_id="<?php echo esc_html($shipping_id); ?>" data-rate-id="<?php echo esc_html($rate_id); ?>" data-order-id="<?php echo esc_html($order_id); ?>" onclick="arrangeTerminalDelivery(this, event)" style="padding: 8px 8px;">Arrange for delivery</a>
                    </p>
                </div>
            </div>
        </div>

    </div>
</div>