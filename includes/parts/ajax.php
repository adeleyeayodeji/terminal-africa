<?php

namespace TerminalAfrica\Includes\Parts;

//security
defined('ABSPATH') or die('No script kiddies please!');

use WpOrg\Requests\Requests;
use TerminalLogHandler;

trait Ajax
{
    //terminal_africa_auth
    public function terminal_africa_auth()
    {
        try {
            $nonce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            $public_key = sanitize_text_field($_POST['public_key']);
            $secret_key = sanitize_text_field($_POST['secret_key']);
            if (empty($public_key) || empty($secret_key)) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Please enter your public key and secret key'
                ]);
            }
            //validate keys
            $validate_keys = $this->checkKeys($public_key, $secret_key);
            //send request
            $response = Requests::get($validate_keys["endpoint"] . "users/secrete", [
                'Authorization' => 'Bearer ' . $secret_key
            ]);
            //check if response is 200
            $body = json_decode($response->body);
            if ($response->status_code == 200) {
                //save keys
                $settings = array(
                    'public_key' => $public_key,
                    'secret_key' => $secret_key,
                    'user_id' => $body->data->user->user_id,
                    'others' => $body->data
                );
                // Save settings
                update_option('terminal_africa_settings', $settings);
                //terminal_africa_merchant_id
                update_option('terminal_africa_merchant_id', $body->data->user->user_id);
                //check if metadata exist
                if (isset($body->data->user->metadata)) {
                    //$isoCode
                    $isoCode = $body->data->user->country;
                    //save metadata
                    update_option('terminal_default_currency_code', ['currency_code' => isset($body->data->user->metadata->default_currency) ? $body->data->user->metadata->default_currency : 'NGN', 'isoCode' => $isoCode]);
                }
                //get shipping settings
                $settings = get_option('woocommerce_terminal_delivery_settings');
                //update shipping settings
                $settings['enabled'] = 'yes';
                update_option('woocommerce_terminal_delivery_settings', $settings);
                //log plugin data
                TerminalLogHandler::terminalLoggerHandler('plugin/activate');
                //return 
                wp_send_json([
                    'code' => 200,
                    'message' => 'Authentication successful'
                ]);
            } else {
                wp_send_json([
                    'code' => 400,
                    'message' => $body->message
                ]);
            }
        } catch (\Exception $e) {
            logTerminalError($e, 'users/secrete');
            wp_send_json([
                'code' => 400,
                'message' => "Something went wrong. Please try again"
            ]);
        }
    }

    //checkKeys
    public function checkKeys($pk, $sk)
    {
        try {

            //check if keys has test in them
            if (strpos($pk, 'test') !== false || strpos($sk, 'test') !== false) {
                return [
                    'endpoint' => TERMINAL_AFRICA_TEST_API_ENDPOINT,
                    'mode' => 'test'
                ];
            } else if (strpos($pk, 'live') !== false || strpos($sk, 'live') !== false) {
                return [
                    'endpoint' => TERMINAL_AFRICA_API_ENDPOINT,
                    'mode' => 'live'
                ];
            }
            return [
                'endpoint' => TERMINAL_AFRICA_TEST_API_ENDPOINT,
                'mode' => 'test'
            ];
        } catch (\Exception $e) {
            logTerminalError($e);
            return [
                'endpoint' => TERMINAL_AFRICA_TEST_API_ENDPOINT,
                'mode' => 'test'
            ];
        }
    }

    //terminal_merchant_save_address
    public function terminal_merchant_save_address()
    {
        try {

            $nounce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nounce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            $first_name = sanitize_text_field($_POST['first_name']);
            $last_name = sanitize_text_field($_POST['last_name']);
            $email = sanitize_text_field($_POST['email']);
            $phone = sanitize_text_field($_POST['phone']);
            $line_1 = sanitize_text_field($_POST['line_1']);
            $line_2 = sanitize_text_field($_POST['line_2']);
            $city = sanitize_text_field($_POST['lga']);
            $state = sanitize_text_field($_POST['state']);
            $country = sanitize_text_field($_POST['country']);
            $zip_code = sanitize_text_field($_POST['zip_code']);
            //check if any field is empty
            if (empty($first_name) || empty($last_name) || empty($email) || empty($phone) || empty($line_1) || empty($city) || empty($state) || empty($country)) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Please fill all required fields'
                ]);
            }
            //check if merchant_address_id is set
            $merchant_address_id = get_option('terminal_africa_merchant_address_id');
            if (empty($merchant_address_id)) {
                //create address
                $create_address = createTerminalAddress($first_name, $last_name, $email, $phone, $line_1, $line_2, $city, $state, $country, $zip_code);
                //check if address is created
                if ($create_address['code'] == 200) {
                    //save address id
                    update_option('terminal_africa_merchant_address_id', $create_address['data']->address_id);
                    //save address
                    update_option('terminal_africa_merchant_address', $create_address['data']);
                    //return
                    wp_send_json([
                        'code' => 200,
                        'message' => 'Address saved successfully'
                    ]);
                } else {
                    wp_send_json([
                        'code' => 400,
                        'message' => $create_address['message']
                    ]);
                }
            } else {
                //update address
                $update_address = updateTerminalAddress($merchant_address_id, $first_name, $last_name, $email, $phone, $line_1, $line_2, $city, $state, $country, $zip_code);
                //check if address is updated
                if ($update_address['code'] == 200) {
                    //save address
                    update_option('terminal_africa_merchant_address', $update_address['data']);
                    //return
                    wp_send_json([
                        'code' => 200,
                        'message' => 'Address updated successfully'
                    ]);
                } else {
                    wp_send_json([
                        'code' => 400,
                        'message' => $update_address['message']
                    ]);
                }
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Something went wrong: " . $e->getMessage()
            ]);
        }
    }

    //terminal_customer_save_address
    public function terminal_customer_save_address()
    {
        try {
            //if session is not started start it
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
            $nounce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nounce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            $first_name = sanitize_text_field($_POST['first_name']);
            $last_name = sanitize_text_field($_POST['last_name']);
            $email = sanitize_text_field($_POST['email']);
            $phone = sanitize_text_field($_POST['phone']);
            $line_1 = sanitize_text_field($_POST['line_1']);
            $line_2 = sanitize_text_field($_POST['line_2']);
            $city = sanitize_text_field($_POST['lga']);
            $state = sanitize_text_field($_POST['state']);
            $country = sanitize_text_field($_POST['country']);
            $zip_code = sanitize_text_field($_POST['zip_code']);
            $address_id = sanitize_text_field($_POST['address_id']);
            $rate_id = sanitize_text_field($_POST['rate_id']);
            //check if any field is empty
            if (empty($first_name) || empty($last_name) || empty($email) || empty($phone) || empty($line_1) || empty($city) || empty($state) || empty($country) || empty($address_id)) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Please fill all required fields'
                ]);
            }
            //update address
            $update_address = updateTerminalAddress($address_id, $first_name, $last_name, $email, $phone, $line_1, $line_2, $city, $state, $country, $zip_code);
            //check if address is updated
            if ($update_address['code'] == 200) {
                //clear session data
                unset($_SESSION['ratedata'][$rate_id]);
                //return
                wp_send_json([
                    'code' => 200,
                    'message' => 'Address updated successfully',
                    'rate_cleared' => true
                ]);
            } else {
                wp_send_json([
                    'code' => 400,
                    'message' => $update_address['message']
                ]);
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Something went wrong: " . $e->getMessage()
            ]);
        }
    }

    //terminal_africa_get_states
    public function terminal_africa_get_states()
    {
        try {
            $countryCode = sanitize_text_field($_GET['countryCode']);
            //nounce
            $nonce = sanitize_text_field($_GET['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //get states
            $states = get_terminal_states($countryCode);
            //check if states is empty
            if (empty($states['data'])) {
                wp_send_json([
                    'code' => 400,
                    'data' => [],
                    'message' => 'No states found, please select another country'
                ]);
            }
            //return
            wp_send_json([
                'code' => 200,
                'states' => $states['data'],
                'message' => 'States loaded',
            ]);
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'data' => [],
                'message' => "Something went wrong: " . $e->getMessage()
            ]);
        }
    }

    //terminal_africa_get_cities
    public function terminal_africa_get_cities()
    {
        try {
            $stateCode = sanitize_text_field($_GET['stateCode']);
            $countryCode = sanitize_text_field($_GET['countryCode']);
            //nounce
            $nonce = sanitize_text_field($_GET['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //get cities
            $cities = get_terminal_cities($countryCode, $stateCode);
            //check if cities is empty
            if (empty($cities['data'])) {
                wp_send_json([
                    'code' => 400,
                    'cities' => [],
                    'message' => 'No cities found, please select another state'
                ]);
            }
            //return
            wp_send_json([
                'code' => 200,
                'cities' => $cities['data'],
                'message' => 'Cities loaded',
            ]);
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'cities' => [],
                'message' => "Something went wrong: " . $e->getMessage()
            ]);
        }
    }

    //terminal_africa_sign_out
    public static function terminal_africa_sign_out()
    {
        try {
            //nounce
            $nonce = sanitize_text_field($_GET['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //delete options
            self::deactivate();
            //return
            wp_send_json([
                'code' => 200,
                'redirect_url' => admin_url('admin.php?page=terminal-africa'),
                'message' => 'Signed out successfully',
            ]);
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Something went wrong: " . $e->getMessage()
            ]);
        }
    }

    //terminal_africa_enable_terminal
    public static function terminal_africa_enable_terminal()
    {
        try {
            //nounce
            $nonce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //get shipping settings
            $settings = get_option('woocommerce_terminal_delivery_settings');
            //update shipping settings
            $settings['enabled'] = 'yes';
            update_option('woocommerce_terminal_delivery_settings', $settings);
            //return
            wp_send_json([
                'code' => 200,
                'message' => 'Terminal enabled successfully',
            ]);
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Something went wrong: " . $e->getMessage()
            ]);
        }
    }

    //terminal_africa_save_cart_item
    public function terminal_africa_save_cart_item()
    {
        try {
            //check if its ajax
            $nonce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //terminal_check_checkout_product_for_shipping_support
            $check_shipping_support = terminal_check_checkout_product_for_shipping_support();
            ///check if check_shipping_support is "false"
            if ($check_shipping_support === "false") {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Downloadable products are not supported'
                ]);
            }

            //check if session is started
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }

            //recaculate cart total
            WC()->cart->calculate_totals();

            //get cart item
            $cart_item = WC()->cart->get_cart();
            //check if cart item is empty
            if (empty($cart_item)) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Cart is empty'
                ]);
            }

            $data_items = [];
            //loop through cart items
            foreach ($cart_item as $item) {
                $data_items[] = [
                    'name' => $item['data']->get_name(),
                    'quantity' => intval($item['quantity']) ?: 1,
                    'value' => $item['line_total'],
                    'description' => "{$item['quantity']} of {$item['data']->get_name()} at {$item['data']->get_price()} each for a total of {$item['line_total']}",
                    'type' => 'parcel',
                    'currency' => get_woocommerce_currency(),
                    'weight' => (float)$item['data']->get_weight() ?: 0.1,
                ];
            }
            //check if terminal_default_packaging_id is set
            $packaging_id = get_option('terminal_default_packaging_id');
            //verify packaging id
            $verifyDefaultPackaging = verifyDefaultPackaging($packaging_id);
            //check if verifyDefaultPackaging is 200
            if ($verifyDefaultPackaging['code'] != 200) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Unable to verify default packaging, please try again'
                ]);
            }
            //get new packaging id
            $packaging_id = $verifyDefaultPackaging['packaging_id'];
            //arrange parcel
            $parcel = [
                'packaging' => $packaging_id,
                'weight_unit' => 'kg',
                'items' => $data_items,
                'description' => 'Order from ' . get_bloginfo('name'),
            ];
            //check if terminal_africa_parcel_id is set
            $parcel_id = WC()->session->get('terminal_africa_parcel_id');
            if (!empty($parcel_id)) {
                //update parcel
                $response = updateTerminalParcel($parcel_id, $parcel);
                //check if response is 200
                if ($response['code'] == 200) {
                    //return
                    wp_send_json([
                        'code' => 200,
                        'type' => 'percel',
                        'message' => 'Parcel updated successfully',
                    ]);
                } else {
                    wp_send_json([
                        'code' => 401,
                        'type' => 'percel',
                        'message' => $response['message']
                    ]);
                }
            }
            //post request
            $response = createTerminalParcel($parcel);
            //check if response is 200
            if ($response['code'] == 200) {
                //save parcel wc session
                WC()->session->set('terminal_africa_parcel_id', $response['data']->parcel_id);
                //packaging wc session
                WC()->session->set('terminal_africa_packaging_id', $response['data']->packaging);
                //return
                wp_send_json([
                    'code' => 200,
                    'message' => 'Parcel created successfully',
                ]);
            } else {
                wp_send_json([
                    'code' => 401,
                    'message' => $response['message']
                ]);
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Something went wrong: " . $e->getMessage()
            ]);
        }
    }

    //terminal_africa_process_terminal_rates
    public function terminal_africa_process_terminal_rates()
    {
        try {
            $nonce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //data
            $first_name = sanitize_text_field($_POST['first_name']);
            $last_name = sanitize_text_field($_POST['last_name']);
            $state  = sanitize_text_field($_POST['state']);
            $stateCode  = sanitize_text_field($_POST['stateCode']);
            $city = sanitize_text_field($_POST['city']);
            $country = sanitize_text_field($_POST['countryCode']);
            $zip_code = sanitize_text_field($_POST['billing_postcode']);
            $line_1 = sanitize_text_field($_POST['line_1']);
            //clean phone allow only numbers and +
            $phone = sanitize_text_field($_POST['phone']);
            // $phone = preg_replace('/[^0-9\+]/', '', $phone);
            // $zip_code = preg_replace('/[^0-9]/', '', $zip_code);
            $email = sanitize_text_field($_POST['email']);
            //check if line_1 is greater than 45 characters
            $line_2 = "";
            if (strlen($line_1) > 45) {
                //break to line_2
                $line_2 = substr($line_1, 45);
                //remove the 45 character
                $line_1 = substr($line_1, 0, 45);
            }
            //check if merchant_address_id is set
            $merchant_address_id = get_option('terminal_africa_merchant_address_id');
            if (!empty($merchant_address_id)) {
                //check if not empty $parcel_id 
                $parcel_id = WC()->session->get('terminal_africa_parcel_id');
                if (empty($parcel_id)) {
                    //wc notice
                    wc_add_notice('Terminal Parcel is empty, please refresh the page and try again', 'error');
                    //return error
                    wp_send_json([
                        'code' => 400,
                        'message' => 'Terminal Parcel is empty, please refresh the page and try again'
                    ]);
                }
                //check if address id is set
                $address_id = WC()->session->get('terminal_africa_guest_address_id' . $email);
                if (empty($address_id)) {
                    //create address
                    $create_address = createTerminalAddress($first_name, $last_name, $email, $phone, $line_1, $line_2, $city, $state, $country, $zip_code);
                    //check if address is created
                    if ($create_address['code'] == 200) {
                        //save address id wc session
                        WC()->session->set('terminal_africa_guest_address_id' . $email, $create_address['data']->address_id);
                        $address_id = $create_address['data']->address_id;
                    } else {
                        wp_send_json([
                            'code' => 400,
                            'message' => $create_address['message'],
                            'endpoint' => 'create_address'
                        ]);
                    }
                } else {
                    //update address
                    $update_address = updateTerminalAddress($address_id, $first_name, $last_name, $email, $phone, $line_1, $line_2, $city, $state, $country, $zip_code);
                    //check if address is updated
                    if ($update_address['code'] == 200) {
                        //save address id wc session
                        WC()->session->set('terminal_africa_guest_address_id' . $email, $update_address['data']->address_id);
                        $address_id = $update_address['data']->address_id;
                    } else {
                        wp_send_json([
                            'code' => 400,
                            'message' => $update_address['message'],
                            'endpoint' => 'update_address'
                        ]);
                    }
                }
                $address_from = $merchant_address_id;
                $address_to = $address_id;
                $parcel = $parcel_id;
                //get rates
                $get_rates = getTerminalRatesvbyAddressId($address_from, $address_to, $parcel);
                //check if rates is gotten
                if ($get_rates['code'] == 200) {
                    $terminal_price_markup = get_option('terminal_custom_price_mark_up', '');
                    //return
                    wp_send_json([
                        'code' => 200,
                        'message' => 'Rates gotten successfully',
                        'terminal_price_markup' => $terminal_price_markup,
                        'data' => $get_rates['data']
                    ]);
                } else {
                    //wc notice
                    wc_add_notice($get_rates['message'], 'error');
                    //return error
                    wp_send_json([
                        'code' => 400,
                        'message' => $get_rates['message'],
                        'endpoint' => 'get_rates'
                    ]);
                }
            }
            //add wc notice
            wc_add_notice("Terminal Merchant address not set, please contact the admin", 'error');
            //return error
            wp_send_json([
                'code' => 400,
                'message' => 'Terminal Merchant address not set'
            ]);
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage()
            ]);
        }
    }

    //terminal_africa_save_shipping_carrier
    public function terminal_africa_save_shipping_carrier()
    {
        try {
            $nonce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //data
            $carriername = sanitize_text_field($_POST['carriername']);
            $amount = sanitize_text_field($_POST['amount']);
            $duration = sanitize_text_field($_POST['duration']);
            $email = sanitize_text_field($_POST['email']);
            $rateid = sanitize_text_field($_POST['rateid']);
            $pickuptime = sanitize_text_field($_POST['pickup']);
            $carrierlogo = sanitize_text_field($_POST['carrierlogo']);
            //wc session
            WC()->session->set('terminal_africa_carriername', $carriername);
            WC()->session->set('terminal_africa_amount', $amount);
            WC()->session->set('terminal_africa_duration', $duration);
            WC()->session->set('terminal_africa_guest_email', $email);
            WC()->session->set('terminal_africa_rateid', $rateid);
            WC()->session->set('terminal_africa_pickuptime', $pickuptime);
            WC()->session->set('terminal_africa_carrierlogo', $carrierlogo);
            //return
            wp_send_json([
                'code' => 200,
                'message' => 'Carrier saved successfully'
            ]);
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage()
            ]);
        }
    }

    //terminal_africa_get_rate_data
    public function terminal_africa_get_rate_data()
    {
        try {
            $nonce = sanitize_text_field($_GET['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //data
            $rate_id = sanitize_text_field($_GET['rate_id']);
            //check if rate_id is empty
            if (empty($rate_id)) {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => 'Rate ID is empty, please refresh the page and try again'
                ]);
            }
            //get rate data
            $get_rate_data = getTerminalRateData($rate_id);
            //check if rate data is gotten
            if ($get_rate_data['code'] == 200) {
                //return
                wp_send_json([
                    'code' => 200,
                    'message' => 'Rate data gotten successfully',
                    'data' => $get_rate_data['data']
                ]);
            } else {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => $get_rate_data['message'],
                    'endpoint' => 'get_rate_data'
                ]);
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
                'endpoint' => 'get_rate_data'
            ]);
        }
    }

    //terminal_africa_process_terminal_rates_customer
    public function terminal_africa_process_terminal_rates_customer()
    {
        try {
            $nonce = sanitize_text_field($_GET['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //data
            $shipment_id = sanitize_text_field($_GET['shipment_id']);
            //get rate
            $get_rate = getTerminalRates($shipment_id);
            //check if rate is gotten
            if ($get_rate['code'] == 200) {
                //return
                wp_send_json([
                    'code' => 200,
                    'message' => 'Rate gotten successfully',
                    'data' => $get_rate['data']
                ]);
            } else {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => $get_rate['message'],
                    'endpoint' => 'get_rate'
                ]);
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
                'endpoint' => 'get_rate'
            ]);
        }
    }

    //terminal_africa_apply_terminal_rates_customer
    public function terminal_africa_apply_terminal_rates_customer()
    {
        try {
            $nonce = sanitize_text_field($_GET['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //data
            $order_id = sanitize_text_field($_GET['order_id']);
            $rateid = sanitize_text_field($_GET['rateid']);
            $pickup = sanitize_text_field($_GET['pickup']);
            $duration = sanitize_text_field($_GET['duration']);
            $amount = sanitize_text_field($_GET['amount']);
            $carrier_name = sanitize_text_field($_GET['carrier_name']);
            $carrierlogo = sanitize_text_field($_GET['carrierlogo']);
            //check if rate_id is empty
            if (empty($rateid) || empty($pickup) || empty($duration) || empty($amount) || empty($carrier_name)) {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => 'Rate ID, pickup, duration, amount or carrier name is empty, please refresh the page and try again'
                ]);
            }
            //apply rate
            $apply_rate = applyTerminalRate($order_id, $rateid, $pickup, $duration, $amount, $carrier_name, $carrierlogo);
            //check if rate is applied
            if ($apply_rate['code'] == 200) {
                //return
                wp_send_json([
                    'code' => 200,
                    'message' => 'Rate applied successfully',
                    'url' => $apply_rate['url'],
                    'data' => $apply_rate['data']
                ]);
            } else {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => $apply_rate['message'],
                    'endpoint' => 'apply_rate'
                ]);
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
                'endpoint' => 'apply_rate'
            ]);
        }
    }

    //terminal_africa_arrange_terminal_delivery
    public function terminal_africa_arrange_terminal_delivery()
    {
        try {
            $nonce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //data
            $order_id = sanitize_text_field($_POST['order_id']);
            $rateid = sanitize_text_field($_POST['rateid']);
            $shipment_id = sanitize_text_field($_POST['shipment_id']);
            //check if rate_id is empty
            if (empty($rateid) || empty($shipment_id)) {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => 'Rate ID or shipment ID is empty, please refresh the page and try again'
                ]);
            }
            //check user balance
            $terminal_africa_merchant_id = get_option('terminal_africa_merchant_id');
            $wallet_balance = getWalletBalance($terminal_africa_merchant_id, true);
            //check if wallet balance is gotten
            if ($wallet_balance['code'] == 200) {
                //check if wallet balance is enough
                if ($wallet_balance['data']->amount < 100) {
                    //return error
                    wp_send_json([
                        'code' => 400,
                        'message' => 'Your wallet balance is not enough to arrange delivery, please fund your wallet and try again'
                    ]);
                } else {
                    //arrange delivery
                    $delivery = arrangePickupAndDelivery($shipment_id, $rateid);
                    //check if delivery is arranged
                    if ($delivery['code'] == 200) {
                        //add order meta
                        update_post_meta($order_id, 'terminal_africa_delivery_arranged', "yes");
                        //return
                        wp_send_json([
                            'code' => 200,
                            'message' => 'Delivery arranged successfully',
                            'data' => $delivery['data']
                        ]);
                    } else {
                        //return error
                        wp_send_json([
                            'code' => 401,
                            'message' => $delivery['message'],
                            'endpoint' => 'arrange_delivery'
                        ]);
                    }
                }
            } else {
                //return error
                wp_send_json([
                    'code' => 401,
                    'message' => $wallet_balance['message'],
                    'endpoint' => 'get_wallet_balance'
                ]);
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
                'endpoint' => 'arrange_delivery'
            ]);
        }
    }

    //refresh_terminal_wallet
    public function refresh_terminal_wallet()
    {
        try {
            $nonce = sanitize_text_field($_GET['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //data
            $terminal_africa_merchant_id = get_option('terminal_africa_merchant_id');
            //get wallet balance
            $wallet_balance = getWalletBalance($terminal_africa_merchant_id, true);
            //check if wallet balance is gotten
            if ($wallet_balance['code'] == 200) {
                //return
                wp_send_json([
                    'code' => 200,
                    'message' => 'Wallet balance gotten successfully',
                    'data' => $wallet_balance['data']
                ]);
            } else {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => $wallet_balance['message'],
                    'endpoint' => 'get_wallet_balance'
                ]);
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
                'endpoint' => 'get_wallet_balance'
            ]);
        }
    }

    //refresh_terminal_rate
    public function refresh_terminal_rate_data()
    {
        try {
            $nonce = sanitize_text_field($_GET['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //data
            $rate_id = sanitize_text_field($_GET['rate_id']);
            //get rate
            $get_rate = getTerminalRateData($rate_id, true);
            //check if rate is gotten
            if ($get_rate['code'] == 200) {
                //return
                wp_send_json([
                    'code' => 200,
                    'message' => 'Rate gotten successfully',
                    'data' => $get_rate['data']
                ]);
            } else {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => $get_rate['message'],
                    'endpoint' => 'get_rate'
                ]);
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
                'endpoint' => 'get_rate'
            ]);
        }
    }

    //save_terminal_carrier_settings
    public function save_terminal_carrier_settings()
    {
        try {
            //if session is not started start it
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
            $nonce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //data
            $terminalEnabledCarriers = sanitize_array($_POST['terminalEnabledCarriers']);
            $terminalDisabledCarriers = sanitize_array($_POST['terminalDisabledCarriers']);
            //check if terminalEnabledCarriers is empty
            if (empty($terminalEnabledCarriers) || empty($terminalDisabledCarriers)) {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => 'Please select at least one carrier',
                ]);
            }
            //save settings
            //enableMultipleCarriers
            $enableMultipleCarriers = enableMultipleCarriers($terminalEnabledCarriers);
            //disableMultipleCarriers
            $disableMultipleCarriers = disableMultipleCarriers($terminalDisabledCarriers);
            //check if settings are saved
            if ($enableMultipleCarriers['code'] == 200 && $disableMultipleCarriers['code'] == 200) {
                //clear cache
                unset($_SESSION['terminal_carriers_data']);
                //return
                wp_send_json([
                    'code' => 200,
                    'message' => 'Settings saved successfully',
                ]);
            } else {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => $enableMultipleCarriers['message'] . ', ' . $disableMultipleCarriers['message'],
                ]);
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
            ]);
        }
    }

    //refresh_terminal_carriers_data
    public function refresh_terminal_carriers_data()
    {
        try {
            $nonce = sanitize_text_field($_GET['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //getUserCarriers
            $user_carriers_domestic = getUserCarriers('domestic', true);
            //getUserCarriers international
            $user_carriers_international = getUserCarriers('international', true);
            //getUserCarriers regional
            $user_carriers_regional = getUserCarriers('regional', true);
            //get domestic carriers 
            $domestic_carriers = getTerminalCarriers('domestic', true);
            //get international carriers
            $international_carriers = getTerminalCarriers('international', true);
            //regional
            $regional_carriers = getTerminalCarriers('regional', true);
            //check if carriers are gotten
            if ($domestic_carriers['code'] == 200 && $international_carriers['code'] == 200 && $regional_carriers['code'] == 200 && $user_carriers_domestic['code'] == 200 && $user_carriers_international['code'] == 200 && $user_carriers_regional['code'] == 200) {
                //return
                wp_send_json([
                    'code' => 200,
                    'message' => 'Carriers updated successfully',
                ]);
            } else {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => 'Carriers not updated, please try again',
                    'endpoint' => 'get_carriers'
                ]);
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
                'endpoint' => 'get_carriers'
            ]);
        }
    }

    //get packaging
    public function get_terminal_packaging()
    {
        try {
            $nonce = sanitize_text_field($_GET['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //get packaging
            $get_packaging = getTerminalPackagingData();
            //check if packaging is gotten
            if ($get_packaging['code'] == 200) {
                //return
                wp_send_json([
                    'code' => 200,
                    'message' => 'Packaging gotten successfully',
                    'data' => $get_packaging['data']
                ]);
            } else {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => $get_packaging['message'],
                    'endpoint' => 'get_packaging'
                ]);
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
                'endpoint' => 'get_packaging'
            ]);
        }
    }

    //get_terminal_shipment_status
    public function get_terminal_shipment_status()
    {
        try {
            $nonce = sanitize_text_field($_GET['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //data
            $shipment_id = sanitize_text_field($_GET['shipment_id']);
            $order_id = sanitize_text_field($_GET['order_id']);
            $rate_id = sanitize_text_field($_GET['rate_id']);
            //get shipment status
            $get_shipment_status = getTerminalShipmentStatus($shipment_id);
            //check if shipment status is gotten
            if ($get_shipment_status['code'] == 200) {
                $status = $get_shipment_status['data'];
                //cancellation_request
                $cancellation_request = $get_shipment_status['shipment_info']->cancellation_request;
                //get terminal template
                switch ($status) {
                    case 'draft':
                        $getTerminalTemplate = getTerminalTemplate('shipment-button/button', compact('rate_id', 'order_id', 'shipment_id'));
                        break;
                    case 'canceled':
                        $getTerminalTemplate = getTerminalTemplate('shipment-button/duplicate-shipment', compact('rate_id', 'order_id', 'shipment_id'));
                        break;
                    case 'confirmed':
                        $getTerminalTemplate = getTerminalTemplate('shipment-button/cancel-shipment', compact('rate_id', 'order_id', 'shipment_id'));
                        break;
                    default:
                        $getTerminalTemplate = '';
                        break;
                }
                //check if cancellation request is true
                if ($cancellation_request) {
                    $getTerminalTemplate = getTerminalTemplate('shipment-button/duplicate-shipment', compact('rate_id', 'order_id', 'shipment_id'));
                }
                //return
                wp_send_json([
                    'code' => 200,
                    'message' => 'Shipment status gotten successfully',
                    'data' => $status,
                    'button' => $getTerminalTemplate,
                    'shipment_info' => $get_shipment_status['shipment_info'],
                ]);
            } else {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => $get_shipment_status['message'],
                    'endpoint' => 'get_shipment_status',
                    'data' => 'not available',
                    'button' => 'Try shipment again.',
                ]);
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
                'endpoint' => 'get_shipment_status',
                'data' => 'not available',
                'button' => 'Try shipment again.',
            ]);
        }
    }

    //update_user_carrier_terminal
    public function update_user_carrier_terminal()
    {
        try {
            //check if session is started
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
            $nonce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //data
            $carriers = sanitize_array($_POST['carrierObj']);
            $status = sanitize_text_field($_POST['status']);
            //sanitize object data
            foreach ($carriers as $key => $value) {
                $carriers[$key] = $value;
            }
            //check if carriers is empty
            if (empty($carriers)) {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => 'Please select at least one carrier',
                ]);
            }
            $arrayData = [
                'carriers' => [
                    [
                        'carrier_id' => $carriers['id'],
                        'domestic' => (bool)$carriers['domestic'],
                        'international' => (bool)$carriers['international'],
                        'regional' => (bool)$carriers['regional'],
                    ]
                ]
            ];
            //check if status is enabled
            if ($status == 'enabled') {
                //enable carrier
                $enable_carrier = enableSingleCarriers($arrayData);
                //check if carrier is enabled
                if ($enable_carrier['code'] == 200) {
                    //clear cache
                    unset($_SESSION['terminal_carriers_data']);
                    //terminal_africa_carriers
                    unset($_SESSION['terminal_africa_carriers']);
                    //return
                    wp_send_json([
                        'code' => 200,
                        'message' => 'Carrier enabled successfully',
                    ]);
                } else {
                    //return error
                    wp_send_json([
                        'code' => 400,
                        'message' => $enable_carrier['message'],
                    ]);
                }
            } else {
                //disable carrier
                $disable_carrier = disableSingleCarriers($arrayData);
                //check if carrier is disabled
                if ($disable_carrier['code'] == 200) {
                    //clear cache
                    unset($_SESSION['terminal_carriers_data']);
                    //terminal_africa_carriers
                    unset($_SESSION['terminal_africa_carriers']);
                    //return
                    wp_send_json([
                        'code' => 200,
                        'message' => 'Carrier disabled successfully',
                    ]);
                } else {
                    //return error
                    wp_send_json([
                        'code' => 400,
                        'message' => $disable_carrier['message'],
                    ]);
                }
            }
            //return
            wp_send_json([
                'code' => 500,
                'message' => 'Something went wrong, please try again',
            ]);
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
            ]);
        }
    }

    //cancel_terminal_shipment
    public static function cancel_terminal_shipment()
    {
        try {
            $nonce = sanitize_text_field($_GET['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //data
            $shipment_id = sanitize_text_field($_GET['shipment_id']);
            //cancel shipment
            $cancel_shipment = cancelTerminalShipment($shipment_id);
            //check if shipment is canceled
            if ($cancel_shipment['code'] == 200) {
                //return
                wp_send_json([
                    'code' => 200,
                    'message' => 'Shipment canceled successfully',
                ]);
            } else {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => $cancel_shipment['message'],
                ]);
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
            ]);
        }
    }

    /**
     * Ajax save_terminal_custom_price_mark_up
     * @return mixed
     * @since 1.10.4
     */
    public function save_terminal_custom_price_mark_up()
    {
        try {
            $nonce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //data
            $percentage = sanitize_text_field($_POST['percentage']);
            //save custom price mark up
            update_option('terminal_custom_price_mark_up', $percentage);
            //check if percentage is empty
            if (empty($percentage)) {
                //return error
                wp_send_json([
                    'code' => 200,
                    'message' => 'Default price mark up saved successfully',
                ]);
            }
            //return
            wp_send_json([
                'code' => 200,
                'message' => 'Custom price mark up saved successfully',
            ]);
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
            ]);
        }
    }

    /**
     * save_terminal_default_currency_code
     * @return mixed
     * @since 1.10.5
     */
    public function save_terminal_default_currency_code()
    {
        try {
            $nonce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //data
            $currency_code = sanitize_text_field($_POST['currency_code']) ?: "NGN";
            //isoCode
            $isoCode = sanitize_text_field($_POST['isocode']) ?: "NG";
            //update default currency code on terminal server
            $update_default_currency_code = updateDefaultCurrencyCode($currency_code);
            //check if currency code is updated
            if ($update_default_currency_code['code'] == 200) {
                //save default currency code
                update_option('terminal_default_currency_code', ['currency_code' => $currency_code, 'isoCode' => $isoCode]);
                //return
                wp_send_json([
                    'code' => 200,
                    'message' => 'Default currency code saved successfully',
                ]);
            } else {
                //return error
                wp_send_json([
                    'code' => 400,
                    'message' => $update_default_currency_code['message'],
                ]);
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
            ]);
        }
    }

    /**
     * Reset carriers data
     */
    public function terminal_reset_carriers_data()
    {
        try {
            $nonce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //check if session is started
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
            //reset carrier data or delete session
            WC()->session->__unset('terminal_africa_carriername');
            WC()->session->__unset('terminal_africa_amount');
            WC()->session->__unset('terminal_africa_duration');
            WC()->session->__unset('terminal_africa_rateid');
            //return
            wp_send_json([
                'code' => 200,
                'message' => 'Carriers data reset successfully',
            ]);
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
            ]);
        }
    }

    /**
     * update_user_carrier_shipment_timeline_terminal
     */
    public function update_user_carrier_shipment_timeline_terminal()
    {
        try {
            $nonce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //status
            $status = sanitize_text_field($_POST['status']);
            //update option
            update_option('terminal_user_carrier_shipment_timeline', $status);
            //return
            wp_send_json([
                'code' => 200,
                'message' => 'Shipment timeline updated successfully',
            ]);
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
            ]);
        }
    }

    /**
     * update_user_carrier_shipment_rate_terminal
     */
    public function update_user_carrier_shipment_rate_terminal()
    {
        try {
            $nonce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //status
            $status = sanitize_text_field($_POST['status']);
            //update option
            update_option('update_user_carrier_shipment_rate_terminal', $status);
            //return
            wp_send_json([
                'code' => 200,
                'message' => 'Shipment rate updated successfully',
            ]);
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
            ]);
        }
    }

    /**
     * update_user_carrier_shipment_insurance_terminal
     */
    public function update_user_carrier_shipment_insurance_terminal()
    {
        try {
            $nonce = sanitize_text_field($_POST['nonce']);
            if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
                wp_send_json([
                    'code' => 400,
                    'message' => 'Wrong nonce, please refresh the page and try again'
                ]);
            }
            //status
            $status = sanitize_text_field($_POST['status']);
            //update option
            update_option('update_user_carrier_shipment_insurance_terminal', $status);
            //return
            wp_send_json([
                'code' => 200,
                'message' => 'Shipment insurance updated successfully',
            ]);
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 400,
                'message' => "Error: " . $e->getMessage(),
            ]);
        }
    }
}
