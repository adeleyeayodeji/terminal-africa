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
        //sweet alert styles
        wp_enqueue_style('terminal-africa-sweet-alert-styles', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/css/sweetalert2.min.css', array(), TERMINAL_AFRICA_VERSION);
        //sweet alert scripts
        wp_enqueue_script('terminal-africa-sweet-alert-scripts', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/js/sweetalert2.min.js', array('jquery'), TERMINAL_AFRICA_VERSION, true);
        //admin.js
        wp_enqueue_script('terminal-africa-admin-scripts', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/js/admin.js', array('jquery', 'jquery-blockui'), TERMINAL_AFRICA_VERSION, true);
        //localize scripts
        wp_localize_script('terminal-africa-admin-scripts', 'terminal_africa_admin', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('terminal_africa_nonce'),
            'loader' => TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/loader.gif',
            'plugin_url' => TERMINAL_AFRICA_PLUGIN_ASSETS_URL
        ));
        //check if cuurent url has terminal
        if (strpos($_SERVER['REQUEST_URI'], 'terminal') === false) {
            return;
        }
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
        //izitoast css
        wp_enqueue_style('terminal-africa-izitoast-styles', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/css/iziToast.min.css', array(), TERMINAL_AFRICA_VERSION);
        //enqueue scripts
        //font awesome scripts
        wp_enqueue_script('terminal-africa-font-awesome-scripts', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/js/fontawesome.min.js', array('jquery'), TERMINAL_AFRICA_VERSION, true);
        //izitoast scripts
        wp_enqueue_script('terminal-africa-izitoast-scripts', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/js/iziToast.min.js', array('jquery'), TERMINAL_AFRICA_VERSION, true);
        //terminal africa scripts
        wp_enqueue_script('terminal-africa-scripts', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/js/scripts.js', array('jquery', 'select2', 'jquery-blockui'), TERMINAL_AFRICA_VERSION, true);
        //wallet page url
        $wallet_url = add_query_arg(array('tab' => 'deposit'), admin_url('admin.php?page=terminal-africa-wallet'));
        $packaging_id = get_option('terminal_default_packaging_id');
        //localize scripts
        wp_localize_script('terminal-africa-scripts', 'terminal_africa', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('terminal_africa_nonce'),
            'loader' => TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/loader.gif',
            'plugin_url' => TERMINAL_AFRICA_PLUGIN_ASSETS_URL,
            'getting_started_url' => get_option('terminal_africa_merchant_address_id') ? 'none' : admin_url('admin.php?page=terminal-africa-get-started'),
            'wallet_url' => $wallet_url,
            'wallet_home' => admin_url('admin.php?page=terminal-africa-wallet'),
            'packaging_id' => $packaging_id ? 'yes' : 'no',
            'currency' => get_woocommerce_currency(),
            'tracking_url' => TERMINAL_AFRICA_TRACKING_URL_LIVE
        ));
    }

    //enqueue_scripts
    public static function enqueue_frontend_script()
    {
        if (function_exists('WC')) {
            if (is_checkout()) {
                $enabled = true;
                //check if address is set
                if (!get_option('terminal_africa_merchant_address_id')) {
                    //$enabled false
                    $enabled = false;
                }
                //check if merchant id is set
                if (!get_option('terminal_africa_merchant_id')) {
                    //$enabled false
                    $enabled = false;
                } else {
                    $shipping = new \WC_Terminal_Delivery_Shipping_Method;
                    //check if shipping method is enabled 
                    if ($shipping->enabled == "no") {
                        //$enabled false
                        $enabled = false;
                    }
                }
                //check if enabled
                if (!$enabled) {
                    return;
                }
                //sweet alert styles
                wp_enqueue_style('terminal-africa-sweet-alert-styles', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/css/sweetalert2.min.css', array(), TERMINAL_AFRICA_VERSION);
                //checkoutcss
                wp_enqueue_style('terminal-africa-checkout-styles', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/css/checkout.css', array(), TERMINAL_AFRICA_VERSION);
                //sweet alert scripts
                wp_enqueue_script('terminal-africa-sweet-alert-scripts', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/js/sweetalert2.min.js', array('jquery'), TERMINAL_AFRICA_VERSION, true);
                //checkout
                wp_enqueue_script('terminal-africa-checkout-scripts', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/js/checkout.js', array('jquery'), TERMINAL_AFRICA_VERSION, true);
                //terminaldata
                wp_enqueue_script('terminal-africa-terminaldata-scripts', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/js/terminaldata.js', array('jquery'), TERMINAL_AFRICA_VERSION, true);
                //localize scripts
                wp_localize_script('terminal-africa-checkout-scripts', 'terminal_africa', array(
                    'ajax_url' => admin_url('admin-ajax.php'),
                    'nonce' => wp_create_nonce('terminal_africa_nonce'),
                    'loader' => TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/loader.gif',
                    'plugin_url' => TERMINAL_AFRICA_PLUGIN_ASSETS_URL,
                    'getting_started_url' => get_option('terminal_africa_merchant_address_id') ? 'none' : admin_url('admin.php?page=terminal-africa-get-started'),
                    'currency' => get_woocommerce_currency(),
                    'tracking_url' => TERMINAL_AFRICA_TRACKING_URL_LIVE,
                    'terminal_africal_countries' => get_terminal_countries(),
                ));
            }
        }
    }

    //header
    public static function header($icon, $title)
    {
        ob_start();
        require TERMINAL_AFRICA_PLUGIN_PATH . '/templates/parts/header.php';
        return ob_get_clean();
    }

    //wp head checkout
    public static function wp_head_checkout()
    {
        if (function_exists('WC')) {
            if (is_checkout()) {
?>
                <style>
                    .select2-container {
                        width: 100% !important;
                    }

                    #billing_phone_field .select2.select2-container.select2-container--default {
                        height: 100% !important;
                    }

                    #billing_phone_field .select2-container--default .select2-selection--single {
                        height: 100% !important;
                    }

                    #billing_phone_field .select2-container--default .select2-selection--single .select2-selection__rendered {
                        line-height: 40px;
                    }

                    #billing_phone_field .select2-container--default .select2-selection--single .select2-selection__arrow {
                        top: 7px;
                    }
                </style>
                <?php
                $checkout = WC()->checkout();
                //get checkout billing state
                $billing_state = $checkout->get_value('billing_state') ?: '';
                //get checkout billing city
                $billing_city = $checkout->get_value('billing_city') ?: '';
                $billing_postcode = $checkout->get_value('billing_postcode') ?: '';
                //check if , is in billing city
                if (strpos($billing_city, ',') !== false) {
                    $billing_city = explode(',', $billing_city);
                    $billing_city = $billing_city[0];
                }
                ?>
                <script>
                    var terminal_billing_state = '<?php echo esc_html($billing_state); ?>';
                    var terminal_billing_city = '<?php echo esc_html($billing_city); ?>';
                    var terminal_billing_postcode = '<?php echo esc_html($billing_postcode); ?>';
                </script>
<?php

            }
        }
    }
}
