<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
$orders = getTerminalOrders();
?>
<div class="t-container">
    <?php terminal_header("fas fa-car", "Carriers"); ?>
    <div class="t-body">
        <div class="t-row">
            <div class="t-col-12">
                <div class="t-address-info">
                    <!-- instructions -->
                    <h3 class="t-title">
                        <strong>Carriers:</strong>
                    </h3>
                    <p class="t-text">
                        Select your choice of carriers from our available partners below
                    </p>
                </div>
            </div>
            <div class="t-col-12">
                <div class="t-address">
                    <div class="t-address-card-carriers">
                        <div class="t-carrier-card-header">
                            <h4 class="t-address-card-header-text">Domestic Carriers</h4>
                        </div>
                        <div class="t-carrier-card-body">
                            <div class="t-carrier-region-listing-block">
                                <div class="t-carrier-name-wrapper">
                                    <div class="t-carrier-logo-wrapper">
                                        <div class="t-carrier-logo-block dhl" style="background-image: url(&quot;https://ucarecdn.com/f42ace86-bcca-4167-aa1b-5c5cf3d4fb91/AramexMobileAPKMODDownload421release.png&quot;);"></div>
                                    </div>
                                    <div class="t-carrier-name-block">
                                        <div class="t-carrier-name">Aramex</div>
                                    </div>
                                </div>
                                <div class="t-carrier-embed w-embed">
                                    <label class="t-switch">
                                        <input type="checkbox" checked>
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
</div>