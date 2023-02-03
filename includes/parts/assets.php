<?php

namespace TerminalAfrica\Includes\Parts;

use function Breakdance\GlobalScripts\enqueue;

//security
defined('ABSPATH') or die('No script kiddies please!');

trait Assets
{
    //enqueue_scripts
    public static function enqueue_scripts()
    {
        //enqueue styles
        //font awesome 
        wp_enqueue_style('terminal-africa-font-awesome-styles', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/css/fontawesome.min.css', array(), TERMINAL_AFRICA_VERSION);
        //check if select2 is already loaded
        if (!wp_script_is('select2', 'enqueued')) {
            //select2 styles
            wp_enqueue_style('terminal-africa-select2-styles', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/css/select2.css', array(), TERMINAL_AFRICA_VERSION);
        }
        //terminal africa styles
        wp_enqueue_style('terminal-africa-styles', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/css/styles.css', array(), TERMINAL_AFRICA_VERSION);
        //responsive css
        wp_enqueue_style('terminal-africa-styles-responsive', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/css/responsive.css', array(), TERMINAL_AFRICA_VERSION);
        //sweet alert styles
        wp_enqueue_style('terminal-africa-sweet-alert-styles', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/css/sweetalert2.min.css', array(), TERMINAL_AFRICA_VERSION);
        //enqueue scripts
        //font awesome scripts
        wp_enqueue_script('terminal-africa-font-awesome-scripts', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/js/fontawesome.min.js', array('jquery'), TERMINAL_AFRICA_VERSION, true);
        //sweet alert scripts
        wp_enqueue_script('terminal-africa-sweet-alert-scripts', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/js/sweetalert2.min.js', array('jquery'), TERMINAL_AFRICA_VERSION, true);
        //terminal africa scripts
        wp_enqueue_script('terminal-africa-scripts', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/js/scripts.js', array('jquery', 'select2'), TERMINAL_AFRICA_VERSION, true);
        //localize scripts
        wp_localize_script('terminal-africa-scripts', 'terminal_africa', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('terminal_africa_nonce'),
            'loader' => TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/loader.gif',
            'plugin_url' => TERMINAL_AFRICA_PLUGIN_ASSETS_URL,
            'getting_started_url' => get_option('terminal_africa_merchant_address_id') ? 'none' : admin_url('admin.php?page=terminal-africa-get-started'),
        ));
    }

    //header
    public static function header($icon, $title)
    {
        ob_start();
        require TERMINAL_AFRICA_PLUGIN_PATH . '/templates/parts/header.php';
        return ob_get_clean();
    }
}
