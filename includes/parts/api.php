<?php

namespace TerminalAfrica\Includes\Parts;

use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

//security
defined('ABSPATH') or die('No script kiddies please!');

/**
 * Terminal Africa API
 * @since 1.10.22
 */
trait TerminalRESTAPI
{
    /**
     * Allowed order statuses
     * @var array
     */
    public static $allowed_order_statuses = [
        'wc-shipment-draft',
        'wc-shipment-cancelled',
        'wc-shipment-confirmed',
        'wc-shipment-pending',
        'wc-shipment-delivered',
        'wc-shipment-intransit',
    ];

    //overide init
    public function initAPI()
    {
        //add rest api
        add_action('rest_api_init', [$this, 'register_api']);
        //woocommerce_register_shop_order_post_statuses
        add_filter('woocommerce_register_shop_order_post_statuses', [$this, 'add_custom_order_status_v2']);
        //add custom status to wc orders
        add_filter('wc_order_statuses', [$this, 'add_custom_order_status']);
    }

    /**
     * add_custom_order_status_v2
     */
    public function add_custom_order_status_v2($order_statuses)
    {
        //add custom status   
        return $order_statuses + [
            'wc-shipment-draft'    => array(
                'label'                     => _x('Terminal Shipment Draft', 'Order status', 'woocommerce'),
                'public'                    => false,
                'exclude_from_search'       => false,
                'show_in_admin_all_list'    => true,
                'show_in_admin_status_list' => true,
                /* translators: %s: number of orders */
                'label_count'               => _n_noop('Terminal Shipment Draft <span class="count">(%s)</span>', 'Terminal Shipment Draft <span class="count">(%s)</span>', 'woocommerce'),
            ),
            'wc-shipment-cancelled'    => array(
                'label'                     => _x('Terminal Shipment Cancelled', 'Order status', 'woocommerce'),
                'public'                    => false,
                'exclude_from_search'       => false,
                'show_in_admin_all_list'    => true,
                'show_in_admin_status_list' => true,
                /* translators: %s: number of orders */
                'label_count'               => _n_noop('Terminal Shipment Cancelled <span class="count">(%s)</span>', 'Terminal Shipment Cancelled <span class="count">(%s)</span>', 'woocommerce'),
            ),
            'wc-shipment-confirmed'    => array(
                'label'                     => _x('Terminal Shipment Confirmed', 'Order status', 'woocommerce'),
                'public'                    => false,
                'exclude_from_search'       => false,
                'show_in_admin_all_list'    => true,
                'show_in_admin_status_list' => true,
                /* translators: %s: number of orders */
                'label_count'               => _n_noop('Terminal Shipment Confirmed <span class="count">(%s)</span>', 'Terminal Shipment Confirmed <span class="count">(%s)</span>', 'woocommerce'),
            ),
            'wc-shipment-pending'    => array(
                'label'                     => _x('Terminal Shipment Pending', 'Order status', 'woocommerce'),
                'public'                    => false,
                'exclude_from_search'       => false,
                'show_in_admin_all_list'    => true,
                'show_in_admin_status_list' => true,
                /* translators: %s: number of orders */
                'label_count'               => _n_noop('Terminal Shipment Pending <span class="count">(%s)</span>', 'Terminal Shipment Pending <span class="count">(%s)</span>', 'woocommerce'),
            ),
            'wc-shipment-delivered'    => array(
                'label'                     => _x('Terminal Shipment Delivered', 'Order status', 'woocommerce'),
                'public'                    => false,
                'exclude_from_search'       => false,
                'show_in_admin_all_list'    => true,
                'show_in_admin_status_list' => true,
                /* translators: %s: number of orders */
                'label_count'               => _n_noop('Terminal Shipment Delivered <span class="count">(%s)</span>', 'Terminal Shipment Delivered <span class="count">(%s)</span>', 'woocommerce'),
            ),
            'wc-shipment-intransit'    => array(
                'label'                     => _x('Terminal Shipment In Transit', 'Order status', 'woocommerce'),
                'public'                    => false,
                'exclude_from_search'       => false,
                'show_in_admin_all_list'    => true,
                'show_in_admin_status_list' => true,
                /* translators: %s: number of orders */
                'label_count'               => _n_noop('Terminal Shipment In Transit <span class="count">(%s)</span>', 'Terminal Shipment In Transit <span class="count">(%s)</span>', 'woocommerce'),
            ),
        ];
    }

    /**
     * Add custom order status
     * @param $order_statuses
     * @return mixed
     */
    public function add_custom_order_status($order_statuses)
    {
        //custom status
        $custom_status = [
            //wc-shipment-draft
            'wc-shipment-draft' => _x('Terminal Shipment Draft', 'Order status', 'terminal-africa'),
            //wc-shipment-cancelled
            'wc-shipment-cancelled' => _x('Terminal Shipment Cancelled', 'Order status', 'terminal-africa'),
            //wc-shipment-confirmed
            'wc-shipment-confirmed' => _x('Terminal Shipment Confirmed', 'Order status', 'terminal-africa'),
            //wc-shipment-pending
            'wc-shipment-pending' => _x('Terminal Shipment Pending', 'Order status', 'terminal-africa'),
            //wc-shipment-delivered
            'wc-shipment-delivered' => _x('Terminal Shipment Delivered', 'Order status', 'terminal-africa'),
            //wc-shipment-in-transit
            'wc-shipment-in-transit' => _x('Terminal Shipment In Transit', 'Order status', 'terminal-africa'),
        ];
        //return
        return array_merge($order_statuses, $custom_status);
    }

    /**
     * Register API
     */
    public function register_api()
    {
        //register api
        register_rest_route('terminal-africa/v1', '/orders', [
            'methods' => WP_REST_Server::READABLE,
            'callback' => [$this, 'orders'],
            'permission_callback' => [$this, 'api_permission']
        ]);

        //register update order status
        register_rest_route('terminal-africa/v1', '/update-order-status', [
            'methods' => WP_REST_Server::EDITABLE,
            'callback' => [$this, 'update_order_status'],
            'permission_callback' => [$this, 'api_permission']
        ]);
    }

    /**
     * getBearerToken
     */
    public function getBearerToken()
    {
        //get the headers
        $headers = getallheaders();

        //check if the authorization header is set
        if (isset($headers['Authorization'])) {
            //get the authorization header
            $authorization = $headers['Authorization'];

            //split the authorization header
            $authorization = explode(' ', $authorization);

            //check if the authorization header is set
            if (isset($authorization[1])) {
                //return the authorization header
                return $authorization[1];
            }
        }

        //return false
        return false;
    }

    /**
     * API Permission
     */
    public function api_permission()
    {
        //get the bearer token
        $token = $this->getBearerToken();
        //check if the token is set
        if ($token) {
            //verify token matches the own token
            if ($token == self::$skkey) {
                //return true
                return true;
            }
        }
        //return false
        return false;
    }

    /**
     * Get all wc orders
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public function orders(WP_REST_Request $request)
    {
        try {
            //order id
            $order_id = $request->get_param('order_id');
            //check if the order id is set
            if ($order_id) {
                //load single order
                return $this->loadOrder($order_id);
            }
            //page
            $page = $request->get_param('page');
            //limit
            $limit = $request->get_param('limit');
            //date_from
            $date_from = $request->get_param('date_from');
            //date_to
            $date_to = $request->get_param('date_to');
            //customer email
            $customer_email = $request->get_param('customer_email');
            //get all orders
            $orders = wc_get_orders([
                'limit' => $limit ?: 10,
                'page' => $page ?: 1,
                'date_before' => $date_to ?: '',
                'date_after' => $date_from ?: '',
                'status' => ['processing', 'completed', 'on-hold', 'pending'],
                'billing_email' => $customer_email,
                //order by date
                'orderby' => 'date',
                //order type
                'order' => 'ASC',
                //where order id
                'include' => [$order_id]
            ]);
            //get total orders
            $total_orders = wc_get_orders([
                'limit' => -1,
                'page' => 1,
                'date_before' => $date_to ?: '',
                'date_after' => $date_from ?: '',
                'status' => ['processing', 'completed', 'on-hold', 'pending'],
                'billing_email' => $customer_email,
                //where order id
                'include' => [$order_id]
            ]);
            //orders list
            $orders_list = [];
            //loop through the orders
            foreach ($orders as $order) {
                //get the order id
                $order_id = $order->get_id();
                //get the order
                $order = wc_get_order($order_id);
                //get the order data
                $order_data = $order->get_data();
                //get the order date
                $order_date = $order->get_date_created();
                //get the order date
                $order_date = $order_date->date('Y-m-d H:i:s');
                //get the products
                $items = $order->get_items();
                //products
                $products = [];
                //loop through the products
                foreach ($items as $product_id => $item) {
                    //convert to int $product_id
                    $product_id = intval($product_id);
                    $products[] = [
                        "name" => $item->get_name(),
                        "quantity" => intval($item->get_quantity()) ?: 1,
                        "value" => $item->get_total(),
                        "description" => "{$item->get_quantity()} of {$item->get_name()} at {$item->get_total()} each for a total of {$item->get_total()}",
                        "type" => "parcel",
                        "currency" => get_woocommerce_currency(),
                        "weight" => (float)get_post_meta($product_id, '_weight', true) ?: 0.1
                    ];
                }
                //orders list
                $orders_list[] = [
                    "id" => $order_id,
                    "products" => $products,
                    "extral" => $order_data,
                ];
            }
            //response
            $response = [
                "status" => 200,
                "message" => "Orders fetched successfully",
                "meta" => [
                    "page" => $page ?: 1,
                    "limit" => $limit ?: 10,
                    "total" => count($total_orders)
                ],
                "data" => $orders_list,
            ];
            //return
            return new WP_REST_Response($response, 200);
        } catch (\Exception $e) {
            //response
            $response = [
                "status" => 500,
                "message" => "Error loading orders",
                "data" => $e->getMessage(),
            ];
            //return
            return new WP_REST_Response($response, 500);
        }
    }

    /**
     * Load single order
     * @param $order_id
     */
    public function loadOrder($order_id)
    {
        try {
            //get the order
            $order = wc_get_order($order_id);
            //get the order data
            $order_data = $order->get_data();
            //get the order date
            $order_date = $order->get_date_created();
            //get the order date
            $order_date = $order_date->date('Y-m-d H:i:s');
            //get the products
            $items = $order->get_items();
            //products
            $products = [];
            //loop through the products
            foreach ($items as $product_id => $item) {
                //convert to int $product_id
                $product_id = intval($product_id);
                $products[] = [
                    "name" => $item->get_name(),
                    "quantity" => intval($item->get_quantity()) ?: 1,
                    "value" => $item->get_total(),
                    "description" => "{$item->get_quantity()} of {$item->get_name()} at {$item->get_total()} each for a total of {$item->get_total()}",
                    "type" => "parcel",
                    "currency" => get_woocommerce_currency(),
                    "weight" => (float)get_post_meta($product_id, '_weight', true) ?: 0.1
                ];
            }
            //orders list
            $orders_list[] = [
                "id" => $order_id,
                "products" => $products,
                "extral" => $order_data,
            ];
            //response
            $response = [
                "status" => 200,
                "message" => "Single order fetched successfully",
                "data" => $orders_list,
            ];
            //return
            return new WP_REST_Response($response, 200);
        } catch (\Exception $e) {
            //response
            $response = [
                "status" => 500,
                "message" => "Error loading order",
                "data" => $e->getMessage(),
            ];
            //return
            return new WP_REST_Response($response, 500);
        }
    }

    /**
     * Update order status
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public function update_order_status(WP_REST_Request $request)
    {
        try {
            //order id
            $order_id = $request->get_param('order_id');
            //order status
            $order_status = $request->get_param('order_status');
            //check if the order status is set
            if (!$order_status) {
                //response
                $response = [
                    "status" => 400,
                    "message" => "Order status is required",
                    "data" => [],
                ];
                //return
                return new WP_REST_Response($response, 400);
            }
            //check if the order status is allowed
            if (!in_array($order_status, self::$allowed_order_statuses)) {
                //response
                $response = [
                    "status" => 400,
                    "message" => "Order status is not allowed",
                    "data" => [],
                ];
                //return
                return new WP_REST_Response($response, 400);
            }
            //get the order
            $order = wc_get_order($order_id);
            //check if the order is set
            if ($order) {
                //update the order status
                $order->update_status($order_status);
                //trigger the order status change
                do_action('woocommerce_order_status_' . $order_status, $order_id);
                //response
                $response = [
                    "status" => 200,
                    "message" => "Order status updated successfully",
                    "data" => $order->get_data(),
                ];
                //return
                return new WP_REST_Response($response, 200);
            }
            //response
            $response = [
                "status" => 404,
                "message" => "Order not found",
                "data" => [],
            ];
            //return
            return new WP_REST_Response($response, 404);
        } catch (\Exception $e) {
            //response
            $response = [
                "status" => 500,
                "message" => "Error updating order status",
                "data" => $e->getMessage(),
            ];
            //return
            return new WP_REST_Response($response, 500);
        }
    }
}
