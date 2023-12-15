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
                        <div class="card-shipping get-started-button t-get-started-active" data-view="get-started-shipping-section">
                            <div class="t-flex">
                                <img src="<?php echo esc_url(TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/card-shipping-icon.svg') ?>" alt="How shipping works" style="margin-right: 10px;">
                                <span>
                                    Shipping
                                </span>
                            </div>
                        </div>
                        <div class="card-get-support get-started-button" data-view="get-started-support-section">
                            <div class="t-flex">
                                <img src="<?php echo esc_url(TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/card-get-started.svg') ?>" alt="Get support" style="margin-right: 10px;">
                                <span>
                                    Get Support
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="get-started-shipping-section">
                        <div class="get-started-shipping-content-area">
                            <h3>
                                Learn how to ship on Terminal Africa
                            </h3>
                            <p>
                                Packaging, Carriers, Rates, and much more. Get the basics on how you can deliver products to your customers around the world with ease.
                            </p>
                        </div>
                        <div class="t-w-embed-youtubevideo" style="padding-top: 56.1702%;margin-top: 60px;"><iframe src="https://www.youtube.com/embed/BNYJYoeJjmc?rel=0&amp;amp;controls=1&amp;amp;autoplay=0&amp;amp;mute=0&amp;amp;start=0" frameborder="0" allow="autoplay; encrypted-media" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; pointer-events: auto;border-radius: 20px;"></iframe></div>
                    </div>
                    <div class="get-started-support-section" style="display: none;">
                        <div class="get-started-support-content-area">
                            <h3>
                                Speak to an expert
                            </h3>
                            <p>
                                Schedule a free online call with a member of our team or send us an email.
                            </p>
                            <p>
                                We're available to help with any issues.
                            </p>
                            <p>
                                You can also get support using the live chat option.
                            </p>
                            <div class="t-get-started-support-actions-link">
                                <p>
                                    <a target="_blank" href="https://calendly.com/terminal-africa/terminal-support-session" class="t-support-actions-link t-call">Schedule a call</a>
                                </p>
                                <p style="margin-left: 25px;">
                                    <a href="mailto:support@terminal.africa" class="t-support-actions-link">Send an email</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>