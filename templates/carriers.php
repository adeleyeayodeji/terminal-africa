<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
$carriers = getTerminalCarriers('domestic', true);
$userCarriersD = getUserCarriers('domestic', true);
$userCarriersI = getUserCarriers('international', true);
$userCarriersR = getUserCarriers('regional', true);
$internationalCarriers = getTerminalCarriers('international', true);
$regionalCarriers = getTerminalCarriers('regional', true);
?>
<div class="t-container">
    <?php terminal_header("fas fa-car", "Carriers"); ?>
    <div class="t-body" style="padding-top: 10px;">
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
                            <?php
                            foreach ($carriers['data']->carriers as $carrier) :
                                $carrier_name = $carrier->name;
                                $carrier_logo = $carrier->logo;
                                $carrier_id = $carrier->carrier_id;
                                $carrier_active = $carrier->active;
                                $domestic = $carrier->domestic ? 'true' : 'false';
                                $international = $carrier->international ? 'true' : 'false';
                                $regional = $carrier->regional ? 'true' : 'false';
                                $slug = $carrier->slug;
                            ?>
                                <div class="t-carrier-region-listing-block" data-domestic="<?php echo esc_html($domestic); ?>" data-international="<?php echo esc_html($international); ?>" data-regional="<?php echo esc_html($regional); ?>">
                                    <div class="t-carrier-name-wrapper">
                                        <div class="t-carrier-logo-wrapper">
                                            <div class="t-carrier-logo-block dhl" style="background-image: url(<?php echo esc_url($carrier_logo); ?>);"></div>
                                        </div>
                                        <div class="t-carrier-name-block">
                                            <div class="t-carrier-name"><?php echo esc_html($carrier_name); ?></div>
                                        </div>
                                        <?php
                                        if (!$carrier_active) :
                                        ?>
                                            <div class="t-carrier-coming-soon">Coming Soon</div>
                                        <?php
                                        endif;
                                        ?>
                                    </div>
                                    <?php
                                    if ($carrier_active) :
                                    ?>
                                        <div class="t-carrier-embed w-embed">
                                            <label class="t-switch">
                                                <input type="checkbox" data-carrier-id="<?php echo esc_html($carrier_id); ?>" data-slug="<?php echo esc_html($slug); ?>" class="t-carrier-checkbox" <?php echo getActiveCarrier($carrier_id, $userCarriersD, 'domestic') ? 'checked' : ''; ?>>
                                                <span class="t-slider round"></span>
                                            </label>
                                        </div>
                                    <?php
                                    endif;
                                    ?>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>
            <div class="t-col-12">
                <div class="t-space-no-border"></div>
            </div>
            <div class="t-col-12">
                <div class="t-address">
                    <div class="t-address-card-carriers">
                        <div class="t-carrier-card-header">
                            <h4 class="t-address-card-header-text">International Carriers</h4>
                        </div>
                        <div class="t-carrier-card-body">
                            <?php
                            foreach ($internationalCarriers['data']->carriers as $carrier) :
                                $carrier_name = $carrier->name;
                                $carrier_logo = $carrier->logo;
                                $carrier_id = $carrier->carrier_id;
                                $carrier_active = $carrier->active;
                                $domestic = $carrier->domestic ? 'true' : 'false';
                                $international = $carrier->international ? 'true' : 'false';
                                $regional = $carrier->regional ? 'true' : 'false';
                                $slug = $carrier->slug;
                            ?>
                                <div class="t-carrier-region-listing-block" data-domestic="<?php echo esc_html($domestic); ?>" data-international="<?php echo esc_html($international); ?>" data-regional="<?php echo esc_html($regional); ?>">
                                    <div class="t-carrier-name-wrapper">
                                        <div class="t-carrier-logo-wrapper">
                                            <div class="t-carrier-logo-block dhl" style="background-image: url(<?php echo esc_url($carrier_logo); ?>);"></div>
                                        </div>
                                        <div class="t-carrier-name-block">
                                            <div class="t-carrier-name"><?php echo esc_html($carrier_name); ?></div>
                                        </div>
                                        <?php
                                        if (!$carrier_active) :
                                        ?>
                                            <div class="t-carrier-coming-soon">Coming Soon</div>
                                        <?php
                                        endif;
                                        ?>
                                    </div>
                                    <?php
                                    if ($carrier_active) :
                                    ?>
                                        <div class="t-carrier-embed w-embed">
                                            <label class="t-switch">
                                                <input type="checkbox" data-carrier-id="<?php echo esc_html($carrier_id); ?>" data-slug="<?php echo esc_html($slug); ?>" class="t-carrier-checkbox" <?php echo getActiveCarrier($carrier_id, $userCarriersI, 'international') ? 'checked' : ''; ?>>
                                                <span class="t-slider round"></span>
                                            </label>
                                        </div>
                                    <?php
                                    endif;
                                    ?>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>
            <div class="t-col-12">
                <div class="t-space-no-border"></div>
            </div>
            <div class="t-col-12">
                <div class="t-address">
                    <div class="t-address-card-carriers">
                        <div class="t-carrier-card-header">
                            <h4 class="t-address-card-header-text">Regional Carriers</h4>
                        </div>
                        <div class="t-carrier-card-body">
                            <?php
                            foreach ($regionalCarriers['data']->carriers as $carrier) :
                                $carrier_name = $carrier->name;
                                $carrier_logo = $carrier->logo;
                                $carrier_id = $carrier->carrier_id;
                                $carrier_active = $carrier->active;
                                $domestic = $carrier->domestic ? 'true' : 'false';
                                $international = $carrier->international ? 'true' : 'false';
                                $regional = $carrier->regional ? 'true' : 'false';
                                $slug = $carrier->slug;
                            ?>
                                <div class="t-carrier-region-listing-block" data-domestic="<?php echo esc_html($domestic); ?>" data-international="<?php echo esc_html($international); ?>" data-regional="<?php echo esc_html($regional); ?>">
                                    <div class="t-carrier-name-wrapper">
                                        <div class="t-carrier-logo-wrapper">
                                            <div class="t-carrier-logo-block dhl" style="background-image: url(<?php echo esc_url($carrier_logo); ?>);"></div>
                                        </div>
                                        <div class="t-carrier-name-block">
                                            <div class="t-carrier-name"><?php echo esc_html($carrier_name); ?></div>
                                        </div>
                                        <?php
                                        if (!$carrier_active) :
                                        ?>
                                            <div class="t-carrier-coming-soon">Coming Soon</div>
                                        <?php
                                        endif;
                                        ?>
                                    </div>
                                    <?php
                                    if ($carrier_active) :
                                    ?>
                                        <div class="t-carrier-embed w-embed">
                                            <label class="t-switch">
                                                <input type="checkbox" data-carrier-id="<?php echo esc_html($carrier_id); ?>" data-slug="<?php echo esc_html($slug); ?>" class="t-carrier-checkbox" <?php echo getActiveCarrier($carrier_id, $userCarriersI, 'regional') ? 'checked' : ''; ?>>
                                                <span class="t-slider round"></span>
                                            </label>
                                        </div>
                                    <?php
                                    endif;
                                    ?>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>
            <div class="t-col-12">
                <button type="button" class="t-address-save save-carrier-settings" style="width: fit-content;">Save Changes</button>
            </div>
        </div>
    </div>
</div>