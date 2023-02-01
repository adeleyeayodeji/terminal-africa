<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
//class
class TerminalAfricaShippingPlugin
{
    private static $skkey;

    public function __construct()
    {
        //check if terminal_africa_settings is set
        if ($settings = get_option("terminal_africa_settings")) {
            //set skkey
            self::$skkey = $settings["secret_key"];
        } else {
            self::$skkey = null;
        }
    }
    public function init()
    {
        //add settings page
        add_action('admin_menu', array(self::class, 'add_settings_page'));
        //woocommerce_countries
        add_filter('woocommerce_countries', array(self::class, 'woocommerce_countries'), 999);
        //woocommerce_states
        add_filter('woocommerce_states', array(self::class, 'woocommerce_states'), 999);
        //plugin loaded
        add_action('plugins_loaded', array(self::class, 'activate'));
        //enqueue scripts
        add_action('admin_enqueue_scripts', array(self::class, 'enqueue_scripts'));
        //ajax terminal_africa_auth
        add_action('wp_ajax_terminal_africa_auth', array($this, 'terminal_africa_auth'));
        add_action('wp_ajax_nopriv_terminal_africa_auth', array($this, 'terminal_africa_auth'));
    }

    //terminal_africa_auth
    public function terminal_africa_auth()
    {
        $nonce = sanitize_text_field($_POST['nonce']);
        if (!wp_verify_nonce($nonce, 'terminal_africa_nonce')) {
            wp_send_json([
                'code' => 400,
                'message' => 'Wrong nonce, please refresh the page and try again'
            ]);
        }
        $public_key = sanitize_text_field($_POST['public_key']);
        $secret_key = sanitize_text_field($_POST['secret_key']);
        if (empty($public_key) || empty($secret_key)) {
            wp_send_json([
                'code' => 400,
                'message' => 'Please enter your public key and secret key'
            ]);
        }
        //validate keys
        $validate_keys = $this->checkKeys($public_key, $secret_key);
        $response = Requests::get($validate_keys["endpoint"] . "users/secrete", [
            'Authorization' => 'Bearer ' . $secret_key
        ]);
        //check if response is 200
        $body = json_decode($response->body);
        if ($response->status_code == 200) {
            //save keys
            $settings = array(
                'public_key' => $public_key,
                'secret_key' => $secret_key,
                'user_id' => $body->data->user->user_id,
                'others' => $body->data
            );
            update_option('terminal_africa_settings', $settings);
            //terminal_africa_merchant_id
            update_option('terminal_africa_merchant_id', $body->data->user->user_id);
            //return 
            wp_send_json([
                'code' => 200,
                'message' => 'Authentication successful'
            ]);
        } else {
            wp_send_json([
                'code' => 400,
                'message' => $body->message
            ]);
        }
    }

    //checkKeys
    public function checkKeys($pk, $sk)
    {
        //check if keys has test in them
        if (strpos($pk, 'test') !== false || strpos($sk, 'test') !== false) {
            return [
                'endpoint' => TERMINAL_AFRICA_TEST_API_ENDPOINT,
                'mode' => 'test'
            ];
        } else if (strpos($pk, 'live') !== false || strpos($sk, 'live') !== false) {
            return [
                'endpoint' => TERMINAL_AFRICA_API_ENDPOINT,
                'mode' => 'live'
            ];
        }
        return [
            'endpoint' => TERMINAL_AFRICA_TEST_API_ENDPOINT,
            'mode' => 'test'
        ];
    }

    //enqueue_scripts
    public static function enqueue_scripts()
    {
        //enqueue styles
        wp_enqueue_style('terminal-africa-styles', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/css/styles.css', array(), TERMINAL_AFRICA_VERSION);
        //enqueue styles
        wp_enqueue_style('terminal-africa-sweet-alert-styles', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/css/sweetalert2.min.css', array(), TERMINAL_AFRICA_VERSION);
        //enqueue scripts
        wp_enqueue_script('terminal-africa-sweet-alert-scripts', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/js/sweetalert2.min.js', array('jquery'), TERMINAL_AFRICA_VERSION, true);
        //enqueue scripts
        wp_enqueue_script('terminal-africa-scripts', TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/js/scripts.js', array('jquery'), TERMINAL_AFRICA_VERSION, true);
        //localize scripts
        wp_localize_script('terminal-africa-scripts', 'terminal_africa', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('terminal_africa_nonce'),
            'loader' => TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/loader.gif',
            'plugin_url' => TERMINAL_AFRICA_PLUGIN_ASSETS_URL,
        ));
    }

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
            plugins_url('assets/img/logo.png', dirname(__FILE__)),
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

        //sub menu shipping
        add_submenu_page(
            'terminal-africa',
            'Shipping - Terminal Africa Shipping',
            'Shipping',
            'manage_options',
            'terminal-africa-shipping',
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
    }

    //settings_page
    public static function settings_page()
    {
        //get current page slug
        $current_page = isset($_GET['page']) ? $_GET['page'] : 'terminal-africa';
        //switch pages
        switch ($current_page) {
            case 'terminal-africa':
                $page = 'dashboard';
                break;
            case 'terminal-africa-get-started':
                $page = 'get-started';
                break;
            case 'terminal-africa-shipping':
                $page = 'shipping';
                break;
            case 'terminal-africa-wallet':
                $page = 'wallet';
                break;
            default:
                $page = 'dashboard';
                break;
        }
        //check if merchant id is set
        if (!get_option('terminal_africa_merchant_id')) {
            //load auth
            $page = 'auth';
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

    //get countries
    public static function get_countries()
    {
        //check if self::$skkey
        if (!self::$skkey) {
            return [];
        }
        //check if terminal_africa_countries is set
        if ($data = get_option('terminal_africa_countries')) {
            //return countries
            return $data;
        }
        //get countries
        $response  = Requests::get(TERMINAL_AFRICA_API_ENDPOINT . 'countries', [
            'Authorization' => 'Bearer ' . self::$skkey,
        ]);
        //check if response is ok
        if ($response->status_code == 200) {
            //return countries
            $body = json_decode($response->body);
            $data = $body->data;
            //save raw data
            update_option('terminal_africa_countries', $data);
            //return data
            return $data;
        }
        return [];
    }

    //get states
    public static function get_states($countryCode = "NG")
    {
        //check if self::$skkey
        if (!self::$skkey) {
            return [
                'code' => 404,
                'message' => "Invalid API Key",
                'data' => [],
            ];
        }
        //check if terminal_africa_states.$countryCode is set
        if ($data = get_option('terminal_africa_states' . $countryCode)) {
            //return countries
            return [
                'code' => 200,
                'message' => 'success',
                'data' => $data,
            ];
        }
        //get countries
        $response = Requests::get(TERMINAL_AFRICA_API_ENDPOINT . 'states?country_code' . $countryCode, [
            'Authorization' => 'Bearer ' . self::$skkey,
        ]);
        $body = json_decode($response->body);
        //check if response is ok
        if ($response->status_code == 200) {
            //return countries
            $data = $body->data;
            //save raw data
            update_option('terminal_africa_states' . $countryCode, $data);
            //return data
            return [
                'code' => 200,
                'message' => 'success',
                'data' => $data,
            ];
        } else {
            return [
                'code' => $response->status_code,
                'message' => $body->message,
                'data' => [],
            ];
        }
    }

    //get cities
    public static function get_cities($countryCode = "NG", $state_code = "LA")
    {
        if (!self::$skkey) {
            return [
                'code' => 404,
                'message' => "Invalid API Key",
                'data' => [],
            ];
        }
        //get countries
        $reponse  = new Requests;
        //sanitize countryCode
        $countryCode = sanitize_text_field($countryCode);
        //sanitize state_code
        $state_code = sanitize_text_field($state_code);
        $query = [
            'country_code' => $countryCode,
            'state_code' => $state_code,
        ];
        //query builder
        $query = http_build_query($query);
        //get cities
        $response = $reponse->get(TERMINAL_AFRICA_API_ENDPOINT . 'states?' . $query, [
            'Authorization' => 'Bearer ' . self::$skkey,
        ]);
        $body = json_decode($response->body);
        //check if response is ok
        if ($response->status_code == 200) {
            //return countries
            $data = $body->data;
            //return data
            return [
                'code' => 200,
                'message' => 'success',
                'data' => $data,
            ];
        } else {
            return [
                'code' => $response->status_code,
                'message' => $body->message,
                'data' => [],
            ];
        }
    }

    //woocommerce_countries
    public static function woocommerce_countries($countries)
    {
        //get countries
        $countries_raw = self::get_countries();
        //check if countries is not empty
        if (!empty($countries_raw)) {
            //empty countries
            $countries = [];
            //loop through countries
            foreach ($countries_raw as $country) {
                //add country to countries array
                $countries[$country->isoCode] = $country->name . ' (' . $country->isoCode . ')';
            }
        }
        return $countries;
    }

    //woocommerce_states
    public static function woocommerce_states($states)
    {
        //get states
        $states_raw = self::get_states();
        //check if states is not empty
        if ($states_raw['code'] != 200) {
            //return states
            return $states;
        }
        //empty states
        $states_d = [];
        //check if states is not empty
        if (!empty($states_raw['data'])) {
            //loop through states
            foreach ($states_raw['data'] as $state) {
                //add state to states array
                $states_d[$state->isoCode] = $state->name;
            }
        }
        $states["NGA"] = $states_d;
        return $states;
    }

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
        global $wpdb;
        //use prepared statement
        $wpdb->prepare("DELETE FROM $wpdb->options WHERE option_name LIKE %s;", ['terminal_africa_states%']);
    }
}

//init
$TerminalAfricaShippingPlugin = new TerminalAfricaShippingPlugin();
$TerminalAfricaShippingPlugin->init();
