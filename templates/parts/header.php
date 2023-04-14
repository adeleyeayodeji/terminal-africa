<?php $mode = getTerminalPluginMode(); ?>
<div class="t-header">
    <div class="t-row">
        <div class="t-col-6">
            <h2 class="t-title"><i class="fas <?php echo esc_html($icon); ?>" aria-hidden="true"></i> <?php echo esc_html($title); ?></h2>
        </div>
        <div class="t-col-6">
            <div class="t-right">
                <div class="t-flex">
                    <p class="t-m-p-0 <?php echo $mode == "test" ? "t-signal-sandbox" : "t-signal"; ?>">
                        <?php echo esc_html(ucfirst($mode)); ?> Mode
                    </p>
                    <a href="javascript:;" id="t-sign-out">
                        <p class="t-m-p-0">
                            <i class="fa fa-power-off t-font-sign-out" aria-hidden="true"></i>
                        </p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>