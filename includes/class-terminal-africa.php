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

    use Menus, Ajax, Shipping, Activation, Assets;

    public function __construct()
    {
        //check if terminal_africa_settings is set
        if ($settings = get_option("terminal_africa_settings")) {
            //set skkey
            self::$skkey = $settings["secret_key"];
            $validate_keys = $this->checkKeys($settings["public_key"], $settings["secret_key"]);
            self::$enpoint = $validate_keys['endpoint'];
        } else {
            self::$skkey = null;
            self::$enpoint = null;
        }
    }
    public function init()
    {
        //add settings page
        add_action('admin_menu', array(self::class, 'add_settings_page'));
        //woocommerce_countries
        add_filter('woocommerce_countries', array(self::class, 'woocommerce_countries'), 9999);
        //woocommerce_states
        add_filter('woocommerce_states', array(self::class, 'woocommerce_states'), 9999);
        //plugin loaded
        add_action('plugins_loaded', array(self::class, 'activate'), 9999);
        //enqueue scripts
        add_action('admin_enqueue_scripts', array(self::class, 'enqueue_scripts'), 99999);
        //enqueue scripts
        add_action('wp_enqueue_scripts', array(self::class, 'enqueue_frontend_script'), 99999);
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
        add_action('wp_head', array(self::class, 'wp_head_checkout'), 9999);
        add_action('woocommerce_checkout_update_order_review', array($this, 'checkout_update_refresh_shipping_methods'), 99999, 1);
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
    }

    public function checkout_update_refresh_shipping_methods($post_data)
    {
        //update shipping pricing realtime
        $packages = WC()->cart->get_shipping_packages();
        foreach ($packages as $package_key => $package) {
            WC()->session->set('shipping_for_package_' . $package_key, false); // Or true
        }
    }
}

//init
$TerminalAfricaShippingPlugin = new TerminalAfricaShippingPlugin();
$TerminalAfricaShippingPlugin->init();
