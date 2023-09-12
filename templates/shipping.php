<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
$orders = getTerminalOrders();
//terminal page
$terminal_page = intval(terminal_param('terminal_page', 1));
//next page
$next_page = $terminal_page + 1;
//prev page
$prev_page = $terminal_page - 1;
//check if next page is greater than 1
if ($next_page < 1) {
    $next_page = 1;
}
//check if prev page is greater than 1
if ($prev_page < 1) {
    $prev_page = 1;
}
//plugin url
$plugin_url = admin_url('admin.php?page=terminal-africa');
//append to prev
$prev_url = add_query_arg('terminal_page', $prev_page, $plugin_url);
//append to next
$next_url = add_query_arg('terminal_page', $next_page, $plugin_url);
//sanitize url
$prev_url = esc_url($prev_url);
//sanitize url
$next_url = esc_url($next_url);
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
                            //get Terminal_africa_carrierlogo
                            $carrirer_logo = get_post_meta($order_id, 'Terminal_africa_carrierlogo', true) ?: TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/logo.png';
                    ?>
                            <tr class="t-terminal-dashboard-order-row" onclick="window.location.href='<?php echo esc_url($shipping_url); ?>'">
                                <td>
                                    <div class="terminal-dashboard-order-link" style="margin-bottom: 0px; font-size: 16px; color: rgb(255, 153, 0); text-transform: capitalize;">
                                        <?php echo esc_html($shipment_id); ?>
                                        <br>
                                        <span style="font-size: 12px; color: rgb(153, 153, 153);"><?php echo esc_html($timeago); ?></span>
                                    </div>
                                </td>
                                <td>
                                    <p>
                                        <span>
                                            <img src="<?php echo esc_attr($carrirer_logo); ?>" alt="" style="height:10px;">
                                        </span>
                                        <span>
                                            <?php echo esc_html($carrier); ?>
                                        </span>
                                    </p>
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
                        ?>
                        <tr>
                            <td colspan="4">
                                <div class="t-flex">
                                    <div class="t-prev-btn">
                                        <a href="<?php echo $prev_url; ?>" class="t-btn <?php echo $terminal_page == 1 ? 't-disabled' : ''; ?>">Previous</a>
                                    </div>
                                    <div class="t-next-btn">
                                        <a href="<?php echo $next_url; ?>" class="t-btn">Next</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    <?php
                    else : ?>
                        <tr>
                            <td colspan="4">
                                <div class="terminal-dashboard-order-name">
                                    <p style="color: rgb(255, 153, 0); text-decoration: none;">No Shipment</p>
                                    <?php
                                    //check if page is greater than 1
                                    if ($prev_page > 1) :
                                    ?>
                                        <div class="t-prev-btn t-mt-3">
                                            <a href="<?php echo $prev_url; ?>" class="t-btn">Previous</a>
                                        </div>
                                    <?php endif; ?>
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