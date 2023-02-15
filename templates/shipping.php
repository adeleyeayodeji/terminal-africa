<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
$orders = getTerminalOrders();
?>
<div class="t-container">
    <?php terminal_header("fas fa-cart-plus", "Shipping"); ?>
    <div class="t-body">
        <div class="t-shipping">
            <table width="100%" style="border-collapse: separate; border-spacing: 0px 20px; text-align: center;">
                <thead>
                    <tr>
                        <th class="terminal-dashboard-orders-list-table-heading">SHIPMENT ID</th>
                        <th class="terminal-dashboard-orders-list-table-heading">CARRIER</th>
                        <th class="terminal-dashboard-orders-list-table-heading">ORDER ID</th>
                        <th class="terminal-dashboard-orders-list-table-heading">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (count($orders) > 0) :
                        foreach ($orders as $order) :
                            $order_id = $order->ID;
                            $shipment_id = get_post_meta($order_id, 'Terminal_africa_shipment_id', true);
                            $carrier = get_post_meta($order_id, 'Terminal_africa_carriername', true);
                            $order_date = $order->post_date;
                            $timeago = human_time_diff(strtotime($order_date), current_time('timestamp')) . ' ago';
                            $rate_id = get_post_meta($order_id, 'Terminal_africa_rateid', true);
                            //plugin url
                            $plugin_url = admin_url('admin.php?page=terminal-africa');
                            //arg
                            $arg = array(
                                'page' => 'terminal-africa',
                                'action' => 'edit',
                                'id' => esc_html($shipment_id),
                                'order_id' => esc_html($order_id),
                                'rate_id' => esc_html($rate_id),
                                'nonce' => wp_create_nonce('terminal_africa_edit_shipment')
                            );
                            $shipping_url = add_query_arg($arg, $plugin_url);
                    ?>
                            <tr class="terminal-dashboard-order-row" style="margin-bottom: 20px; background-color: rgb(255, 255, 255); padding: 10px; height: 80px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px; cursor: pointer;" onclick="window.location.href='<?php echo esc_url($shipping_url); ?>'">
                                <td>
                                    <div class="terminal-dashboard-order-link" style="margin-bottom: 0px; font-size: 16px; color: rgb(255, 153, 0); text-transform: capitalize;">
                                        <?php echo esc_html($shipment_id); ?>
                                        <br>
                                        <span style="font-size: 12px; color: rgb(153, 153, 153);"><?php echo esc_html($timeago); ?></span>
                                    </div>
                                </td>
                                <td>
                                    <?php echo esc_html($carrier); ?>
                                </td>
                                <td>
                                    <div class="terminal-dashboard-order-name">
                                        <a href="<?php echo esc_url($shipping_url); ?>" style="color: rgb(255, 153, 0); text-decoration: none;">#<?php echo esc_html($order_id); ?></a>
                                    </div>
                                </td>
                                <td>
                                    <div class="terminal-dashboard-order-name">
                                        <a href="<?php echo esc_url($shipping_url); ?>" style="color: rgb(255, 153, 0); text-decoration: none;">Manage</a>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach;
                    else : ?>
                        <tr>
                            <td colspan="4">
                                <div class="terminal-dashboard-order-name">
                                    <p style="color: rgb(255, 153, 0); text-decoration: none;">No Shipment</p>
                                </div>
                            </td>
                        </tr>
                    <?php endif;
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>