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
