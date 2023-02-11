<?php

if (!defined('ABSPATH')) exit; // Exit if accessed directly

/**
 * Terminal Delivery Shipping Method Class
 *
 * Provides real-time shipping rates from Terminal delivery and handle order requests
 *
 * @since 1.0
 * 
 * @extends \WC_Shipping_Method
 */
class WC_Terminal_Delivery_Shipping_Method extends WC_Shipping_Method
{
    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct($instance_id = 0)
    {
        $this->id                 = 'terminal_delivery';
        $this->instance_id           = absint($instance_id);
        $this->method_title       = __('Terminal Delivery');
        $this->method_description = __('Get your parcels delivered better, cheaper and quicker via Terminal Delivery');

        $this->supports  = array(
            'settings',
            'shipping-zones',
            // 'instance-settings',
            // 'instance-settings-modal',
        );

        $this->init();

        $this->title = 'Terminal Delivery';

        $this->enabled = $this->get_option('enabled');
    }

    /**
     * Init.
     *
     * Initialize Terminal delivery shipping method.
     *
     * @since 1.0.0
     */
    public function init()
    {
        $this->init_form_fields();
        $this->init_settings();

        // Save settings in admin if you have any defined
        add_action('woocommerce_update_options_shipping_' . $this->id, array($this, 'process_admin_options'));
    }

    /**
     * Init fields.
     *
     * Add fields to the Terminal delivery settings page.
     *
     * @since 1.0.0
     */
    public function init_form_fields()
    {
        $this->form_fields = array(
            'enabled' => array(
                'title'     => __('Enable/Disable'),
                'type'         => 'checkbox',
                'label'     => __('Enable this shipping method'),
                'default'     => 'no',
            ),
            //add link to manage shipping
            'title' => array(
                'title' => __('Manage this page from the admin panel'),
                'type' => 'title',
                'description' => sprintf(
                    __('You can manage this page from the <a href="%s">Terminal admin panel</a>.'),
                    admin_url('admin.php?page=terminal-africa')
                ),
            ),
        );
    }

    function is_available($package)
    {
        if ($this->enabled === "no")
            return false;
        return apply_filters('woocommerce_shipping_' . $this->id . '_is_available', true);
    }


    /**
     * Calculate shipping by sending destination/items to Shipwire and parsing returned rates
     *
     * @since 1.0
     * @param array $package
     */
    public function calculate_shipping($package = array())
    {
        if ($this->get_option('enabled') == 'no') {
            return;
        }

        // // country required for all shipments
        if ($package['destination']['country'] !== 'NG') {
            //add notice
            wc_add_notice(__('Terminal delivery is only available for Nigeria'), 'notice');
            return;
        }

        //check if session exists
        $terminal_africa_carriername = WC()->session->get('terminal_africa_carriername');
        $terminal_africa_amount = WC()->session->get('terminal_africa_amount');
        $terminal_africa_duration = WC()->session->get('terminal_africa_duration');
        $guest_email = WC()->session->get('terminal_africa_guest_email');
        $terminal_africa_rateid = WC()->session->get('terminal_africa_rateid');
        //if exist
        if ($terminal_africa_carriername && $terminal_africa_amount && $terminal_africa_duration && $guest_email && $terminal_africa_rateid) {
            $shipment_id = WC()->session->get('terminal_africa_shipment_id' . $guest_email);
            //check if $terminal_africa_amount is not string
            if (is_string($terminal_africa_amount)) {
                $terminal_africa_amount = floatval($terminal_africa_amount);
            }
            //add rate
            $this->add_rate(array(
                'id'        => $this->id . $this->instance_id,
                'label'     => $this->title . ' - ' . $terminal_africa_carriername,
                'cost'      => $terminal_africa_amount,
                'meta_data' => [
                    'duration' => $terminal_africa_duration,
                    'carrier' => $terminal_africa_carriername,
                    'amount' => $terminal_africa_amount,
                    'shipment_id' => $shipment_id,
                    'rate_id' => $terminal_africa_rateid,
                ],
            ));
            return;
        }
        //add rate
        $this->add_rate(array(
            'id'        => $this->id . $this->instance_id,
            'label'     => $this->title,
            'cost'      => 0,
            'meta_data' => [],
        ));
    }
}
