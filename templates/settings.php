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
                <div class="t-address-card t-settings-page">
                    <h3>Customise your Shipping Experience for your WooCommerce store.</h3>

                    <div class="t-flex t-settings-page-card t-mb-4">
                        <div>
                            <p class="t-settings-page-card-title">
                                Show Rates
                            </p>
                            <p class="t-settings-page-card-description">
                                When enabled, your customer can see your rates.
                            </p>
                        </div>
                        <div>
                            <div class="t-carrier-embed w-embed">
                                <label class="t-switch t-carrier-switch">
                                    <input type="checkbox" class="t-carrier-checkbox">
                                    <span class="t-slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="t-flex t-settings-page-card t-mb-4">
                        <div>
                            <p class="t-settings-page-card-title">
                                Show Rates
                            </p>
                            <p class="t-settings-page-card-description">
                                When enabled, your customer can see your rates.
                            </p>
                        </div>
                        <div>
                            <div class="t-carrier-embed w-embed">
                                <label class="t-switch t-carrier-switch">
                                    <input type="checkbox" class="t-carrier-checkbox">
                                    <span class="t-slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="t-flex t-settings-page-card t-mb-4">
                        <div>
                            <p class="t-settings-page-card-title">
                                Show Rates
                            </p>
                            <p class="t-settings-page-card-description">
                                When enabled, your customer can see your rates.
                            </p>
                        </div>
                        <div>
                            <div class="t-carrier-embed w-embed">
                                <label class="t-switch t-carrier-switch">
                                    <input type="checkbox" class="t-carrier-checkbox">
                                    <span class="t-slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>