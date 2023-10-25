<?php

namespace TerminalAfrica\Includes\Parts;

//security
defined('ABSPATH') or die('No script kiddies please!');

trait Activation
{
    //activate
    public static function activate()
    {
        try {
            //check if terminal_africa_redirected is set
            if (get_option('terminal_africa_redirected')) {
                //return
                return;
            }
            //check if current page is plugin settings page
            if (isset($_GET['page']) && $_GET['page'] == 'terminal-africa') {
                //return
                return;
            }
            //check if merchant id is set
            if (!get_option('terminal_africa_merchant_id')) {
                //save option redirected 
                update_option('terminal_africa_redirected', true);
                //redirect to plugin settings page
                wp_redirect(admin_url('admin.php?page=terminal-africa'));
                exit;
            }
        } catch (\Exception $e) {
            logTerminalError($e);
            //log error 
            error_log($e->getMessage());
        }
    }

    //deactivate_terminal_africa
    public static function deactivate_terminal_africa()
    {
        try {
            self::deactivate();
            //remove plugin from active
            deactivate_plugins(plugin_basename(TERMINAL_AFRICA_PLUGIN_FILE));
            wp_send_json([
                'code' => 200,
                'message' => 'Plugin deactivated successfully'
            ]);
        } catch (\Exception $e) {
            logTerminalError($e);
            wp_send_json([
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    //deactivate
    public static function deactivate()
    {
        try {
            //delete terminal_africa_merchant_id
            delete_option('terminal_africa_merchant_id');
            //delete terminal_africa_settings
            delete_option('terminal_africa_settings');
            //terminal_africa_redirected
            delete_option('terminal_africa_redirected');
            //terminal_africa_countries
            delete_option('terminal_africa_countries');
            //terminal_africa_merchant_address_id
            delete_option('terminal_africa_merchant_address_id');
            //terminal_africa_merchant_address
            delete_option('terminal_africa_merchant_address');
            //terminal_default_packaging_id
            delete_option('terminal_default_packaging_id');
            //disable shipping method
            //get shipping settings
            $settings = get_option('woocommerce_terminal_delivery_settings');
            //update shipping settings
            $settings['enabled'] = 'no';
            update_option('woocommerce_terminal_delivery_settings', $settings);
            //unset session
            //if session is not started start it
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
            //check if data is in session
            if (isset($_SESSION['wallet_balance'])) {
                //unset session
                unset($_SESSION['wallet_balance']);
            }
            //$_SESSION['terminal_africa_cities']
            if (isset($_SESSION['terminal_africa_cities'])) {
                //unset session
                unset($_SESSION['terminal_africa_cities']);
            }
            //$_SESSION['ratedata']
            if (isset($_SESSION['ratedata'])) {
                //unset session
                unset($_SESSION['ratedata']);
            }
            //remove all woocomerce session
            //check if class exist
            if (function_exists('WC')) {
                //check if wc session exist
                if (WC()->session) {
                    //get all session
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
            //delete terminal_africa_states
            global $wpdb;
            //use prepared statement
            $wpdb->prepare("DELETE FROM $wpdb->options WHERE option_name LIKE %s;", ['terminal_africa_states%']);
        } catch (\Exception $e) {
            logTerminalError($e);
            //log error 
            error_log($e->getMessage());
        }
    }
}
