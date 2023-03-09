<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
?>
<div class="t-container">
    <div class="t-content-auth">
        <img class="main-logo-image" src="<?php echo esc_url(TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/logo-full.png') ?>" alt="">
        <div class="t-form-area">
            <p class="t-auth-text">
                Kindly enter your public key and secret key to get started.
            </p>
            <form action="" method="post" id="t_form">
                <div class="t-form-group">
                    <label for="public_key">Public Key</label>
                    <input type="text" name="public_key" required id="public_key" placeholder="Enter your public key">
                </div>
                <div class="t-form-group">
                    <label for="secret_key">Secret Key</label>
                    <input type="text" name="secret_key" required id="secret_key" placeholder="Enter your secret key">
                </div>
                <p>
                    You can get your keys from your <br><a href="<?php echo esc_url("https://app.terminal.africa/settings/api-keys-webhooks") ?>" target="_blank">Terminal Africa Dashboard</a>
                </p>
                <div class="t-form-group">
                    <button type="submit">Connect to Terminal Africa</button>
                </div>
            </form>
        </div>
    </div>
</div>