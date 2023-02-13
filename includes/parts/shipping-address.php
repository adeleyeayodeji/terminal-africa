<?php

namespace TerminalAfrica\Includes\Parts;

//security
defined('ABSPATH') or die('No script kiddies please!');

use Requests;

trait Shipping
{
    //get countries
    public static function get_countries()
    {
        //check if self::$skkey
        if (!self::$skkey) {
            return [];
        }
        //check if terminal_africa_countries is set
        if ($data = get_option('terminal_africa_countries')) {
            //return countries
            return $data;
        }
        //get countries
        $response  = Requests::get(self::$enpoint . 'countries', [
            'Authorization' => 'Bearer ' . self::$skkey,
        ]);
        //check if response is ok
        if ($response->status_code == 200) {
            //return countries
            $body = json_decode($response->body);
            $data = $body->data;
            //save raw data
            update_option('terminal_africa_countries', $data);
            //return data
            return $data;
        }
        return [];
    }

    //get states
    public static function get_states($countryCode = "NG")
    {
        //check if self::$skkey
        if (!self::$skkey) {
            return [
                'code' => 404,
                'message' => "Invalid API Key",
                'data' => [],
            ];
        }
        //check if terminal_africa_states.$countryCode is set
        if ($data = get_option('terminal_africa_states' . $countryCode)) {
            //return countries
            return [
                'code' => 200,
                'message' => 'success',
                'data' => $data,
            ];
        }
        //get countries
        $response = Requests::get(self::$enpoint . 'states?country_code=' . $countryCode, [
            'Authorization' => 'Bearer ' . self::$skkey,
            'Content-Type' => 'application/json'
        ]);
        $body = json_decode($response->body);
        //check if response is ok
        if ($response->status_code == 200) {
            //return countries
            $data = $body->data;
            //save raw data
            update_option('terminal_africa_states' . $countryCode, $data);
            //return data
            return [
                'code' => 200,
                'message' => 'success',
                'data' => $data,
            ];
        } else {
            return [
                'code' => $response->status_code,
                'message' => $body->message,
                'data' => [],
            ];
        }
    }

    //get cities
    public static function get_cities($countryCode = "NG", $state_code = "LA")
    {
        //if session is not started start it
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        //check if terminal_africa_cities.$countryCode.$state_code is set
        if (isset($_SESSION['terminal_africa_cities'][$countryCode][$state_code])) {
            //return countries
            return [
                'code' => 200,
                'message' => 'success',
                'data' => $_SESSION['terminal_africa_cities'][$countryCode][$state_code],
            ];
        }
        //check if self::$skkey
        if (!self::$skkey) {
            return [
                'code' => 404,
                'message' => "Invalid API Key",
                'data' => [],
            ];
        }
        //sanitize countryCode
        $countryCode = sanitize_text_field($countryCode);
        //sanitize state_code
        $state_code = sanitize_text_field($state_code);
        $query = [
            'country_code' => $countryCode,
            'state_code' => $state_code,
        ];
        //query builder
        $query = http_build_query($query);
        //get cities
        $response = Requests::get(self::$enpoint . 'cities?' . $query, [
            'Authorization' => 'Bearer ' . self::$skkey,
        ]);
        $body = json_decode($response->body);
        //check if response is ok
        if ($response->status_code == 200) {
            //return countries
            $data = $body->data;
            // save to session
            $_SESSION['terminal_africa_cities'][$countryCode][$state_code] = $data;
            //return data
            return [
                'code' => 200,
                'message' => 'success',
                'data' => $data,
            ];
        } else {
            return [
                'code' => $response->status_code,
                'message' => $body->message,
                'data' => [],
            ];
        }
    }

    //woocommerce_countries
    public static function woocommerce_countries($countries)
    {
        //get countries
        $countries_raw = self::get_countries();
        //check if countries is not empty
        if (!empty($countries_raw)) {
            //empty countries
            $countries = [];
            //loop through countries
            foreach ($countries_raw as $country) {
                //add country to countries array
                $countries[$country->isoCode] = $country->name . ' (' . $country->isoCode . ')';
            }
        }
        return $countries;
    }

    //woocommerce_states
    public static function woocommerce_states($states)
    {
        //get states
        $states_raw = self::get_states();
        //check if states is not empty
        if ($states_raw['code'] != 200) {
            //return states
            return $states;
        }
        //empty states
        $states_d = [];
        //check if states is not empty
        if (!empty($states_raw['data'])) {
            //loop through states
            foreach ($states_raw['data'] as $state) {
                //add state to states array
                $states_d[$state->isoCode] = $state->name;
            }
        }
        $states["NG"] = $states_d;
        return $states;
    }

    //create address
    public static function createAddress($first_name, $last_name, $email, $phone, $line_1, $line_2, $city, $state, $country, $zip_code)
    {
        if (!self::$skkey) {
            return [
                'code' => 404,
                'message' => "Invalid API Key",
                'data' => [],
            ];
        }

        $response = Requests::post(
            self::$enpoint . 'addresses',
            [
                'Authorization' => 'Bearer ' . self::$skkey,
                'Content-Type' => 'application/json'
            ],
            json_encode([
                'first_name' => $first_name,
                'last_name' => $last_name,
                'email' => $email,
                'phone' => $phone,
                'line1' => $line_1,
                'line2' => $line_2,
                'city' => $city,
                'state' => $state,
                'country' => $country,
                'zip' => $zip_code,
            ]),
            //time out 60 seconds
            ['timeout' => 60]
        );
        $body = json_decode($response->body);
        //check if response is ok
        if ($response->status_code == 200) {
            //return countries
            $data = $body->data;
            //return data
            return [
                'code' => 200,
                'message' => 'success',
                'data' => $data,
            ];
        } else {
            return [
                'code' => $response->status_code,
                'message' => $body->message,
                'data' => [],
            ];
        }
    }

    //update address
    public static function updateAddress($merchant_address_id, $first_name, $last_name, $email, $phone, $line_1, $line_2, $city, $state, $country, $zip_code)
    {
        if (!self::$skkey) {
            return [
                'code' => 404,
                'message' => "Invalid API Key",
                'data' => [],
            ];
        }

        //check if merchant_address_id is empty
        if (empty($merchant_address_id)) {
            return [
                'code' => 404,
                'message' => "Invalid merchant_address_id",
                'data' => [],
            ];
        }

        //request 
        $response = Requests::put(
            self::$enpoint . 'addresses/' . $merchant_address_id,
            [
                'Authorization' => 'Bearer ' . self::$skkey,
                'Content-Type' => 'application/json'
            ],
            json_encode([
                'first_name' => $first_name,
                'last_name' => $last_name,
                'email' => $email,
                'phone' => $phone,
                'line1' => $line_1,
                'line2' => $line_2,
                'city' => $city,
                'state' => $state,
                'country' => $country,
                'zip' => $zip_code,
            ]), //time out 60 seconds
            ['timeout' => 60]
        );
        //decode response
        $body = json_decode($response->body);
        //check if response is ok
        if ($response->status_code == 200) {
            //return countries
            $data = $body->data;
            //return data
            return [
                'code' => 200,
                'message' => 'success',
                'data' => $data,
            ];
        } else {
            return [
                'code' => $response->status_code,
                'message' => $body->message,
                'data' => [],
            ];
        }
    }

    //create parcel
    public static function createParcel($body)
    {
        if (!self::$skkey) {
            return [
                'code' => 404,
                'message' => "Invalid API Key",
                'data' => [],
            ];
        }

        $response = Requests::post(
            self::$enpoint . 'parcels',
            [
                'Authorization' => 'Bearer ' . self::$skkey,
                'Content-Type' => 'application/json'
            ],
            json_encode(
                $body
            ),
            //time out 60 seconds
            ['timeout' => 60]
        );
        $body = json_decode($response->body);
        //check if response is ok
        if ($response->status_code == 200) {
            //return countries
            $data = $body->data;
            //return data
            return [
                'code' => 200,
                'message' => 'success',
                'data' => $data,
            ];
        } else {
            return [
                'code' => $response->status_code,
                'message' => $body->message,
                'data' => [],
            ];
        }
    }

    //update parcel
    public static function updateParcel($parcel_id, $body)
    {
        if (!self::$skkey) {
            return [
                'code' => 404,
                'message' => "Invalid API Key",
                'data' => [],
            ];
        }

        $response = Requests::put(
            self::$enpoint . 'parcels' . "/" . $parcel_id,
            [
                'Authorization' => 'Bearer ' . self::$skkey,
                'Content-Type' => 'application/json'
            ],
            json_encode(
                $body
            ),
            //time out 60 seconds
            ['timeout' => 60]
        );
        $body = json_decode($response->body);
        //check if response is ok
        if ($response->status_code == 200) {
            //return countries
            $data = $body->data;
            //return data
            return [
                'code' => 200,
                'message' => 'success',
                'data' => $data,
            ];
        } else {
            return [
                'code' => $response->status_code,
                'message' => $body->message,
                'data' => [],
            ];
        }
    }

    //createShipment
    public static function createShipment($address_from, $address_to, $parcel_id)
    {
        if (!self::$skkey) {
            return [
                'code' => 404,
                'message' => "Invalid API Key",
                'data' => [],
            ];
        }

        $response = Requests::post(
            self::$enpoint . 'shipments',
            [
                'Authorization' => 'Bearer ' . self::$skkey,
                'Content-Type' => 'application/json'
            ],
            json_encode(
                [
                    'address_from' => $address_from,
                    'address_to' => $address_to,
                    'parcel' => $parcel_id,
                ]
            ),
            //time out 60 seconds
            ['timeout' => 60]
        );
        $body = json_decode($response->body);
        //check if response is ok
        if ($response->status_code == 200) {
            //return countries
            $data = $body->data;
            //return data
            return [
                'code' => 200,
                'message' => 'success',
                'data' => $data,
            ];
        } else {
            return [
                'code' => $response->status_code,
                'message' => $body->message,
                'data' => [],
            ];
        }
    }

    //getTerminalRates
    public static function getTerminalRates($shipment_id)
    {
        if (!self::$skkey) {
            return [
                'code' => 404,
                'message' => "Invalid API Key",
                'data' => [],
            ];
        }
        //query
        $query = [
            'shipment_id' => $shipment_id,
        ];
        $query = http_build_query($query);
        $response = Requests::get(
            self::$enpoint . 'rates/shipment?' . $query,
            [
                'Authorization' => 'Bearer ' . self::$skkey,
                'Content-Type' => 'application/json'
            ],
            //time out 60 seconds
            ['timeout' => 60]
        );
        $body = json_decode($response->body);
        //check if response is ok
        if ($response->status_code == 200) {
            //return countries
            $data = $body->data;
            //return data
            return [
                'code' => 200,
                'message' => 'success',
                'data' => $data,
            ];
        } else {
            return [
                'code' => $response->status_code,
                'message' => $body->message,
                'data' => [],
            ];
        }
    }

    //getTerminalRateData
    public static function getTerminalRateData($rate_id)
    {
        //if session is not started start it
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        //check if data is in session
        if (isset($_SESSION['ratedata'][$rate_id])) {
            return [
                'code' => 200,
                'message' => 'success',
                'data' => $_SESSION['ratedata'][$rate_id],
                'from' => 'session',
            ];
        }
        //check if api key is valid
        if (!self::$skkey) {
            return [
                'code' => 404,
                'message' => "Invalid API Key",
                'data' => [],
            ];
        }
        $response = Requests::get(
            self::$enpoint . 'rates/' . $rate_id,
            [
                'Authorization' => 'Bearer ' . self::$skkey,
                'Content-Type' => 'application/json'
            ],
            //time out 60 seconds
            ['timeout' => 60]
        );
        $body = json_decode($response->body);
        //check if response is ok
        if ($response->status_code == 200) {
            //return countries
            $data = $body->data;
            //save data to session
            $_SESSION['ratedata'][$rate_id] = $data;
            //return data
            return [
                'code' => 200,
                'message' => 'success',
                'data' => $data,
                'from' => 'api',
            ];
        } else {
            return [
                'code' => $response->status_code,
                'message' => $body->message,
                'data' => [],
                'from' => 'api',
            ];
        }
    }

    //applyTerminalRate($order_id, $rateid, $pickup, $duration, $amount, $carrier_name)
    public static function applyTerminalRate($order_id, $rateid, $pickup, $duration, $amount, $carrier_name)
    {
        //wc order
        $order = wc_get_order($order_id);
        //check if order is valid
        if (!$order) {
            return [
                'code' => 404,
                'message' => "Invalid Order",
                'data' => [],
            ];
        }
        //check if $amount is string
        if (is_string($amount)) {
            $amount = (float) $amount;
        }
        $items    = (array) $order->get_items('shipping');
        // // Loop through shipping items
        foreach ($items as $item) {
            //get shipping method id
            $shipping_method_id = $item->get_method_id();
            //if shipping method id is terminal_delivery
            if ($shipping_method_id == "terminal_delivery") {
                $item->set_method_title(__("Terminal Delivery - $carrier_name"));
                $item->set_total($amount);
                //update item meta
                $item->update_meta_data('duration', $duration, true);
                $item->update_meta_data('carrier', $carrier_name, true);
                $item->update_meta_data('amount', $amount, true);
                $item->update_meta_data('rate_id', $rateid, true);
                $item->update_meta_data('pickup_time', $pickup, true);
                $item->save();
            }
        }
        //calculate totals
        $order->calculate_totals();
        //update meta
        update_post_meta($order_id, 'Terminal_africa_carriername', $carrier_name);
        update_post_meta($order_id, 'Terminal_africa_amount', $amount);
        update_post_meta($order_id, 'Terminal_africa_duration', $duration);
        update_post_meta($order_id, 'Terminal_africa_rateid', $rateid);
        update_post_meta($order_id, 'Terminal_africa_pickuptime', $pickup);
        //url
        $shipment_id = get_post_meta($order_id, 'Terminal_africa_shipment_id', true);
        //shipping url
        $plugin_url = admin_url('admin.php?page=terminal-africa');
        //arg
        $arg = array(
            'page' => 'terminal-africa',
            'action' => 'edit',
            'id' => esc_html($shipment_id),
            'order_id' => esc_html($order_id),
            'rate_id' => esc_html($rateid),
            'nonce' => wp_create_nonce('terminal_africa_edit_shipment')
        );
        $plugin_url = add_query_arg($arg, $plugin_url);
        //return data
        return [
            'code' => 200,
            'message' => 'success',
            'data' => [],
            'url' => $plugin_url,
        ];
    }
}
