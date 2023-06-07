<?php

use TerminalAfrica\Includes\Parts\Menus;
use TerminalAfrica\Includes\Parts\Ajax;
use TerminalAfrica\Includes\Parts\Shipping;
use TerminalAfrica\Includes\Parts\Activation;
use TerminalAfrica\Includes\Parts\Assets;
//security
defined('ABSPATH') or die('No script kiddies please!');
//class
/**
 * TerminalAfricaShippingPlugin
 * @package TerminalAfrica
 * @since 1.0.0
 * @version 1.0.0
 * @author Terminal Africa
 */
class TerminalAfricaShippingPlugin
{
    //skkey
    public static $skkey;
    public static $enpoint;
    public static $plugin_mode;

    use Menus, Ajax, Shipping, Activation, Assets;

    public function __construct()
    {
        //check if terminal_africa_settings is set
        if ($settings = get_option("terminal_africa_settings")) {
            //set skkey
            self::$skkey = $settings["secret_key"];
            $validate_keys = $this->checkKeys($settings["public_key"], $settings["secret_key"]);
            self::$enpoint = $validate_keys['endpoint'];
            self::$plugin_mode = $validate_keys['mode'];
        } else {
            self::$skkey = null;
            self::$enpoint = null;
            self::$plugin_mode = null;
        }
    }
    public function init()
    {
        //add settings page
        add_action('admin_menu', array(self::class, 'add_settings_page'), PHP_INT_MAX);
        //woocommerce_countries
        add_filter('woocommerce_countries', array(self::class, 'woocommerce_countries'), PHP_INT_MAX);
        //woocommerce_states
        add_filter('woocommerce_states', array(self::class, 'woocommerce_states'), PHP_INT_MAX);
        //plugin loaded
        add_action('plugins_loaded', array(self::class, 'activate'), PHP_INT_MAX);
        //enqueue scripts
        add_action('admin_enqueue_scripts', array(self::class, 'enqueue_scripts'), PHP_INT_MAX);
        //enqueue scripts
        add_action('wp_enqueue_scripts', array(self::class, 'enqueue_frontend_script'), 1);
        //ajax terminal_africa_auth
        add_action('wp_ajax_terminal_africa_auth', array($this, 'terminal_africa_auth'));
        add_action('wp_ajax_nopriv_terminal_africa_auth', array($this, 'terminal_africa_auth'));
        //ajax terminal_merchant_save_address
        add_action('wp_ajax_terminal_merchant_save_address', array($this, 'terminal_merchant_save_address'));
        add_action('wp_ajax_nopriv_terminal_merchant_save_address', array($this, 'terminal_merchant_save_address'));
        //get states
        add_action('wp_ajax_terminal_africa_get_states', array($this, 'terminal_africa_get_states'));
        add_action('wp_ajax_nopriv_terminal_africa_get_states', array($this, 'terminal_africa_get_states'));
        //ajax terminal_africa_get_cities
        add_action('wp_ajax_terminal_africa_get_cities', array($this, 'terminal_africa_get_cities'));
        add_action('wp_ajax_nopriv_terminal_africa_get_cities', array($this, 'terminal_africa_get_cities'));
        //ajax terminal_africa_sign_out
        add_action('wp_ajax_terminal_africa_sign_out', array(self::class, 'terminal_africa_sign_out'));
        add_action('wp_ajax_nopriv_terminal_africa_sign_out', array(self::class, 'terminal_africa_sign_out'));
        //ajax terminal_africa_enable_terminal
        add_action('wp_ajax_terminal_africa_enable_terminal', array(self::class, 'terminal_africa_enable_terminal'));
        add_action('wp_ajax_nopriv_terminal_africa_enable_terminal', array(self::class, 'terminal_africa_enable_terminal'));
        //wp head
        add_action('wp_head', array(self::class, 'wp_head_checkout'), PHP_INT_MAX);
        add_action('woocommerce_checkout_update_order_review', array($this, 'checkout_update_refresh_shipping_methods'), PHP_INT_MAX, 1);
        //ajax terminal_africa_save_cart_item
        add_action('wp_ajax_terminal_africa_save_cart_item', array($this, 'terminal_africa_save_cart_item'));
        add_action('wp_ajax_nopriv_terminal_africa_save_cart_item', array($this, 'terminal_africa_save_cart_item'));
        //ajax terminal_africa_process_terminal_rates
        add_action('wp_ajax_terminal_africa_process_terminal_rates', array($this, 'terminal_africa_process_terminal_rates'));
        add_action('wp_ajax_nopriv_terminal_africa_process_terminal_rates', array($this, 'terminal_africa_process_terminal_rates'));
        //ajax terminal_africa_save_shipping_carrier
        add_action('wp_ajax_terminal_africa_save_shipping_carrier', array($this, 'terminal_africa_save_shipping_carrier'));
        add_action('wp_ajax_nopriv_terminal_africa_save_shipping_carrier', array($this, 'terminal_africa_save_shipping_carrier'));
        //ajax get rate data
        add_action('wp_ajax_terminal_africa_get_rate_data', array($this, 'terminal_africa_get_rate_data'));
        add_action('wp_ajax_nopriv_terminal_africa_get_rate_data', array($this, 'terminal_africa_get_rate_data'));
        //ajax terminal_customer_save_address
        add_action('wp_ajax_terminal_customer_save_address', array($this, 'terminal_customer_save_address'));
        add_action('wp_ajax_nopriv_terminal_customer_save_address', array($this, 'terminal_customer_save_address'));
        //ajax terminal_africa_process_terminal_rates_customer
        add_action('wp_ajax_terminal_africa_process_terminal_rates_customer', array($this, 'terminal_africa_process_terminal_rates_customer'));
        add_action('wp_ajax_nopriv_terminal_africa_process_terminal_rates_customer', array($this, 'terminal_africa_process_terminal_rates_customer'));
        //ajax terminal_africa_apply_terminal_rates_customer
        add_action('wp_ajax_terminal_africa_apply_terminal_rates_customer', array($this, 'terminal_africa_apply_terminal_rates_customer'));
        add_action('wp_ajax_nopriv_terminal_africa_apply_terminal_rates_customer', array($this, 'terminal_africa_apply_terminal_rates_customer'));
        //ajax terminal_africa_arrange_terminal_delivery
        add_action('wp_ajax_terminal_africa_arrange_terminal_delivery', array($this, 'terminal_africa_arrange_terminal_delivery'));
        add_action('wp_ajax_nopriv_terminal_africa_arrange_terminal_delivery', array($this, 'terminal_africa_arrange_terminal_delivery'));
        //refresh_terminal_wallet
        add_action('wp_ajax_refresh_terminal_wallet', array($this, 'refresh_terminal_wallet'));
        add_action('wp_ajax_nopriv_refresh_terminal_wallet', array($this, 'refresh_terminal_wallet'));
        //refresh_terminal_rate_data
        add_action('wp_ajax_refresh_terminal_rate_data', array($this, 'refresh_terminal_rate_data'));
        add_action('wp_ajax_nopriv_refresh_terminal_rate_data', array($this, 'refresh_terminal_rate_data'));
        //ajax save_terminal_carrier_settings
        add_action('wp_ajax_save_terminal_carrier_settings', array($this, 'save_terminal_carrier_settings'));
        add_action('wp_ajax_nopriv_save_terminal_carrier_settings', array($this, 'save_terminal_carrier_settings'));
        //ajax refresh_terminal_carriers_data
        add_action('wp_ajax_refresh_terminal_carriers_data', array($this, 'refresh_terminal_carriers_data'));
        add_action('wp_ajax_nopriv_refresh_terminal_carriers_data', array($this, 'refresh_terminal_carriers_data'));
        //ajax get_terminal_packaging
        add_action('wp_ajax_get_terminal_packaging', array($this, 'get_terminal_packaging'));
        add_action('wp_ajax_nopriv_get_terminal_packaging', array($this, 'get_terminal_packaging'));
        //ajax get_terminal_shipment_status
        add_action('wp_ajax_get_terminal_shipment_status', array($this, 'get_terminal_shipment_status'));
        add_action('wp_ajax_nopriv_get_terminal_shipment_status', array($this, 'get_terminal_shipment_status'));
        //ajax update user carrier
        add_action('wp_ajax_update_user_carrier_terminal', array($this, 'update_user_carrier_terminal'));
        add_action('wp_ajax_nopriv_update_user_carrier_terminal', array($this, 'update_user_carrier_terminal'));
        // add_action('woocommerce_add_to_cart', array($this, 'remove_wc_session_on_cart_action'), 10, 6);
        //ajax deactivate_terminal_africa
        add_action('wp_ajax_deactivate_terminal_africa', array(self::class, 'deactivate_terminal_africa'));
        add_action('wp_ajax_nopriv_deactivate_terminal_africa', array(self::class, 'deactivate_terminal_africa'));
        //ajax cancel_terminal_shipment
        add_action('wp_ajax_cancel_terminal_shipment', array(self::class, 'cancel_terminal_shipment'));
        add_action('wp_ajax_nopriv_cancel_terminal_shipment', array(self::class, 'cancel_terminal_shipment'));
        //add ajax save_terminal_custom_price_mark_up
        add_action('wp_ajax_save_terminal_custom_price_mark_up', array($this, 'save_terminal_custom_price_mark_up'));
        add_action('wp_ajax_nopriv_save_terminal_custom_price_mark_up', array($this, 'save_terminal_custom_price_mark_up'));
        //listen to add to cart
        add_action('woocommerce_add_to_cart', array($this, 'add_to_cart_event'), 10, 6);
        //listen to update cart
        // add_action('woocommerce_after_cart_item_quantity_update', array($this, 'update_cart_event'), 10, 3);
        //listen to remove cart
        add_action('woocommerce_cart_item_removed', array($this, 'remove_cart_event'), 10, 2);
    }

    /**
     * Added to cart event
     * @param $cart_item_key
     * @param $product_id
     * @param $quantity
     * @param $variation_id
     * @param $variation
     * @param $cart_item_data
     * @since 1.10.5
     * @return void
     */
    public function add_to_cart_event($cart_item_key, $product_id, $quantity, $variation_id, $variation, $cart_item_data)
    {
        //create or update terminal parcel
        $this->terminal_africa_save_cart_item_event();
    }

    /**
     * Update cart event
     * @param $cart_item_key
     * @param $quantity
     * @param $old_quantity
     * @since 1.10.5
     * @return void
     */
    public function update_cart_event($cart_item_key, $quantity, $old_quantity)
    {
        //create or update terminal parcel
        $this->terminal_africa_save_cart_item_event();
    }

    /**
     * Remove cart event
     * @param $cart_item_key
     * @param $cart
     * @since 1.10.5
     * @return void
     */
    public function remove_cart_event($cart_item_key, $cart)
    {
        //create or update terminal parcel
        $this->terminal_africa_save_cart_item_event("removed");
    }

    public function checkout_update_refresh_shipping_methods($post_data)
    {
        //update shipping pricing realtime
        $packages = WC()->cart->get_shipping_packages();
        foreach ($packages as $package_key => $package) {
            WC()->session->set('shipping_for_package_' . $package_key, false); // Or true
        }
    }

    /**
     * Process terminal parcel on cart event
     * @since 1.10.5
     * @return void
     */
    public function terminal_africa_save_cart_item_event($type = null)
    {
        //terminal_check_checkout_product_for_shipping_support
        $check_shipping_support = terminal_check_checkout_product_for_shipping_support();
        ///check if check_shipping_support is "false"
        if ($check_shipping_support === "false") {
            //check if type is remove 
            if (!empty($type) && $type == "removed") {
                //do nothing
            } else {
                //return
                return;
            }
        }

        //recaculate cart total
        WC()->cart->calculate_totals();

        //get cart item
        $cart_item = WC()->cart->get_cart();
        //check if type is remove 
        if (!empty($type) && $type == "removed") {
            //do nothing
        } else {
            //check if cart item is empty
            if (empty($cart_item)) {
                //do nothing
                return;
            }
        }

        $data_items = [];
        //loop through cart items
        foreach ($cart_item as $item) {
            $data_items[] = [
                'name' => $item['data']->get_name(),
                'quantity' => $item['quantity'],
                'value' => $item['line_total'],
                'description' => "{$item['quantity']} of {$item['data']->get_name()} at {$item['data']->get_price()} each for a total of {$item['line_total']}",
                'type' => 'parcel',
                'currency' => get_woocommerce_currency(),
                'weight' => (float)$item['data']->get_weight() ?: 0.1,
            ];
        }
        //check if terminal_default_packaging_id is set
        $packaging_id = get_option('terminal_default_packaging_id');
        //verify packaging id
        $verifyDefaultPackaging = verifyDefaultPackaging($packaging_id);
        //check if verifyDefaultPackaging is 200
        if ($verifyDefaultPackaging['code'] != 200) {
            //do nothing
            return;
        }
        //get new packaging id
        $packaging_id = $verifyDefaultPackaging['packaging_id'];
        //arrange parcel
        $parcel = [
            'packaging' => $packaging_id,
            'weight_unit' => 'kg',
            'items' => $data_items,
            'description' => 'Order from ' . get_bloginfo('name'),
        ];
        //check if terminal_africa_parcel_id is set
        $parcel_id = WC()->session->get('terminal_africa_parcel_id');
        if (!empty($parcel_id)) {
            //update parcel
            $response = updateTerminalParcel($parcel_id, $parcel);
            //check if response is 200
            if ($response['code'] == 200) {
                //do nothing
                return;
            } else {
                //do nothing
                return;
            }
        }
        //post request
        $response = createTerminalParcel($parcel);
        //check if response is 200
        if ($response['code'] == 200) {
            //save parcel wc session
            WC()->session->set('terminal_africa_parcel_id', $response['data']->parcel_id);
            //packaging wc session
            WC()->session->set('terminal_africa_packaging_id', $response['data']->packaging);
            //do nothing
            return;
        } else {
            //do nothing
            return;
        }
    }

    //remove_wc_session_on_cart_action
    public function remove_wc_session_on_cart_action($cart_item_key, $product_id, $quantity, $variation_id, $variation, $cart_item_data)
    {
        //check if func exist
        if (function_exists('WC')) {
            $sessions = WC()->session->get_session_data();
            //loop through sessions
            foreach ($sessions as $key => $value) {
                //check if session is terminal_africa
                if (strpos($key, 'terminal_africa') !== false) {
                    //remove session
                    WC()->session->__unset($key);
                }
            }
        }
    }
}

//init
$TerminalAfricaShippingPlugin = new TerminalAfricaShippingPlugin();
$TerminalAfricaShippingPlugin->init();
