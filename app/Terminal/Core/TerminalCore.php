<?php

namespace App\Terminal\Core;

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
}
