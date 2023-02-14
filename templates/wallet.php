<?php
//security
defined('ABSPATH') or die('No script kiddies please!');
$terminal_africa_merchant_id = get_option('terminal_africa_merchant_id');
$wallet_balance = getWalletBalance($terminal_africa_merchant_id);
$wallet_data = [];
$other_data = false;
//check if code is 200
if ($wallet_balance['code'] == 200) {
    $wallet_data[] = [
        'balance' => $wallet_balance['data']->amount,
        'currency' => $wallet_balance['data']->currency
    ];
    $other_data = $wallet_balance['data'];
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
            <div class="t-wallet-background t-wallet-home">
                <div class="t-balance-container">
                    <?php
                    foreach ($wallet_data as $balance) :
                    ?>
                        <div class="terminal-balance-block t-<?php echo esc_html($balance['currency']); ?>-balance" data-balance="<?php echo esc_html($balance['balance']); ?>">
                            <h1 class="t-wallet-balance-title"><?php echo esc_html($balance['currency']); ?> Balance</h1>
                            <div class="t-balance-figure"><?php echo $balance['currency'] == "NGN" ? '₦' : '$'; ?><?php echo esc_html($balance['balance']); ?></div>
                            <div class="t-balance-footer-text">Total available including pending transactions</div>
                        </div>
                    <?php
                    endforeach;
                    ?>
                </div>
                <div class="t-balance-container">
                    <div class="t-landing-action-link-button">
                        <a class="t-wallet-link-wrapper t-top-up-landing" onclick="gotoTerminalPage(this, 't-wallet-topup')"><img src="<?php echo esc_url(TERMINAL_AFRICA_PLUGIN_URL . '/assets/img/WalletIcon.png'); ?>" loading="lazy" height="30" width="30" alt="" class="t-top-up-image-green-landscape">
                            <div class="t-quick-link-text">Top Up</div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="t-wallet-background t-wallet-topup" style="display:none ;">
                <div class="t-terminal-dashboard-back-link-block"><a class="t-terminal-dashboard-back-link" onclick="gotoTerminalPage(this, 't-wallet-home')">Wallet</a></div>
                <div class="t-top-up-wallet-wrapper t-amount-input">
                    <h4 class="t-wallet-heading-text">Enter topup amount</h4>
                    <div class="t-topup-amount-block"><input placeholder="₦0.00" class="t-top-up-amount-input" step=".01" data-max="0" min="0" type="number" value=""></div>
                    <div>
                        <div class="t-balance-sub-text">Balance after topup - ₦0.00</div><select class="t-switch-wallet w-select">
                            <option value="NGN">Nigerian Naira (₦)</option>
                        </select>
                    </div>
                    <div class="t-wallet-label">SELECT A PAYMENT METHOD</div>
                    <ul role="list" class="t-topup-wallet-list-wrapper w-list-unstyled">
                        <li data-method="bank-transfer" class="t-list-item-section active bottom"><img data-method="bank-transfer" src="<?php echo esc_url(TERMINAL_AFRICA_PLUGIN_URL . '/assets/img/Bank-Icon-Orange.png'); ?>" loading="lazy" height="50" width="60" alt="" class="t-topup-icon">
                            <div data-method="bank-transfer" class="t-topup-method-block">
                                <h3 data-method="bank-transfer" class="t-topup-method-heading">Bank Transfer</h3>
                                <div data-method="bank-transfer" class="t-topup-method-text">Top up by sending money to a Nigerian bank account</div>
                            </div>
                            <div class="t-wallet-option-check-icon"></div>
                        </li>
                    </ul>
                    <div>
                        <a class="t-topup-cta-link w-inline-block" onclick="gotoTerminalPage(this, 't-confirm-bank')">
                            Next
                        </a>
                    </div>
                </div>
                <!-- T-Bank Account -->
                <div class="t-confirm-top-up-wallet-block t-confirm-bank" style="display:none ;">
                    <h4 class="t-wallet-heading-text">Make a Transfer of</h4>
                    <div class="t-top-up-amount">₦1,000.00</div>
                    <div class="t-balance-sub-text">to this account</div>
                    <ul role="list" class="t-bank-details-list w-list-unstyled">
                        <li class="t-bank-details-list-item">
                            <img src="<?php echo esc_url(TERMINAL_AFRICA_PLUGIN_URL . '/assets/img/bankimage.png'); ?>" loading="lazy" width="60" alt="" class="t-bank-account-icon">
                            <div class="t-bank-info-text bank-details"><?php echo $other_data ? esc_html($other_data->bank_name) : 'NULL' ?></div>
                            <h3 class="t-ban-account-number bank-details"><?php echo $other_data ? esc_html($other_data->account_number) : 'NULL' ?></h3>
                            <div class="t-bank-info-text bank-details"><?php echo $other_data ? esc_html($other_data->account_name) : 'NULL' ?></div>
                        </li>
                    </ul>
                    <div><a class="t-topup-cta-link orange w-inline-block" onclick="confirmTerminalTransfer(this, event)">
                            <div>Confirm</div>
                        </a></div>
                </div>
            </div>
        </div>
    </div>

</div>