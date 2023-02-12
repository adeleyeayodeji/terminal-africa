<?php

namespace App\Terminal\Core;

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
}
