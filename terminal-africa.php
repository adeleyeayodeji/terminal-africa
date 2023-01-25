<?php

/**
 * Plugin Name: Terminal Shipping Method
 * Plugin URI:  Terminal Africa Shipping
 * Author:      Terminal
 * Author URI:  http://www.terminal.africa
 * Description: Terminal Africa Shipping Method Plugin for WooCommerce
 * Version:     1.0.0
 * License:     GPL-2.0+
 * License URL: http://www.gnu.org/licenses/gpl-2.0.txt
 * text-domain: terminal-africa
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

// Define constants.
define('TERMINAL_AFRICA_VERSION', '1.0.0');
define('TERMINAL_AFRICA_PLUGIN_FILE', __FILE__);
define('TERMINAL_AFRICA_PLUGIN_BASENAME', plugin_basename(__FILE__));
define('TERMINAL_AFRICA_PLUGIN_DIR', untrailingslashit(dirname(__FILE__)));
define('TERMINAL_AFRICA_PLUGIN_URL', untrailingslashit(plugins_url(basename(plugin_dir_path(__FILE__)), basename(__FILE__))));
define('TERMINAL_AFRICA_PLUGIN_ASSETS_URL', TERMINAL_AFRICA_PLUGIN_URL . '/assets');
//api endpoint
define('TERMINAL_AFRICA_API_ENDPOINT', 'https://sandbox.terminal.africa/v1/');


// Include the main Terminal Africa class.
if (!class_exists('TerminalAfricaShippingPlugin')) {
    include_once dirname(__FILE__) . '/includes/class-terminal-africa.php';
    //add settings page
    add_filter('plugin_action_links_' . plugin_basename(__FILE__), array('TerminalAfricaShippingPlugin', 'add_settings_link'));
}
