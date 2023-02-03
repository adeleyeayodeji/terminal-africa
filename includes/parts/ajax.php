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
                'data' => [],
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
}
