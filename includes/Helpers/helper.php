<?php
//security
defined('ABSPATH') or die('No script kiddies please!');

//check if get_terminal_countries function exist
if (!function_exists('get_terminal_countries')) {
    //get terminal country
    function get_terminal_countries()
    {
        return TerminalAfricaShippingPlugin::get_countries();
    }
}

//get_states
if (!function_exists('get_terminal_states')) {
    //get terminal states
    function get_terminal_states($countryCode = "NGA")
    {
        return TerminalAfricaShippingPlugin::get_states($countryCode);
    }
}

//get_terminal_cities
if (!function_exists('get_terminal_cities')) {
    //get terminal cities
    function get_terminal_cities($countryCode = "NG", $state_code = "LA")
    {
        return TerminalAfricaShippingPlugin::get_cities($countryCode, $state_code);
    }
}

//createTerminalAddress
if (!function_exists('createTerminalAddress')) {
    //create terminal address
    function createTerminalAddress($first_name, $last_name, $email, $phone, $line_1, $line_2, $city, $state, $country, $zip_code)
    {
        return TerminalAfricaShippingPlugin::createAddress($first_name, $last_name, $email, $phone, $line_1, $line_2, $city, $state, $country, $zip_code);
    }
}

//updateTerminalAddress
if (!function_exists('updateTerminalAddress')) {
    //update terminal address
    function updateTerminalAddress($merchant_address_id, $first_name, $last_name, $email, $phone, $line_1, $line_2, $city, $state, $country, $zip_code)
    {
        return TerminalAfricaShippingPlugin::updateAddress($merchant_address_id, $first_name, $last_name, $email, $phone, $line_1, $line_2, $city, $state, $country, $zip_code);
    }
}
