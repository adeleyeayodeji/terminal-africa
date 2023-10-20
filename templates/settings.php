<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
//get terminal countries
$countries = get_terminal_countries();
//get the saved currency
$saved_currency = get_option("terminal_default_currency_code", ['isoCode' => 'NG', 'currency_code' => 'NGN']);
//terminal_custom_price_mark_up
$terminal_custom_price_mark_up = get_option('terminal_custom_price_mark_up', '');

?>
<div class="t-container">
    <?php terminal_header("fas fa-cog", "Settings"); ?>
    <div class="t-body" style="padding-top: 10px;">
        <div class="t-row">
            <div class="t-col-12">
                <?php
                echo getTerminalTemplatePart('settings', ['countries' => $countries, 'saved_currency' => $saved_currency, 'terminal_custom_price_mark_up' => $terminal_custom_price_mark_up]);
                ?>
            </div>
        </div>
    </div>
</div>