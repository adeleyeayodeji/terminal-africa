<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
$carriers = getTerminalCarriers('domestic');
$userCarriersD = getUserCarriers('domestic');
$userCarriersI = getUserCarriers('international');
$userCarriersR = getUserCarriers('regional');
$internationalCarriers = getTerminalCarriers('international');
$regionalCarriers = getTerminalCarriers('regional');
//terminal_custom_price_mark_up
$terminal_custom_price_mark_up = get_option('terminal_custom_price_mark_up', '');
//carriers data array
$carriersData = [
    'domestic' => [
        'title' => 'Domestic Carriers',
        'carriers' => $carriers['data']->carriers,
        'userCarriers' => $userCarriersD
    ],
    'international' => [
        'title' => 'International Carriers',
        'carriers' => $internationalCarriers['data']->carriers,
        'userCarriers' => $userCarriersI
    ],
    'regional' => [
        'title' => 'Regional Carriers',
        'carriers' => $regionalCarriers['data']->carriers,
        'userCarriers' => $userCarriersR
    ]
];
?>
<div class="t-container">
    <?php terminal_header("fas fa-car", "Carriers"); ?>
    <div class="t-body" style="padding-top: 10px;">
        <div class="t-row">
            <div class="t-col-12">
                <div class="t-address-info t-display-flex">
                    <div class="t-carriers-title-tag">
                        <!-- instructions -->
                        <h3 class="t-title">
                            <strong>Carriers:</strong>
                        </h3>
                        <p class="t-text">
                            Select your choice of carriers from our available partners below
                        </p>
                    </div>
                    <div class="t-carriers-custom-markup">
                        <!-- custom price mark up -->
                        <h3 class="t-title t-mb-1">
                            <strong>Custom price mark up:</strong>
                        </h3>
                        <span>
                            Enter a custom price mark up for all your shipments in percentage (%)
                        </span>
                        <input type="number" name="terminal_custom_price_mark_up" placeholder="e.g 10 for 10%" id="terminal_custom_price_mark_up" value="<?php echo esc_html($terminal_custom_price_mark_up); ?>">
                    </div>
                </div>
            </div>
            <?php
            foreach ($carriersData as $type => $carrierData) :
                $title = $carrierData['title'];
                $carriers = $carrierData['carriers'];
                $userCarriers = $carrierData['userCarriers'];
            ?>
                <div class="t-col-12">
                    <div class="t-address">
                        <div class="t-address-card-carriers">
                            <div class="t-carrier-card-header">
                                <h4 class="t-address-card-header-text"><?php echo esc_html($title); ?></h4>
                            </div>
                            <div class="t-carrier-card-body">
                                <?php
                                foreach ($carriers as $carrier) :
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
                                                <label class="t-switch t-carrier-switch">
                                                    <input type="checkbox" data-carrier-id="<?php echo esc_html($carrier_id); ?>" data-slug="<?php echo esc_html($slug); ?>" class="t-carrier-checkbox" <?php echo getActiveCarrier($carrier_id, $userCarriers, $type) ? 'checked' : ''; ?>>
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
                <?php
                //check if its last item
                if ($carrierData !== end($carriersData)) :
                ?>
                    <div class="t-col-12">
                        <div class="t-space-no-border"></div>
                    </div>
            <?php
                endif;
            endforeach;
            ?>
        </div>
    </div>
</div>