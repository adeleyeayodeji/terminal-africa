<?php

if (!defined('ABSPATH')) exit("No direct script access allowed"); // Exit if accessed directly

if (!in_array("woocommerce/woocommerce.php", apply_filters("active_plugins", get_option("active_plugins")))) return;

define("WC_TERMINAL_PAYMENT_VERSION", time());
define('WC_TERMINAL_PAYMENT_MAIN_FILE', __FILE__);
define('WC_TERMINAL_PAYMENT_URL', untrailingslashit(plugins_url('/', __FILE__)));

add_action("plugins_loaded", "terminal_africa_payment_method_init", 999);

//Methods
function terminal_africa_payment_method_init()
{
    //Init  class
    require_once dirname(__FILE__) . '/includes/class-wc-gateway-terminal.php';

    //Notice user
    add_action('admin_notices', 'wc_terminal_africa_payment_testmode_notice');

    add_filter("woocommerce_payment_gateways", "terminal_africa_payment_method_init_payment_gateway");
}


function terminal_africa_payment_method_init_payment_gateway($gateways)
{
    $gateways[] = "WC_Terminal_Payment_Gateway";
    return $gateways;
}

/**
 * Display the test mode notice.
 **/
function wc_terminal_africa_payment_testmode_notice()
{

    $terminal_africa_payment_settings = get_option('woocommerce_terminal_africa_payment_settings');
    $test_mode = isset($terminal_africa_payment_settings['testmode']) ? $terminal_africa_payment_settings['testmode'] : '';

    if ('yes' === $test_mode) {
        echo '<div class="error">
        <p>' . sprintf(__('Terminal Payment test mode is still enabled, Click <strong><a
                    href="%s">here</a></strong> to
            disable it when you want to start accepting live payment on your site.', 'wc-terminal_africa_payment-payment-gateway'), esc_url(
            admin_url('admin.php?page=wc-settings&tab=checkout&section=terminal_africa_payment')
        )) . '</p>
    </div>';
    }
}

add_action(
    'before_woocommerce_init',
    function () {
        if (class_exists(\Automattic\WooCommerce\Utilities\FeaturesUtil::class)) {
            \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', __FILE__, true);
        }
    }
);


function terminal_africa_payment_gateway_block_support()
{

    if (!class_exists('Automattic\WooCommerce\Blocks\Payments\Integrations\AbstractPaymentMethodType')) {
        return;
    }

    // here we're including our "gateway block support class"
    require_once __DIR__ . '/includes/class-wc-gateway-terminal-blocks-support.php';

    // registering our block support class
    add_action(
        'woocommerce_blocks_payment_method_type_registration',
        function (Automattic\WooCommerce\Blocks\Payments\PaymentMethodRegistry $payment_method_registry) {
            $payment_method_registry->register(new WC_Terminal_Payment_Gateway_Blocks_Support);
        }
    );
}

/**
 *  Register our block support class when WooCommerce Blocks are loaded.
 * 
 */
add_action('woocommerce_blocks_loaded', 'terminal_africa_payment_gateway_block_support');