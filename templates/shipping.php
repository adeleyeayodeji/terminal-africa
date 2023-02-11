<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
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
                        <th class="terminal-dashboard-orders-list-table-heading">ORDER DATE</th>
                        <th class="terminal-dashboard-orders-list-table-heading">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="terminal-dashboard-order-row" style="margin-bottom: 20px; background-color: rgb(255, 255, 255); padding: 10px; height: 80px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px; cursor: pointer;">
                        <td>
                            <div class="terminal-dashboard-order-link" style="margin-bottom: 0px; font-size: 16px; color: rgb(255, 153, 0); text-transform: capitalize;">30439403049</div>
                        </td>
                        <td>
                            Kwik Delivery
                        </td>
                        <td>
                            <div class="terminal-dashboard-order-name">
                                <a href="javascript:;" target="_blank" style="color: rgb(255, 153, 0); text-decoration: none;">#132323</a>
                            </div>
                        </td>
                        <td>
                            <div class="terminal-dashboard-order-name">
                                <a href="javascript:;" target="_blank" style="color: rgb(255, 153, 0); text-decoration: none;">2020-05-05 12:00:00</a>
                            </div>
                        </td>
                        <td>
                            <div class="terminal-dashboard-order-name">
                                <a href="javascript:;" target="_blank" style="color: rgb(255, 153, 0); text-decoration: none;">Manage</a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>