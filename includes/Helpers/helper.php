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

//header
if (!function_exists('terminal_header')) {
    //terminal header
    function terminal_header($title, $icon)
    {
        echo TerminalAfricaShippingPlugin::header($title, $icon);
    }
}

//createTerminalParcel
if (!function_exists('createTerminalParcel')) {
    //create terminal parcel
    function createTerminalParcel($body)
    {
        return TerminalAfricaShippingPlugin::createParcel($body);
    }
}

//updateTerminalParcel
if (!function_exists('updateTerminalParcel')) {
    //create terminal parcel
    function updateTerminalParcel($parcel_id, $body)
    {
        return TerminalAfricaShippingPlugin::updateParcel($parcel_id, $body);
    }
}

/**
 * getTerminalParcel
 * @param $parcel_id
 */
if (!function_exists('getTerminalParcel')) {
    //get parcel
    function getTerminalParcel($parcel_id)
    {
        return TerminalAfricaShippingPlugin::getParcel($parcel_id);
    }
}

//createTerminalShipment
if (!function_exists('createTerminalShipment')) {
    //create terminal shipment
    function createTerminalShipment($address_from, $address_to, $parcel_id)
    {
        return TerminalAfricaShippingPlugin::createShipment($address_from, $address_to, $parcel_id);
    }
}

//getTerminalRates
if (!function_exists('getTerminalRates')) {
    //get terminal rates
    function getTerminalRates($shipment_id)
    {
        return TerminalAfricaShippingPlugin::getTerminalRates($shipment_id);
    }
}

//getTerminalRatesvbyAddressId
if (!function_exists('getTerminalRatesvbyAddressId')) {
    //get terminal rates
    function getTerminalRatesvbyAddressId($merchant_address_id, $customer_address_id, $parcel)
    {
        return TerminalAfricaShippingPlugin::getTerminalRates(null, $merchant_address_id, $customer_address_id, $parcel);
    }
}

//getTerminalRateData
if (!function_exists('getTerminalRateData')) {
    //get terminal rate data
    function getTerminalRateData($rate_id, $force = false)
    {
        return TerminalAfricaShippingPlugin::getTerminalRateData($rate_id, $force);
    }
}

//applyTerminalRate($order_id, $rateid, $pickup, $duration, $amount, $carrier_name)
if (!function_exists('applyTerminalRate')) {
    //apply terminal rate
    function applyTerminalRate($order_id, $rateid, $pickup, $duration, $amount, $carrier_name, $carrierlogo)
    {
        return TerminalAfricaShippingPlugin::applyTerminalRate($order_id, $rateid, $pickup, $duration, $amount, $carrier_name, $carrierlogo);
    }
}

//getWalletBalance
if (!function_exists('getWalletBalance')) {
    //get wallet balance
    function getWalletBalance($user_id, $force = false)
    {
        return TerminalAfricaShippingPlugin::getWalletBalance($user_id, $force);
    }
}

//getTerminalCarriers
if (!function_exists('getTerminalCarriers')) {
    //get terminal carriers
    function getTerminalCarriers($type, $force = false)
    {
        return TerminalAfricaShippingPlugin::getTerminalCarriers($type, $force);
    }
}

//enableMultipleCarriers
if (!function_exists('enableMultipleCarriers')) {
    //enable multiple carriers
    function enableMultipleCarriers($carriers)
    {
        return TerminalAfricaShippingPlugin::enableMultipleCarriers($carriers);
    }
}

//disableMultipleCarriers
if (!function_exists('disableMultipleCarriers')) {
    //disable multiple carriers
    function disableMultipleCarriers($carriers)
    {
        return TerminalAfricaShippingPlugin::disableMultipleCarriers($carriers);
    }
}

//getTerminalPackagingData
if (!function_exists('getTerminalPackagingData')) {
    //get terminal packaging data
    function getTerminalPackagingData($force = false)
    {
        return TerminalAfricaShippingPlugin::getTerminalPackagingData($force);
    }
}

//arrangePickupAndDelivery
if (!function_exists('arrangePickupAndDelivery')) {
    //arrange pickup and delivery
    function arrangePickupAndDelivery($shipment_id, $rate_id)
    {
        return TerminalAfricaShippingPlugin::arrangePickupAndDelivery($shipment_id, $rate_id);
    }
}

//getTerminalShipmentStatus
if (!function_exists('getTerminalShipmentStatus')) {
    //get terminal shipment status
    function getTerminalShipmentStatus($shipment_id)
    {
        return TerminalAfricaShippingPlugin::getTerminalShipmentStatus($shipment_id);
    }
}

//getUserCarriers
if (!function_exists('getUserCarriers')) {
    //get user carriers
    function getUserCarriers($type, $force = false)
    {
        return TerminalAfricaShippingPlugin::getUserCarriers($type, $force);
    }
}

//enableSingleCarriers
if (!function_exists('enableSingleCarriers')) {
    //enable single carriers
    function enableSingleCarriers($carrier)
    {
        return TerminalAfricaShippingPlugin::enableSingleCarriers($carrier);
    }
}

//disableSingleCarriers
if (!function_exists('disableSingleCarriers')) {
    //disable single carriers
    function disableSingleCarriers($carrier)
    {
        return TerminalAfricaShippingPlugin::disableSingleCarriers($carrier);
    }
}

//cancelTerminalShipment
if (!function_exists('cancelTerminalShipment')) {
    //cancel terminal shipment
    function cancelTerminalShipment($shipment_id)
    {
        return TerminalAfricaShippingPlugin::cancelTerminalShipment($shipment_id);
    }
}

//TerminalAfricaShippingPlugin::$plugin_mode
if (!function_exists('getTerminalPluginMode')) {
    //get plugin mode
    /**
     * @return string
     */
    function getTerminalPluginMode()
    {
        $signal = new TerminalAfricaShippingPlugin;
        return $signal::$plugin_mode;
    }
}

//TerminalAfricaShippingPlugin::verifyDefaultPackaging
if (!function_exists('verifyDefaultPackaging')) {
    //verify default packaging
    /**
     * @param $packaging_id
     * @return object
     */
    function verifyDefaultPackaging($packaging_id)
    {
        return TerminalAfricaShippingPlugin::verifyDefaultPackaging($packaging_id);
    }
}

//TerminalAfrica\Includes\Parts\Assets::check_checkout_product_for_shipping_support
if (!function_exists('terminal_check_checkout_product_for_shipping_support')) {
    //check checkout product for shipping support
    /**
     * @param $product_id
     * @return bool
     */
    function terminal_check_checkout_product_for_shipping_support()
    {
        return TerminalAfrica\Includes\Parts\Assets::check_checkout_product_for_shipping_support();
    }
}

//updateDefaultCurrencyCode
if (!function_exists('updateDefaultCurrencyCode')) {
    //update default currency code
    /**
     * @param $currency_code
     * @return bool
     */
    function updateDefaultCurrencyCode($currency_code)
    {
        return TerminalAfricaShippingPlugin::updateDefaultCurrencyCode($currency_code);
    }
}

//terminal_param
if (!function_exists('terminal_param')) {
    //terminal param
    /**
     * @param $param
     * @return mixed
     */
    function terminal_param($param, $default = null)
    {
        $request = $_REQUEST;
        return isset($request[$param]) ? $request[$param] : $default;
    }
}


//getTerminalTemplatePart
if (!function_exists('getTerminalTemplatePart')) {
    //get terminal part
    /**
     * @param $part
     * @param $args
     * @return mixed
     */
    function getTerminalTemplatePart($part, $args = [])
    {
        return TerminalAfricaShippingPlugin::getTerminalPart($part, $args);
    }
}

//TerminalAfrica\Includes\Parts\Shipping::getAddressById
if (!function_exists('getTerminalAddressById')) {
    //get address by id
    /**
     * @param $address_id
     * @return mixed
     */
    function getTerminalAddressById($address_id)
    {
        return TerminalAfricaShippingPlugin::getAddressById($address_id);
    }
}

if (!function_exists('terminal_autoload_merchant_address')) {
    //autoload merchant address
    /**
     * @param $address_id
     * @return mixed
     */
    function terminal_autoload_merchant_address()
    {
        return WC_Terminal_Delivery::terminal_autoload_merchant_address();
    }
}

//terminalAfricaAddresses
if (!function_exists('terminalAfricaAddresses')) {
    //terminal africa addresses
    /**
     * @param int $perpage 
     * @param mixed $page
     * @return mixed
     */
    function terminalAfricaAddresses($perpage = 25, $page = 1)
    {
        return TerminalAfricaShippingPlugin::getAddresses($perpage, $page);
    }
}

/**
 * $allowed_order_statuses
 */
$GLOBALS['terminal_allowed_order_statuses'] = TerminalAfricaShippingPlugin::$allowed_order_statuses;
