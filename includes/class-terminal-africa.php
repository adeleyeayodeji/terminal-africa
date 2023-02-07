<?php

use TerminalAfrica\Includes\Parts\Menus;
use TerminalAfrica\Includes\Parts\Ajax;
use TerminalAfrica\Includes\Parts\Shipping;
use TerminalAfrica\Includes\Parts\Activation;
use TerminalAfrica\Includes\Parts\Assets;
//security
defined('ABSPATH') or die('No script kiddies please!');
//class
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
        add_filter('woocommerce_countries', array(self::class, 'woocommerce_countries'), 999);
        //woocommerce_states
        add_filter('woocommerce_states', array(self::class, 'woocommerce_states'), 999);
        //plugin loaded
        add_action('plugins_loaded', array(self::class, 'activate'));
        //enqueue scripts
        add_action('admin_enqueue_scripts', array(self::class, 'enqueue_scripts'));
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
    }
}

//init
$TerminalAfricaShippingPlugin = new TerminalAfricaShippingPlugin();
$TerminalAfricaShippingPlugin->init();
