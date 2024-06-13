<?php
//avoid direct access

use WpOrg\Requests\Requests;

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

            $this->apiURL = $this->testmode ? "https://sandboxpay.terminal.africa/v1/payment" : "https://sandboxpay.terminal.africa/v1/payment";

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
            //add ajax terminal_africa_payment_init
            add_action('wp_ajax_terminal_africa_payment_init', array($this, 'terminal_africa_payment_init'));
            // no priv
            add_action('wp_ajax_nopriv_terminal_africa_payment_init', array($this, 'terminal_africa_payment_init'));
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
         * terminal_africa_payment_init
         * 
         */
        public function terminal_africa_payment_init()
        {
            try {
                //verify nonce
                if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'wc_terminal_africa_payment_nonce')) {
                    throw new \Exception('Unauthorized request detected');
                }

                //get order id
                $order_id = isset($_POST['order_id']) ? sanitize_text_field($_POST['order_id']) : null;

                //get the order
                $order = wc_get_order($order_id);

                //check if order is valid
                if (!$order) {
                    throw new \Exception('Invalid order, please try again');
                }

                //check if order is already paid 
                if ($order->is_paid()) {
                    throw new \Exception('Order has already been paid for');
                }

                //get settings
                $terminal_africa_settings = get_option('terminal_africa_settings');

                //checkout success url
                $success_url = $this->get_return_url($order);

                //checkout cancel url
                $cancel_url = $order->get_cancel_order_url();

                //cart url
                $cart_url = wc_get_cart_url();

                //checkout webhook url
                $webhook_url = WC()->api_request_url('WC_Terminal_Payment_Gateway');

                //$order_items
                $order_items = $order->get_items();

                $data_items = [];
                //loop through cart items
                foreach ($order_items as $item) {
                    //get $product_id
                    $product_id = $item->get_id();
                    //get product image
                    $product_image = wp_get_attachment_image_src(get_post_thumbnail_id($product_id), 'single-post-thumbnail');
                    $data_items[] = [
                        "name" => $item->get_name(),
                        "quantity" => intval($item->get_quantity()) ?: 1,
                        "value" => $item->get_total(),
                        "description" => "{$item->get_quantity()} of {$item->get_name()} at {$item->get_total()} each for a total of {$item->get_total()}",
                        "type" => "parcel",
                        "currency" => get_woocommerce_currency(),
                        "weight" => (float)get_post_meta($product_id, '_weight', true) ?: 0.1,
                        'image' => $product_image
                    ];
                }

                //check if session is started
                if (session_status() == PHP_SESSION_NONE) {
                    session_start();
                }

                //get selected carrier logo
                $carrier_logo = isset($_SESSION['terminal_africa_carrierlogo']) ? $_SESSION['terminal_africa_carrierlogo'] : null;
                //get terminal_africa_carriername
                $carrier_name = isset($_SESSION['terminal_africa_carriername']) ? $_SESSION['terminal_africa_carriername'] : null;

                //get site title
                $site_title = get_bloginfo('name');

                //site logo url
                $site_logo = get_site_icon_url();

                //default url
                $default_logo_url = WC_HTTPS::force_https_url(TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/logo-footer.png');

                //site url
                $site_url = site_url();
                $domain = parse_url($site_url, PHP_URL_HOST);

                //get terminal user details
                $payment_payload = array(
                    "amount" => $order->get_total(),
                    "currency" => $order->get_currency(),
                    "customer" => array(
                        "first_name" => $order->get_billing_first_name(),
                        "last_name" => $order->get_billing_last_name(),
                        "email" => $order->get_billing_email(),
                        "phone" => $order->get_billing_phone(),
                    ),
                    "line_items" => $data_items,
                    "metadata" => array(
                        "domain" => $domain,
                        "order_id" => $order_id,
                        "user_id" => $terminal_africa_settings['user_id'],
                        "company" => array(
                            "name" => $site_title,
                            "logo" => $site_logo ? $site_logo : $default_logo_url,
                            "support_email" => $terminal_africa_settings['others']->user->email
                        )
                    ),
                    "shipping" => array(
                        "amount" => $order->get_shipping_total(),
                        "carrier_logo" => $carrier_logo,
                        "carrier_name" => $carrier_name
                    ),
                    "return_url" => $cart_url,
                    "success_url" => $success_url,
                    "complete_url" => site_url(),
                    "webhook_url" => $webhook_url,
                );

                //create json 
                $request_data = json_encode($payment_payload);

                //create hash from request data
                $hashKey = hash_hmac('sha512', $request_data, $terminal_africa_settings['secret_key']);

                $url = 'https://sandboxpay.terminal.africa/v1/payments';

                $headers = array(
                    'Content-Type' => 'application/json',
                    'X-Terminal-Signature' => $hashKey,
                    'X-Terminal-User' => $terminal_africa_settings['user_id']
                );

                //request
                $request = Requests::post($url, $headers, $request_data, array('timeout' => 60));

                //check if request was successful
                if (!$request->success) {
                    throw new \Exception('Something went wrong: ' . $request->body);
                }

                //parse body
                $body = json_decode($request->body);

                file_put_contents(__DIR__ . '/terminal_africa_payment_text.log', print_r($body, true));
            } catch (\Exception $e) {
                logTerminalError($e, 'terminal_africa_payment_init');
                //wp json error
                wp_send_json_error([
                    'message' => $e->getMessage()
                ]);
            }
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

            echo '<div id="terminal_africa_payment_form"><form id="order_review" method="post" action="' . WC()->api_request_url('WC_Terminal_Payment_Gateway') . '" class="terminal_africa_payment_form_class"></form><button class="button alt" id="wc-terminal_africa_payment-payment-gateway-button">' . __('Pay Now', 'wc-terminal_africa_payment-payment-gateway') . '</button>';
        }

        /**
         * Verify Terminal payment.
         */
        public function terminal_africa_payment_verify_payment()
        {

            //payment verification here
            file_put_contents(__DIR__ . '/terminal_africa_payment.log', print_r($_POST, true), FILE_APPEND);
            // wp_redirect(wc_get_page_permalink('cart'));

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

            wp_enqueue_script('wc_terminal_africa_payment', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/js/terminal_africa_payment.js', array('jquery'), WC_TERMINAL_PAYMENT_VERSION, true);

            wp_localize_script('wc_terminal_africa_payment', 'wc_terminal_africa_payment_params', array(
                'order_id' => $order_id,
                'order_key' => $order_key,
                'api_verify_url' => $api_verify_url,
                'ajax_url' => WC()->ajax_url(),
                'nonce' => wp_create_nonce('wc_terminal_africa_payment_nonce'),
                'redirect_url' => $this->get_return_url($order),
            ));
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
