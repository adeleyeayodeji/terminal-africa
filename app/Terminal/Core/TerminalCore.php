<?php

namespace App\Terminal\Core;

//security
defined('ABSPATH') or die('No script kiddies please!');
/**
 * Terminal Core
 * @package App\Terminal\Core
 * @since 1.0.0
 * @version 1.0.0
 * @author Terminal Africa
 */
class TerminalCore
{
    //get wc orders where shipment_id exist in metal
    public function get_orders()
    {
        try {
            //get query var terminal_page
            $terminal_page = terminal_param('terminal_page', 1);
            //get terminal africa merchant id
            $terminal_africa_merchant_id = sanitize_text_field(get_option('terminal_africa_merchant_id'));
            //check if mode is live or test
            $mode = 'test';
            //check if class exist TerminalAfricaShippingPlugin
            if (class_exists('TerminalAfricaShippingPlugin')) {
                $TerminalAfricaShippingPlugin = new \TerminalAfricaShippingPlugin();
                if ($TerminalAfricaShippingPlugin::$plugin_mode) {
                    $mode = $TerminalAfricaShippingPlugin::$plugin_mode;
                }
            }
            $args = [
                //post type
                'post_type' => 'shop_order',
                //post status
                'post_status' => ['wc-processing', 'wc-completed', 'wc-on-hold', 'wc-pending'],
                //posts per page
                'posts_per_page' => 10,
                //page 
                'paged' => $terminal_page,
                //meta query
                'meta_query' => [
                    //Terminal_africa_shipment_id
                    [
                        'key' => 'Terminal_africa_shipment_id',
                        'compare' => 'EXISTS',
                    ],
                    //Terminal_africa_rateid
                    [
                        'key' => 'Terminal_africa_rateid',
                        'compare' => 'EXISTS',
                    ],
                    //Terminal_africa_merchant_id 
                    [
                        'key' => 'Terminal_africa_merchant_id',
                        'value' => $terminal_africa_merchant_id,
                        'compare' => '=',
                    ],
                    //Terminal_africa_mode
                    [
                        'key' => 'Terminal_africa_mode',
                        'value' => $mode,
                        'compare' => '=',
                    ],
                ],
            ];
            $orders = get_posts($args);

            return $orders ?: [];
        } catch (\Exception $e) {
            logTerminalError($e);
            return [];
        }
    }

    //getActiveCarrier
    public function getActiveCarrier($carrier_id, $carriers_array_obj, $type)
    {
        try {
            //check if $carriers_array_obj code is not 200
            if ($carriers_array_obj['code'] != 200) {
                return false;
            }
            //get carriers_array_obj
            $carriers_array_obj = $carriers_array_obj['data'];
            //check if carrier_id is in carriers_array_obj
            $carrier = array_filter($carriers_array_obj, function ($carrier) use ($carrier_id) {
                return $carrier->carrier_id == $carrier_id;
            });
            //if carrier_id is in carriers_array_obj
            if ($carrier) {
                //get carrier
                $carrier = array_values($carrier)[0];
                //check if carrier has type enabled
                if ($carrier->{$type}) {
                    //return carrier
                    return true;
                }
            }
            //return false
            return false;
        } catch (\Exception $e) {
            logTerminalError($e);
            return false;
        }
    }

    //sanitize_array
    public function sanitize_array($array)
    {
        try {
            //check if array is not empty
            if (!empty($array)) {
                //loop through array
                foreach ($array as $key => $value) {
                    //check if value is array
                    if (is_array($array)) {
                        //sanitize array
                        $array[$key] = is_array($value) ? $this->sanitize_array($value) : $this->sanitizeDynamic($value);
                    } else {
                        //check if $array is object
                        if (is_object($array)) {
                            //sanitize object
                            $array->$key = $this->sanitizeDynamic($value);
                        } else {
                            //sanitize mixed
                            $array[$key] = $this->sanitizeDynamic($value);
                        }
                    }
                }
            }
            //return array
            return $array;
        } catch (\Exception $e) {
            logTerminalError($e);
            return [];
        }
    }

    //sanitize_object
    public function sanitize_object($object)
    {
        //check if object is not empty
        if (!empty($object)) {
            //loop through object
            foreach ($object as $key => $value) {
                //check if value is array
                if (is_array($value)) {
                    //sanitize array
                    $object->$key = $this->sanitize_array($value);
                } else {
                    //sanitize mixed
                    $object->$key = $this->sanitizeDynamic($value);
                }
            }
        }
        //return object
        return $object;
    }

    //dynamic sanitize
    public function sanitizeDynamic($data)
    {
        $type = gettype($data);
        switch ($type) {
            case 'array':
                return $this->sanitize_array($data);
                break;
            case 'object':
                return $this->sanitize_object($data);
                break;
            default:
                return sanitize_text_field($data);
                break;
        }
    }

    /**
     * Error logs
     * @param \Exception $e
     * @param string $endpoint
     * @return bool
     */
    public function logTerminalError($e, $endpoint = 'none')
    {
        try {
            //get wc current user city
            $city = get_option('woocommerce_store_city');
            //get wc current user state
            $countrystate = get_option('woocommerce_default_country');
            $state = explode(':', $countrystate)[1];
            //get wc current user country
            $country = explode(':', $countrystate)[0];
            //get merchant id
            $terminal_africa_merchant_id = get_option('terminal_africa_merchant_id');
            //terminal_africa_settings
            $terminal_africa_settings = get_option('terminal_africa_settings');
            //request to terminal africa api
            $response = wp_remote_post('https://api.terminal.africa/v1/error-log', [
                'headers' => [
                    'Content-Type' => 'application/json',
                ],
                'body' => json_encode([
                    'endpoint' => $endpoint,
                    'data_sent' => [
                        'city' => $city,
                        'state' => $state,
                        'country' => $country,
                    ],
                    'page' => $_SERVER['REQUEST_URI'],
                    'user_id' => $terminal_africa_merchant_id,
                    'platform' => 'wordpress',
                    'metadata' => [
                        'error' => $e->getMessage(),
                        'file' => $e->getFile(),
                        'line' => $e->getLine(),
                        'terminal_africa_settings' => $terminal_africa_settings,
                        'wordpress_user_id' => get_current_user_id(),
                        'admin_email' => get_option('admin_email'),
                        'site_url' => get_site_url(),
                        'site_name' => get_bloginfo('name'),
                        'site_description' => get_bloginfo('description'),
                    ],
                ]),
            ]);
            //check if response is not an error
            if (is_wp_error($response)) {
                //store
                error_log($response->get_error_message());
            }
            //check if response is not 200
            if (wp_remote_retrieve_response_code($response) != 200) {
                //store
                error_log(wp_remote_retrieve_response_message($response));
            }
            //return true
            return true;
        } catch (\Exception $e) {
            //log error
            error_log($e->getMessage());
            return false;
        }
    }

    /**
     * Error logs for non exceptions data
     * @param string $endpoint
     * @return bool
     */
    public function logTerminalErrorData($data, $endpoint = 'none')
    {
        try {
            //get wc current user city
            $city = get_option('woocommerce_store_city');
            //get wc current user state
            $countrystate = get_option('woocommerce_default_country');
            $state = explode(':', $countrystate)[1];
            //get wc current user country
            $country = explode(':', $countrystate)[0];
            //get merchant id
            $terminal_africa_merchant_id = get_option('terminal_africa_merchant_id');
            //terminal_africa_settings
            $terminal_africa_settings = get_option('terminal_africa_settings');
            //request to terminal africa api
            $response = wp_remote_post('https://api.terminal.africa/v1/error-log', [
                'headers' => [
                    'Content-Type' => 'application/json',
                ],
                'body' => json_encode([
                    'endpoint' => $endpoint,
                    'data_sent' => [
                        'city' => $city,
                        'state' => $state,
                        'country' => $country,
                    ],
                    'page' => $_SERVER['REQUEST_URI'],
                    'user_id' => $terminal_africa_merchant_id,
                    'platform' => 'wordpress',
                    'metadata' => [
                        'data' => $data,
                        'terminal_africa_settings' => $terminal_africa_settings,
                        'wordpress_user_id' => get_current_user_id(),
                        'admin_email' => get_option('admin_email'),
                        'site_url' => get_site_url(),
                        'site_name' => get_bloginfo('name'),
                        'site_description' => get_bloginfo('description'),
                    ],
                ]),
            ]);
            //check if response is not an error
            if (is_wp_error($response)) {
                //store
                error_log($response->get_error_message());
            }
            //check if response is not 200
            if (wp_remote_retrieve_response_code($response) != 200) {
                //store
                error_log(wp_remote_retrieve_response_message($response));
            }
            //return true
            return true;
        } catch (\Exception $e) {
            //log error
            error_log($e->getMessage());
            return false;
        }
    }
}
