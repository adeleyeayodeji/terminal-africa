<?php

use App\Terminal\Core\TerminalCore;

//getTerminalOrders
//check if function exists
/**
 * Get terminal orders
 * @return array
 */
if (!function_exists('getTerminalOrders')) {
    function getTerminalOrders()
    {
        $terminal_core = new TerminalCore();
        return $terminal_core->get_orders();
    }
}

//getActiveCarrier
//check if function exists
/**
 * Get active carrier
 * @param $carrier_id
 * @param $carriers_array_obj
 * @param $type
 * @return bool
 */
if (!function_exists('getActiveCarrier')) {
    function getActiveCarrier($carrier_id, $carriers_array_obj, $type)
    {
        $terminal_core = new TerminalCore();
        return $terminal_core->getActiveCarrier($carrier_id, $carriers_array_obj, $type);
    }
}

//getTerminalTemplate
//check if function exists
/**
 * Get terminal template
 * @param $template
 * @param array $data
 * @return string
 */
if (!function_exists('getTerminalTemplate')) {
    function getTerminalTemplate($template, $data = [])
    {
        return \App\Terminal\Core\TemplateLoader::get($template, $data);
    }
}
