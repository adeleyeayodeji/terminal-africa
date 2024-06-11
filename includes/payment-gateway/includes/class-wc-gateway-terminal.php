<?php
//avoid direct access
if (!defined('ABSPATH')) exit("No direct script access allowed"); // Exit if accessed directly

if (class_exists("WC_Payment_Gateway")) {
    class WC_Terminal_Payment_Gateway extends WC_Payment_Gateway_CC
    {
        /**
         * testmode
         * 
         */
        public $testmode;

        /**
         * apiURL
         * 
         */
        public $apiURL;

        /**
         * Constructor
         */
        public function __construct()
        {
            $this->id = "terminal_africa_payment";
            // $this->icon = apply_filters("woocommerce_terminal_africa_payment_icon", plugins_url( 'assets/images/terminal_africa_payment.png', WC_TERMINAL_PAYMENT_MAIN_FILE ));
            $this->has_fields = true;
            $this->method_title = __("Terminal Payment", "wc-terminal_africa_payment-payment-gateway");
            $this->method_description = sprintf(__('Terminal provide merchants with the tools and services needed to accept online payments from local and international customers using Mastercard, Visa, Verve Cards <a href="%1$s" target="_blank">Learn more</a>.', 'wc-terminal_africa_payment-payment-gateway'), 'https://www.terminal.africa/integrations?utm_source=web');
            $this->supports = array(
                'products',
                'tokenization',
                'subscriptions',
                'subscription_cancellation',
                'subscription_suspension',
                'subscription_reactivation',
                'subscription_amount_changes',
                'subscription_date_changes',
                'subscription_payment_method_change',
                'subscription_payment_method_change_customer',
                'subscription_payment_method_change_admin',
                'multiple_subscriptions',
            );
            // Load the form fields
            $this->init_form_fields();
            // Load the settings
            $this->init_settings();
            //Load 
            $this->title       = $this->get_option('title');
            $this->description = $this->get_option('description');
            $this->enabled     = $this->get_option('enabled');

            $this->testmode    = $this->get_option('testmode') === 'yes' ? true : false;

            $this->apiURL = $this->testmode ? "https://sandbox.terminal_africa_payment.com/api/" : "https://api.terminal_africa_payment.com/api/";

            // $this->public_key = $this->testmode ? $this->test_public_key : $this->live_public_key;
            // $this->secret_key = $this->testmode ? $this->test_secret_key : $this->live_secret_key;
            // Hooks
            add_action('wp_enqueue_scripts', array($this, 'payment_scripts'));
            add_action('woocommerce_available_payment_gateways', array($this, 'add_gateway_to_checkout'));
            add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));
            add_action('woocommerce_receipt_' . $this->id, array($this, 'receipt_page'));
            add_action('woocommerce_api_wc_terminal_africa_payment_payment_gateway', array($this, 'terminal_africa_payment_verify_payment'));
            add_action(
                'woocommerce_update_options_payment_gateways_' . $this->id,
                array(
                    $this,
                    'process_admin_options',
                )
            );
            // Check if the gateway can be used.
            if (!$this->is_valid_for_use()) {
                $this->enabled = false;
            }
        }

        public function init_form_fields()
        {
            $form_fields = apply_filters(
                "woo_ade_pay_fields",
                array(
                    "enabled" => array(
                        "title" => __("Enable/Disable", "wc-terminal_africa_payment-payment-gateway"),
                        "type" => "checkbox",
                        "label" => __("Enable or Disable Terminal Africa Payment", "wc-terminal_africa_payment-payment-gateway"),
                        "default" => "no"
                    ),
                    "title" => array(
                        "title" => __("Title", "wc-terminal_africa_payment-payment-gateway"),
                        "type" => "text",
                        "description" => __("This controls the payment method title which the user sees during checkout.", "wc-terminal_africa_payment-payment-gateway"),
                        "default" => __("Terminal Africa Payment", "wc-terminal_africa_payment-payment-gateway"),
                        "desc_tip" => true,
                        //read only
                        "custom_attributes" => array(
                            "readonly" => "readonly"
                        )
                    ),
                    "description" => array(
                        "title" => __("Payment Description", "wc-terminal_africa_payment-payment-gateway"),
                        "type" => "textarea",
                        "description" => __("Add a new description", "wc-terminal_africa_payment-payment-gateway"),
                        "default" => __("Accept payments seamlessly via card, account transfers, etc. using Terminal payment gateway.", "wc-terminal_africa_payment-payment-gateway"),
                        "desc_tip" => true,
                        //read only
                        "custom_attributes" => array(
                            "readonly" => "readonly"
                        )
                    ),
                    'testmode'                         => array(
                        'title'       => __('Test mode', 'wc-terminal_africa_payment-payment-gateway'),
                        'label'       => __('Enable Test Mode', 'wc-terminal_africa_payment-payment-gateway'),
                        'type'        => 'checkbox',
                        'description' => __('Test mode enables you to test payments before going live. <br />Once the LIVE MODE is enabled on your Terminal account uncheck this.', 'wc-terminal_africa_payment-payment-gateway'),
                        'default'     => 'yes',
                        'desc_tip'    => true,
                    )
                )
            );

            $this->form_fields = $form_fields;
        }

        /**
         * Get Paystack payment icon URL.
         */
        public function get_logo_url()
        {
            $url = WC_HTTPS::force_https_url(TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/assets/img/logo-footer.png');
            return apply_filters('woocommerce_terminal_africa_payment_icon', $url, $this->id);
        }

        /**
         * Payment form on checkout page
         */
        public function payment_fields()
        {

            if ($this->description) {
                echo wpautop(wptexturize($this->description));
            }

            if (!is_ssl()) {
                return;
            }

            if ($this->supports('tokenization') && is_checkout() && is_user_logged_in()) {
                $this->tokenization_script();
                $this->saved_payment_methods();
                $this->save_payment_method_checkbox();
            }
        }


        /**
         * Display terminal_africa_payment payment icon.
         */
        public function get_icon()
        {
            $url = WC_HTTPS::force_https_url(TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/logo-footer.png');
            $icon = '<img src="' . $url . '" alt="Terminal Payment Options" style="height: 20px;" />';

            return apply_filters('woocommerce_gateway_icon', $icon, $this->id);
        }

        /**
         * Displays the payment page.
         *
         * @param $order_id
         */
        public function receipt_page($order_id)
        {

            $order = wc_get_order($order_id);

            echo '<div id="yes-add">' . __('Thank you for your order, please click the button below to pay with Terminal Africa Payment Gateway.', 'wc-terminal_africa_payment-payment-gateway') . '</div>';

            echo '<div id="terminal_africa_payment_form"><form id="order_review" method="post" action="' . WC()->api_request_url('WC_Terminal_Payment_Gateway') . '"></form><button class="button alt" id="wc-terminal_africa_payment-payment-gateway-button">' . __('Pay Now', 'wc-terminal_africa_payment-payment-gateway') . '</button>';
        }

        /**
         * Verify Terminal payment.
         */
        public function terminal_africa_payment_verify_payment()
        {

            //payment verification here

            wp_redirect(wc_get_page_permalink('cart'));

            exit;
        }

        /**
         * Process the payment.
         *
         * @param int $order_id
         *
         * @return array|void
         */
        public function process_payment($order_id)
        {
            $order = wc_get_order($order_id);

            return array(
                'result' => 'success',
                'redirect' => $order->get_checkout_payment_url(true),
            );
        }

        /**
         * Check if this gateway is enabled and available in the user's country.
         */
        public function is_valid_for_use()
        {

            // if (!in_array(get_woocommerce_currency(), apply_filters('woocommerce_terminal_africa_payment_supported_currencies', array('NGN', 'USD', 'ZAR', 'GHS')))) {

            //     $msg = sprintf(__('Terminal does not support your store currency. Kindly set it to either NGN (&#8358), GHS (&#x20b5;), USD (&#36;) or ZAR (R) <a href="%s">here</a>', 'wc-terminal_africa_payment-payment-gateway'), admin_url('admin.php?page=wc-settings&tab=general'));

            //     WC_Admin_Settings::add_error($msg);

            //     return false;
            // }

            return true;
        }

        /**
         * Load admin scripts.
         */
        public function admin_scripts()
        {

            if ('woocommerce_page_wc-settings' !== get_current_screen()->id) {
                return;
            }

            $terminal_africa_payment_admin_params = array(
                'plugin_url' => WC_TERMINAL_PAYMENT_URL,
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('wc_terminal_africa_payment_admin_nonce'),
            );

            wp_enqueue_script('wc_terminal_africa_payment_admin', plugins_url('assets/js/terminal_africa_payment-admin.js', WC_TERMINAL_PAYMENT_MAIN_FILE), array(), WC_TERMINAL_PAYMENT_VERSION, true);

            wp_localize_script('wc_terminal_africa_payment_admin', 'wc_terminal_africa_payment_admin_params', $terminal_africa_payment_admin_params);
        }

        /**
         * Check if terminal_africa_payment merchant details is filled.
         */
        public function admin_notices()
        {

            if ($this->enabled == 'no') {
                return;
            }

            return true;
        }

        /**
         * Check if Terminal gateway is enabled.
         *
         * @return bool
         */
        public function is_available()
        {

            if ('yes' == $this->enabled) {

                return true;
            }

            return false;
        }

        /**
         * Outputs scripts used for terminal_africa_payment payment.
         */
        public function payment_scripts()
        {

            if (!is_checkout_pay_page()) {
                return;
            }

            if ($this->enabled === 'no') {
                return;
            }

            $order_key = sanitize_text_field(urldecode($_GET['key']));
            $order_id  = absint(get_query_var('order-pay'));

            $order = wc_get_order($order_id);
            $api_verify_url = WC()->api_request_url('WC_Terminal_Payment_Gateway') . '?terminal_africa_payment_id=' . $order_id;

            $payment_method = method_exists($order, 'get_payment_method') ? $order->get_payment_method() : $order->payment_method;

            if ($this->id !== $payment_method) {
                return;
            }

            wp_enqueue_script('jquery');

            wp_enqueue_script('terminal_africa_payment', 'https://sdk.terminal_africa_payment.com/plugin/terminal_africa_payment.js', array('jquery'), WC_TERMINAL_PAYMENT_VERSION, false);

            wp_enqueue_script('wc_terminal_africa_payment', plugins_url('assets/js/terminal_africa_payment.js', WC_TERMINAL_PAYMENT_MAIN_FILE), array('jquery', 'terminal_africa_payment'), WC_TERMINAL_PAYMENT_VERSION, false);

            // $terminal_africa_payment_params = array(
            //     'key' => $this->public_key,
            //     'contractCode' => $this->contractCode,
            //     'testmode' => $this->testmode,
            //     'api_verify_url' => $api_verify_url
            // );

            // if (is_checkout_pay_page() && get_query_var('order-pay')) {

            //     $email         = method_exists($order, 'get_billing_email') ? $order->get_billing_email() : $order->billing_email;
            //     $amount        = $order->get_total();
            //     $txnref        = $order_id . '_' . time();
            //     $the_order_id  = method_exists($order, 'get_id') ? $order->get_id() : $order->id;
            //     $the_order_key = method_exists($order, 'get_order_key') ? $order->get_order_key() : $order->order_key;
            //     $currency      = method_exists($order, 'get_currency') ? $order->get_currency() : $order->order_currency;

            //     if ($the_order_id == $order_id && $the_order_key == $order_key) {

            //         $terminal_africa_payment_params['email']        = $email;
            //         $terminal_africa_payment_params['amount']       = $amount;
            //         $terminal_africa_payment_params['txnref']       = $txnref;
            //         $terminal_africa_payment_params['currency']     = $currency;
            //         $terminal_africa_payment_params['bank_channel'] = 'true';
            //         $terminal_africa_payment_params['card_channel'] = 'true';
            //         $terminal_africa_payment_params['first_name'] = $order->get_billing_first_name();
            //         $terminal_africa_payment_params['last_name'] = $order->get_billing_last_name();
            //         $terminal_africa_payment_params['phone'] = $order->get_billing_phone();
            //         $terminal_africa_payment_params['card_channel'] = 'true';
            //     }
            //     update_post_meta($order_id, '_terminal_africa_payment_txn_ref', $txnref);
            // }

            // wp_localize_script('wc_terminal_africa_payment', 'wc_terminal_africa_payment_params', $terminal_africa_payment_params);
        }

        /**
         * Add Gateway to checkout page.
         *
         * @param $available_gateways
         *
         * @return mixed
         */
        public function add_gateway_to_checkout($available_gateways)
        {

            if ('no' == $this->enabled) {
                unset($available_gateways[$this->id]);
            }

            return $available_gateways;
        }
    }
}