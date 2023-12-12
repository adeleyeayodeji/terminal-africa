<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
?>
<div class="t-container">
    <?php terminal_header("fas fa-globe", "Get Started"); ?>
    <div class="t-body" style="padding-top: 10px;">
        <div class="t-row">
            <div class="t-col-12">
                <div class="t-address-card t-settings-page">
                    <div class="t-flex">
                        <div class="t-carriers-title-tag">
                            <h3 class="t-address-card-header-text t-pl-0">Check out these tips to get started</h3>
                        </div>
                    </div>
                    <div class="t-flex">
                        <div class="card-shipping">
                            <div class="t-flex">
                                <img src="<?php echo esc_url(TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/card-shipping-icon.svg') ?>" alt="How shipping works" style="margin-right: 10px;">
                                <span>
                                    Shipping
                                </span>
                            </div>
                        </div>
                        <div class="card-get-support">
                            <div class="t-flex">
                                <img src="<?php echo esc_url(TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/card-get-started.svg') ?>" alt="Get support" style="margin-right: 10px;">
                                <span>
                                    Get Support
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>