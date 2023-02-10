<?php

namespace TerminalAfrica\Includes\Parts;

//security
defined('ABSPATH') or die('No script kiddies please!');

trait Menus
{
    //add_settings_page
    public static function add_settings_page()
    {
        //add menu page
        add_menu_page(
            'Terminal Africa Shipping',
            'Terminal Africa',
            'manage_options',
            'terminal-africa',
            array(self::class, 'settings_page'),
            //icon
            TERMINAL_AFRICA_PLUGIN_URL . '/assets/img/logo.png',
            5
        );

        //sub menu
        add_submenu_page(
            'terminal-africa',
            'Get Started - Terminal Africa Shipping',
            'Get Started',
            'manage_options',
            'terminal-africa-get-started',
            array(self::class, 'settings_page')
        );

        //wallet
        add_submenu_page(
            'terminal-africa',
            'Wallet - Terminal Africa Shipping',
            'Wallet',
            'manage_options',
            'terminal-africa-wallet',
            array(self::class, 'settings_page')
        );

        //address
        add_submenu_page(
            'terminal-africa',
            'Address - Terminal Africa Shipping',
            'Address',
            'manage_options',
            'terminal-africa-address',
            array(self::class, 'settings_page')
        );
    }

    //custom header css
    public static function cssHeaderCustom()
    {
?>
        <style>
            #wpcontent {
                padding-left: 0px !important;
            }
        </style>
<?php
    }

    //settings_page
    public static function settings_page()
    {
        //get current page slug
        $current_page = isset($_GET['page']) ? $_GET['page'] : 'terminal-africa';
        //add css
        self::cssHeaderCustom();
        //switch pages
        switch ($current_page) {
            case 'terminal-africa':
                $page = 'shipping';
                break;
            case 'terminal-africa-get-started':
                $page = 'get-started';
                break;
            case 'terminal-africa-wallet':
                $page = 'wallet';
                break;
            case 'terminal-africa-address':
                $page = 'address';
                break;
            default:
                $page = 'dashboard';
                break;
        }
        //check if address is set
        if (!get_option('terminal_africa_merchant_address_id')) {
            //load address
            $page = 'address';
        }
        //check if merchant id is set
        if (!get_option('terminal_africa_merchant_id')) {
            //load auth
            $page = 'auth';
        } else {
            $shipping = new \WC_Terminal_Delivery_Shipping_Method;
            //check if shipping method is enabled 
            if ($shipping->enabled == "no") {
                //error page
                $page = 'error';
            }
        }
        //require files
        require_once TERMINAL_AFRICA_PLUGIN_DIR . '/templates/' . $page . '.php';
    }

    //add_settings_link
    public static function add_settings_link($links)
    {
        $mylinks = array(
            '<a href="' . admin_url('admin.php?page=terminal-africa') . '">Settings</a>',
        );
        return array_merge($links, $mylinks);
    }
}
