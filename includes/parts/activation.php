<?php

namespace TerminalAfrica\Includes\Parts;

//security
defined('ABSPATH') or die('No script kiddies please!');

trait Activation
{
    //activate
    public static function activate()
    {
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
    }

    //deactivate
    public static function deactivate()
    {
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
        global $wpdb;
        //use prepared statement
        $wpdb->prepare("DELETE FROM $wpdb->options WHERE option_name LIKE %s;", ['terminal_africa_states%']);
    }
}
