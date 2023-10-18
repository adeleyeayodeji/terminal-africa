<?php
//security
defined('ABSPATH') or die('No script kiddies please!');

use \WpOrg\Requests\Requests;

/**
 * TerminalLogHandler
 * @since version 1.10.1
 * @package TerminalAfrica
 * @author Adeleye Ayodeji
 */
class TerminalLogHandler
{
    /**
     * TerminalLogHandler constructor.
     * @since version 1.10.3
     * @package TerminalAfrica
     */
    public function __construct()
    {
        //add ajax TerminalLogHandler::checkIfPluginAlreadyLogged
        add_action('wp_ajax_check_if_terminal_plugin_already_logged', array(self::class, 'checkIfPluginAlreadyLogged'));
        add_action('wp_ajax_nopriv_check_if_terminal_plugin_already_logged', array(self::class, 'checkIfPluginAlreadyLogged'));
    }
    /**
     * terminalActivatorHandler
     * @since version 1.10.1
     * @package TerminalAfrica
     * @return void
     */
    public static function terminalActivatorHandler()
    {
        //logger handler
        self::terminalLoggerHandler('plugin/activate');
    }

    /**
     * terminalDeactionHandler
     * @since version 1.10.1
     * @package TerminalAfrica
     * @return void
     */
    public static function terminalDeactionHandler()
    {
        //logger handler
        self::terminalLoggerHandler('plugin/deactivate');
    }

    /**
     * Terminal on plugin update
     * @since version 1.10.3
     * @package TerminalAfrica
     * @return void
     */
    public static function terminalUpdateHandler($upgrader_object, $options)
    {
        $current_plugin_path_name = plugin_basename(__FILE__);

        if ($options['action'] == 'update' && $options['type'] == 'plugin') {
            foreach ($options['plugins'] as $each_plugin) {
                if ($each_plugin == $current_plugin_path_name) {
                    //logger handler
                    self::terminalLoggerHandler('plugin/activate');
                }
            }
        }
    }

    /**
     * Terminal Logger Handler
     * @since version 1.10.1
     * @package TerminalAfrica
     * @return void
     */
    public static function terminalLoggerHandler($path = 'plugin')
    {
        try {
            //get user data
            $userData = self::getUserData();
            //site url
            $site_url = site_url();
            $domain = parse_url($site_url, PHP_URL_HOST);
            //log activation of terminal
            $response = Requests::post(
                TerminalAfricaShippingPlugin::$endpoint . $path,
                [
                    'Content-Type' => 'application/json'
                ],
                json_encode([
                    'email' => get_bloginfo('admin_email'),
                    'domain' => $domain,
                    'platform' => 'wordpress'
                ] + $userData)
            );
            //get the response body
            $response = json_decode($response->body);
            //check if response is successful
            if ($response->status) {
                //check if message is available
                if (isset($response->message)) {
                    //log message
                    error_log($response->message);
                }
            }
            //silent is golden
        } catch (\Exception $e) {
            //check if function exists
            if (function_exists('logTerminalError')) {
                try {
                    //log error
                    logTerminalError($e, TerminalAfricaShippingPlugin::$endpoint . $path);
                } catch (\Exception $th) {
                    //throw $th;
                }
            }
            //log error
            error_log($e->getMessage());
        }
    }

    /**
     * Get Terminal User Data
     * @return array
     */
    public static function getUserData()
    {
        try {
            // get user data
            $userData = get_option('terminal_africa_settings', []);
            //check if user data is available
            if (!empty($userData)) {
                //get the raw user data 
                $raw = $userData['others']->user;
                //prepare data for logging
                $data = [
                    'user_id' => $raw->user_id,
                    'first_name' => $raw->first_name,
                    'last_name' => $raw->last_name,
                    'email' => $raw->email,
                ];
            } else {
                //prepare default data for logging
                $data = [
                    'user_id' => 0,
                    'first_name' => "Site",
                    'last_name' => "Administrator",
                    'email' => get_bloginfo('admin_email'),
                ];
            }
            //return data
            return $data;
        } catch (\Exception $e) {
            //log error
            //check if function exists
            if (function_exists('logTerminalError')) {
                try {
                    //log error
                    logTerminalError($e, TerminalAfricaShippingPlugin::$endpoint . 'plugin/find');
                } catch (\Exception $th) {
                    //throw $th;
                }
            }
            //log error
            error_log($e->getMessage());
            //return default data
            $data = [
                'user_id' => 0,
                'first_name' => "Site",
                'last_name' => "Administrator",
                'email' => get_bloginfo('admin_email'),
            ];
            //return
            return $data;
        }
    }

    /**
     * Check if plugin already logged
     * @since version 1.10.3
     */
    public static function checkIfPluginAlreadyLogged()
    {
        try {
            $userData = self::getUserData();
            //site url
            $site_url = site_url();
            //get the domain
            $domain = parse_url($site_url, PHP_URL_HOST);
            //log activation of terminal
            $response = Requests::post(
                TerminalAfricaShippingPlugin::$endpoint . 'plugin/find',
                [
                    'Content-Type' => 'application/json'
                ],
                json_encode([
                    'domain' => $domain,
                    'platform' => 'wordpress'
                ] + $userData)
            );
            //get response
            $response = json_decode($response->body);
            //check if plugin is already logged
            if ($response->status && $response->message == "Plugin found") {
                wp_send_json([
                    'status' => true,
                    'message' => 'Plugin already logged'
                ]);
            } else {
                //logger handler
                self::terminalLoggerHandler('plugin/activate');
                wp_send_json([
                    'status' => true,
                    'message' => 'Plugin logged'
                ]);
            }
        } catch (\Exception $e) {
            //check if function exists
            if (function_exists('logTerminalError')) {
                try {
                    //log error
                    logTerminalError($e, TerminalAfricaShippingPlugin::$endpoint . 'plugin/find');
                } catch (\Exception $e) {
                    //throw $th;
                }
            }
            //log error
            error_log($e->getMessage());
            wp_send_json([
                'status' => false,
                'message' => 'Error occured'
            ]);
        }
    }
}

//init
new TerminalLogHandler();
