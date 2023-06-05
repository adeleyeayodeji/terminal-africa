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
            //site url
            $site_url = site_url();
            $domain = parse_url($site_url, PHP_URL_HOST);
            //log activation of terminal
            $response = Requests::post(
                TERMINAL_AFRICA_API_ENDPOINT . $path,
                [
                    'Content-Type' => 'application/json'
                ],
                json_encode([
                    'email' => get_bloginfo('admin_email'),
                    'domain' => $domain,
                    'platform' => 'wordpress'
                ])
            );
            //silent is golden
        } catch (\Exception $e) {
            //log error
            error_log($e->getMessage());
        }
    }

    /**
     * Check if plugin already logged
     * @since version 1.10.3
     */
    public static function checkIfPluginAlreadyLogged()
    {
        //site url
        $site_url = site_url();
        $domain = parse_url($site_url, PHP_URL_HOST);
        //log activation of terminal
        $response = Requests::post(
            TERMINAL_AFRICA_API_ENDPOINT . 'plugin/find',
            [
                'Content-Type' => 'application/json'
            ],
            json_encode([
                'email' => get_bloginfo('admin_email'),
                'domain' => $domain,
                'platform' => 'wordpress'
            ])
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
    }
}

//init
new TerminalLogHandler();
