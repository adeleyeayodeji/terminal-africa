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
            'post_type' => 'shop_order',
            'post_status' => ['wc-processing', 'wc-completed', 'wc-on-hold', 'wc-pending'],
            'posts_per_page' => 10,
            //page 
            'paged' => 1,
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
    }

    //getActiveCarrier
    public function getActiveCarrier($carrier_id, $carriers_array_obj, $type)
    {
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
    }

    //sanitize_array
    public function sanitize_array($array)
    {
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
}
