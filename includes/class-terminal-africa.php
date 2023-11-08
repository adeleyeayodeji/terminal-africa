<?php

use TerminalAfrica\Includes\Parts\Menus;
use TerminalAfrica\Includes\Parts\Ajax;
use TerminalAfrica\Includes\Parts\Shipping;
use TerminalAfrica\Includes\Parts\Activation;
use TerminalAfrica\Includes\Parts\Assets;
use TerminalAfrica\Includes\Parts\TerminalRESTAPI;

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
    /**
     * ~Deprecated~ property - please use <s>$endpoint</s> instead.
     * @since 1.10.19
     */
    public static $enpoint;
    /**
     * Get Terminal Endpoint
     * @since 1.10.19
     */
    public static $endpoint;
    public static $plugin_mode;

    use Menus, Ajax, Shipping, Activation, Assets, TerminalRESTAPI;

    /**
     * Constructor
     */
    public function __construct()
    {
        //check if terminal_africa_settings is set
        if ($settings = get_option("terminal_africa_settings")) {
            //set skkey
            self::$skkey = $settings["secret_key"];
            $validate_keys = $this->checkKeys($settings["public_key"], $settings["secret_key"]);
            self::$enpoint = $validate_keys['endpoint'];
            //set the value
            self::$endpoint = $validate_keys['endpoint'];
            self::$plugin_mode = $validate_keys['mode'];
        } else {
            self::$skkey = null;
            self::$enpoint = null;
            //set the value
            self::$endpoint = null;
            self::$plugin_mode = null;
        }
    }

    /**
     * Init the plugin
     * @since 1.0.0
     */
    public function init()
    {
        try {
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
            //fluid_checkout_override_style
            add_action('wp_head', array(self::class, 'fluid_checkout_override_style'), PHP_INT_MAX);
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
            //add ajax save_terminal_default_currency_code
            add_action('wp_ajax_save_terminal_default_currency_code', array($this, 'save_terminal_default_currency_code'));
            add_action('wp_ajax_nopriv_save_terminal_default_currency_code', array($this, 'save_terminal_default_currency_code'));
            //add ajax terminal_reset_carriers_data
            add_action('wp_ajax_terminal_reset_carriers_data', array($this, 'terminal_reset_carriers_data'));
            add_action('wp_ajax_nopriv_terminal_reset_carriers_data', array($this, 'terminal_reset_carriers_data'));
            //ajax update_user_carrier_shipment_timeline_terminal
            add_action('wp_ajax_update_user_carrier_shipment_timeline_terminal', array($this, 'update_user_carrier_shipment_timeline_terminal'));
            add_action('wp_ajax_nopriv_update_user_carrier_shipment_timeline_terminal', array($this, 'update_user_carrier_shipment_timeline_terminal'));
            //ajax update_user_carrier_shipment_rate_terminal
            add_action('wp_ajax_update_user_carrier_shipment_rate_terminal', array($this, 'update_user_carrier_shipment_rate_terminal'));
            add_action('wp_ajax_nopriv_update_user_carrier_shipment_rate_terminal', array($this, 'update_user_carrier_shipment_rate_terminal'));
            //add ajax update_user_carrier_shipment_insurance_terminal
            add_action('wp_ajax_update_user_carrier_shipment_insurance_terminal', array($this, 'update_user_carrier_shipment_insurance_terminal'));
            add_action('wp_ajax_nopriv_update_user_carrier_shipment_insurance_terminal', array($this, 'update_user_carrier_shipment_insurance_terminal'));
            //add new column to shop order page
            add_filter('manage_edit-shop_order_columns', array($this, 'terminal_add_new_order_admin_list_column'), 20);
            //add new column to shop order page
            add_action('manage_shop_order_posts_custom_column', array($this, 'terminal_add_new_order_admin_list_column_content'), 20, 2);
            //filter woocommerce_' . $this->order_type . '_list_table_columns
            add_filter('woocommerce_shop_order_list_table_columns', array($this, 'terminal_add_new_order_admin_list_column'), 10);
            //woocommerce_' . $this->order_type . '_list_table_custom_column
            add_action('woocommerce_shop_order_list_table_custom_column', array($this, 'terminal_add_new_order_admin_list_column_content'), 10, 2);
            //ajax terminal_africa_get_address_book
            add_action('wp_ajax_terminal_africa_get_address_book', array($this, 'terminal_africa_get_address_book'));
            add_action('wp_ajax_nopriv_terminal_africa_get_address_book', array($this, 'terminal_africa_get_address_book'));
            //initAPI
            $this->initAPI();
        } catch (\Exception $e) {
            logTerminalError($e, 'terminal_init_issue');
        }
    }

    /**
     * Add new column to shop order page
     * @param $columns
     * @since 1.10.5
     * @return void
     */
    public function terminal_add_new_order_admin_list_column($columns)
    {
        $filter = '<span>
        <img src="' . TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/logo.svg" style="margin-right: 5px;" alt="" align="left"> Terminal Africa
        </span>';

        //add column to the second position
        $columns = array_slice($columns, 0, 2, true) +
            ['terminal_shipment_status' => $filter] +
            array_slice($columns, 2, count($columns) - 2, true);

        return $columns;
    }

    /**
     * Add new column to shop order page
     * @param $column
     * @since 1.10.5
     * @return void
     */
    public function terminal_add_new_order_admin_list_column_content($column, $order)
    {
        global $terminal_allowed_order_statuses;
        //remove all "wc" in terminal_allowed_order_statuses array
        $terminal_allowed_order_statuses = array_map(function ($status) {
            return str_replace('wc-', '', $status);
        }, $terminal_allowed_order_statuses);

        //check if order is an instance of WC_Order
        if ($order && $order instanceof WC_Order) {
            //get order id
            $post_id = $order->get_id();
        } else {
            //get order id
            $post_id = $order;
        }

        if ('terminal_shipment_status' === $column) {
            //check if the order status is in processing, on-hold, completed, pending
            $order = wc_get_order($post_id);
            //get order status
            $order_status = $order->get_status();
            //check if order status is processing, on-hold, completed, pending
            $default_status = ['processing', 'on-hold', 'completed', 'pending'];
            //append terminal_allowed_order_statuses to default_status
            $default_status = $default_status + $terminal_allowed_order_statuses;
            if (in_array($order_status, $default_status)) {
                //get terminal shipment status
                $terminal_shipment_id = get_post_meta($post_id, 'Terminal_africa_shipment_id', true);
                //rate id
                $rate_id = get_post_meta($post_id, 'Terminal_africa_rateid', true);
                //get Terminal_africa_carrierlogo
                $carrirer_logo = get_post_meta($post_id, 'Terminal_africa_carrierlogo', true) ?: TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/logo.svg';
                //check if terminal_shipment_id is set
                if (!empty($terminal_shipment_id)) {
                    //echo terminal_shipment_id
                    //plugin url
                    $plugin_url = admin_url('admin.php?page=terminal-africa');
                    //arg
                    $arg = array(
                        'page' => 'terminal-africa',
                        'action' => 'edit',
                        'id' => esc_html($terminal_shipment_id),
                        'order_id' => esc_html($post_id),
                        'rate_id' => esc_html($rate_id),
                        'nonce' => wp_create_nonce('terminal_africa_edit_shipment')
                    );
                    $plugin_url = add_query_arg($arg, $plugin_url);
                    //echo woocommerce status button 
                    echo "<a href='{$plugin_url}' class='button' title='Manage Terminal Shipment' style='font-size: 11px;min-height: 25px;'>
                    <span style='margin-right: 5px;'>
                       <img src='" . esc_attr($carrirer_logo) . "' style='height:10px;' />
                    </span> 
                    <span>
                       Manage Shipment
                    </span>
                    </a>";
                } else {
                    echo "N/A";
                }
            } else {
                //do nothing
                echo "N/A";
            }
        }
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
        try {
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
        } catch (\Exception $e) {
            logTerminalError($e, 'terminal_cart_event');
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
