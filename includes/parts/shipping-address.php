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
            ])
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
        $response = Requests::put(self::$enpoint . 'addresses/' . $merchant_address_id, [
            'Authorization' => 'Bearer ' . self::$skkey,
            'Content-Type' => 'application/json'
        ], json_encode([
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
        ]));
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
            )
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
            )
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
}
