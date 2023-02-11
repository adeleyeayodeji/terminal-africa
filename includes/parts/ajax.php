<?php

namespace TerminalAfrica\Includes\Parts;

//security
defined('ABSPATH') or die('No script kiddies please!');

use Requests;

trait Ajax
{
    //terminal_africa_auth
    public function terminal_africa_auth()
    {
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
            update_option('terminal_africa_settings', $settings);
            //terminal_africa_merchant_id
            update_option('terminal_africa_merchant_id', $body->data->user->user_id);
            //get shipping settings
            $settings = get_option('woocommerce_terminal_delivery_settings');
            //update shipping settings
            $settings['enabled'] = 'yes';
            update_option('woocommerce_terminal_delivery_settings', $settings);
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
    }

    //checkKeys
    public function checkKeys($pk, $sk)
    {
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
    }

    //terminal_merchant_save_address
    public function terminal_merchant_save_address()
    {
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
    }

    //terminal_africa_get_states
    public function terminal_africa_get_states()
    {
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
    }

    //terminal_africa_get_cities
    public function terminal_africa_get_cities()
    {
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
    }

    //terminal_africa_sign_out
    public static function terminal_africa_sign_out()
    {
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
            'message' => 'Signed out successfully',
        ]);
    }

    //terminal_africa_enable_terminal
    public static function terminal_africa_enable_terminal()
    {
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
    }

    //terminal_africa_save_cart_item
    public function terminal_africa_save_cart_item()
    {
        $nonce = sanitize_text_field($_POST['nonce']);
        if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
            wp_send_json([
                'code' => 400,
                'message' => 'Wrong nonce, please refresh the page and try again'
            ]);
        }
        //get cart item
        global $woocommerce;
        $cart_item = $woocommerce->cart->get_cart();
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
                'quantity' => $item['quantity'],
                'value' => $item['line_total'],
                'description' => "{$item['quantity']} of {$item['data']->get_name()} at {$item['data']->get_price()} each for a total of {$item['line_total']}",
                'type' => 'parcel',
                'currency' => get_woocommerce_currency(),
                'weight' => $item['data']->get_weight() ?: 0.1,
            ];
        }
        //arrange parcel
        $parcel = [
            'packaging' => "PA-88484599859",
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
                    'message' => 'Parcel updated successfully',
                ]);
            } else {
                wp_send_json([
                    'code' => 400,
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
                'code' => 400,
                'message' => $response['message']
            ]);
        }
    }

    //terminal_africa_process_terminal_rates
    public function terminal_africa_process_terminal_rates()
    {
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
        $phone = sanitize_text_field($_POST['phone']);
        //check if + is in $phone
        if (strpos("+", $phone) === false) {
            //add + and remove first number
            $phone = substr($phone, 1);
            //add + to phone
            $phone = "+234" . $phone;
        }
        $email = sanitize_text_field($_POST['email']);
        $line_2 = "";
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
            //get shipment_id
            $shipment_id = WC()->session->get('terminal_africa_shipment_id' . $email);
            //check if shipment_id is empty
            if (empty($shipment_id)) {
                //create shipment
                $create_shipment = createTerminalShipment($address_from, $address_to, $parcel);
                //check if shipment is created
                if ($create_shipment['code'] == 200) {
                    //wc session
                    WC()->session->set('terminal_africa_shipment_id' . $email, $create_shipment['data']->shipment_id);
                    $shipment_id = $create_shipment['data']->shipment_id;
                } else {
                    //wc notice
                    wc_add_notice($create_shipment['message'], 'error');
                    //return error
                    wp_send_json([
                        'code' => 400,
                        'message' => $create_shipment['message'],
                        'endpoint' => 'create_shipment'
                    ]);
                }
            }
            //get rates
            $get_rates = getTerminalRates($shipment_id);
            //check if rates is gotten
            if ($get_rates['code'] == 200) {
                //return
                wp_send_json([
                    'code' => 200,
                    'message' => 'Rates gotten successfully',
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
    }

    //terminal_africa_save_shipping_carrier
    public function terminal_africa_save_shipping_carrier()
    {
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
        //wc session
        WC()->session->set('terminal_africa_carriername', $carriername);
        WC()->session->set('terminal_africa_amount', $amount);
        WC()->session->set('terminal_africa_duration', $duration);
        WC()->session->set('terminal_africa_guest_email', $email);
        WC()->session->set('terminal_africa_rateid', $rateid);
        //return
        wp_send_json([
            'code' => 200,
            'message' => 'Carrier saved successfully'
        ]);
    }
}
