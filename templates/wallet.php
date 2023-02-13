<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
$terminal_africa_merchant_id = get_option('terminal_africa_merchant_id');
$wallet_balance = getWalletBalance($terminal_africa_merchant_id);
$wallet_data = [];
//check if code is 200
if ($wallet_balance['code'] == 200) {
    $wallet_data[] = [
        'balance' => $wallet_balance['data']->amount,
        'currency' => $wallet_balance['data']->currency
    ];
} else {
    $wallet_data[] = [
        'balance' => 0,
        'currency' => 'NGN'
    ];
}
?>
<div class="t-container">
    <?php terminal_header("fas fa-book", "Wallet"); ?>
    <div class="terminal-standard-wrapper">
        <div class="terminal-standard-block">
            <div class="t-wallet-background">
                <div class="t-balance-container">
                    <?php
                    foreach ($wallet_data as $balance) :
                    ?>
                        <div class="terminal-balance-block">
                            <h1 class="t-wallet-balance-title"><?php echo esc_html($balance['currency']); ?> Balance</h1>
                            <div class="t-balance-figure"><?php echo $balance['currency'] == "NGN" ? '₦' : '$'; ?><?php echo esc_html($balance['balance']); ?></div>
                            <div class="t-balance-footer-text">Total available including pending transactions</div>
                        </div>
                    <?php
                    endforeach;
                    ?>
                </div>
                <div class="t-balance-container">
                    <div class="t-landing-action-link-button"><a class="t-wallet-link-wrapper"><img src="<?php echo esc_url(TERMINAL_AFRICA_PLUGIN_URL . '/assets/img/WalletIcon.png'); ?>" loading="lazy" height="30" width="30" alt="" class="t-top-up-image-green-landscape">
                            <div class="t-quick-link-text">Top Up</div>
                        </a></div>
                </div>
            </div>
        </div>
    </div>

</div>