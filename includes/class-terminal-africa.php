<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
//class
class TerminalAfricaShippingPlugin
{
    private static $skkey;

    public function __construct()
    {
        //get skkey
        self::$skkey = "sk_test_hmeZxKHvZdbWfkFb0oxh8coYx46j7rZS";
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
        // add_action('plugins_loaded', array(self::class, 'activate'));
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
        //empty countries
        $countries = [];
        //check if countries is not empty
        if (!empty($countries_raw)) {
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
        //check if current page is plugin settings page
        if (isset($_GET['page']) && $_GET['page'] == 'terminal-africa') {
            //return
            return;
        }
        //check if merchant id is set
        if (!get_option('terminal_africa_merchant_id')) {
            //redirect to plugin settings page
            wp_redirect(admin_url('admin.php?page=terminal-africa'));
        }
    }

    //deactivate
    public static function deactivate()
    {
        //delete terminal_africa_merchant_id
        delete_option('terminal_africa_merchant_id');
        //delete terminal_africa_skkey
        delete_option('terminal_africa_skkey');
        //delete terminal_africa_countries
        delete_option('terminal_africa_countries');
        //delete terminal_africa_states like
        global $wpdb;
        $wpdb->query("DELETE FROM $wpdb->options WHERE option_name LIKE ?;", ['terminal_africa_states%']);
    }
}

//init
$TerminalAfricaShippingPlugin = new TerminalAfricaShippingPlugin();
$TerminalAfricaShippingPlugin->init();
