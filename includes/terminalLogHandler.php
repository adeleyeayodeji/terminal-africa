<?php
//security
defined('ABSPATH') or die('No script kiddies please!');

use \WpOrg\Requests\Requests;

/**
 * TerminalLogHandler
 * @since version 1.1.8
 */
class TerminalLogHandler
{
    /**
     * terminalActivatorHandler
     */
    public static function terminalActivatorHandler()
    {
        //logger handler
        self::terminalLoggerHandler('plugin');
    }

    /**
     * terminalDeactionHandler
     */
    public static function terminalDeactionHandler()
    {
        //logger handler
        self::terminalLoggerHandler('plugin/deactivate');
    }

    /**
     * Terminal Logger Handler
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
}
